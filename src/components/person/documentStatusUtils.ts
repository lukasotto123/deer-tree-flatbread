
export const shouldDocumentBeMissing = (employeeId: string, documentTypeId: string) => {
  // Mark specific documents as missing for Jan Kowalski (employee-15)
  if (employeeId === "employee-15") {
    if (documentTypeId === "doc-type-5") return true; // Unbedenklichkeitsbescheinigung Krankenkasse
    if (documentTypeId === "doc-type-6") return true; // Meldebescheinigung Sozialversicherung
  }
  
  // Mark some documents as missing for other specific employees
  if (employeeId === "employee-1" && documentTypeId === "doc-type-5") return true;
  if (employeeId === "employee-2" && documentTypeId === "doc-type-6") return true;
  if (employeeId === "employee-3" && documentTypeId === "doc-type-7") return true;
  if (employeeId === "employee-4" && documentTypeId === "doc-type-8") return true;
  return false;
};

export const getDocumentStatus = (employeeId: string, docTypeId: string) => {
  // Check if document should be missing
  if (shouldDocumentBeMissing(employeeId, docTypeId)) {
    return "missing";
  }
  
  // Special handling for Jan Kowalski's A1-Bescheinigung - should be expired, not valid
  if (employeeId === "employee-15" && docTypeId === "doc-type-11") {
    return "expired";
  }
  
  // Default random distribution
  const rand = Math.random();
  if (rand < 0.7) return "valid";
  else if (rand < 0.85) return "expiring";
  else return "expired";
};

export const getEmployeeNameAndCitizenship = (employee: any) => {
  let employeeName = employee.name;
  let citizenship = "Deutschland"; // Default
  
  if (employee.id === "employee-1") {
    employeeName = "Hans Schmidt";
    citizenship = "Deutschland";
  } else if (employee.id === "employee-2") {
    employeeName = "Maria Wagner";
    citizenship = "Deutschland";
  } else if (employee.id === "employee-3") {
    employeeName = "Pierre Dubois";
    citizenship = "Frankreich";
  } else if (employee.id === "employee-4") {
    employeeName = "Isabella Romano";
    citizenship = "Italien";
  } else if (employee.id === "employee-5") {
    employeeName = "Miguel González";
    citizenship = "Spanien";
  } else if (employee.id === "employee-15") {
    employeeName = "Jan Kowalski";
    citizenship = "Polen";
  } else if (employee.id === "employee-6") {
    employeeName = "Sophia Müller";
    citizenship = "Deutschland";
  } else if (employee.id === "employee-7") {
    employeeName = "Jan Kowalski";
    citizenship = "Polen";
  } else if (employee.id === "employee-8") {
    employeeName = "Anna Hofer";
    citizenship = "Österreich";
  } else if (employee.id === "employee-9") {
    employeeName = "Erik Johansson";
    citizenship = "Schweden";
  } else if (employee.id === "employee-10") {
    employeeName = "Yuki Tanaka";
    citizenship = "Japan";
  }

  return { employeeName, citizenship };
};

export const determineWorstStatus = (employeeDocuments: any[]) => {
  const hasExpired = employeeDocuments.some(doc => doc.status === "expired");
  const hasExpiring = employeeDocuments.some(doc => doc.status === "expiring");
  const hasMissing = employeeDocuments.some(doc => doc.status === "missing");
  
  return hasExpired ? "expired" : (hasMissing ? "missing" : (hasExpiring ? "expiring" : "valid"));
};
