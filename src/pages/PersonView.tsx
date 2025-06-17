
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { employees, documents, providers, documentTypes } from "@/data/dummy-data";
import StatusBadge from "@/components/ui/StatusBadge";
import EmployeeInformation from "@/components/person/EmployeeInformation";
import DocumentsTable from "@/components/person/DocumentsTable";
import { getEmployeeNameAndCitizenship, determineWorstStatus, shouldDocumentBeMissing } from "@/components/person/documentStatusUtils";

const PersonView = () => {
  const { providerId, employeeId } = useParams<{ providerId: string; employeeId: string }>();
  
  const employee = employees.find(e => e.id === employeeId);
  const provider = providers.find(p => p.id === providerId);
  
  if (!employee || !provider) {
    return <div>Mitarbeiter nicht gefunden</div>;
  }

  const { employeeName, citizenship } = getEmployeeNameAndCitizenship(employee);
  
  // Tatsächliche Dokumente des Mitarbeiters
  const employeeDocuments = documents.filter(doc => doc.employeeId === employeeId);

  // Determine the worst document status for the employee
  const worstStatus = determineWorstStatus(employeeDocuments);
  
  // Alle Dokumenttypen, die für Mitarbeiter dieses Dienstleisters relevant sein könnten
  const relevantDocTypes = documentTypes.filter(dt => {
    // Filter by provider type
    if (dt.providerType !== provider.type) return false;
    
    // Filter by employee relevance
    if (!dt.isPerEmployee) return false;
    
    // Filter based on citizenship - A1-Bescheinigung not needed for Germans
    if (dt.id === "doc-type-11" && citizenship === "Deutschland") return false; 
    
    // Exclude documents that should be missing/hidden for this employee
    if (shouldDocumentBeMissing(employeeId!, dt.id)) return false;
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{employeeName}</h1>
          <StatusBadge status={worstStatus} />
        </div>
        <div className="flex gap-2">
          <Link to={`/provider/${providerId}`}>
            <Button variant="outline">Zurück zum Unternehmen</Button>
          </Link>
        </div>
      </div>

      <EmployeeInformation 
        employee={employee}
        provider={provider}
        employeeName={employeeName}
        citizenship={citizenship}
      />

      <DocumentsTable 
        relevantDocTypes={relevantDocTypes}
        employeeDocuments={employeeDocuments}
        employeeId={employeeId!}
        providerId={providerId!}
        citizenship={citizenship}
      />
    </div>
  );
};

export default PersonView;
