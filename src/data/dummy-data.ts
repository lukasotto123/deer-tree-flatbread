
import { Document, Provider, Employee, DocumentType } from "@/types";

export const documentTypes: DocumentType[] = [
  {
    id: "doc-type-1",
    name: "Erlaubnis Arbeitnehmerüberlassung",
    description: "Erlaubnis zur Arbeitnehmerüberlassung gemäß AÜG",
    providerType: "personaldienstleister",
    isPerEmployee: false,
    checkFrequency: {
      secure: "jährlich",
      basic: "jährlich"
    },
    requiredFor: {
      secure: "Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt",
      basic: "Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt"
    }
  },
  {
    id: "doc-type-2",
    name: "A1-Bescheinigung für ausländische Auftragnehmer",
    description: "Nachweis der Sozialversicherung im Heimatland",
    providerType: "personaldienstleister",
    isPerEmployee: true,
    checkFrequency: {
      secure: "dauerhaft",
      basic: "dauerhaft"
    },
    requiredFor: {
      secure: "Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt",
      basic: "Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt"
    }
  },
  {
    id: "doc-type-3",
    name: "Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen",
    description: "Nachweis über die Einhaltung der Mindestlohngesetze",
    providerType: "personaldienstleister",
    isPerEmployee: false,
    checkFrequency: {
      secure: "jährlich",
      basic: "jährlich"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Optional"
    }
  },
  {
    id: "doc-type-4",
    name: "Unbedenklichkeitsbescheinigung Finanzamt",
    description: "Bescheinigung des Finanzamts über keine Steuerrückstände",
    providerType: "personaldienstleister",
    isPerEmployee: false,
    checkFrequency: {
      secure: "monatlich",
      basic: "quartalsweise"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  },
  {
    id: "doc-type-5",
    name: "Betriebshaftpflichtversicherung",
    description: "Nachweis über eine gültige Betriebshaftpflichtversicherung",
    providerType: "subunternehmer",
    isPerEmployee: false,
    checkFrequency: {
      secure: "jährlich",
      basic: "jährlich"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Optional"
    }
  },
  {
    id: "doc-type-6",
    name: "Unbedenklichkeitsbescheinigung Finanzamt",
    description: "Bescheinigung des Finanzamts über keine Steuerrückstände",
    providerType: "subunternehmer",
    isPerEmployee: false,
    checkFrequency: {
      secure: "monatlich",
      basic: "quartalsweise"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  },
  {
    id: "doc-type-7",
    name: "Kopie der Pässe",
    description: "Ausweiskopien der Mitarbeiter",
    providerType: "subunternehmer",
    isPerEmployee: true,
    checkFrequency: {
      secure: "bei Ablauf",
      basic: "bei Ablauf"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  }
];

export const providers: Provider[] = [
  {
    id: "provider-1",
    name: "Personaldienstleister GmbH",
    type: "personaldienstleister",
    contactEmail: "kontakt@personaldienstleister.de",
    contactPhone: "+49 123 456789",
    address: "Musterstraße 1, 10115 Berlin",
    status: "active",
    documentsCount: {
      total: 12,
      valid: 8,
      expiring: 2,
      expired: 1,
      missing: 1
    },
    lastUpdated: "2025-04-28"
  },
  {
    id: "provider-2",
    name: "Zeitarbeit Express AG",
    type: "personaldienstleister",
    contactEmail: "info@zeitarbeit-express.de",
    contactPhone: "+49 234 567890",
    address: "Hauptstraße 25, 60306 Frankfurt",
    status: "active",
    documentsCount: {
      total: 10,
      valid: 7,
      expiring: 1,
      expired: 0,
      missing: 2
    },
    lastUpdated: "2025-05-01"
  },
  {
    id: "provider-3",
    name: "Bau Meister & Co. KG",
    type: "subunternehmer",
    contactEmail: "kontakt@baumeister.de",
    contactPhone: "+49 345 678901",
    address: "Bauweg 12, 70173 Stuttgart",
    status: "active",
    documentsCount: {
      total: 15,
      valid: 10,
      expiring: 3,
      expired: 1,
      missing: 1
    },
    lastUpdated: "2025-04-15"
  },
  {
    id: "provider-4",
    name: "Elektro Schaltbau GmbH",
    type: "subunternehmer",
    contactEmail: "info@elektro-schaltbau.de",
    contactPhone: "+49 456 789012",
    address: "Stromgasse 7, 80333 München",
    status: "pending",
    documentsCount: {
      total: 8,
      valid: 3,
      expiring: 0,
      expired: 0,
      missing: 5
    },
    lastUpdated: "2025-05-03"
  },
  {
    id: "provider-5",
    name: "Gebäudereinigung Sauber UG",
    type: "subunternehmer",
    contactEmail: "kontakt@gebaeudereinigung-sauber.de",
    contactPhone: "+49 567 890123",
    address: "Putzstraße 19, 40221 Düsseldorf",
    status: "inactive",
    documentsCount: {
      total: 7,
      valid: 0,
      expiring: 0,
      expired: 7,
      missing: 0
    },
    lastUpdated: "2025-03-12"
  }
];

export const employees: Employee[] = [
  {
    id: "employee-1",
    providerId: "provider-1",
    name: "Max Mustermann",
    position: "Facharbeiter",
    documentsRequired: ["doc-type-2", "doc-type-7"]
  },
  {
    id: "employee-2",
    providerId: "provider-1",
    name: "Laura Schmidt",
    position: "Hilfskraft",
    documentsRequired: ["doc-type-2", "doc-type-7"]
  },
  {
    id: "employee-3",
    providerId: "provider-3",
    name: "Peter Zimmermann",
    position: "Vorarbeiter",
    documentsRequired: ["doc-type-7"]
  }
];

export const documents: Document[] = [
  {
    id: "doc-1",
    name: "Erlaubnis Arbeitnehmerüberlassung",
    provider: "Personaldienstleister GmbH",
    providerId: "provider-1",
    providerType: "personaldienstleister",
    type: "doc-type-1",
    issuedDate: "2024-01-15",
    expiryDate: "2026-01-14",
    status: "valid",
    lastChecked: "2025-04-15",
    nextCheckDue: "2026-01-14",
    checkFrequency: "jährlich",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: false,
    fileUrl: "/documents/doc-1.pdf"
  },
  {
    id: "doc-2",
    name: "A1-Bescheinigung",
    provider: "Personaldienstleister GmbH",
    providerId: "provider-1",
    providerType: "personaldienstleister",
    type: "doc-type-2",
    issuedDate: "2024-11-01",
    expiryDate: "2025-05-30",
    status: "expiring",
    lastChecked: "2025-04-15",
    nextCheckDue: "2025-05-30",
    checkFrequency: "dauerhaft",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: true,
    employeeId: "employee-1",
    employeeName: "Max Mustermann",
    fileUrl: "/documents/doc-2.pdf"
  },
  {
    id: "doc-3",
    name: "Unbedenklichkeitsbescheinigung Finanzamt",
    provider: "Personaldienstleister GmbH",
    providerId: "provider-1",
    providerType: "personaldienstleister",
    type: "doc-type-4",
    issuedDate: "2025-02-10",
    expiryDate: "2025-05-10",
    status: "expiring",
    lastChecked: "2025-04-01",
    nextCheckDue: "2025-05-01",
    checkFrequency: "monatlich",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: false,
    fileUrl: "/documents/doc-3.pdf"
  },
  {
    id: "doc-4",
    name: "Kopie der Pässe",
    provider: "Personaldienstleister GmbH",
    providerId: "provider-1",
    providerType: "personaldienstleister",
    type: "doc-type-7",
    issuedDate: "2022-03-15",
    expiryDate: "2032-03-14",
    status: "valid",
    lastChecked: "2025-01-15",
    nextCheckDue: "2032-03-14",
    checkFrequency: "bei Ablauf",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: true,
    employeeId: "employee-1",
    employeeName: "Max Mustermann",
    fileUrl: "/documents/doc-4.pdf"
  },
  {
    id: "doc-5",
    name: "Betriebshaftpflichtversicherung",
    provider: "Bau Meister & Co. KG",
    providerId: "provider-3",
    providerType: "subunternehmer",
    type: "doc-type-5",
    issuedDate: "2024-09-01",
    expiryDate: "2025-08-31",
    status: "valid",
    lastChecked: "2025-01-10",
    nextCheckDue: "2025-08-31",
    checkFrequency: "jährlich",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: false,
    isPerEmployee: false,
    fileUrl: "/documents/doc-5.pdf"
  },
  {
    id: "doc-6",
    name: "Unbedenklichkeitsbescheinigung Finanzamt",
    provider: "Bau Meister & Co. KG",
    providerId: "provider-3",
    providerType: "subunternehmer",
    type: "doc-type-6",
    issuedDate: "2025-01-05",
    expiryDate: "2025-04-05",
    status: "expired",
    lastChecked: "2025-04-01",
    nextCheckDue: "2025-04-05",
    checkFrequency: "monatlich",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: false,
    fileUrl: "/documents/doc-6.pdf"
  },
  {
    id: "doc-7",
    name: "Kopie der Pässe",
    provider: "Bau Meister & Co. KG",
    providerId: "provider-3",
    providerType: "subunternehmer",
    type: "doc-type-7",
    issuedDate: "2020-08-15",
    expiryDate: "2030-08-14",
    status: "valid",
    lastChecked: "2024-12-01",
    nextCheckDue: "2030-08-14",
    checkFrequency: "bei Ablauf",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: true,
    employeeId: "employee-3",
    employeeName: "Peter Zimmermann",
    fileUrl: "/documents/doc-7.pdf"
  },
  {
    id: "doc-8",
    name: "Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen",
    provider: "Elektro Schaltbau GmbH",
    providerId: "provider-4",
    providerType: "subunternehmer",
    type: "doc-type-3",
    issuedDate: "2025-03-01",
    expiryDate: "2026-03-01",
    status: "valid",
    lastChecked: "2025-03-15",
    nextCheckDue: "2026-03-01",
    checkFrequency: "jährlich",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: false,
    isPerEmployee: false,
    fileUrl: "/documents/doc-8.pdf"
  }
];
