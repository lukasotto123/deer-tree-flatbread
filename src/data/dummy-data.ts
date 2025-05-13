import { Document, Provider, Employee, DocumentType } from "@/types";

export const documentTypes: DocumentType[] = [
  {
    id: "doc-type-1",
    name: "Werkverträge",
    description: "Werkverträge zwischen Unternehmen",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: true,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "dauerhaft",
      basic: "dauerhaft"
    },
    requiredFor: {
      secure: "Verpflichtend, wenn vorhanden",
      basic: "Verpflichtend, wenn vorhanden"
    }
  },
  {
    id: "doc-type-2",
    name: "Meldung an die Generalzolldirektion nach § 18 AEntG",
    description: "Meldung an die Generalzolldirektion",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: true,
    issuanceType: "pro Unternehmen",
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
    name: "Unbedenklichkeitsbescheinigung Berufsgenossenschaft",
    description: "Unbedenklichkeitsbescheinigung der Berufsgenossenschaft",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "monatlich",
      basic: "quartalsweise"
    },
    requiredFor: {
      secure: "Qualifizierte UB verpflichtend, wenn Mitarbeiter angestellt sind",
      basic: "Verpflichtend, wenn Mitarbeiter angestellt sind"
    }
  },
  {
    id: "doc-type-4",
    name: "Unbedenklichkeitsbescheinigung Krankenkasse",
    description: "Unbedenklichkeitsbescheinigung der Krankenkasse",
    providerType: "subunternehmer",
    isPerEmployee: true,
    isClientSpecific: false,
    issuanceType: "pro Mitarbeiter",
    checkFrequency: {
      secure: "monatlich",
      basic: "quartalsweise"
    },
    requiredFor: {
      secure: "Verpflichtend, wenn Mitarbeiter angestellt sind, falls bei Krankenkasse möglich qualifizierte UB",
      basic: "Verpflichtend, wenn Mitarbeiter angestellt sind"
    }
  },
  {
    id: "doc-type-5",
    name: "Aufenthaltserlaubnis",
    description: "Aufenthaltserlaubnis für Mitarbeiter",
    providerType: "subunternehmer",
    isPerEmployee: true,
    isClientSpecific: false,
    issuanceType: "pro Mitarbeiter",
    checkFrequency: {
      secure: "dauerhaft (Ablaufdatum)",
      basic: "dauerhaft (Ablaufdatum)"
    },
    requiredFor: {
      secure: "Verpflichtend für Subunternehmer mit Personen aus Drittstaaten",
      basic: "Verpflichtend für Subunternehmer mit Personen aus Drittstaaten"
    }
  },
  {
    id: "doc-type-6",
    name: "Arbeitserlaubnis",
    description: "Arbeitserlaubnis für Mitarbeiter",
    providerType: "subunternehmer",
    isPerEmployee: true,
    isClientSpecific: false,
    issuanceType: "pro Mitarbeiter",
    checkFrequency: {
      secure: "dauerhaft (Ablaufdatum)",
      basic: "dauerhaft (Ablaufdatum)"
    },
    requiredFor: {
      secure: "Verpflichtend für Subunternehmer mit Personen aus Drittstaaten",
      basic: "Verpflichtend für Subunternehmer mit Personen aus Drittstaaten"
    }
  },
  {
    id: "doc-type-7",
    name: "Bescheinigung für Tätigkeiten im Baugewerbe §13b UStG",
    description: "Bescheinigung für Tätigkeiten im Baugewerbe",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "bei Ablauf (nach drei Jahren)",
      basic: "bei Ablauf (nach drei Jahren)"
    },
    requiredFor: {
      secure: "Verpflichtend für Subunternehmer im Baugewerbe",
      basic: "Verpflichtend für Subunternehmer im Baugewerbe"
    }
  },
  {
    id: "doc-type-8",
    name: "Unbedenklichkeitsbescheinigung der SOKA Bau",
    description: "Unbedenklichkeitsbescheinigung der SOKA Bau",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "monatlich",
      basic: "quartalsweise"
    },
    requiredFor: {
      secure: "Verpflichtend für Subunternehmer im Baugewerbe",
      basic: "Verpflichtend für Subunternehmer im Baugewerbe"
    }
  },
  {
    id: "doc-type-9",
    name: "Testergebnis Scheinselbstständigkeit",
    description: "Testergebnis zur Scheinselbstständigkeit",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "bei Ablauf (jährlich)",
      basic: "bei Ablauf (jährlich)"
    },
    requiredFor: {
      secure: "Verpflichtend (teilweise)",
      basic: "Verpflichtend (teilweise)"
    }
  },
  {
    id: "doc-type-10",
    name: "Liste aller beteiligten Mitarbeitenden",
    description: "Liste aller beteiligten Mitarbeiter",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: true,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "dauerhaft",
      basic: "dauerhaft"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  },
  {
    id: "doc-type-11",
    name: "A1-Bescheinigung für ausländische Auftragnehmer",
    description: "A1-Bescheinigung für ausländische Auftragnehmer",
    providerType: "subunternehmer",
    isPerEmployee: true,
    isClientSpecific: false,
    issuanceType: "pro Mitarbeiter",
    checkFrequency: {
      secure: "dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)",
      basic: "dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  },
  {
    id: "doc-type-12",
    name: "Kopie der Pässe",
    description: "Kopie der Pässe der Mitarbeiter",
    providerType: "subunternehmer",
    isPerEmployee: true,
    isClientSpecific: false,
    issuanceType: "pro Mitarbeiter",
    checkFrequency: {
      secure: "bei Ablauf",
      basic: "bei Ablauf"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  },
  {
    id: "doc-type-13",
    name: "Auftragsverarbeitungsvereinbarung",
    description: "Auftragsverarbeitungsvereinbarung",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: true,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "einmalig",
      basic: "einmalig"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  },
  {
    id: "doc-type-14",
    name: "Onboarding Selbstauskunft",
    description: "Onboarding Selbstauskunft",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "einmalig",
      basic: "einmalig"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  },
  {
    id: "doc-type-15",
    name: "Freistellungsbescheinigung der Finanzverwaltung §48b EStG",
    description: "Freistellungsbescheinigung der Finanzverwaltung",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "bei Ablauf (jährlich)",
      basic: "bei Ablauf (jährlich)"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  },
  {
    id: "doc-type-16",
    name: "Gewerbeanmeldung",
    description: "Gewerbeanmeldung",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "einmalig",
      basic: "einmalig"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  },
  {
    id: "doc-type-17",
    name: "Mitteilung des Steuerberaters (Mitarbeiter u. Mindestlöhne)",
    description: "Mitteilung des Steuerberaters über Mitarbeiter und Mindestlöhne",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "bei Ablauf (jährlich)",
      basic: "bei Ablauf (jährlich)"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  },
  {
    id: "doc-type-18",
    name: "Unbedenklichkeitsbescheinigung Finanzamt",
    description: "Unbedenklichkeitsbescheinigung des Finanzamts",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
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
    id: "doc-type-19",
    name: "Handelsregisterauszug",
    description: "Handelsregisterauszug",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "einmalig",
      basic: "einmalig"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Optional"
    }
  },
  {
    id: "doc-type-20",
    name: "Betriebshaftpflichtversicherung",
    description: "Betriebshaftpflichtversicherung",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "bei Ablauf (jährlich)",
      basic: "bei Ablauf (jährlich)"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Verpflichtend"
    }
  },
  {
    id: "doc-type-21",
    name: "Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen",
    description: "Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
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
    id: "doc-type-22",
    name: "Handwerkskarte bzw. Eintragung in die Handwerksrolle, IHK wenn nicht Handwerk",
    description: "Handwerkskarte oder Eintragung in die Handwerksrolle",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "einmalig",
      basic: "einmalig"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Optional"
    }
  },
  {
    id: "doc-type-23",
    name: "Unternehmerbescheinigung vom Finanzamt",
    description: "Unternehmerbescheinigung vom Finanzamt",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "bei Ablauf (jährlich)",
      basic: "bei Ablauf (jährlich)"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Optional"
    }
  },
  {
    id: "doc-type-24",
    name: "Erklärung Subunternehmer",
    description: "Erklärung des Subunternehmers",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: true,
    issuanceType: "pro Unternehmen",
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
    id: "doc-type-25",
    name: "Meldebescheinigung Sozialversicherung",
    description: "Meldebescheinigung der Sozialversicherung",
    providerType: "subunternehmer",
    isPerEmployee: true,
    isClientSpecific: false,
    issuanceType: "pro Mitarbeiter",
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
    id: "doc-type-26",
    name: "Creditreform-Selbstauskunft über Liquidität",
    description: "Creditreform-Selbstauskunft über die Liquidität",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "dauerhaft",
      basic: "dauerhaft"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Optional"
    }
  },
  {
    id: "doc-type-27",
    name: "Gewerbezentralregisterauszug",
    description: "Gewerbezentralregisterauszug",
    providerType: "subunternehmer",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "quartalsweise",
      basic: "jährlich"
    },
    requiredFor: {
      secure: "Verpflichtend",
      basic: "Optional"
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
  },
  {
    id: "provider-6",
    name: "Metallbau Schmidt GmbH",
    type: "subunternehmer",
    contactEmail: "info@metallbau-schmidt.de",
    contactPhone: "+49 678 901234",
    address: "Werkstraße 45, 50667 Köln",
    status: "active",
    documentsCount: {
      total: 12,
      valid: 9,
      expiring: 1,
      expired: 0,
      missing: 2
    },
    lastUpdated: "2025-05-05"
  },
  {
    id: "provider-7",
    name: "Dachdeckerei Müller & Söhne",
    type: "subunternehmer",
    contactEmail: "info@dachdeckerei-mueller.de",
    contactPhone: "+49 789 012345",
    address: "Dachstraße 32, 30159 Hannover",
    status: "active",
    documentsCount: {
      total: 10,
      valid: 8,
      expiring: 2,
      expired: 0,
      missing: 0
    },
    lastUpdated: "2025-04-22"
  },
  {
    id: "provider-8",
    name: "Malermeister Weber GmbH",
    type: "subunternehmer",
    contactEmail: "kontakt@maler-weber.de",
    contactPhone: "+49 890 123456",
    address: "Farbweg 11, 20095 Hamburg",
    status: "active",
    documentsCount: {
      total: 14,
      valid: 11,
      expiring: 2,
      expired: 0,
      missing: 1
    },
    lastUpdated: "2025-04-30"
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
  },
  {
    id: "employee-4",
    providerId: "provider-3",
    name: "Anna Wagner",
    position: "Bauleiterin",
    documentsRequired: ["doc-type-5", "doc-type-6", "doc-type-12"]
  },
  {
    id: "employee-5",
    providerId: "provider-3",
    name: "Frank Müller",
    position: "Facharbeiter",
    documentsRequired: ["doc-type-11", "doc-type-12"]
  },
  {
    id: "employee-6",
    providerId: "provider-4",
    name: "Sabine Fischer",
    position: "Elektrikerin",
    documentsRequired: ["doc-type-11", "doc-type-12", "doc-type-25"]
  },
  {
    id: "employee-7",
    providerId: "provider-4",
    name: "Markus Koch",
    position: "Vorarbeiter",
    documentsRequired: ["doc-type-11", "doc-type-12"]
  },
  {
    id: "employee-8",
    providerId: "provider-6",
    name: "Julia Bauer",
    position: "Metallbauerin",
    documentsRequired: ["doc-type-12", "doc-type-25"]
  },
  {
    id: "employee-9",
    providerId: "provider-6",
    name: "Thomas Hoffmann",
    position: "Schweißer",
    documentsRequired: ["doc-type-5", "doc-type-6", "doc-type-12"]
  },
  {
    id: "employee-10",
    providerId: "provider-6",
    name: "Nicole Schulz",
    position: "Bürokraft",
    documentsRequired: ["doc-type-12", "doc-type-4"]
  },
  {
    id: "employee-11",
    providerId: "provider-7",
    name: "Martin Weber",
    position: "Dachdecker",
    documentsRequired: ["doc-type-11", "doc-type-12"]
  },
  {
    id: "employee-12",
    providerId: "provider-7",
    name: "Sandra Klein",
    position: "Dachdeckerin",
    documentsRequired: ["doc-type-11", "doc-type-12", "doc-type-25"]
  },
  {
    id: "employee-13",
    providerId: "provider-8",
    name: "Christian Schäfer",
    position: "Malermeister",
    documentsRequired: ["doc-type-12", "doc-type-25"]
  },
  {
    id: "employee-14",
    providerId: "provider-8",
    name: "Andrea Wolf",
    position: "Malerin",
    documentsRequired: ["doc-type-5", "doc-type-6", "doc-type-12"]
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
    fileUrl: "/documents/doc-1.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "bei Ablauf (jährlich)",
    secureCheckRequirement: "Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt",
    basicCheckFrequency: "bei Ablauf (jährlich)",
    basicCheckRequirement: "Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt",
    issuanceType: "pro Unternehmen"
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
    fileUrl: "/documents/doc-2.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "dauerhaft",
    secureCheckRequirement: "Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt",
    basicCheckFrequency: "dauerhaft",
    basicCheckRequirement: "Verpflichtend, wenn Mitarbeiter nicht in Deutschland angestellt",
    issuanceType: "pro Mitarbeiter"
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
    fileUrl: "/documents/doc-3.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "monatlich",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "quartalsweise",
    basicCheckRequirement: "Verpflichtend",
    issuanceType: "pro Unternehmen"
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
    fileUrl: "/documents/doc-4.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "bei Ablauf",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "bei Ablauf",
    basicCheckRequirement: "Verpflichtend",
    issuanceType: "pro Mitarbeiter"
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
    fileUrl: "/documents/doc-5.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "bei Ablauf (jährlich)",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "bei Ablauf (jährlich)",
    basicCheckRequirement: "Verpflichtend",
    issuanceType: "pro Unternehmen"
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
    fileUrl: "/documents/doc-6.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "monatlich",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "quartalsweise",
    basicCheckRequirement: "Verpflichtend",
    issuanceType: "pro Unternehmen"
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
    fileUrl: "/documents/doc-7.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "bei Ablauf",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "bei Ablauf",
    basicCheckRequirement: "Verpflichtend",
    issuanceType: "pro Mitarbeiter"
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
    fileUrl: "/documents/doc-8.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "jährlich",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "jährlich",
    basicCheckRequirement: "Optional",
    issuanceType: "pro Unternehmen"
  },
  {
    id: "doc-101",
    name: "A1-Bescheinigung",
    provider: "Bau Meister & Co. KG",
    providerId: "provider-3",
    providerType: "subunternehmer",
    type: "doc-type-11",
    issuedDate: "2025-02-10",
    expiryDate: "2025-08-10",
    status: "valid",
    lastChecked: "2025-04-15",
    nextCheckDue: "2025-08-10",
    checkFrequency: "dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: true,
    employeeId: "employee-5",
    employeeName: "Frank Müller",
    fileUrl: "/documents/doc-101.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)",
    basicCheckRequirement: "Verpflichtend",
    issuanceType: "pro Mitarbeiter"
  },
  {
    id: "doc-102",
    name: "Kopie der Pässe",
    provider: "Bau Meister & Co. KG",
    providerId: "provider-3",
    providerType: "subunternehmer",
    type: "doc-type-12",
    issuedDate: "2023-05-20",
    expiryDate: "2033-05-19",
    status: "valid",
    lastChecked: "2025-04-15",
    nextCheckDue: "2033-05-19",
    checkFrequency: "bei Ablauf",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: true,
    employeeId: "employee-5",
    employeeName: "Frank Müller",
    fileUrl: "/documents/doc-102.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "bei Ablauf",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "bei Ablauf",
    basicCheckRequirement: "Verpflichtend",
    issuanceType: "pro Mitarbeiter"
  },
  {
    id: "doc-103",
    name: "Aufenthaltserlaubnis",
    provider: "Bau Meister & Co. KG",
    providerId: "provider-3",
    providerType: "subunternehmer",
    type: "doc-type-5",
    issuedDate: "2024-03-01",
    expiryDate: "2026-02-28",
    status: "valid",
    lastChecked: "2025-04-15",
    nextCheckDue: "2026-02-28",
    checkFrequency: "dauerhaft (Ablaufdatum)",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: true,
    employeeId: "employee-4",
    employeeName: "Anna Wagner",
    fileUrl: "/documents/doc-103.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "dauerhaft (Ablaufdatum)",
    secureCheckRequirement: "Verpflichtend für Subunternehmer mit Personen aus Drittstaaten",
    basicCheckFrequency: "dauerhaft (Ablaufdatum)",
    basicCheckRequirement: "Verpflichtend für Subunternehmer mit Personen aus Drittstaaten",
    issuanceType: "pro Mitarbeiter"
  },
  {
    id: "doc-104",
    name: "Unbedenklichkeitsbescheinigung Finanzamt",
    provider: "Metallbau Schmidt GmbH",
    providerId: "provider-6",
    providerType: "subunternehmer",
    type: "doc-type-18",
    issuedDate: "2025-04-10",
    expiryDate: "2025-05-10",
    status: "expiring",
    lastChecked: "2025-04-11",
    nextCheckDue: "2025-05-10",
    checkFrequency: "monatlich",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: false,
    fileUrl: "/documents/doc-104.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "monatlich",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "quartalsweise",
    basicCheckRequirement: "Verpflichtend",
    issuanceType: "pro Unternehmen"
  },
  {
    id: "doc-105",
    name: "Betriebshaftpflichtversicherung",
    provider: "Metallbau Schmidt GmbH",
    providerId: "provider-6",
    providerType: "subunternehmer",
    type: "doc-type-20",
    issuedDate: "2024-08-15",
    expiryDate: "2025-08-14",
    status: "valid",
    lastChecked: "2025-04-11",
    nextCheckDue: "2025-08-14",
    checkFrequency: "bei Ablauf (jährlich)",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: false,
    fileUrl: "/documents/doc-105.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "bei Ablauf (jährlich)",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "bei Ablauf (jährlich)",
    basicCheckRequirement: "Verpflichtend",
    issuanceType: "pro Unternehmen"
  },
  {
    id: "doc-106",
    name: "Handelsregisterauszug",
    provider: "Dachdeckerei Müller & Söhne",
    providerId: "provider-7",
    providerType: "subunternehmer",
    type: "doc-type-19",
    issuedDate: "2024-01-20",
    expiryDate: null,
    status: "valid",
    lastChecked: "2025-04-15",
    nextCheckDue: null,
    checkFrequency: "einmalig",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: false,
    isPerEmployee: false,
    fileUrl: "/documents/doc-106.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "einmalig",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "einmalig", 
    basicCheckRequirement: "Optional",
    issuanceType: "pro Unternehmen"
  },
  {
    id: "doc-107",
    name: "A1-Bescheinigung",
    provider: "Dachdeckerei Müller & Söhne",
    providerId: "provider-7",
    providerType: "subunternehmer",
    type: "doc-type-11",
    issuedDate: "2025-03-01",
    expiryDate: "2025-09-01",
    status: "valid",
    lastChecked: "2025-04-15",
    nextCheckDue: "2025-09-01",
    checkFrequency: "dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)",
    isRequired: true,
    isSecureCheckRequired: true,
    isBasicCheckRequired: true,
    isPerEmployee: true,
    employeeId: "employee-11",
    employeeName: "Martin Weber",
    fileUrl: "/documents/doc-107.pdf",
    isClientSpecific: false,
    secureCheckFrequency: "dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)",
    secureCheckRequirement: "Verpflichtend",
    basicCheckFrequency: "dauerhaft bei jedem eingesetzten Mitarbeiter (Ablaufdatum)",
    basicCheckRequirement: "Verpflichtend",
    issuanceType: "pro Mitarbeiter"
  }
];

// Add more historical data points
export const historicalData = [
  { name: 'Jan', beitragsrückstände: 4, fehlend: 12, ablaufend: 5 },
  { name: 'Feb', beitragsrückstände: 3, fehlend: 9, ablaufend: 7 },
  { name: 'Mär', beitragsrückstände: 3, fehlend: 7, ablaufend: 6 },
  { name: 'Apr', beitragsrückstände: 2, fehlend: 5, ablaufend: 5 },
  { name: 'Mai', beitragsrückstände: 1, fehlend: 3, ablaufend: 4 },
  { name: 'Jun', beitragsrückstände: 1, fehlend: 2, ablaufend: 3 },
  { name: 'Jul', beitragsrückstände: 0, fehlend: 1, ablaufend: 2 },
];
