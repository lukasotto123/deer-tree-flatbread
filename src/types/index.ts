
export type ProviderType = 'personaldienstleister' | 'subunternehmer';

export interface Document {
  id: string;
  name: string;
  provider: string; 
  providerId: string;
  providerType: ProviderType;
  type: string;
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
}

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  contactEmail: string;
  contactPhone: string;
  address: string;
  status: 'active' | 'inactive' | 'pending';
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
}

export interface DocumentType {
  id: string;
  name: string;
  description: string;
  providerType: ProviderType;
  isPerEmployee: boolean;
  checkFrequency: {
    secure: string;
    basic: string;
  };
  requiredFor: {
    secure: string;
    basic: string;
  };
}
