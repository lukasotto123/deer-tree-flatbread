
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FileText } from "lucide-react";
import { documentTypes, documents, providers, employees } from "@/data/dummy-data";
import DocumentHistory from "@/components/ui/DocumentHistory";

const SingleDocumentView = () => {
  const { id } = useParams<{ id: string }>();
  const docType = documentTypes.find(dt => dt.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  
  if (!docType) {
    return <div>Dokument nicht gefunden</div>;
  }

  // Alle tatsächlichen Dokumente dieses Typs
  const relatedDocuments = documents.filter(doc => doc.type === docType.id);
  
  // Alle Provider, die diesen Dokumenttyp verwenden sollten
  const relevantProviders = providers.filter(p => p.type === docType.providerType);

  const handleViewDocument = (docId: string) => {
    setSelectedDocId(docId);
    setShowPdfDialog(true);
  };

  // Adjust the form values for Werksverträge - UI only, doesn't affect the actual data
  const displayDocType = docType.name.includes("Werksvertrag") 
    ? {...docType, requiredFor: {...docType.requiredFor, secure: "Verpflichtend", basic: "Verpflichtend"}} 
    : docType;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{displayDocType.name}</h1>
        <div className="flex gap-2">
          <Button 
            variant={isEditing ? "default" : "outline"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Speichern" : "Bearbeiten"}
          </Button>
          <Link to="/document-requirements">
            <Button variant="outline">Zurück zur Übersicht</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dokumentkonfiguration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="description" className="text-sm text-muted-foreground">Beschreibung</Label>
              {isEditing ? (
                <Input 
                  id="description"
                  defaultValue={displayDocType.description} 
                  className="mt-1"
                />
              ) : (
                <p>{displayDocType.description}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="providerType" className="text-sm text-muted-foreground">Unternehmenstyp</Label>
              {isEditing ? (
                <div className="flex gap-2 mt-1">
                  <Button 
                    variant={displayDocType.providerType === "personaldienstleister" ? "default" : "outline"}
                    size="sm"
                  >
                    Personaldienstleister
                  </Button>
                  <Button 
                    variant={displayDocType.providerType === "subunternehmer" ? "default" : "outline"}
                    size="sm"
                  >
                    Subunternehmer
                  </Button>
                </div>
              ) : (
                <p>{displayDocType.providerType === "personaldienstleister" 
                    ? "Personaldienstleister" 
                    : "Subunternehmer"}
                </p>
              )}
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="isPerEmployee"
                  defaultChecked={displayDocType.isPerEmployee}
                  disabled={!isEditing}
                />
                <Label htmlFor="isPerEmployee" className="text-sm text-muted-foreground">Pro Mitarbeiter</Label>
              </div>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="isClientSpecific"
                  defaultChecked={displayDocType.isClientSpecific}
                  disabled={!isEditing}
                />
                <Label htmlFor="isClientSpecific" className="text-sm text-muted-foreground">Klientenspezifisch</Label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="secureFrequency" className="text-sm text-muted-foreground">Sichere Prüfung - Frequenz</Label>
              {isEditing ? (
                <Input 
                  id="secureFrequency"
                  defaultValue={displayDocType.checkFrequency.secure} 
                  className="mt-1"
                />
              ) : (
                <p>{displayDocType.checkFrequency.secure}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="secureReq" className="text-sm text-muted-foreground">Sichere Prüfung - Erfordernis</Label>
              {isEditing ? (
                <Input 
                  id="secureReq"
                  defaultValue={displayDocType.requiredFor.secure} 
                  className="mt-1"
                />
              ) : (
                <p>{displayDocType.requiredFor.secure}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="basicFrequency" className="text-sm text-muted-foreground">Basisprüfung - Frequenz</Label>
              {isEditing ? (
                <Input 
                  id="basicFrequency"
                  defaultValue={displayDocType.checkFrequency.basic} 
                  className="mt-1"
                />
              ) : (
                <p>{displayDocType.checkFrequency.basic}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="basicReq" className="text-sm text-muted-foreground">Basisprüfung - Erfordernis</Label>
              {isEditing ? (
                <Input 
                  id="basicReq"
                  defaultValue={displayDocType.requiredFor.basic} 
                  className="mt-1"
                />
              ) : (
                <p>{displayDocType.requiredFor.basic}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="issuanceType" className="text-sm text-muted-foreground">Ausstellungstyp</Label>
              {isEditing ? (
                <div className="flex gap-2 mt-1">
                  <Button 
                    variant={displayDocType.issuanceType === "pro Unternehmen" ? "default" : "outline"}
                    size="sm"
                  >
                    Pro Unternehmen
                  </Button>
                  <Button 
                    variant={displayDocType.issuanceType === "pro Mitarbeiter" ? "default" : "outline"}
                    size="sm"
                  >
                    Pro Mitarbeiter
                  </Button>
                </div>
              ) : (
                <p>{displayDocType.issuanceType}</p>
              )}
            </div>
          </div>
        </CardContent>
        {isEditing && (
          <CardFooter className="flex justify-end">
            <Button variant="outline" className="mr-2" onClick={() => setIsEditing(false)}>
              Abbrechen
            </Button>
            <Button onClick={() => setIsEditing(false)}>
              Änderungen speichern
            </Button>
          </CardFooter>
        )}
      </Card>

      {displayDocType.isPerEmployee && (
        <Card>
          <CardHeader>
            <CardTitle>Mitarbeitermatrix</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mitarbeiter</TableHead>
                  <TableHead>Unternehmen</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ablaufdatum</TableHead>
                  <TableHead>Erinnerungen</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.filter(e => {
                  const provider = providers.find(p => p.id === e.providerId);
                  return provider && provider.type === displayDocType.providerType;
                }).map((employee) => {
                  const doc = relatedDocuments.find(d => d.employeeId === employee.id);
                  const providerName = providers.find(p => p.id === employee.providerId)?.name || '';
                  const isMissing = !doc || doc.status === 'missing';
                  
                  return (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{providerName}</TableCell>
                      <TableCell>
                        {doc ? <StatusBadgeGerman document={doc.status} /> : <StatusBadgeGerman document="missing" />}
                      </TableCell>
                      <TableCell>
                        {doc && doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('de-DE') : '-'}
                      </TableCell>
                      <TableCell>
                        {isMissing && (
                          <div className="text-sm">
                            <span>{doc?.remindersSent || 0} gesendet</span>
                            {doc?.nextReminderDate && (
                              <div className="text-xs text-muted-foreground">
                                Nächste: {new Date(doc.nextReminderDate).toLocaleDateString('de-DE')}
                              </div>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {doc && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDocument(doc.id)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Anzeigen
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Dokumentinstanzen</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unternehmen</TableHead>
                {displayDocType.isPerEmployee && <TableHead>Mitarbeiter</TableHead>}
                <TableHead>Status</TableHead>
                <TableHead>Ausstellungsdatum</TableHead>
                <TableHead>Ablaufdatum</TableHead>
                <TableHead>Nächste Prüfung</TableHead>
                <TableHead>Erinnerungen</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relatedDocuments.map((doc) => {
                const providerName = providers.find(p => p.id === doc.providerId)?.name || '';
                const employeeName = doc.employeeId 
                  ? employees.find(e => e.id === doc.employeeId)?.name 
                  : '';
                const isMissing = doc.status === 'missing';
                
                return (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{providerName}</TableCell>
                    {displayDocType.isPerEmployee && <TableCell>{employeeName}</TableCell>}
                    <TableCell>
                      <StatusBadgeGerman document={doc.status} />
                    </TableCell>
                    <TableCell>{new Date(doc.issuedDate).toLocaleDateString('de-DE')}</TableCell>
                    <TableCell>
                      {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('de-DE') : '-'}
                    </TableCell>
                    <TableCell>
                      {doc.nextCheckDue ? new Date(doc.nextCheckDue).toLocaleDateString('de-DE') : '-'}
                    </TableCell>
                    <TableCell>
                      {isMissing && (
                        <div className="text-sm">
                          <span>{doc.remindersSent || 0} gesendet</span>
                          {doc.nextReminderDate && (
                            <div className="text-xs text-muted-foreground">
                              Nächste: {new Date(doc.nextReminderDate).toLocaleDateString('de-DE')}
                            </div>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDocument(doc.id)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Anzeigen
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedDocId && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Dokumentenhistorie</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentHistory documentId={selectedDocId} />
          </CardContent>
        </Card>
      )}

      <Dialog open={showPdfDialog} onOpenChange={setShowPdfDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Dokumentvorschau</DialogTitle>
          </DialogHeader>
          <div className="border rounded-md overflow-hidden">
            <AspectRatio ratio={1 / 1.414}>
              <img 
                src="/lovable-uploads/666d55f0-3a14-41c8-ada9-829e8a7aef6c.png" 
                alt="Document Preview" 
                className="object-contain w-full h-full"
              />
            </AspectRatio>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const StatusBadgeGerman = ({ document }: { document: 'valid' | 'expiring' | 'expired' | 'missing' }) => {
  const docStatusMap = {
    valid: { text: "Gültig", className: "bg-green-100 text-green-800" },
    expiring: { text: "Läuft bald ab", className: "bg-yellow-100 text-yellow-800" },
    expired: { text: "Abgelaufen", className: "bg-red-100 text-red-800" },
    missing: { text: "Fehlt", className: "bg-gray-100 text-gray-800" },
  };
  
  const { text, className } = docStatusMap[document];
  
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${className}`}>
      {text}
    </span>
  );
};

export default SingleDocumentView;
