import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BellOff, BellPlus, AlertTriangle, Hourglass, Euro } from "lucide-react";
import { providers } from "@/data/dummy-data";

const RequestView = () => {
  const [autoRequestEnabled, setAutoRequestEnabled] = useState(true);

  // Simulierte Anfragen
  const pendingRequests = [
    {
      id: "req-1",
      providerId: "provider-1",
      documentName: "Unbedenklichkeitsbescheinigung Finanzamt",
      dateSent: "2025-05-01",
      dueDate: "2025-05-15",
      status: "pending"
    },
    {
      id: "req-2",
      providerId: "provider-3",
      documentName: "Betriebshaftpflichtversicherung",
      dateSent: "2025-04-28",
      dueDate: "2025-05-12",
      status: "pending"
    },
    {
      id: "req-3",
      providerId: "provider-2",
      documentName: "A1-Bescheinigung für Max Schmidt",
      dateSent: "2025-05-05",
      dueDate: "2025-05-19",
      status: "pending"
    }
  ];

  const scheduledRequests = [
    {
      id: "scheduled-1",
      providerId: "provider-4",
      documentName: "Unbedenklichkeitsbescheinigung Berufsgenossenschaft",
      scheduledDate: "2025-05-15",
      status: "scheduled"
    },
    {
      id: "scheduled-2",
      providerId: "provider-1",
      documentName: "Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen",
      scheduledDate: "2025-05-20",
      status: "scheduled"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dokumentenanfragen</h1>
        <Link to="/">
          <Button variant="outline">Zurück zum Dashboard</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automatische Anfragen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                {autoRequestEnabled ? "Automatische Anfragen sind aktiviert" : "Automatische Anfragen sind deaktiviert"}
              </h3>
              <p className="text-muted-foreground">
                {autoRequestEnabled 
                  ? "Das System sendet automatisch Erinnerungen für ablaufende oder fehlende Dokumente." 
                  : "Das System sendet keine automatischen Erinnerungen. Anfragen müssen manuell erstellt werden."}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setAutoRequestEnabled(!autoRequestEnabled)}
              >
                {autoRequestEnabled ? <BellOff className="h-5 w-5" /> : <BellPlus className="h-5 w-5" />}
              </Button>
              <Switch 
                checked={autoRequestEnabled} 
                onCheckedChange={setAutoRequestEnabled} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <CardTitle>Offene Anfragen (Fehlende oder abgelaufene Dokumente)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unternehmen</TableHead>
                <TableHead>Dokument</TableHead>
                <TableHead>Gesendet am</TableHead>
                <TableHead>Fällig bis</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingRequests.map((request) => {
                const providerName = providers.find(p => p.id === request.providerId)?.name || '';
                
                return (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{providerName}</TableCell>
                    <TableCell>{request.documentName}</TableCell>
                    <TableCell>{new Date(request.dateSent).toLocaleDateString('de-DE')}</TableCell>
                    <TableCell>{new Date(request.dueDate).toLocaleDateString('de-DE')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Erinnern</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Hourglass className="h-5 w-5 text-amber-500" />
            <CardTitle>Geplante Anfragen (Bald ablaufende Dokumente)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unternehmen</TableHead>
                <TableHead>Dokument</TableHead>
                <TableHead>Geplant für</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledRequests.map((request) => {
                const providerName = providers.find(p => p.id === request.providerId)?.name || '';
                
                return (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{providerName}</TableCell>
                    <TableCell>{request.documentName}</TableCell>
                    <TableCell>{new Date(request.scheduledDate).toLocaleDateString('de-DE')}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Jetzt senden</Button>
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

export default RequestView;
