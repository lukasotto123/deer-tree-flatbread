import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { employees, documents, providers, documentTypes } from "@/data/dummy-data";
import StatusBadge from "@/components/ui/StatusBadge";
import { FileText, Eye } from "lucide-react";
import DocumentHistory from "@/components/ui/DocumentHistory";

const PersonView = () => {
  const { providerId, employeeId } = useParams<{ providerId: string; employeeId: string }>();
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  
  const employee = employees.find(e => e.id === employeeId);
  const provider = providers.find(p => p.id === providerId);
  
  if (!employee || !provider) {
    return <div>Mitarbeiter nicht gefunden</div>;
  }

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
  
  // Fehlende Dokumente identifizieren
  const missingDocuments = relevantDocTypes.filter(dt => 
    !employeeDocuments.some(doc => doc.type === dt.id)
  );

  // Handle document selection for showing history
  const handleShowDocumentHistory = (docId: string) => {
    setSelectedDocumentId(docId === selectedDocumentId ? null : docId);
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
                <TableHead>Dokumentenname</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ausstellungsdatum</TableHead>
                <TableHead>Ablaufdatum</TableHead>
                <TableHead>Erinnerungen</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeDocuments.map((doc) => {
                const docTypeName = documentTypes.find(dt => dt.id === doc.type)?.name || doc.name;
                const isValid = doc.status === "valid";
                
                return (
                  <React.Fragment key={doc.id}>
                    <TableRow>
                      <TableCell className="font-medium">{docTypeName}</TableCell>
                      <TableCell>
                        <StatusBadge status={doc.status} />
                      </TableCell>
                      <TableCell>{new Date(doc.issuedDate).toLocaleDateString('de-DE')}</TableCell>
                      <TableCell>
                        {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('de-DE') : '-'}
                      </TableCell>
                      <TableCell>
                        {(doc.status === "missing" || doc.status === "expired") && (
                          <div className="text-sm">
                            <div>{doc.remindersSent || 0} gesendet</div>
                            <div className="text-xs text-muted-foreground">
                              Nächste: {doc.nextReminderDate ? new Date(doc.nextReminderDate).toLocaleDateString('de-DE') : 'Heute'}
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShowDocumentHistory(doc.id)}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Historie
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Anzeigen
                          </Button>
                          {!isValid && (
                            <Link to={`/submission-review/${providerId}/${doc.id}?employeeId=${employeeId}`}>
                              <Button variant="outline" size="sm">
                                Prüfen
                              </Button>
                            </Link>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {selectedDocumentId === doc.id && (
                      <TableRow>
                        <TableCell colSpan={6} className="p-0 border-b-0">
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

      {missingDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Fehlende Dokumente</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dokumentenname</TableHead>
                  <TableHead>Beschreibung</TableHead>
                  <TableHead>Erfordernis</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {missingDocuments.map((docType) => {
                  // Adjust requirement based on citizenship
                  let requirement = docType.requiredFor.secure;
                  if (docType.id === "doc-type-11" && citizenship !== "Deutschland") {
                    requirement = "Verpflichtend (A1-Bescheinigung für nicht-deutsche Staatsangehörige)";
                  }
                  
                  return (
                    <TableRow key={docType.id}>
                      <TableCell className="font-medium">{docType.name}</TableCell>
                      <TableCell>{docType.description}</TableCell>
                      <TableCell>{requirement}</TableCell>
                      <TableCell className="text-right">
                        <Link to={`/submission-review/${providerId}/new?documentType=${docType.id}&employeeId=${employeeId}`}>
                          <Button variant="outline" size="sm">Anfordern</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PersonView;
