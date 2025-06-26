
-- Add missing columns to employees table for personal information
ALTER TABLE public.employees 
ADD COLUMN IF NOT EXISTS citizenship text DEFAULT 'Deutschland',
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS employment_start_date date,
ADD COLUMN IF NOT EXISTS employment_end_date date,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'active';

-- Create document reminders table to track reminder notifications
CREATE TABLE IF NOT EXISTS public.document_reminders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id text REFERENCES public.documents(id) ON DELETE CASCADE,
  employee_id text REFERENCES public.employees(id) ON DELETE CASCADE,
  provider_id text REFERENCES public.providers(id) ON DELETE CASCADE,
  reminder_type text NOT NULL, -- 'missing', 'expiring', 'expired'
  sent_at timestamp with time zone NOT NULL DEFAULT now(),
  next_reminder_due timestamp with time zone,
  email_sent boolean DEFAULT false,
  sms_sent boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create document history table for audit trail
CREATE TABLE IF NOT EXISTS public.document_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id text REFERENCES public.documents(id) ON DELETE CASCADE,
  employee_id text,
  provider_id text REFERENCES public.providers(id) ON DELETE CASCADE,
  action text NOT NULL, -- 'uploaded', 'reviewed', 'approved', 'rejected', 'expired', 'reminder_sent'
  details jsonb,
  performed_by text, -- user who performed the action
  performed_at timestamp with time zone NOT NULL DEFAULT now(),
  old_status text,
  new_status text
);

-- Create company assignments table for employee-company relationships
CREATE TABLE IF NOT EXISTS public.company_assignments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id text REFERENCES public.employees(id) ON DELETE CASCADE,
  provider_id text REFERENCES public.providers(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  assignment_start_date date,
  assignment_end_date date,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create document validation results table for AI checks
CREATE TABLE IF NOT EXISTS public.document_validations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id text REFERENCES public.documents(id) ON DELETE CASCADE,
  validation_type text NOT NULL, -- 'ai_authenticity', 'ai_content', 'manual_review'
  result text NOT NULL, -- 'valid', 'suspicious', 'invalid', 'pending'
  confidence_score decimal(3,2), -- 0.00 to 1.00
  validation_details jsonb,
  validated_by text, -- 'ai_system' or user id
  validated_at timestamp with time zone NOT NULL DEFAULT now(),
  notes text
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_document_reminders_document_id ON public.document_reminders(document_id);
CREATE INDEX IF NOT EXISTS idx_document_reminders_employee_id ON public.document_reminders(employee_id);
CREATE INDEX IF NOT EXISTS idx_document_reminders_provider_id ON public.document_reminders(provider_id);
CREATE INDEX IF NOT EXISTS idx_document_reminders_next_due ON public.document_reminders(next_reminder_due);

CREATE INDEX IF NOT EXISTS idx_document_history_document_id ON public.document_history(document_id);
CREATE INDEX IF NOT EXISTS idx_document_history_provider_id ON public.document_history(provider_id);
CREATE INDEX IF NOT EXISTS idx_document_history_performed_at ON public.document_history(performed_at);

CREATE INDEX IF NOT EXISTS idx_company_assignments_employee_id ON public.company_assignments(employee_id);
CREATE INDEX IF NOT EXISTS idx_company_assignments_provider_id ON public.company_assignments(provider_id);
CREATE INDEX IF NOT EXISTS idx_company_assignments_active ON public.company_assignments(is_active);

CREATE INDEX IF NOT EXISTS idx_document_validations_document_id ON public.document_validations(document_id);
CREATE INDEX IF NOT EXISTS idx_document_validations_result ON public.document_validations(result);

-- Enable RLS on new tables
ALTER TABLE public.document_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_validations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allowing all access for now - adjust based on your auth requirements)
CREATE POLICY "Allow all operations on document_reminders" ON public.document_reminders FOR ALL USING (true);
CREATE POLICY "Allow all operations on document_history" ON public.document_history FOR ALL USING (true);
CREATE POLICY "Allow all operations on company_assignments" ON public.company_assignments FOR ALL USING (true);
CREATE POLICY "Allow all operations on document_validations" ON public.document_validations FOR ALL USING (true);

-- Insert sample data for employees (updating existing employees with citizenship info)
UPDATE public.employees 
SET citizenship = CASE 
  WHEN name = 'Jan Kowalski' THEN 'Polen'
  WHEN name = 'Pierre Dubois' THEN 'Frankreich'
  WHEN name = 'Isabella Romano' THEN 'Italien'
  WHEN name = 'Miguel González' THEN 'Spanien'
  ELSE 'Deutschland'
END,
email = CASE 
  WHEN name = 'Jan Kowalski' THEN 'jan.kowalski@nowak-construction.de'
  WHEN name = 'Pierre Dubois' THEN 'pierre.dubois@nowak-construction.de'
  WHEN name = 'Isabella Romano' THEN 'isabella.romano@nowak-construction.de'
  WHEN name = 'Miguel González' THEN 'miguel.gonzalez@nowak-construction.de'
  WHEN name = 'Hans Schmidt' THEN 'hans.schmidt@personaldienstleister.de'
  WHEN name = 'Maria Wagner' THEN 'maria.wagner@personaldienstleister.de'
  ELSE LOWER(REPLACE(name, ' ', '.')) || '@example.com'
END,
employment_start_date = CASE 
  WHEN name = 'Jan Kowalski' THEN '2023-01-15'::date
  ELSE CURRENT_DATE - INTERVAL '1 year'
END
WHERE id IN (
  SELECT id FROM public.employees 
  WHERE citizenship IS NULL OR citizenship = 'Deutschland'
);

-- Insert sample document reminders
INSERT INTO public.document_reminders (document_id, employee_id, provider_id, reminder_type, sent_at, next_reminder_due)
SELECT 
  d.id,
  d.employee_id,
  d.provider_id,
  CASE 
    WHEN d.status = 'missing' THEN 'missing'
    WHEN d.status = 'expired' THEN 'expired'
    WHEN d.status = 'expiring' THEN 'expiring'
    ELSE 'missing'
  END,
  NOW() - INTERVAL '1 week',
  NOW() + INTERVAL '1 week'
FROM public.documents d
WHERE d.status IN ('missing', 'expired', 'expiring')
AND NOT EXISTS (
  SELECT 1 FROM public.document_reminders dr 
  WHERE dr.document_id = d.id
);

-- Insert sample document history
INSERT INTO public.document_history (document_id, provider_id, action, details, performed_by, performed_at, new_status)
SELECT 
  id,
  provider_id,
  'status_update',
  jsonb_build_object('status', status, 'automated', true),
  'system',
  created_at,
  status
FROM public.documents
WHERE NOT EXISTS (
  SELECT 1 FROM public.document_history dh 
  WHERE dh.document_id = documents.id
);

-- Insert sample company assignments
INSERT INTO public.company_assignments (employee_id, provider_id, company_name, assignment_start_date, is_active)
SELECT 
  e.id,
  e.provider_id,
  CASE 
    WHEN p.name = 'Nowak Construction Group' THEN 'Bauprojekt Hauptbahnhof'
    WHEN p.name = 'Elektro Schaltbau GmbH' THEN 'Elektroinstallation Bürocomplex'
    WHEN p.name = 'Metallbau Schmidt GmbH' THEN 'Stahlkonstruktion Industriehalle'
    ELSE 'Allgemeine Projekte'
  END,
  CURRENT_DATE - INTERVAL '6 months',
  true
FROM public.employees e
JOIN public.providers p ON e.provider_id = p.id
WHERE NOT EXISTS (
  SELECT 1 FROM public.company_assignments ca 
  WHERE ca.employee_id = e.id
);

-- Insert sample document validations
INSERT INTO public.document_validations (document_id, validation_type, result, confidence_score, validated_by, validated_at)
SELECT 
  id,
  'ai_authenticity',
  CASE 
    WHEN RANDOM() < 0.1 THEN 'suspicious'
    WHEN RANDOM() < 0.05 THEN 'invalid'
    ELSE 'valid'
  END,
  0.70 + (RANDOM() * 0.30), -- confidence between 0.70 and 1.00
  'ai_system',
  created_at + INTERVAL '1 hour'
FROM public.documents
WHERE status != 'missing'
AND NOT EXISTS (
  SELECT 1 FROM public.document_validations dv 
  WHERE dv.document_id = documents.id
);
