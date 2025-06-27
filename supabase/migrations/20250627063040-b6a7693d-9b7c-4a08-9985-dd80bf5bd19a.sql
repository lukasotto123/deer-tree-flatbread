
-- First, let's create a comprehensive documents table that stores all relevant document information
-- This will replace the current documents table with a more complete structure

-- Drop existing documents table if it exists to recreate with proper structure
DROP TABLE IF EXISTS public.documents CASCADE;

-- Create the new comprehensive documents table
CREATE TABLE public.documents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- Links to document_types.id
    provider TEXT NOT NULL, -- Provider name for display
    provider_id TEXT NOT NULL, -- Links to providers.id
    provider_type provider_type NOT NULL,
    
    -- Employee information (nullable for company-level documents)
    employee_id TEXT,
    employee_name TEXT,
    
    -- Document dates and validity
    issued_date DATE,
    expiry_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Document status and checking
    status document_status NOT NULL DEFAULT 'missing',
    last_checked DATE,
    next_check_due DATE,
    check_frequency TEXT,
    
    -- File storage
    file_url TEXT,
    
    -- Document requirements (copied from document_types for performance)
    is_required BOOLEAN DEFAULT TRUE,
    is_secure_check_required BOOLEAN DEFAULT FALSE,
    is_basic_check_required BOOLEAN DEFAULT FALSE,
    is_per_employee BOOLEAN DEFAULT FALSE,
    is_client_specific BOOLEAN DEFAULT FALSE,
    
    -- Check frequencies and requirements
    secure_check_frequency TEXT,
    secure_check_requirement TEXT,
    basic_check_frequency TEXT,
    basic_check_requirement TEXT,
    
    -- Issuance type
    issuance_type TEXT DEFAULT 'pro Unternehmen',
    
    -- Foreign key constraints
    FOREIGN KEY (provider_id) REFERENCES providers(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (type) REFERENCES document_types(id)
);

-- Create indexes for better performance
CREATE INDEX idx_documents_provider_id ON documents(provider_id);
CREATE INDEX idx_documents_employee_id ON documents(employee_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_expiry_date ON documents(expiry_date);

-- Enable RLS on documents table
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for documents
CREATE POLICY "Allow all access to documents" ON documents FOR ALL USING (true);

-- Insert sample data from the existing data structure
INSERT INTO documents (
    id, name, type, provider, provider_id, provider_type,
    employee_id, employee_name, issued_date, expiry_date,
    status, last_checked, next_check_due, check_frequency,
    file_url, is_required, is_secure_check_required, is_basic_check_required,
    is_per_employee, is_client_specific, secure_check_frequency, secure_check_requirement,
    basic_check_frequency, basic_check_requirement, issuance_type
) VALUES
-- Personaldienstleister GmbH documents
('doc-1', 'Erlaubnis Arbeitnehmerüberlassung', 'doc-type-1', 'Personaldienstleister GmbH', 'provider-1', 'personaldienstleister', 
 NULL, NULL, '2024-01-15', '2026-01-14', 'valid', '2025-04-15', '2026-01-14', 'jährlich',
 '/documents/doc-1.pdf', true, true, true, false, false, 'bei Ablauf (jährlich)', 
 'Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt', 'bei Ablauf (jährlich)', 
 'Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt', 'pro Unternehmen'),

('doc-2', 'A1-Bescheinigung', 'doc-type-2', 'Personaldienstleister GmbH', 'provider-1', 'personaldienstleister',
 'employee-1', 'Max Mustermann', '2024-11-01', '2025-05-30', 'expiring', '2025-04-15', '2025-05-30', 'dauerhaft',
 '/documents/doc-2.pdf', true, true, true, true, false, 'dauerhaft', 
 'Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt', 'dauerhaft', 
 'Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt', 'pro Mitarbeiter'),

('doc-3', 'Unbedenklichkeitsbescheinigung Finanzamt', 'doc-type-4', 'Personaldienstleister GmbH', 'provider-1', 'personaldienstleister',
 NULL, NULL, '2025-02-10', '2025-05-10', 'expiring', '2025-04-01', '2025-05-01', 'monatlich',
 '/documents/doc-3.pdf', true, true, true, false, false, 'monatlich', 'Verpflichtend', 
 'quartalsweise', 'Verpflichtend', 'pro Unternehmen'),

-- Nowak Construction Group documents
('doc-5', 'Betriebshaftpflichtversicherung', 'doc-type-5', 'Nowak Construction Group', 'provider-3', 'nachunternehmer',
 NULL, NULL, '2024-09-01', '2025-08-31', 'valid', '2025-01-10', '2025-08-31', 'jährlich',
 '/documents/doc-5.pdf', true, true, false, false, false, 'bei Ablauf (jährlich)', 'Verpflichtend',
 'bei Ablauf (jährlich)', 'Verpflichtend', 'pro Unternehmen'),

('doc-6', 'Unbedenklichkeitsbescheinigung Finanzamt', 'doc-type-6', 'Nowak Construction Group', 'provider-3', 'nachunternehmer',
 NULL, NULL, '2025-01-05', '2025-04-05', 'expired', '2025-04-01', '2025-04-05', 'monatlich',
 '/documents/doc-6.pdf', true, true, true, false, false, 'monatlich', 'Verpflichtend',
 'quartalsweise', 'Verpflichtend', 'pro Unternehmen'),

('doc-101', 'A1-Bescheinigung', 'doc-type-11', 'Nowak Construction Group', 'provider-3', 'nachunternehmer',
 'employee-5', 'Frank Müller', '2025-02-10', '2025-08-10', 'valid', '2025-04-15', '2025-08-10', 
 'dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)', '/documents/doc-101.pdf', true, true, true, true, false,
 'dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)', 'Verpflichtend',
 'dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)', 'Verpflichtend', 'pro Mitarbeiter'),

('doc-201', 'A1-Bescheinigung', 'doc-type-11', 'Nowak Construction Group', 'provider-3', 'nachunternehmer',
 'employee-15', 'Jan Kowalski', '2024-06-16', '2025-06-16', 'expired', '2025-06-17', '2025-06-17',
 'dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)', '/documents/doc-201.pdf', true, true, true, true, false,
 'dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)', 'Verpflichtend',
 'dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)', 'Verpflichtend', 'pro Mitarbeiter'),

-- Elektro Schaltbau GmbH documents
('doc-8', 'Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen', 'doc-type-3', 'Elektro Schaltbau GmbH', 'provider-4', 'nachunternehmer',
 NULL, NULL, '2025-03-01', '2026-03-01', 'valid', '2025-03-15', '2026-03-01', 'jährlich',
 '/documents/doc-8.pdf', true, true, false, false, false, 'jährlich', 'Verpflichtend',
 'jährlich', 'Optional', 'pro Unternehmen'),

-- Metallbau Schmidt GmbH documents  
('doc-104', 'Unbedenklichkeitsbescheinigung Finanzamt', 'doc-type-18', 'Metallbau Schmidt GmbH', 'provider-6', 'nachunternehmer',
 NULL, NULL, '2025-04-10', '2025-05-10', 'expiring', '2025-04-11', '2025-05-10', 'monatlich',
 '/documents/doc-104.pdf', true, true, true, false, false, 'monatlich', 'Verpflichtend',
 'quartalsweise', 'Verpflichtend', 'pro Unternehmen'),

('doc-105', 'Betriebshaftpflichtversicherung', 'doc-type-20', 'Metallbau Schmidt GmbH', 'provider-6', 'nachunternehmer',
 NULL, NULL, '2024-08-15', '2025-08-14', 'valid', '2025-04-11', '2025-08-14', 'bei Ablauf (jährlich)',
 '/documents/doc-105.pdf', true, true, true, false, false, 'bei Ablauf (jährlich)', 'Verpflichtend',
 'bei Ablauf (jährlich)', 'Verpflichtend', 'pro Unternehmen'),

-- Dachdeckerei Müller & Söhne documents
('doc-106', 'Handelsregisterauszug', 'doc-type-19', 'Dachdeckerei Müller & Söhne', 'provider-7', 'nachunternehmer',
 NULL, NULL, '2024-01-20', NULL, 'valid', '2025-04-15', NULL, 'einmalig',
 '/documents/doc-106.pdf', true, true, false, false, false, 'einmalig', 'Verpflichtend',
 'einmalig', 'Optional', 'pro Unternehmen'),

('doc-107', 'A1-Bescheinigung', 'doc-type-11', 'Dachdeckerei Müller & Söhne', 'provider-7', 'nachunternehmer',
 'employee-11', 'Martin Weber', '2025-03-01', '2025-09-01', 'valid', '2025-04-15', '2025-09-01',
 'dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)', '/documents/doc-107.pdf', true, true, true, true, false,
 'dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)', 'Verpflichtend',
 'dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)', 'Verpflichtend', 'pro Mitarbeiter');

-- Update the trigger to work with the new documents table structure
CREATE OR REPLACE FUNCTION update_provider_document_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the provider's document counts when documents change
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

-- Recreate the trigger for document count updates
DROP TRIGGER IF EXISTS trigger_update_provider_document_counts ON documents;
CREATE TRIGGER trigger_update_provider_document_counts
  AFTER INSERT OR UPDATE OR DELETE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_provider_document_counts();

-- Update provider document counts based on the new documents data
UPDATE providers 
SET 
  documents_count_total = (
    SELECT COUNT(*) FROM documents WHERE provider_id = providers.id
  ),
  documents_count_valid = (
    SELECT COUNT(*) FROM documents WHERE provider_id = providers.id AND status = 'valid'
  ),
  documents_count_expiring = (
    SELECT COUNT(*) FROM documents WHERE provider_id = providers.id AND status = 'expiring'
  ),
  documents_count_expired = (
    SELECT COUNT(*) FROM documents WHERE provider_id = providers.id AND status = 'expired'
  ),
  documents_count_missing = (
    SELECT COUNT(*) FROM documents WHERE provider_id = providers.id AND status = 'missing'
  );
