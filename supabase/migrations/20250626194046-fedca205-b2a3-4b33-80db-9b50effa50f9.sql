
-- Enable Row Level Security on all tables that don't have it yet
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_validations ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_assignments ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies for public access (since this is an internal management app)
-- In production, you would want more restrictive policies based on user roles

-- Providers policies
CREATE POLICY "Allow all access to providers" ON providers FOR ALL USING (true);

-- Employees policies  
CREATE POLICY "Allow all access to employees" ON employees FOR ALL USING (true);

-- Documents policies
CREATE POLICY "Allow all access to documents" ON documents FOR ALL USING (true);

-- Document types policies
CREATE POLICY "Allow all access to document_types" ON document_types FOR ALL USING (true);

-- Document reminders policies
CREATE POLICY "Allow all access to document_reminders" ON document_reminders FOR ALL USING (true);

-- Document history policies
CREATE POLICY "Allow all access to document_history" ON document_history FOR ALL USING (true);

-- Document validations policies
CREATE POLICY "Allow all access to document_validations" ON document_validations FOR ALL USING (true);

-- Company assignments policies
CREATE POLICY "Allow all access to company_assignments" ON company_assignments FOR ALL USING (true);

-- Update the triggers to ensure document counts are automatically updated
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

-- Create trigger for document count updates
DROP TRIGGER IF EXISTS trigger_update_provider_document_counts ON documents;
CREATE TRIGGER trigger_update_provider_document_counts
  AFTER INSERT OR UPDATE OR DELETE ON documents
  FOR EACH ROW EXECUTE FUNCTION update_provider_document_counts();
