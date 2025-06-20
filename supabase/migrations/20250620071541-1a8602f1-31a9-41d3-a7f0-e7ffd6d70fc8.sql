
-- Update Nowak Construction Group provider data
UPDATE providers 
SET 
  name = 'Nowak Construction Group',
  documents_count_expired = 1,
  documents_count_valid = 14,
  documents_count_expiring = 0,
  documents_count_missing = 0,
  documents_count_total = 15,
  status = 'active'
WHERE id = 'provider-3';

-- Update company documents for Nowak Construction Group to be valid
UPDATE documents 
SET status = 'valid'
WHERE provider_id = 'provider-3' AND employee_id IS NULL;

-- Update Jan Kowalski's A1 certificate to be expired
UPDATE documents 
SET 
  status = 'expired',
  expiry_date = '2024-04-20'
WHERE provider_id = 'provider-3' 
AND employee_name = 'Jan Kowalski' 
AND name LIKE '%A1%';

-- Ensure Jan Kowalski exists in employees table
INSERT INTO employees (id, provider_id, name, position)
VALUES ('employee-15', 'provider-3', 'Jan Kowalski', 'Maurer')
ON CONFLICT (id) DO UPDATE SET
  name = 'Jan Kowalski',
  position = 'Maurer';

-- Add expired A1 certificate for Jan Kowalski if it doesn't exist
INSERT INTO documents (
  id, name, type, provider, provider_id, provider_type, status, 
  issued_date, expiry_date, employee_id, employee_name
)
VALUES (
  'doc-a1-jan-kowalski', 'A1-Bescheinigung', 'doc-type-11', 
  'Nowak Construction Group', 'provider-3', 'nachunternehmer', 'expired',
  '2023-04-20', '2024-04-20', 'employee-15', 'Jan Kowalski'
)
ON CONFLICT (id) DO UPDATE SET
  status = 'expired',
  expiry_date = '2024-04-20',
  employee_name = 'Jan Kowalski';
