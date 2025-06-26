
-- Erweitere die document_reminders Tabelle um zusätzliche Felder für bessere Nachverfolgung
ALTER TABLE document_reminders 
ADD COLUMN IF NOT EXISTS reminder_reason text,
ADD COLUMN IF NOT EXISTS auto_generated boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS document_status text,
ADD COLUMN IF NOT EXISTS days_until_expiry integer;

-- Erstelle eine Funktion, die automatisch Erinnerungen für ablaufende/abgelaufene Dokumente erstellt
CREATE OR REPLACE FUNCTION auto_create_document_reminders()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    doc_record RECORD;
    days_diff integer;
    reminder_reason_text text;
BEGIN
    -- Iteriere durch alle Dokumente die expired oder expiring sind
    FOR doc_record IN 
        SELECT 
            d.id as document_id,
            d.provider_id,
            d.employee_id,
            d.name as document_name,
            d.status,
            d.expiry_date,
            p.name as provider_name,
            p.contact_email,
            e.name as employee_name
        FROM documents d
        LEFT JOIN providers p ON d.provider_id = p.id
        LEFT JOIN employees e ON d.employee_id = e.id
        WHERE d.status IN ('expired', 'expiring')
    LOOP
        -- Berechne Tage bis zum Ablauf
        IF doc_record.expiry_date IS NOT NULL THEN
            days_diff := doc_record.expiry_date - CURRENT_DATE;
        ELSE
            days_diff := -999; -- Fallback für Dokumente ohne Ablaufdatum
        END IF;
        
        -- Bestimme den Grund für die Erinnerung
        IF doc_record.status = 'expired' THEN
            reminder_reason_text := 'Dokument ist bereits abgelaufen';
        ELSE
            reminder_reason_text := 'Dokument läuft in den nächsten 30 Tagen ab';
        END IF;
        
        -- Prüfe, ob bereits eine Erinnerung für dieses Dokument existiert
        IF NOT EXISTS (
            SELECT 1 FROM document_reminders 
            WHERE document_id = doc_record.document_id::text 
            AND sent_at > CURRENT_DATE - INTERVAL '7 days'
        ) THEN
            -- Erstelle neue Erinnerung
            INSERT INTO document_reminders (
                provider_id,
                employee_id,
                document_id,
                reminder_type,
                reminder_reason,
                auto_generated,
                document_status,
                days_until_expiry,
                next_reminder_due
            ) VALUES (
                doc_record.provider_id,
                doc_record.employee_id,
                doc_record.document_id::text,
                CASE 
                    WHEN doc_record.status = 'expired' THEN 'urgent'
                    ELSE 'standard'
                END,
                reminder_reason_text,
                true,
                doc_record.status,
                days_diff,
                CASE 
                    WHEN doc_record.status = 'expired' THEN CURRENT_DATE + INTERVAL '3 days'
                    ELSE CURRENT_DATE + INTERVAL '7 days'
                END
            );
        END IF;
    END LOOP;
END;
$$;

-- Erstelle einen Trigger, der die Funktion aufruft, wenn sich der Status eines Dokuments ändert
CREATE OR REPLACE FUNCTION trigger_auto_create_reminders()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    -- Nur ausführen, wenn sich der Status zu expired oder expiring geändert hat
    IF (NEW.status IN ('expired', 'expiring') AND (OLD.status != NEW.status OR OLD.status IS NULL)) THEN
        PERFORM auto_create_document_reminders();
    END IF;
    RETURN NEW;
END;
$$;

-- Erstelle den Trigger
DROP TRIGGER IF EXISTS documents_status_change_trigger ON documents;
CREATE TRIGGER documents_status_change_trigger
    AFTER UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION trigger_auto_create_reminders();

-- Erstelle eine View für bessere Übersicht der Dokumentenstatus pro Provider
CREATE OR REPLACE VIEW provider_document_summary AS
SELECT 
    p.id as provider_id,
    p.name as provider_name,
    p.type as provider_type,
    COUNT(d.id) as total_documents,
    COUNT(CASE WHEN d.status = 'valid' THEN 1 END) as valid_documents,
    COUNT(CASE WHEN d.status = 'expiring' THEN 1 END) as expiring_documents,
    COUNT(CASE WHEN d.status = 'expired' THEN 1 END) as expired_documents,
    COUNT(CASE WHEN d.status = 'missing' THEN 1 END) as missing_documents,
    COUNT(CASE WHEN dr.id IS NOT NULL THEN 1 END) as reminders_sent
FROM providers p
LEFT JOIN documents d ON p.id = d.provider_id
LEFT JOIN document_reminders dr ON d.id = dr.document_id::text
GROUP BY p.id, p.name, p.type;
