import { Document } from "@/types";

export const getEmployeeNameAndCitizenship = (employee: any) => {
  const employeeName = employee.firstName + " " + employee.lastName;
  const citizenship = employee.citizenship || "Unbekannt";
  return { employeeName, citizenship };
};

export const determineWorstStatus = (employeeDocuments: Document[]) => {
  const hasExpired = employeeDocuments.some(d => d.status === 'expired');
  const hasMissing = employeeDocuments.some(d => d.status === 'missing');
  const hasExpiring = employeeDocuments.some(d => d.status === 'expiring');
  
  return hasExpired ? "expired" : (hasMissing ? "missing" : (hasExpiring ? "expiring" : "valid"));
};

export const shouldDocumentBeMissing = (employeeId: string, documentTypeId: string) => {
  // For specific employees, mark certain documents as missing
  if (employeeId === "employee-1" && documentTypeId === "doc-type-1") return true;
  if (employeeId === "employee-2" && documentTypeId === "doc-type-2") return true;
  return false;
};

export const getDocumentStatus = (employeeId: string, documentTypeId: string) => {
  // Special handling for Jan Kowalski's A1 certificate
  if (employeeId === "employee-15" && documentTypeId === "doc-type-11") {
    return "expired";
  }
  
  // Randomly distribute document statuses with 70% valid documents
  const rand = Math.random();
  if (rand < 0.7) return "valid";
  else if (rand < 0.85) return "expiring";
  else return "expired";
};

export const getDocumentExpiryDate = (employeeId: string, documentTypeId: string) => {
  // Special handling for Jan Kowalski's A1 certificate
  if (employeeId === "employee-15" && documentTypeId === "doc-type-11") {
    return "2025-06-19";
  }
  
  const now = new Date();
  const rand = Math.random();
  if (rand < 0.7) return null; // Valid documents don't need expiry shown
  else if (rand < 0.85) {
    // Expiring documents - expire in 1 month
    return new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
  } else {
    // Expired documents - expired 1 month ago
    return new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
  }
};

export const getReminderCount = (employeeId: string, documentTypeId: string) => {
  // Special handling for Jan Kowalski's A1 certificate - only 1 reminder sent
  if (employeeId === "employee-15" && documentTypeId === "doc-type-11") {
    return 1;
  }
  
  // Random reminder count for other expired/missing documents
  return Math.floor(Math.random() * 3);
};

export const isDocumentRelevant = (employeeId: string, documentTypeId: string, citizenship: string) => {
  // Special case for A1-Bescheinigung
  const isA1Doc = documentTypeId === "doc-type-11";
  
  // For Jan Kowalski's A1 certificate, show "Relevant" instead of "Verpflichtend (A1)"
  if (employeeId === "employee-15" && isA1Doc) {
    return { isRequired: true, label: "Relevant" };
  }
  
  // For other A1 documents with non-German citizenship
  if (isA1Doc && citizenship !== "Deutschland") {
    return { isRequired: true, label: "Verpflichtend (A1)" };
  }
  
  // Default case
  return { isRequired: true, label: "Relevant" };
};
