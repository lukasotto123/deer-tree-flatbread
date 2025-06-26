
export interface Provider {
  id: string;
  name: string;
  type: 'personaldienstleister' | 'nachunternehmer';
  contactEmail: string;
  contactPhone: string;
  address: string;
  billingAddress?: string;
  managingDirector?: string;
  contactPerson?: string;
  status: 'active' | 'pending' | 'inactive';
  documentsCount: {
    total: number;
    valid: number;
    expiring: number;
    expired: number;
    missing: number;
  };
  lastUpdated: string;
}

export interface Employee {
  id: string;
  providerId: string;
  name: string;
  position: string;
  documentsRequired: string[];
  citizenship?: string;
  email?: string;
  phone?: string;
  address?: string;
  employmentStartDate?: string;
  employmentEndDate?: string;
  status?: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  provider: string;
  providerId: string;
  providerType: 'personaldienstleister' | 'nachunternehmer';
  status: 'valid' | 'expiring' | 'expired' | 'missing';
  issuedDate: string;
  expiryDate: string | null;
  employeeId?: string;
  employeeName?: string;
  fileUrl?: string;
  lastChecked: string | null;
  nextCheckDue: string | null;
  checkFrequency: string;
  isRequired: boolean;
  isSecureCheckRequired: boolean;
  isBasicCheckRequired: boolean;
  isPerEmployee: boolean;
  isClientSpecific: boolean;
  secureCheckFrequency: string;
  secureCheckRequirement: string;
  basicCheckFrequency: string;
  basicCheckRequirement: string;
  issuanceType: 'pro Unternehmen' | 'pro Mitarbeiter';
  category?: DocumentCategory;
  categoryLabel?: string;
  remindersSent?: number;
  nextReminderDate?: string;
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  providerType: 'personaldienstleister' | 'nachunternehmer';
  category: DocumentCategory;
  categoryLabel: string;
  isPerEmployee: boolean;
  isClientSpecific: boolean;
  issuanceType: 'pro Unternehmen' | 'pro Mitarbeiter';
  checkFrequency: {
    secure: string;
    basic: string;
  };
  requiredFor: {
    secure: string;
    basic: string;
  };
}

export interface DocumentReminder {
  id: string;
  documentId: string;
  employeeId?: string;
  providerId: string;
  reminderType: 'missing' | 'expiring' | 'expired';
  sentAt: string;
  nextReminderDue?: string;
  emailSent: boolean;
  smsSent: boolean;
  createdAt: string;
}

export interface DocumentHistory {
  id: string;
  documentId: string;
  employeeId?: string;
  providerId: string;
  action: string;
  details?: any;
  performedBy: string;
  performedAt: string;
  oldStatus?: string;
  newStatus?: string;
}

export interface CompanyAssignment {
  id: string;
  employeeId: string;
  providerId: string;
  companyName: string;
  assignmentStartDate?: string;
  assignmentEndDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentValidation {
  id: string;
  documentId: string;
  validationType: 'ai_authenticity' | 'ai_content' | 'manual_review';
  result: 'valid' | 'suspicious' | 'invalid' | 'pending';
  confidenceScore?: number;
  validationDetails?: any;
  validatedBy: string;
  validatedAt: string;
  notes?: string;
}

export type DocumentCategory = 
  | 'sozial_versicherungsnachweise'
  | 'arbeits_mindestlohn_compliance'
  | 'behördliche_steuerliche_nachweise'
  | 'bonitäts_risikoprüfung';

export interface DocumentRequirement {
  documentTypeId: string;
  isRequired: boolean;
  checkFrequency?: string;
  reminderSettings?: {
    enabled: boolean;
    daysBeforeExpiry: number;
    intervalDays: number;
  };
}

export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  providerType: 'personaldienstleister' | 'nachunternehmer';
  requiredDocuments: DocumentRequirement[];
  isActive: boolean;
}
