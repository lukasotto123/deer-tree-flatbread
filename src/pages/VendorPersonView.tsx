
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { employees, documents, providers, documentTypes } from "@/data/dummy-data";
import StatusBadge from "@/components/ui/StatusBadge";
import VendorEmployeeInformation from "@/components/person/VendorEmployeeInformation";
import CompanyAssignment from "@/components/person/CompanyAssignment";
import VendorDocumentsTable from "@/components/person/VendorDocumentsTable";
import { getEmployeeNameAndCitizenship, determineWorstStatus, shouldDocumentBeMissing } from "@/components/person/documentStatusUtils";

const VendorPersonView = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [assignedCompany, setAssignedCompany] = useState<string>("company-1");
  
  const employee = employees.find(e => e.id === employeeId);
  const availableCompanies = providers.filter(p => p.type === "nachunternehmer");
  
  if (!employee) {
    return <div>Mitarbeiter nicht gefunden</div>;
  }

  const { employeeName, citizenship } = getEmployeeNameAndCitizenship(employee);

  // Actual documents for this employee
  const employeeDocuments = documents.filter(doc => doc.employeeId === employeeId);

  // Determine the worst document status for the employee
  const worstStatus = determineWorstStatus(employeeDocuments);
  
  // All document types that might be relevant for employees of this provider
  const relevantDocTypes = documentTypes.filter(dt => {
    // Filter by employee relevance
    if (!dt.isPerEmployee) return false;
    
    // Filter based on citizenship - A1-Bescheinigung not needed for Germans
    if (dt.id === "doc-type-11" && citizenship === "Deutschland") return false; 
    
    // Exclude documents that should be missing/hidden for this employee
    if (shouldDocumentBeMissing(employeeId!, dt.id)) return false;
    
    return true;
  });

  // Handle company assignment
  const handleCompanyAssignment = (company: string) => {
    setAssignedCompany(company);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{employeeName}</h1>
          <StatusBadge status={worstStatus} />
        </div>
        <div className="flex gap-2">
          <Link to="/">
            <Button variant="outline">Zurück zur Übersicht</Button>
          </Link>
        </div>
      </div>

      <VendorEmployeeInformation 
        employee={employee}
        employeeName={employeeName}
        citizenship={citizenship}
      />

      <CompanyAssignment
        assignedCompany={assignedCompany}
        availableCompanies={availableCompanies}
        employeeName={employeeName}
        onCompanyAssignment={handleCompanyAssignment}
      />

      <VendorDocumentsTable 
        relevantDocTypes={relevantDocTypes}
        employeeDocuments={employeeDocuments}
        employeeId={employeeId!}
        citizenship={citizenship}
      />
    </div>
  );
};

export default VendorPersonView;
