
import { DocumentType } from "@/types";

export const documentTypes: DocumentType[] = [
  {
    id: "doc-type-1",
    name: "Werkverträge",
    description: "Werkverträge zwischen Unternehmen",
    providerType: "nachunternehmer",
    category: "kundenspezifisch",
    categoryLabel: "Kundenspezifisch",
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
    providerType: "nachunternehmer",
    category: "kundenspezifisch",
    categoryLabel: "Kundenspezifisch",
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
    providerType: "nachunternehmer",
    category: "sozial_versicherungsnachweise",
    categoryLabel: "Sozial- & Versicherungsnachweise",
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
    providerType: "nachunternehmer",
    category: "sozial_versicherungsnachweise",
    categoryLabel: "Sozial- & Versicherungsnachweise",
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
    providerType: "nachunternehmer",
    category: "personal_qualifikationsnachweise",
    categoryLabel: "Personal- & Qualifikationsnachweise",
    isPerEmployee: true,
    isClientSpecific: false,
    issuanceType: "pro Mitarbeiter",
    checkFrequency: {
      secure: "dauerhaft (Ablaufdatum)",
      basic: "dauerhaft (Ablaufdatum)"
    },
    requiredFor: {
      secure: "Verpflichtend für Nachunternehmer mit Personen aus Drittstaaten",
      basic: "Verpflichtend für Nachunternehmer mit Personen aus Drittstaaten"
    }
  },
  {
    id: "doc-type-6",
    name: "Arbeitserlaubnis",
    description: "Arbeitserlaubnis für Mitarbeiter",
    providerType: "nachunternehmer",
    category: "personal_qualifikationsnachweise",
    categoryLabel: "Personal- & Qualifikationsnachweise",
    isPerEmployee: true,
    isClientSpecific: false,
    issuanceType: "pro Mitarbeiter",
    checkFrequency: {
      secure: "dauerhaft (Ablaufdatum)",
      basic: "dauerhaft (Ablaufdatum)"
    },
    requiredFor: {
      secure: "Verpflichtend für Nachunternehmer mit Personen aus Drittstaaten",
      basic: "Verpflichtend für Nachunternehmer mit Personen aus Drittstaaten"
    }
  },
  {
    id: "doc-type-7",
    name: "Bescheinigung für Tätigkeiten im Baugewerbe §13b UStG",
    description: "Bescheinigung für Tätigkeiten im Baugewerbe",
    providerType: "nachunternehmer",
    category: "arbeits_mindestlohn_compliance",
    categoryLabel: "Arbeits- & Mindestlohn-compliance",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "bei Ablauf (nach drei Jahren)",
      basic: "bei Ablauf (nach drei Jahren)"
    },
    requiredFor: {
      secure: "Verpflichtend für Nachunternehmer im Baugewerbe",
      basic: "Verpflichtend für Nachunternehmer im Baugewerbe"
    }
  },
  {
    id: "doc-type-8",
    name: "Unbedenklichkeitsbescheinigung der SOKA Bau",
    description: "Unbedenklichkeitsbescheinigung der SOKA Bau",
    providerType: "nachunternehmer",
    category: "sozial_versicherungsnachweise",
    categoryLabel: "Sozial- & Versicherungsnachweise",
    isPerEmployee: false,
    isClientSpecific: false,
    issuanceType: "pro Unternehmen",
    checkFrequency: {
      secure: "monatlich",
      basic: "quartalsweise"
    },
    requiredFor: {
      secure: "Verpflichtend für Nachunternehmer im Baugewerbe",
      basic: "Verpflichtend für Nachunternehmer im Baugewerbe"
    }
  },
  {
    id: "doc-type-9",
    name: "Testergebnis Scheinselbstständigkeit",
    description: "Testergebnis zur Scheinselbstständigkeit",
    providerType: "nachunternehmer",
    category: "behördliche_steuerliche_nachweise",
    categoryLabel: "Behördliche & steuerliche Nachweise",
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
    id: "doc-type-11",
    name: "A1-Bescheinigung für ausländische Auftragnehmer",
    description: "A1-Bescheinigung für ausländische Auftragnehmer",
    providerType: "nachunternehmer",
    category: "personal_qualifikationsnachweise",
    categoryLabel: "Personal- & Qualifikationsnachweise",
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
    name: "Reisepass",
    description: "Reisepass der Mitarbeiter",
    providerType: "nachunternehmer",
    category: "personal_qualifikationsnachweise",
    categoryLabel: "Personal- & Qualifikationsnachweise",
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
    providerType: "nachunternehmer",
    category: "kundenspezifisch",
    categoryLabel: "Kundenspezifisch",
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
    providerType: "nachunternehmer",
    category: "kundenspezifisch",
    categoryLabel: "Kundenspezifisch",
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
    providerType: "nachunternehmer",
    category: "behördliche_steuerliche_nachweise",
    categoryLabel: "Behördliche & steuerliche Nachweise",
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
    providerType: "nachunternehmer",
    category: "behördliche_steuerliche_nachweise",
    categoryLabel: "Behördliche & steuerliche Nachweise",
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
    providerType: "nachunternehmer",
    category: "arbeits_mindestlohn_compliance",
    categoryLabel: "Arbeits- & Mindestlohn-compliance",
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
    providerType: "nachunternehmer",
    category: "behördliche_steuerliche_nachweise",
    categoryLabel: "Behördliche & steuerliche Nachweise",
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
    providerType: "nachunternehmer",
    category: "behördliche_steuerliche_nachweise",
    categoryLabel: "Behördliche & steuerliche Nachweise",
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
    providerType: "nachunternehmer",
    category: "sozial_versicherungsnachweise",
    categoryLabel: "Sozial- & Versicherungsnachweise",
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
    providerType: "nachunternehmer",
    category: "arbeits_mindestlohn_compliance",
    categoryLabel: "Arbeits- & Mindestlohn-compliance",
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
    providerType: "nachunternehmer",
    category: "behördliche_steuerliche_nachweise",
    categoryLabel: "Behördliche & steuerliche Nachweise",
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
    providerType: "nachunternehmer",
    category: "behördliche_steuerliche_nachweise",
    categoryLabel: "Behördliche & steuerliche Nachweise",
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
    name: "Erklärung Nachunternehmer",
    description: "Erklärung des Nachunternehmers",
    providerType: "nachunternehmer",
    category: "kundenspezifisch",
    categoryLabel: "Kundenspezifisch",
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
    providerType: "nachunternehmer",
    category: "personal_qualifikationsnachweise",
    categoryLabel: "Personal- & Qualifikationsnachweise",
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
    providerType: "nachunternehmer",
    category: "bonitäts_risikoprüfung",
    categoryLabel: "Bonitäts- & Risikoprüfung",
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
    providerType: "nachunternehmer",
    category: "behördliche_steuerliche_nachweise",
    categoryLabel: "Behördliche & steuerliche Nachweise",
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
