
import { Provider } from "@/types";

export const providers: Provider[] = [
  {
    id: "provider-1",
    name: "Personaldienstleister GmbH",
    type: "personaldienstleister",
    contactEmail: "kontakt@personaldienstleister.de",
    contactPhone: "+49 123 456789",
    address: "Musterstraße 1, 10115 Berlin",
    billingAddress: "Rechnungsstraße 1a, 10115 Berlin",
    managingDirector: "Dr. Hans Müller",
    contactPerson: "Frau Schmidt",
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
    billingAddress: "Hauptstraße 25, 60306 Frankfurt",
    managingDirector: "Prof. Klaus Weber",
    contactPerson: "Herr Fischer",
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
    name: "Nowak Construction Group",
    type: "nachunternehmer",
    contactEmail: "kontakt@nowak-construction.de",
    contactPhone: "+49 345 678901",
    address: "Bauweg 12, 70173 Stuttgart",
    billingAddress: "Rechnungsweg 17, 70173 Stuttgart",
    managingDirector: "Karl Nowak",
    contactPerson: "Frau Wagner",
    status: "active",
    documentsCount: {
      total: 15,
      valid: 14,
      expiring: 0,
      expired: 1,
      missing: 0
    },
    lastUpdated: "2025-04-15"
  },
  {
    id: "provider-4",
    name: "Elektro Schaltbau GmbH",
    type: "nachunternehmer",
    contactEmail: "info@elektro-schaltbau.de",
    contactPhone: "+49 456 789012",
    address: "Stromgasse 7, 80333 München",
    billingAddress: "Buchhaltungsallee 11, 80335 München",
    managingDirector: "Thomas Stark",
    contactPerson: "Herr Licht",
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
    type: "nachunternehmer",
    contactEmail: "kontakt@gebaeudereinigung-sauber.de",
    contactPhone: "+49 567 890123",
    address: "Putzstraße 19, 40221 Düsseldorf",
    billingAddress: "Putzstraße 19, 40221 Düsseldorf",
    managingDirector: "Maria Sauber",
    contactPerson: "Herr Rein",
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
    type: "nachunternehmer",
    contactEmail: "info@metallbau-schmidt.de",
    contactPhone: "+49 678 901234",
    address: "Werkstraße 45, 50667 Köln",
    billingAddress: "Werkstraße 45, 50667 Köln",
    managingDirector: "Friedrich Schmidt",
    contactPerson: "Frau Eisen",
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
    type: "nachunternehmer",
    contactEmail: "info@dachdeckerei-mueller.de",
    contactPhone: "+49 789 012345",
    address: "Dachstraße 32, 30159 Hannover",
    billingAddress: "Dachstraße 32, 30159 Hannover",
    managingDirector: "Wilhelm Müller",
    contactPerson: "Frau Ziegel",
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
    type: "nachunternehmer",
    contactEmail: "kontakt@maler-weber.de",
    contactPhone: "+49 890 123456",
    address: "Farbweg 11, 20095 Hamburg",
    billingAddress: "Rechnungsweg 22, 20099 Hamburg",
    managingDirector: "Gustav Weber",
    contactPerson: "Herr Pinsel",
    status: "active",
    documentsCount: {
      total: 14,
      valid: 12,
      expiring: 2, // Korrigiert: 2 ablaufende Dokumente (nicht 3)
      expired: 0,
      missing: 0 // Korrigiert: keine fehlenden Dokumente, der "Beitragsrückstand" war ein Fehler
    },
    lastUpdated: "2025-04-30"
  }
];
