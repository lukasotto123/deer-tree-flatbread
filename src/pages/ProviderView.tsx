
import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, FileText, Eye, AlertTriangle, Clock, CheckCircle, Euro, ToggleLeft, ToggleRight, X, Check, Users } from "lucide-react";
import { useProviders, useEmployees, useDocuments, useDocumentTypes } from "@/hooks/useSupabaseData";
import StatusBadge from "@/components/ui/StatusBadge";
import DocumentHistory from "@/components/ui/DocumentHistory";
import { toast } from "sonner";
import { DocumentCategory, DocumentType } from "@/types";
import { triggerDocumentReminder } from "@/components/person/documentStatusUtils";

const ProviderView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // ALL HOOKS MUST BE CALLED FIRST, BEFORE ANY CONDITIONAL LOGIC
  const { data: providers = [], isLoading: providersLoading, error: providersError } = useProviders();
  const { data: employees = [], isLoading: employeesLoading, error: employeesError } = useEmployees();
  const { data: documents = [], isLoading: documentsLoading, error: documentsError } = useDocuments();
  const { data: documentTypes = [], isLoading: documentTypesLoading, error: documentTypesError } = useDocumentTypes();
  
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  
  // Find provider with stable dependencies
  const provider = useMemo(() => {
    if (!id || !providers.length) return null;
    return providers.find(p => p.id === id) || null;
  }, [providers, id]);
  
  // Scroll to top when component mounts or provider ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  // Set isActive based on provider status - using useEffect with proper dependencies
  useEffect(() => {
    if (provider) {
      setIsActive(provider.status === 'active');
    }
  }, [provider]);
  
  // Memoize filtered data with stable dependencies
  const allProviderDocuments = useMemo(() => {
    if (!id || !documents.length) return [];
    return documents.filter(doc => doc.providerId === id);
  }, [documents, id]);
  
  const providerDocuments = useMemo(() => {
    return allProviderDocuments.filter(doc => !doc.employeeId);
  }, [allProviderDocuments]);
  
  const providerEmployees = useMemo(() => {
    if (!id || !employees.length) return [];
    return employees.filter(e => e.providerId === id);
  }, [employees, id]);
  
  // Calculate document counts with stable dependencies
  const actualDocumentCounts = useMemo(() => {
    const valid = allProviderDocuments.filter(doc => doc.status === 'valid').length;
    const expiring = allProviderDocuments.filter(doc => doc.status === 'expiring').length;
    const expired = allProviderDocuments.filter(doc => doc.status === 'expired').length;
    const missing = allProviderDocuments.filter(doc => doc.status === 'missing').length;
    
    return {
      total: allProviderDocuments.length,
      valid,
      expiring,
      expired,
      missing
    };
  }, [allProviderDocuments]);
  
  // Group document types by category with stable dependencies
  const documentTypesByCategory = useMemo(() => {
    if (!provider || !documentTypes.length) return {};
    
    return documentTypes
      .filter(dt => dt.providerType === provider.type)
      .reduce((acc, docType) => {
        if (!acc[docType.category]) {
          acc[docType.category] = [];
        }
        acc[docType.category].push(docType);
        return acc;
      }, {} as Record<DocumentCategory, DocumentType[]>);
  }, [documentTypes, provider]);
  
  // NOW we can do conditional returns after all hooks are called
  if (providersLoading || employeesLoading || documentsLoading || documentTypesLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }
  
  // Handle error states
  if (providersError || employeesError || documentsError || documentTypesError) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">Fehler beim Laden der Daten</p>
          <p className="text-muted-foreground text-sm">
            {providersError?.message || employeesError?.message || documentsError?.message || documentTypesError?.message}
          </p>
          <Button variant="outline" onClick={() => navigate("/")}>
            Zurück zur Übersicht
          </Button>
        </div>
      </div>
    );
  }
  
  if (!provider) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">Dienstleister nicht gefunden</p>
          <Button variant="outline" onClick={() => navigate("/")}>
            Zurück zur Übersicht
          </Button>
        </div>
      </div>
    );
  }

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

  // Handle sending reminders for expiring/expired documents
  const handleRequestDocument = async (documentId: string, status: string) => {
    try {
      await triggerDocumentReminder(documentId, provider.id, undefined, status);
      toast.success(`Erinnerung für ${status === 'expired' ? 'abgelaufenes' : 'ablaufendes'} Dokument wurde gesendet`);
    } catch (error) {
      toast.error('Fehler beim Senden der Erinnerung');
      console.error('Error sending reminder:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{provider.name}</h1>
          <StatusBadge status={actualDocumentCounts.expired > 0 ? "expired" : (actualDocumentCounts.expiring > 0 ? "expiring" : "valid")} />
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
              // Get actual documents for this employee from Supabase
              const employeeDocuments = allProviderDocuments.filter(doc => doc.employeeId === employee.id);
              
              // Calculate document status counts based on real Supabase data
              const validDocs = employeeDocuments.filter(d => d.status === 'valid').length;
              const expiringDocs = employeeDocuments.filter(d => d.status === 'expiring').length;
              const expiredDocs = employeeDocuments.filter(d => d.status === 'expired').length;
              const missingDocs = employeeDocuments.filter(d => d.status === 'missing').length;
              
              // Determine overall status
              const hasExpired = expiredDocs > 0;
              const hasMissing = missingDocs > 0;
              const hasExpiring = expiringDocs > 0;
              const worstStatus = hasExpired ? "expired" : (hasMissing ? "missing" : (hasExpiring ? "expiring" : "valid"));

              // Combine expired and missing counts for display (both use warning icon)
              const warningCount = expiredDocs + missingDocs;

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
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span>{warningCount}</span>
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
          {Object.entries(documentTypesByCategory).map(([category, docTypes]) => {
            // Type assertion to ensure docTypes is properly typed
            const typedDocTypes = docTypes as DocumentType[];
            
            return (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-4">{typedDocTypes[0]?.categoryLabel || category}</h3>
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
                    {typedDocTypes.map((docType) => {
                      // Find actual document from Supabase data
                      const doc = providerDocuments.find(d => d.type === docType.id);
                      const isRelevant = true; // Default to true, would come from API
                      const hasHistory = doc && selectedDocumentId === doc.id;
                      
                      return (
                        <React.Fragment key={docType.id}>
                          <TableRow className={!isActive ? 'opacity-60' : ''}>
                            <TableCell>{docType.name}</TableCell>
                            <TableCell>
                              {doc ? (
                                <StatusBadge status={doc.status} />
                              ) : (
                                <StatusBadge status="missing" />
                              )}
                            </TableCell>
                            <TableCell>
                              {doc?.issuedDate ? new Date(doc.issuedDate).toLocaleDateString('de-DE') : '-'}
                            </TableCell>
                            <TableCell>
                              {doc?.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('de-DE') : '-'}
                            </TableCell>
                            <TableCell>
                              {(doc?.status === "expired" || doc?.status === "expiring" || !doc) && (
                                <div className="text-sm">
                                  <div>Erinnerungen verfügbar</div>
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
                                  {isRelevant ? "Relevant" : "Nicht relevant"}
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
                                
                                {/* Request button for non-valid or missing documents */}
                                {(!doc || (doc && doc.status !== "valid")) && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    disabled={!isActive}
                                    onClick={() => handleRequestDocument(doc?.id || `missing-${docType.id}`, doc?.status || 'missing')}
                                  >
                                    Anfordern
                                  </Button>
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
            );
          })}
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
