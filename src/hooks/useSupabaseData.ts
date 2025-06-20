
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Provider, Employee, Document, DocumentType } from '@/types'

export const useProviders = () => {
  return useQuery({
    queryKey: ['providers'],
    queryFn: async (): Promise<Provider[]> => {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
      
      if (error) throw error
      
      return data.map(provider => ({
        id: provider.id,
        name: provider.name,
        type: provider.type as 'personaldienstleister' | 'nachunternehmer',
        contactEmail: provider.contact_email || '',
        contactPhone: provider.contact_phone || '',
        address: provider.address || '',
        billingAddress: provider.billing_address || '',
        managingDirector: provider.managing_director || '',
        contactPerson: provider.contact_person || '',
        status: provider.status as 'active' | 'pending' | 'inactive',
        documentsCount: {
          total: provider.documents_count_total || 0,
          valid: provider.documents_count_valid || 0,
          expiring: provider.documents_count_expiring || 0,
          expired: provider.documents_count_expired || 0,
          missing: provider.documents_count_missing || 0
        },
        lastUpdated: provider.last_updated || new Date().toISOString().split('T')[0]
      }))
    }
  })
}

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async (): Promise<Employee[]> => {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
      
      if (error) throw error
      
      return data.map(employee => ({
        id: employee.id,
        providerId: employee.provider_id,
        name: employee.name,
        position: employee.position || '',
        documentsRequired: employee.documents_required || []
      }))
    }
  })
}

export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async (): Promise<Document[]> => {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
      
      if (error) throw error
      
      return data.map(doc => ({
        id: doc.id,
        name: doc.name,
        type: doc.type,
        provider: doc.provider,
        providerId: doc.provider_id,
        providerType: doc.provider_type as 'personaldienstleister' | 'nachunternehmer',
        status: doc.status as 'valid' | 'expiring' | 'expired' | 'missing',
        issuedDate: doc.issued_date || '',
        expiryDate: doc.expiry_date || null,
        employeeId: doc.employee_id || undefined,
        employeeName: doc.employee_name || undefined,
        fileUrl: doc.file_url || undefined
      }))
    }
  })
}

export const useDocumentTypes = () => {
  return useQuery({
    queryKey: ['documentTypes'],
    queryFn: async (): Promise<DocumentType[]> => {
      const { data, error } = await supabase
        .from('document_types')
        .select('*')
      
      if (error) throw error
      
      return data.map(docType => ({
        id: docType.id,
        name: docType.name,
        description: docType.description || '',
        providerType: docType.provider_type as 'personaldienstleister' | 'nachunternehmer',
        category: docType.category,
        categoryLabel: docType.category_label,
        isPerEmployee: docType.is_per_employee || false,
        isClientSpecific: docType.is_client_specific || false,
        issuanceType: docType.issuance_type || '',
        checkFrequency: {
          secure: docType.check_frequency_secure || '',
          basic: docType.check_frequency_basic || ''
        },
        requiredFor: {
          secure: docType.required_for_secure || '',
          basic: docType.required_for_basic || ''
        }
      }))
    }
  })
}
