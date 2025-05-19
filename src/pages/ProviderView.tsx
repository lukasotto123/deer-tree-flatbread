
import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, FileText, Eye, AlertTriangle, Clock, CheckCircle, Euro, ToggleLeft, ToggleRight, X, Check, Users } from "lucide-react";
import { providers, employees, documents, documentTypes } from "@/data/dummy-data";
import StatusBadge from "@/components/ui/StatusBadge";
import DocumentHistory from "@/components/ui/DocumentHistory";
import { toast } from "sonner";
import { DocumentCategory } from "@/types";

const ProviderView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  // Funktion zur Behandlung der Aktivierung/Deaktivierung
  const handleToggleActivation = () => {
    setIsActive(!isActive);
    toast.success(
      isActive 
        ? `${provider.name} wurde deaktiviert` 
        : `${provider.name} wurde aktiviert`
    );
  };

  // Custom document categories with specific documents according to requirements
  const customDocumentCategories = [
    {
      id: "cat-1",
      category: "sozial_versicherungsnachweise",
      label: "Sozial- & Versicherungsnachweise",
      documents: [
        { id: "doc-1", name: "Unbedenklichkeitsbescheinigung Berufsgenossenschaft", type: "doc-type-1" },
        { id: "doc-2", name: "Unbedenklichkeitsbescheinigung der SOKA Bau", type: "doc-type-2" },
        { id: "doc-3", name: "Betriebshaftpflichtversicherung", type: "doc-type-3" }
      ]
    },
    {
      id: "cat-2",
      category: "arbeits_mindestlohn_compliance", 
      label: "Arbeits- & Mindestlohn-Compliance",
      documents: [
        { id: "doc-4", name: "Bescheinigung für Tätigkeiten im Baugewerbe § 13b UStG", type: "doc-type-4" },
        { id: "doc-5", name: "Mitteilung des Steuerberaters (Mitarbeiter u. Mindestlöhne)", type: "doc-type-5" },
        { id: "doc-6", name: "Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen", type: "doc-type-6" }
      ]
    },
    {
      id: "cat-3",
      category: "behördliche_steuerliche_nachweise",
      label: "Behördliche & steuerliche Nachweise", 
      documents: [
        { id: "doc-7", name: "Testergebnis Scheinselbstständigkeit", type: "doc-type-7" },
        { id: "doc-8", name: "Freistellungsbescheinigung der Finanzverwaltung § 48b EStG", type: "doc-type-8" },
        { id: "doc-9", name: "Gewerbeanmeldung", type: "doc-type-9" },
        { id: "doc-10", name: "Unbedenklichkeitsbescheinigung Finanzamt", type: "doc-type-10" },
        { id: "doc-11", name: "Handelsregisterauszug", type: "doc-type-11" },
        { id: "doc-12", name: "Handwerkskarte bzw. Eintragung in die Handwerksrolle (IHK, wenn nicht Handwerk)", type: "doc-type-12" },
        { id: "doc-13", name: "Unternehmerbescheinigung vom Finanzamt", type: "doc-type-13" },
        { id: "doc-14", name: "Gewerbezentralregisterauszug", type: "doc-type-14" }
      ]
    },
    {
      id: "cat-4",
      category: "bonitäts_risikoprüfung",
      label: "Bonitäts- & Risikoprüfung",
      documents: [
        { id: "doc-15", name: "Creditreform-Selbstauskunft über Liquidität", type: "doc-type-15" }
      ]
    }
  ];

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
                <X className="h-5 w-5 text-red-600" />
                Deaktivieren
              </>
            ) : (
              <>
                <Check className="h-5 w-5 text-green-600" />
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
              <p className="text-sm text-muted-foreground">Rechnungsadresse</p>
              <p>{provider.billingAddress || provider.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Geschäftsführer</p>
              <p>{provider.managingDirector || "Nicht angegeben"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ansprechpartner</p>
              <p>{provider.contactPerson || "Nicht angegeben"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Typ</p>
              <p>{provider.type === 'nachunternehmer' ? 'Nachunternehmer' : 'Personaldienstleister'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <StatusBadgeGerman status={isActive ? 'active' : 'inactive'} />
            </div>
            {provider.type === 'personaldienstleister' && (
              <div>
                <p className="text-sm text-muted-foreground">ANÜ Erlaubnis</p>
                <span className={`${provider.hasANUPermission ? 'text-success' : 'text-destructive'} font-medium`}>
                  {provider.hasANUPermission ? 'Ja' : 'Nein'}
                </span>
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Letzte Aktualisierung</p>
              <p>{new Date(provider.lastUpdated).toLocaleDateString('de-DE')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mitarbeiter as Card Grid */}
      <Card className={!isActive ? 'opacity-60' : ''}>
        <CardHeader>
          <CardTitle>Mitarbeiter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providerEmployees.map((employee) => {
              // Get documents for this employee
              const employeeDocuments = documents.filter(doc => doc.employeeId === employee.id);
              
              // Calculate document status counts
              const validDocs = employeeDocuments.filter(d => d.status === 'valid').length;
              const expiringDocs = employeeDocuments.filter(d => d.status === 'expiring').length;
              const expiredDocs = employeeDocuments.filter(d => d.status === 'expired').length;
              const missingDocs = employeeDocuments.filter(d => d.status === 'missing').length;
              
              // Determine overall status
              const hasExpired = expiredDocs > 0;
              const hasMissing = missingDocs > 0;
              const hasExpiring = expiringDocs > 0;
              const worstStatus = hasExpired ? "expired" : (hasMissing ? "missing" : (hasExpiring ? "expiring" : "valid"));

              return (
                <Card key={employee.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground">{employee.position}</p>
                      </div>
                      <StatusBadge status={worstStatus} />
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>{validDocs}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span>{expiringDocs}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <span>{expiredDocs}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <span>{missingDocs}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Link to={`/person/${provider.id}/${employee.id}`}>
                        <Button variant="outline" size="sm">Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dokumente des Unternehmens nach Kategorien */}
      <Card className={!isActive ? 'opacity-60' : ''}>
        <CardHeader>
          <CardTitle>Unternehmensdokumente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {customDocumentCategories.map((category) => (
            <div key={category.id}>
              <h3 className="text-lg font-semibold mb-4">{category.label}</h3>
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
                  {category.documents.map((docType) => {
                    // Check if this document should be missing for this provider
                    const forceMissing = shouldDocumentBeMissing(provider.id, docType.type);
                    const doc = forceMissing ? null : providerDocuments.find(d => d.type === docType.type);
                    
                    const randomStatus = getRandomStatus(); // Generate random status
                    const isRelevant = true; // Default to true, would come from API
                    const isMissing = !doc;
                    // Set "Werksverträge" to "Verpflichtend"
                    const isContractDoc = docType.name === "Werksverträge";
                    const hasHistory = doc && selectedDocumentId === doc.id;

                    return (
                      <React.Fragment key={docType.id}>
                        <TableRow className={!isActive ? 'opacity-60' : ''}>
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
                              <Switch 
                                id={`relevance-${docType.id}`} 
                                checked={isRelevant} 
                                disabled={!isActive}
                              />
                              <Label htmlFor={`relevance-${docType.id}`}>
                                {isContractDoc ? "Verpflichtend" : (isRelevant ? "Relevant" : "Nicht relevant")}
                              </Label>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleShowDocumentHistory(doc ? doc.id : `missing-${docType.id}`)}
                                disabled={!isActive}
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                Historie
                              </Button>
                              
                              {/* Only show View button for existing documents */}
                              {doc && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  disabled={!isActive}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Anzeigen
                                </Button>
                              )}
                              
                              {/* Upload/Check button for non-valid or missing documents */}
                              {(isMissing || (doc && randomStatus !== "valid")) && (
                                isMissing ? (
                                  <Button variant="outline" size="sm" disabled={!isActive}>
                                    Hochladen
                                  </Button>
                                ) : (
                                  <Link to={`/document-review/${id}/${doc.id}`}>
                                    <Button variant="outline" size="sm" disabled={!isActive}>
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
            </div>
          ))}
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
