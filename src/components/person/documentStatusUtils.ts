
export const shouldDocumentBeMissing = (employeeId: string, documentTypeId: string) => {
  // Spezielle Behandlung für Jan Kowalski (employee-15) - bestimmte Dokumente ausblenden
  if (employeeId === "employee-15") {
    // Diese Dokumente sollen für Jan nicht in der Tabelle erscheinen
    if (documentTypeId === "doc-type-5") return true; // Aufenthaltserlaubnis
    if (documentTypeId === "doc-type-6") return true; // Arbeitserlaubnis
    if (documentTypeId === "doc-type-4") return true; // Unbedenklichkeitsbescheinigung Krankenkasse
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
  
  // Spezielle Behandlung für Jan Kowalski (employee-15)
  if (employeeId === "employee-15") {
    // A1-Bescheinigung soll valid sein (nicht expired)
    if (docTypeId === "doc-type-11") return "valid";
    // Alle anderen gewünschten Dokumente sollen valid sein
    if (docTypeId === "doc-type-12") return "valid"; // Reisepass
    if (docTypeId === "doc-type-25") return "valid"; // Meldebescheinigung Sozialversicherung
  }
  
  // Default random distribution for other employees
  const rand = Math.random();
  if (rand < 0.7) return "valid";
  else if (rand < 0.85) return "expiring";
  else return "expired";
};

export const getDocumentExpiryDate = (employeeId: string, docTypeId: string) => {
  // Spezielle Behandlung für Jan Kowalski (employee-15)
  if (employeeId === "employee-15") {
    if (docTypeId === "doc-type-12") { // Reisepass
      // Reisepass läuft in 2 Jahren ab
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 2);
      return expiryDate.toISOString();
    }
    if (docTypeId === "doc-type-25") { // Meldebescheinigung Sozialversicherung
      // Meldebescheinigung läuft in 1 Jahr ab
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      return expiryDate.toISOString();
    }
    if (docTypeId === "doc-type-11") { // A1-Bescheinigung
      // A1-Bescheinigung läuft am 19.06.2025 ab
      return '2025-06-19T00:00:00.000Z';
    }
  }
  
  // For other employees, generate random expiry dates based on status
  const status = getDocumentStatus(employeeId, docTypeId);
  const expiryDate = new Date();
  
  if (status === "expired") {
    expiryDate.setMonth(expiryDate.getMonth() - Math.floor(Math.random() * 6) - 1);
  } else if (status === "expiring") {
    expiryDate.setMonth(expiryDate.getMonth() + Math.floor(Math.random() * 2) + 1);
  } else if (status === "valid") {
    expiryDate.setFullYear(expiryDate.getFullYear() + Math.floor(Math.random() * 3) + 1);
  }
  
  return expiryDate.toISOString();
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
  // Prioritize expired documents first
  const hasExpired = employeeDocuments.some(doc => doc.status === "expired");
  const hasExpiring = employeeDocuments.some(doc => doc.status === "expiring");
  const hasMissing = employeeDocuments.some(doc => doc.status === "missing");
  
  return hasExpired ? "expired" : (hasMissing ? "missing" : (hasExpiring ? "expiring" : "valid"));
};

export const getRemindersCount = (employeeId: string, docTypeId: string) => {
  // Spezielle Behandlung für Jan Kowalski (employee-15) und A1-Bescheinigung
  if (employeeId === "employee-15" && docTypeId === "doc-type-11") {
    return 1; // Nur eine Erinnerung für Jan's A1-Bescheinigung
  }
  
  // Standard random count für andere Dokumente
  return Math.floor(Math.random() * 3);
};
