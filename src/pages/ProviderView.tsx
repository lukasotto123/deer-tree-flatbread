
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/StatusBadge";
import { providers, documents, employees } from "@/data/dummy-data";
import { User, FileText } from "lucide-react";

const ProviderView = () => {
  const { id } = useParams<{ id: string }>();
  const provider = providers.find(p => p.id === id);
  
  if (!provider) {
    return <div>Dienstleister nicht gefunden</div>;
  }

  const providerDocuments = documents.filter(doc => doc.providerId === id && !doc.employeeId);
  const providerEmployees = employees.filter(emp => emp.providerId === id);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{provider.name}</h1>
        <Link to="/">
          <Button variant="outline">Zurück zur Übersicht</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Unternehmensinformationen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Typ</p>
              <p>{provider.type === "personaldienstleister" ? "Personaldienstleister" : "Subunternehmer"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p>
                <StatusBadgeGerman status={provider.status} />
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontakt E-Mail</p>
              <p>{provider.contactEmail}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontakt Telefon</p>
              <p>{provider.contactPhone}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-muted-foreground">Adresse</p>
              <p>{provider.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Unternehmensdokumente</CardTitle>
          <Link to={`/submission-review/${provider.id}/new`}>
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
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providerDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    <StatusBadgeGerman document={doc.status} />
                  </TableCell>
                  <TableCell>{new Date(doc.issuedDate).toLocaleDateString('de-DE')}</TableCell>
                  <TableCell>
                    {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('de-DE') : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/submission-review/${provider.id}/${doc.id}`}>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Prüfen
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mitarbeiter</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Dokumente Status</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providerEmployees.map((employee) => {
                const employeeDocuments = documents.filter(doc => doc.employeeId === employee.id);
                const validDocs = employeeDocuments.filter(doc => doc.status === 'valid').length;
                const expiringDocs = employeeDocuments.filter(doc => doc.status === 'expiring').length;
                const expiredDocs = employeeDocuments.filter(doc => doc.status === 'expired').length;
                const missingDocs = employeeDocuments.filter(doc => doc.status === 'missing').length;
                
                return (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className="text-green-600">{validDocs}</span>
                        <span className="text-yellow-600">{expiringDocs}</span>
                        <span className="text-red-600">{expiredDocs}</span>
                        <span className="text-gray-600">{missingDocs}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/person/${provider.id}/${employee.id}`}>
                        <Button variant="outline" size="sm">
                          <User className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

const StatusBadgeGerman = ({ 
  status, 
  document 
}: { 
  status?: 'active' | 'inactive' | 'pending';
  document?: 'valid' | 'expiring' | 'expired' | 'missing';
}) => {
  if (document) {
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
  }
  
  if (status) {
    const providerStatusMap = {
      active: { text: "Aktiv", className: "bg-green-100 text-green-800" },
      inactive: { text: "Inaktiv", className: "bg-red-100 text-red-800" },
      pending: { text: "Ausstehend", className: "bg-yellow-100 text-yellow-800" },
    };
    
    const { text, className } = providerStatusMap[status];
    
    return (
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${className}`}>
        {text}
      </span>
    );
  }
  
  return null;
};

export default ProviderView;
