import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, FileText, Eye, AlertTriangle, Clock, CheckCircle, Euro, ToggleLeft, ToggleRight } from "lucide-react";
import { providers, employees, documents, documentTypes } from "@/data/dummy-data";
import StatusBadge from "@/components/ui/StatusBadge";
import DocumentHistory from "@/components/ui/DocumentHistory";
import { toast } from "sonner";

const ProviderView = () => {
  const { id } = useParams<{ id: string }>();
  const provider = providers.find(p => p.id === id);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(provider?.status === 'active');
  
  if (!provider) {
    return <div>Dienstleister nicht gefunden</div>;
  }
  
  // Dokumente für diesen Dienstleister
  const providerDocuments = documents.filter(doc => 
    doc.providerId === id && !doc.employeeId
  );

  // Relevante Dokumenttypen für diesen Dienstleister
  const relevantDocTypes = documentTypes.filter(dt => 
    dt.providerType === provider.type && !dt.isPerEmployee
  );
  
  // Mitarbeiter dieses Dienstleisters
  const providerEmployees = employees.filter(e => e.providerId === id);

  // Function to determine if a document should be missing based on provider and document type
  const shouldDocumentBeMissing = (providerId: string, documentTypeId: string) => {
    // For specific providers, mark certain documents as missing
    if (providerId === "provider-1" && documentTypeId === "doc-type-1") return true;
    if (providerId === "provider-2" && documentTypeId === "doc-type-2") return true;
    if (providerId === "provider-3" && documentTypeId === "doc-type-3") return true;
    if (providerId === "provider-4" && documentTypeId === "doc-type-4") return true;
    return false;
  };

  // Randomly distribute document statuses with 70% valid documents
  const getRandomStatus = () => {
    const rand = Math.random();
    if (rand < 0.7) return "valid";
    else if (rand < 0.85) return "expiring";
    else return "expired";
  };

  // Handle document selection for showing history
  const handleShowDocumentHistory = (docId: string) => {
    setSelectedDocumentId(docId === selectedDocumentId ? null : docId);
  };

  // Dummy function to handle activation/deactivation
  const handleToggleActivation = () => {
    setIsActive(!isActive);
    toast.success(
      isActive 
        ? `${provider.name} wurde deaktiviert` 
        : `${provider.name} wurde aktiviert`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{provider.name}</h1>
          <StatusBadge status={isActive ? "valid" : "expired"} />
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleToggleActivation}
          >
            {isActive ? (
              <>
                <ToggleRight className="h-5 w-5 text-green-600" />
                Deaktivieren
              </>
            ) : (
              <>
                <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                Aktivieren
              </>
            )}
          </Button>
          <Link to="/">
            <Button variant="outline">Zurück zur Übersicht</Button>
          </Link>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Unternehmensinformationen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Kontakt E-Mail</p>
              <p>{provider.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontakt Telefon</p>
              <p>{provider.contactPhone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Adresse</p>
              <p>{provider.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Typ</p>
              <p>{provider.type === 'subunternehmer' ? 'Subunternehmer' : 'Personaldienstleister'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <StatusBadgeGerman status={provider.status} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ANÜ Erlaubnis</p>
              <span className={`${provider.hasANUPermission ? 'text-success' : 'text-destructive'} font-medium`}>
                {provider.hasANUPermission ? 'Ja' : 'Nein'}
              </span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Letzte Aktualisierung</p>
              <p>{new Date(provider.lastUpdated).toLocaleDateString('de-DE')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mitarbeiter als Kärtchen */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mitarbeiter</CardTitle>
          <Button size="sm">Mitarbeiter hinzufügen</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {providerEmployees.map((employee) => {
              const employeeDocuments = documents.filter(doc => doc.employeeId === employee.id);
              const valid = employeeDocuments.filter(d => d.status === 'valid').length;
              const expiring = employeeDocuments.filter(d => d.status === 'expiring').length;
              const expired = employeeDocuments.filter(d => d.status === 'expired').length;
              const missing = employeeDocuments.filter(d => d.status === 'missing').length;
              
              // Determine the worst status for this employee
              const hasExpired = expired > 0;
              const hasMissing = missing > 0;
              const hasExpiring = expiring > 0;
              const worstEmployeeStatus = hasExpired ? "expired" : (hasMissing ? "missing" : (hasExpiring ? "expiring" : "valid"));
              
              // Assign nationality-appropriate names
              let employeeName = employee.name;
              if (employee.id === "employee-1") employeeName = "Hans Schmidt";
              if (employee.id === "employee-2") employeeName = "Maria Wagner";
              if (employee.id === "employee-3") employeeName = "Pierre Dubois";
              if (employee.id === "employee-4") employeeName = "Isabella Romano";
              if (employee.id === "employee-5") employeeName = "Miguel González";
              if (employee.id === "employee-6") employeeName = "Sophia Müller";
              if (employee.id === "employee-7") employeeName = "Jan Kowalski";
              if (employee.id === "employee-8") employeeName = "Anna Hofer";
              if (employee.id === "employee-9") employeeName = "Erik Johansson";
              if (employee.id === "employee-10") employeeName = "Yuki Tanaka";
              
              return (
                <Card key={employee.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{employeeName}</h3>
                            <StatusBadge status={worstEmployeeStatus} className="ml-2" />
                          </div>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                        </div>
                      </div>
                      <Link to={`/person/${id}/${employee.id}`}>
                        <Button variant="ghost" size="sm">Details</Button>
                      </Link>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex space-x-3 text-sm">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{valid}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-amber-500" />
                          <span>{expiring}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                          <span>{expired + missing}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dokumente des Unternehmens */}
      <Card>
        <CardHeader>
          <CardTitle>Unternehmensdokumente</CardTitle>
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
                // Check if this document should be missing for this provider
                const forceMissing = shouldDocumentBeMissing(provider.id, docType.id);
                const doc = forceMissing ? null : providerDocuments.find(d => d.type === docType.id);
                
                const randomStatus = getRandomStatus(); // Generate random status
                const isRelevant = true; // Default to true, would come from API
                const isMissing = !doc;
                // Set "Werksverträge" to "Verpflichtend"
                const isContractDoc = docType.name === "Werksverträge";
                const hasHistory = doc && selectedDocumentId === doc.id;

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
                          <Switch id={`relevance-${docType.id}`} checked={isRelevant} />
                          <Label htmlFor={`relevance-${docType.id}`}>
                            {isContractDoc ? "Verpflichtend" : (isRelevant ? "Relevant" : "Nicht relevant")}
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
                            isMissing ? (
                              <Button variant="outline" size="sm">
                                Hochladen
                              </Button>
                            ) : (
                              <Link to={`/document-review/${id}/${doc.id}`}>
                                <Button variant="outline" size="sm">
                                  Prüfen
                                </Button>
                              </Link>
                            )
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

const StatusBadgeGerman = ({ status }: { status: 'active' | 'inactive' | 'pending' }) => {
  const statusMap = {
    active: { text: "Aktiv", className: "bg-green-100 text-green-800" },
    inactive: { text: "Inaktiv", className: "bg-red-100 text-red-800" },
    pending: { text: "Ausstehend", className: "bg-yellow-100 text-yellow-800" },
  };

  const { text, className } = statusMap[status];
  
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${className}`}>
      {text}
    </span>
  );
};

export default ProviderView;
