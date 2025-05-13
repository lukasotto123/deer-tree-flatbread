
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, Clock, FileText, Hourglass, User } from "lucide-react";
import { providers, employees, documents, documentTypes } from "@/data/dummy-data";

const ProviderView = () => {
  const { id } = useParams<{ id: string }>();
  const provider = providers.find(p => p.id === id);
  
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{provider.name}</h1>
        <div className="flex gap-2">
          <Link to={`/submission-review/${id}/new`}>
            <Button>Dokument hochladen</Button>
          </Link>
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
              <p className="text-sm text-muted-foreground">Letzte Aktualisierung</p>
              <p>{new Date(provider.lastUpdated).toLocaleDateString('de-DE')}</p>
            </div>
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
                <TableHead>Relevanz</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {relevantDocTypes.map((docType) => {
                const doc = providerDocuments.find(d => d.type === docType.id);
                const isRelevant = true; // Default to true, would come from API

                return (
                  <TableRow key={docType.id}>
                    <TableCell>{docType.name}</TableCell>
                    <TableCell>
                      {doc ? (
                        <StatusBadgeDocument status={doc.status} />
                      ) : (
                        <StatusBadgeDocument status="missing" />
                      )}
                    </TableCell>
                    <TableCell>
                      {doc ? new Date(doc.issuedDate).toLocaleDateString('de-DE') : '-'}
                    </TableCell>
                    <TableCell>
                      {doc && doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('de-DE') : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch id={`relevance-${docType.id}`} checked={isRelevant} />
                        <Label htmlFor={`relevance-${docType.id}`}>
                          {isRelevant ? "Relevant" : "Nicht relevant"}
                        </Label>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {doc ? (
                        <Link to={`/submission-review/${id}/${doc.id}`}>
                          <Button variant="outline" size="sm">Prüfen</Button>
                        </Link>
                      ) : (
                        <Link to={`/submission-review/${id}/new?documentType=${docType.id}`}>
                          <Button variant="outline" size="sm">Hochladen</Button>
                        </Link>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
              
              return (
                <Card key={employee.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                        </div>
                      </div>
                      <Link to={`/person/${id}/${employee.id}`}>
                        <Button variant="ghost" size="sm">Details</Button>
                      </Link>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex space-x-3 text-sm">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                          <span>{valid}</span>
                        </div>
                        <div className="flex items-center">
                          <Hourglass className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{expiring}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-red-500 mr-1" />
                          <span>{expired}</span>
                        </div>
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                          <span>{missing}</span>
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

const StatusBadgeDocument = ({ status }: { status: 'valid' | 'expiring' | 'expired' | 'missing' }) => {
  const docStatusMap = {
    valid: { text: "Gültig", className: "bg-green-100 text-green-800", icon: Check },
    expiring: { text: "Läuft bald ab", className: "bg-yellow-100 text-yellow-800", icon: Hourglass },
    expired: { text: "Abgelaufen", className: "bg-red-100 text-red-800", icon: Clock },
    missing: { text: "Fehlt", className: "bg-gray-100 text-gray-800", icon: AlertCircle },
  };
  
  const { text, className, icon: Icon } = docStatusMap[status];
  
  return (
    <div className="flex items-center gap-1">
      <Icon className={`h-4 w-4 ${status === 'valid' ? 'text-green-500' : status === 'expiring' ? 'text-yellow-500' : 'text-red-500'}`} />
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${className}`}>
        {text}
      </span>
    </div>
  );
};

export default ProviderView;
