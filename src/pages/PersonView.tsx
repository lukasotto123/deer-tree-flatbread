
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { employees, documents, providers, documentTypes } from "@/data/dummy-data";
import StatusBadge from "@/components/ui/StatusBadge";
import { FileText } from "lucide-react";

const PersonView = () => {
  const { providerId, employeeId } = useParams<{ providerId: string; employeeId: string }>();
  
  const employee = employees.find(e => e.id === employeeId);
  const provider = providers.find(p => p.id === providerId);
  
  if (!employee || !provider) {
    return <div>Mitarbeiter nicht gefunden</div>;
  }

  // Tatsächliche Dokumente des Mitarbeiters
  const employeeDocuments = documents.filter(doc => doc.employeeId === employeeId);
  
  // Alle Dokumenttypen, die für Mitarbeiter dieses Dienstleisters relevant sein könnten
  const relevantDocTypes = documentTypes.filter(dt => 
    dt.providerType === provider.type && dt.isPerEmployee
  );
  
  // Fehlende Dokumente identifizieren
  const missingDocuments = relevantDocTypes.filter(dt => 
    !employeeDocuments.some(doc => doc.type === dt.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{employee.name}</h1>
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
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeeDocuments.map((doc) => {
                const docTypeName = documentTypes.find(dt => dt.id === doc.type)?.name || doc.name;
                
                return (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{docTypeName}</TableCell>
                    <TableCell>
                      <StatusBadgeGerman document={doc.status} />
                    </TableCell>
                    <TableCell>{new Date(doc.issuedDate).toLocaleDateString('de-DE')}</TableCell>
                    <TableCell>
                      {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString('de-DE') : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/submission-review/${providerId}/${doc.id}`}>
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            Prüfen
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
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
                {missingDocuments.map((docType) => (
                  <TableRow key={docType.id}>
                    <TableCell className="font-medium">{docType.name}</TableCell>
                    <TableCell>{docType.description}</TableCell>
                    <TableCell>{docType.requiredFor.secure}</TableCell>
                    <TableCell className="text-right">
                      <Link to={`/submission-review/${providerId}/new?documentType=${docType.id}&employeeId=${employeeId}`}>
                        <Button variant="outline" size="sm">Anfordern</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
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

export default PersonView;
