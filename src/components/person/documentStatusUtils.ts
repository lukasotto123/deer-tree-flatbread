import { useDocumentReminders } from '@/hooks/useSupabaseData';

export const shouldDocumentBeMissing = (employeeId: string, documentTypeId: string) => {
  // This function is now deprecated - we use real Supabase data instead
  // Keep it for backward compatibility but always return false
  return false;
};

export const getDocumentStatus = (employeeId: string, docTypeId: string) => {
  // This function is now deprecated - we use real Supabase data instead
  // The actual status comes from the documents table in Supabase
  return "valid"; // Default fallback
};

export const getDocumentExpiryDate = (employeeId: string, docTypeId: string) => {
  // This function is now deprecated - we use real Supabase data instead
  // The actual expiry date comes from the documents table in Supabase
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  return expiryDate.toISOString();
};

export const getEmployeeNameAndCitizenship = (employee: any) => {
  // Use the actual data from Supabase
  const employeeName = employee.name;
  const citizenship = employee.citizenship || "Deutschland";
  
  return { employeeName, citizenship };
};

export const determineWorstStatus = (employeeDocuments: any[]) => {
  // Prioritize expired documents first, then missing, then expiring
  const hasExpired = employeeDocuments.some(doc => doc.status === "expired");
  const hasMissing = employeeDocuments.some(doc => doc.status === "missing");
  const hasExpiring = employeeDocuments.some(doc => doc.status === "expiring");
  
  return hasExpired ? "expired" : (hasMissing ? "missing" : (hasExpiring ? "expiring" : "valid"));
};

export const getRemindersCount = (employeeId: string, docTypeId: string, reminders?: any[]) => {
  // Use actual reminders data from Supabase if available
  if (reminders) {
    const documentReminders = reminders.filter(r => 
      r.employee_id === employeeId && 
      r.document_id?.includes(docTypeId)
    );
    return documentReminders.length;
  }
  
  // Fallback to 0 if no reminders data available
  return 0;
};

// New utility function to trigger reminder creation when documents expire
export const triggerDocumentReminder = async (documentId: string, providerId: string, employeeId?: string, status: string = 'expiring') => {
  console.log(`AI Agent: Requesting document reminder for document ${documentId} with status ${status}`);
  
  // This would typically make an API call to create a reminder
  // For now, we'll just log the action for tracking purposes
  const reminderData = {
    document_id: documentId,
    provider_id: providerId,
    employee_id: employeeId,
    reminder_type: status === 'expired' ? 'urgent' : 'standard',
    reminder_reason: status === 'expired' ? 'Dokument ist bereits abgelaufen' : 'Dokument läuft in den nächsten 30 Tagen ab',
    auto_generated: true,
    document_status: status,
    sent_at: new Date().toISOString(),
    created_at: new Date().toISOString()
  };
  
  console.log('AI Agent reminder request:', reminderData);
  
  // In a real implementation, this would be an API call to Supabase
  // return await supabase.from('document_reminders').insert(reminderData);
};
