
// Document history data for tracking document changes over time
export interface DocumentHistoryEntry {
  documentId: string;
  date: string;
  action: string;
  status: 'valid' | 'expiring' | 'expired' | 'missing' | null;
  user: string;
  comment: string;
}

export const documentHistory: DocumentHistoryEntry[] = [
  {
    documentId: "doc-1",
    date: "2023-02-15T10:30:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Ingrid Müller",
    comment: "Originaldokument hochgeladen"
  },
  {
    documentId: "doc-1",
    date: "2023-08-20T14:15:00",
    action: "Status geändert",
    status: "expiring",
    user: "System",
    comment: "Dokument läuft in 30 Tagen ab"
  },
  {
    documentId: "doc-1",
    date: "2023-09-25T09:45:00",
    action: "Status geändert",
    status: "expired",
    user: "System",
    comment: "Dokument ist abgelaufen"
  },
  {
    documentId: "doc-1",
    date: "2023-10-05T11:20:00",
    action: "Erinnerung gesendet",
    status: null,
    user: "System",
    comment: "Erinnerung an Ablauf gesendet"
  },
  {
    documentId: "doc-1",
    date: "2023-10-10T15:30:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Markus Weber",
    comment: "Erneuerte Version hochgeladen"
  },
  {
    documentId: "doc-2",
    date: "2023-05-12T08:45:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Hans Fischer",
    comment: "Initiales Dokument hochgeladen"
  },
  {
    documentId: "doc-2",
    date: "2024-02-01T13:10:00",
    action: "Überprüfung durchgeführt",
    status: "valid",
    user: "Julia König",
    comment: "Regelmäßige Überprüfung ohne Befund"
  },
  {
    documentId: "doc-3",
    date: "2022-11-30T09:15:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Sandra Bauer",
    comment: "Werksvertrag unterschrieben hochgeladen"
  },
  {
    documentId: "doc-3",
    date: "2023-11-15T16:20:00",
    action: "Status geändert",
    status: "expiring",
    user: "System",
    comment: "Dokument läuft in 30 Tagen ab"
  },
  {
    documentId: "doc-3",
    date: "2023-12-10T10:05:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Thomas Schneider",
    comment: "Erneuerte Version mit verlängerter Laufzeit"
  },
  // Additional history entries for common document types
  {
    documentId: "doc-4",
    date: "2023-03-05T11:30:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Martin Hoffmann",
    comment: "Unbedenklichkeitsbescheinigung Krankenkasse"
  },
  {
    documentId: "doc-4",
    date: "2024-02-10T14:45:00",
    action: "Status geändert",
    status: "expiring",
    user: "System",
    comment: "Dokument läuft in 30 Tagen ab"
  },
  {
    documentId: "doc-5",
    date: "2023-06-22T13:00:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Claudia Richter",
    comment: "Nachweis der Sozialversicherungsanmeldung"
  },
  // History for employee documents
  {
    documentId: "doc-8",
    date: "2023-04-18T10:15:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Rebecca Wagner",
    comment: "Personalausweis eingescannt"
  },
  {
    documentId: "doc-9",
    date: "2023-07-14T09:30:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Daniel Schmidt",
    comment: "Arbeitserlaubnis bestätigt"
  },
  {
    documentId: "doc-9",
    date: "2024-01-20T15:10:00",
    action: "Status geändert",
    status: "expiring",
    user: "System",
    comment: "Dokument läuft in 30 Tagen ab"
  },
  {
    documentId: "doc-10",
    date: "2023-09-05T11:45:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Lisa Meyer",
    comment: "Qualifikationsnachweis"
  },
  // Add histories for all documents in the dummy-data.ts file
  {
    documentId: "doc-101",
    date: "2025-02-10T09:30:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Frank Müller",
    comment: "A1-Bescheinigung hochgeladen"
  },
  {
    documentId: "doc-102",
    date: "2023-05-20T11:45:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Frank Müller",
    comment: "Reisepass hochgeladen"
  },
  {
    documentId: "doc-103",
    date: "2024-03-01T14:20:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Anna Wagner",
    comment: "Aufenthaltserlaubnis hochgeladen"
  },
  {
    documentId: "doc-104",
    date: "2025-04-10T10:15:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Finanzabteilung",
    comment: "Aktuelle Unbedenklichkeitsbescheinigung"
  },
  {
    documentId: "doc-104",
    date: "2025-04-11T16:30:00",
    action: "Status geändert",
    status: "expiring",
    user: "System",
    comment: "Dokument läuft in 30 Tagen ab"
  },
  {
    documentId: "doc-105",
    date: "2024-08-15T09:45:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Versicherungsabteilung",
    comment: "Jährliche Betriebshaftpflichtversicherung"
  },
  {
    documentId: "doc-106",
    date: "2024-01-20T13:20:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Rechtsabteilung",
    comment: "Aktueller Handelsregisterauszug"
  },
  {
    documentId: "doc-107",
    date: "2025-03-01T11:10:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Martin Weber",
    comment: "A1-Bescheinigung für Auslandseinsatz"
  },
  // Document histories for dummy documents 6-7
  {
    documentId: "doc-6",
    date: "2025-01-05T09:30:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Finanzabteilung",
    comment: "Unbedenklichkeitsbescheinigung Finanzamt"
  },
  {
    documentId: "doc-6",
    date: "2025-04-01T11:45:00",
    action: "Status geändert",
    status: "expired",
    user: "System",
    comment: "Dokument ist abgelaufen"
  },
  {
    documentId: "doc-7",
    date: "2020-08-15T14:20:00",
    action: "Dokument hochgeladen",
    status: "valid",
    user: "Peter Zimmermann",
    comment: "Reisepass hochgeladen"
  }
];
