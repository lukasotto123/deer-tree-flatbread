
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { Provider, Employee, Document, DocumentType, DocumentCategory } from '@/types'

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
        documentsRequired: employee.documents_required || [],
        citizenship: employee.citizenship || 'Deutschland',
        email: employee.email || '',
        phone: employee.phone || '',
        address: employee.address || '',
        employmentStartDate: employee.employment_start_date || '',
        employmentEndDate: employee.employment_end_date || '',
        status: employee.status || 'active'
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
        fileUrl: doc.file_url || undefined,
        lastChecked: doc.last_checked || null,
        nextCheckDue: doc.next_check_due || null,
        checkFrequency: doc.check_frequency || '',
        isRequired: doc.is_required || true,
        isSecureCheckRequired: doc.is_secure_check_required || false,
        isBasicCheckRequired: doc.is_basic_check_required || false,
        isPerEmployee: doc.is_per_employee || false,
        isClientSpecific: doc.is_client_specific || false,
        secureCheckFrequency: doc.secure_check_frequency || '',
        secureCheckRequirement: doc.secure_check_requirement || '',
        basicCheckFrequency: doc.basic_check_frequency || '',
        basicCheckRequirement: doc.basic_check_requirement || '',
        issuanceType: (doc.issuance_type || 'pro Unternehmen') as 'pro Unternehmen' | 'pro Mitarbeiter',
        category: undefined,
        categoryLabel: undefined,
        remindersSent: undefined,
        nextReminderDate: undefined
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
        category: docType.category as DocumentCategory,
        categoryLabel: docType.category_label,
        isPerEmployee: docType.is_per_employee || false,
        isClientSpecific: docType.is_client_specific || false,
        issuanceType: (docType.issuance_type || 'pro Unternehmen') as 'pro Unternehmen' | 'pro Mitarbeiter',
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

export const useDocumentReminders = () => {
  return useQuery({
    queryKey: ['documentReminders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_reminders')
        .select('*')
        .order('sent_at', { ascending: false })
      
      if (error) throw error
      return data
    }
  })
}

export const useDocumentHistory = (documentId?: string) => {
  return useQuery({
    queryKey: ['documentHistory', documentId],
    queryFn: async () => {
      const query = supabase
        .from('document_history')
        .select('*')
        .order('performed_at', { ascending: false })
      
      if (documentId) {
        query.eq('document_id', documentId)
      }
      
      const { data, error } = await query
      
      if (error) throw error
      return data
    },
    enabled: !!documentId
  })
}

export const useCompanyAssignments = () => {
  return useQuery({
    queryKey: ['companyAssignments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('company_assignments')
        .select('*')
      
      if (error) throw error
      return data
    }
  })
}

export const useDocumentValidations = () => {
  return useQuery({
    queryKey: ['documentValidations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('document_validations')
        .select('*')
      
      if (error) throw error
      return data
    }
  })
}

// New hook to get provider document summary using the updated view with client_location_id
export const useProviderDocumentSummary = () => {
  return useQuery({
    queryKey: ['providerDocumentSummary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('provider_document_summary')
        .select('*')
      
      if (error) throw error
      return data
    }
  })
}

// New hook to get location document summary
export const useLocationDocumentSummary = () => {
  return useQuery({
    queryKey: ['locationDocumentSummary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('location_document_summary')
        .select('*')
      
      if (error) throw error
      return data
    }
  })
}

// New hook to get employee document counts using the database function
export const useEmployeeDocumentCounts = (employeeId: string) => {
  return useQuery({
    queryKey: ['employeeDocumentCounts', employeeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('calculate_employee_document_counts', { employee_id_param: employeeId })
      
      if (error) throw error
      return data[0] || {
        employee_id: employeeId,
        total_documents: 0,
        valid_documents: 0,
        expiring_documents: 0,
        expired_documents: 0,
        missing_documents: 0
      }
    },
    enabled: !!employeeId
  })
}

// New hook to get provider document counts using the database function
export const useProviderDocumentCounts = (providerId: string) => {
  return useQuery({
    queryKey: ['providerDocumentCounts', providerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('calculate_provider_document_counts', { provider_id_param: providerId })
      
      if (error) throw error
      return data[0] || {
        provider_id: providerId,
        total_documents: 0,
        valid_documents: 0,
        expiring_documents: 0,
        expired_documents: 0,
        missing_documents: 0,
        beitragsrueckstaende: 0
      }
    },
    enabled: !!providerId
  })
}

// Helper function to create document reminders
export const createDocumentReminder = async (reminderData: {
  provider_id: string;
  employee_id?: string;
  document_id: string;
  reminder_type: string;
  reminder_reason?: string;
  document_status?: string;
  days_until_expiry?: number;
}) => {
  const { data, error } = await supabase
    .from('document_reminders')
    .insert(reminderData)
    .select()
  
  if (error) throw error
  return data
}
