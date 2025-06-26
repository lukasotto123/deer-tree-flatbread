
-- Create a locations table to replace the separate Niederlassung A/B concept
CREATE TABLE IF NOT EXISTS public.client_locations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default locations with proper UUIDs
INSERT INTO public.client_locations (id, name, description) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Niederlassung A', 'Hauptstandort'),
  ('22222222-2222-2222-2222-222222222222', 'Niederlassung B', 'Zweitstandort')
ON CONFLICT (id) DO NOTHING;

-- Add location assignment to providers (using TEXT to store UUID as string)
ALTER TABLE public.providers 
ADD COLUMN IF NOT EXISTS client_location_id TEXT;

-- Update existing providers with location assignments
UPDATE public.providers 
SET client_location_id = '11111111-1111-1111-1111-111111111111'
WHERE client_location_id IS NULL AND type = 'personaldienstleister';

UPDATE public.providers 
SET client_location_id = '22222222-2222-2222-2222-222222222222'
WHERE client_location_id IS NULL AND type = 'nachunternehmer';

-- Create a function to calculate document status counts per employee
CREATE OR REPLACE FUNCTION calculate_employee_document_counts(employee_id_param TEXT)
RETURNS TABLE (
  employee_id TEXT,
  total_documents BIGINT,
  valid_documents BIGINT,
  expiring_documents BIGINT,
  expired_documents BIGINT,
  missing_documents BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    employee_id_param,
    COUNT(*) as total_documents,
    COUNT(*) FILTER (WHERE status = 'valid') as valid_documents,
    COUNT(*) FILTER (WHERE status = 'expiring') as expiring_documents,
    COUNT(*) FILTER (WHERE status = 'expired') as expired_documents,
    COUNT(*) FILTER (WHERE status = 'missing') as missing_documents
  FROM documents d
  WHERE d.employee_id = employee_id_param;
END;
$$ LANGUAGE plpgsql;

-- Create a function to calculate document status counts per provider
CREATE OR REPLACE FUNCTION calculate_provider_document_counts(provider_id_param TEXT)
RETURNS TABLE (
  provider_id TEXT,
  total_documents BIGINT,
  valid_documents BIGINT,
  expiring_documents BIGINT,
  expired_documents BIGINT,
  missing_documents BIGINT,
  beitragsrueckstaende BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    provider_id_param,
    COUNT(*) as total_documents,
    COUNT(*) FILTER (WHERE status = 'valid') as valid_documents,
    COUNT(*) FILTER (WHERE status = 'expiring') as expiring_documents,
    COUNT(*) FILTER (WHERE status = 'expired') as expired_documents,
    COUNT(*) FILTER (WHERE status = 'missing') as missing_documents,
    -- Beitragsrückstände are expired documents from specific categories
    COUNT(*) FILTER (WHERE status = 'expired' AND type IN ('doc-type-4', 'doc-type-6', 'doc-type-18')) as beitragsrueckstaende
  FROM documents d
  WHERE d.provider_id = provider_id_param;
END;
$$ LANGUAGE plpgsql;

-- Create a view that aggregates all document counts by location
CREATE OR REPLACE VIEW public.location_document_summary AS
SELECT 
  cl.id as location_id,
  cl.name as location_name,
  COUNT(d.*) as total_documents,
  COUNT(d.*) FILTER (WHERE d.status = 'valid') as valid_documents,
  COUNT(d.*) FILTER (WHERE d.status = 'expiring') as expiring_documents,
  COUNT(d.*) FILTER (WHERE d.status = 'expired') as expired_documents,
  COUNT(d.*) FILTER (WHERE d.status = 'missing') as missing_documents,
  COUNT(d.*) FILTER (WHERE d.status = 'expired' AND d.type IN ('doc-type-4', 'doc-type-6', 'doc-type-18')) as beitragsrueckstaende
FROM public.client_locations cl
LEFT JOIN public.providers p ON p.client_location_id = cl.id::text
LEFT JOIN public.documents d ON d.provider_id = p.id
GROUP BY cl.id, cl.name;

-- Update the provider_document_summary view to use real aggregated data
CREATE OR REPLACE VIEW public.provider_document_summary AS
SELECT 
  p.id as provider_id,
  p.name as provider_name,
  p.type as provider_type,
  COUNT(d.*) as total_documents,
  COUNT(d.*) FILTER (WHERE d.status = 'valid') as valid_documents,
  COUNT(d.*) FILTER (WHERE d.status = 'expiring') as expiring_documents,
  COUNT(d.*) FILTER (WHERE d.status = 'expired') as expired_documents,
  COUNT(d.*) FILTER (WHERE d.status = 'missing') as missing_documents,
  COUNT(dr.*) as reminders_sent,
  p.client_location_id
FROM public.providers p
LEFT JOIN public.documents d ON d.provider_id = p.id
LEFT JOIN public.document_reminders dr ON dr.provider_id = p.id
GROUP BY p.id, p.name, p.type, p.client_location_id;

-- Create a trigger to update provider document counts when documents change
CREATE OR REPLACE FUNCTION update_provider_document_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the provider's document counts
  UPDATE providers 
  SET 
    documents_count_total = (
      SELECT COUNT(*) FROM documents WHERE provider_id = COALESCE(NEW.provider_id, OLD.provider_id)
    ),
    documents_count_valid = (
      SELECT COUNT(*) FROM documents WHERE provider_id = COALESCE(NEW.provider_id, OLD.provider_id) AND status = 'valid'
    ),
    documents_count_expiring = (
      SELECT COUNT(*) FROM documents WHERE provider_id = COALESCE(NEW.provider_id, OLD.provider_id) AND status = 'expiring'
    ),
    documents_count_expired = (
      SELECT COUNT(*) FROM documents WHERE provider_id = COALESCE(NEW.provider_id, OLD.provider_id) AND status = 'expired'
    ),
    documents_count_missing = (
      SELECT COUNT(*) FROM documents WHERE provider_id = COALESCE(NEW.provider_id, OLD.provider_id) AND status = 'missing'
    )
  WHERE id = COALESCE(NEW.provider_id, OLD.provider_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_update_provider_document_counts ON documents;
CREATE TRIGGER trigger_update_provider_document_counts
  AFTER INSERT OR UPDATE OR DELETE ON documents
  FOR EACH ROW
  EXECUTE FUNCTION update_provider_document_counts();

-- Initialize provider document counts for existing data
UPDATE providers 
SET 
  documents_count_total = COALESCE((
    SELECT COUNT(*) FROM documents WHERE provider_id = providers.id
  ), 0),
  documents_count_valid = COALESCE((
    SELECT COUNT(*) FROM documents WHERE provider_id = providers.id AND status = 'valid'
  ), 0),
  documents_count_expiring = COALESCE((
    SELECT COUNT(*) FROM documents WHERE provider_id = providers.id AND status = 'expiring'
  ), 0),
  documents_count_expired = COALESCE((
    SELECT COUNT(*) FROM documents WHERE provider_id = providers.id AND status = 'expired'
  ), 0),
  documents_count_missing = COALESCE((
    SELECT COUNT(*) FROM documents WHERE provider_id = providers.id AND status = 'missing'
  ), 0);
