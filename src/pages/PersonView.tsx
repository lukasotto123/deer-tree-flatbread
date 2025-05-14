
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { employees, documents, providers, documentTypes } from "@/data/dummy-data";
import StatusBadge from "@/components/ui/StatusBadge";
import { FileText, Eye, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import DocumentHistory from "@/components/ui/DocumentHistory";

const PersonView = () => {
  const { providerId, employeeId } = useParams<{ providerId: string; employeeId: string }>();
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  
  const employee = employees.find(e => e.id === employeeId);
  const provider = providers.find(p => p.id === providerId);
  
  if (!employee || !provider) {
    return <div>Mitarbeiter nicht gefunden</div>;
  }

  // Function to determine if a document should be missing based on employee and document type
  const shouldDocumentBeMissing = (employeeId: string, documentTypeId: string) => {
    // Mark some documents as missing for specific employees
    if (employeeId === "employee-1" && documentTypeId === "doc-type-5") return true;
    if (employeeId === "employee-2" && documentTypeId === "doc-type-6") return true;
    if (employeeId === "employee-3" && documentTypeId === "doc-type-7") return true;
    if (employeeId === "employee-4" && documentTypeId === "doc-type-8") return true;
    return false;
  };

  // Assign nationality-appropriate names and citizenships
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

  // Tatsächliche Dokumente des Mitarbeiters
  const employeeDocuments = documents.filter(doc => doc.employeeId === employeeId);

  // Determine the worst document status for the employee
  const hasExpired = employeeDocuments.some(doc => doc.status === "expired");
  const hasExpiring = employeeDocuments.some(doc => doc.status === "expiring");
  const hasMissing = employeeDocuments.some(doc => doc.status === "missing");
  
  const worstStatus = hasExpired ? "expired" : (hasMissing ? "missing" : (hasExpiring ? "expiring" : "valid"));
  
  // Alle Dokumenttypen, die für Mitarbeiter dieses Dienstleisters relevant sein könnten
  const relevantDocTypes = documentTypes.filter(dt => {
    // Filter by provider type
    if (dt.providerType !== provider.type) return false;
    
    // Filter by employee relevance
    if (!dt.isPerEmployee) return false;
    
    // Filter based on citizenship - A1-Bescheinigung not needed for Germans
    if (dt.id === "doc-type-11" && citizenship === "Deutschland") return false; 
    
    return true;
  });

  // Handle document selection for showing history
  const handleShowDocumentHistory = (docId: string) => {
    setSelectedDocumentId(docId === selectedDocumentId ? null : docId);
  };

  // Function to get randomly distributed status (used for existing documents)
  const getRandomStatus = () => {
    const rand = Math.random();
    if (rand < 0.7) return "valid";
    else if (rand < 0.85) return "expiring";
    else return "expired";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{employeeName}</h1>
          <StatusBadge status={worstStatus} />
        </div>
        <Link to={`/provider/${providerId}`}>
          <Button variant="outline">Zurück zum Unternehmen</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mitarbeiterinformationen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Position</p>
              <p>{employee.position}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Staatsbürgerschaft</p>
              <p>{citizenship}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unternehmen</p>
              <p>{provider.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unternehmenstyp</p>
              <p>{provider.type === "personaldienstleister" ? "Personaldienstleister" : "Subunternehmer"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Dokumente</CardTitle>
          <Link to={`/submission-review/${providerId}/new?employeeId=${employeeId}`}>
            <Button size="sm">Dokument hochladen</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dokument</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ausstellungsdatum</TableHead>
                <TableHead>Ablaufdatum</TableHead>
                <TableHead>Erinnerungen</TableHead>
                <TableHead>Relevanz</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relevantDocTypes.map((docType) => {
                // Check if this document should be missing for this employee
                const forceMissing = shouldDocumentBeMissing(employeeId, docType.id);
                const doc = forceMissing ? null : employeeDocuments.find(d => d.type === docType.id);
                
                const randomStatus = getRandomStatus(); // Generate random status
                const docStatus = doc ? randomStatus : "missing";
                const isRelevant = true;
                
                // Special case for A1-Bescheinigung - only relevant for non-Germans
                const isA1Doc = docType.id === "doc-type-11";
                const isRequired = isA1Doc ? citizenship !== "Deutschland" : true;

                const hasHistory = doc && selectedDocumentId === doc.id;
                const isMissing = !doc;

                return (
                  <React.Fragment key={docType.id}>
                    <TableRow>
                      <TableCell>{docType.name}</TableCell>
                      <TableCell>
                        {isMissing ? (
                          <StatusBadge status="missing" />
                        ) : (
                          <StatusBadge status={randomStatus} />
                        )}
                      </TableCell>
                      <TableCell>
                        {doc ? new Date(doc.issuedDate).toLocaleDateString('de-DE') : '-'}
                      </TableCell>
                      <TableCell>
                        {!isMissing && (randomStatus === "expiring" || randomStatus === "expired")
                          ? new Date(new Date().setMonth(new Date().getMonth() + (randomStatus === "expiring" ? 1 : -1))).toLocaleDateString('de-DE')
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {(isMissing || randomStatus === "expired") && (
                          <div className="text-sm">
                            <div>{Math.floor(Math.random() * 3)} gesendet</div>
                            <div className="text-xs text-muted-foreground">
                              Nächste: {new Date().toLocaleDateString('de-DE')}
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch id={`relevance-${docType.id}`} checked={isRequired} />
                          <Label htmlFor={`relevance-${docType.id}`}>
                            {isA1Doc && citizenship !== "Deutschland" 
                              ? "Verpflichtend (A1)" 
                              : (isRequired ? "Relevant" : "Nicht relevant")}
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {/* Always show History button */}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShowDocumentHistory(doc ? doc.id : `missing-${docType.id}`)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Historie
                          </Button>
                          
                          {/* Only show View button for existing documents */}
                          {doc && (
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Anzeigen
                            </Button>
                          )}
                          
                          {/* Upload/Check button for non-valid or missing documents */}
                          {(isMissing || (doc && randomStatus !== "valid")) && (
                            <Link to={isMissing 
                              ? `/submission-review/${providerId}/new?documentType=${docType.id}&employeeId=${employeeId}`
                              : `/submission-review/${providerId}/${doc.id}?employeeId=${employeeId}`
                            }>
                              <Button variant="outline" size="sm">
                                {isMissing ? "Hochladen" : "Prüfen"}
                              </Button>
                            </Link>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {hasHistory && (
                      <TableRow>
                        <TableCell colSpan={7} className="p-0 border-b-0">
                          <div className="py-3">
                            <DocumentHistory documentId={doc.id} />
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonView;
