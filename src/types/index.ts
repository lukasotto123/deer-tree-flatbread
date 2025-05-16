
export type ProviderType = 'personaldienstleister' | 'nachunternehmer';

export type DocumentCategory = 
  | 'behördliche_steuerliche_nachweise' 
  | 'arbeits_mindestlohn_compliance' 
  | 'sozial_versicherungsnachweise' 
  | 'personal_qualifikationsnachweise' 
  | 'bonitäts_risikoprüfung' 
  | 'kundenspezifisch';

export interface Document {
  id: string;
  name: string;
  provider: string; 
  providerId: string;
  providerType: ProviderType;
  type: string;
  category?: DocumentCategory;
  categoryLabel?: string;
  issuedDate: string;
  expiryDate: string | null;
  status: 'valid' | 'expiring' | 'expired' | 'missing';
  lastChecked: string | null;
  nextCheckDue: string | null;
  checkFrequency: string;
  isRequired: boolean;
  isSecureCheckRequired: boolean;
  isBasicCheckRequired: boolean;
  isPerEmployee: boolean;
  employeeId?: string;
  employeeName?: string;
  fileUrl?: string;
  isClientSpecific: boolean; // Klientenspezfisch oder -unabhängig
  secureCheckFrequency: string; // Sichere Prüfung - Frequenz
  secureCheckRequirement: string; // Sichere Prüfung - Erfordernis
  basicCheckFrequency: string; // Basisprüfung - Frequenz
  basicCheckRequirement: string; // Basisprüfung - Erfordernis
  issuanceType: 'pro Unternehmen' | 'pro Mitarbeiter'; // Ausstellung
  remindersSent?: number; // Anzahl der gesendeten Erinnerungen
  nextReminderDate?: string; // Datum der nächsten Erinnerung
}

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  contactEmail: string;
  contactPhone: string;
  address: string;
  billingAddress?: string;
  managingDirector?: string;
  contactPerson?: string;
  status: 'active' | 'inactive' | 'pending';
  documentsCount: {
    total: number;
    valid: number;
    expiring: number;
    expired: number;
    missing: number;
  };
  lastUpdated: string;
  hasANUPermission?: boolean; // Arbeitnehmerüberlassungserlaubnis
}

export interface Employee {
  id: string;
  providerId: string;
  name: string;
  position: string;
  documentsRequired: string[];
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  providerType: ProviderType;
  category: DocumentCategory;
  categoryLabel: string;
  isPerEmployee: boolean;
  isClientSpecific: boolean; // Klientenspezfisch oder -unabhängig
  issuanceType: 'pro Unternehmen' | 'pro Mitarbeiter'; // Ausstellung
  checkFrequency: {
    secure: string;
    basic: string;
  };
  requiredFor: {
    secure: string;
    basic: string;
  };
}
