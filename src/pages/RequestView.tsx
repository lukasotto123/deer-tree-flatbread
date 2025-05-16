
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BellOff, BellPlus, AlertTriangle, Clock, Euro, Calendar } from "lucide-react";
import { providers, documents } from "@/data/dummy-data";
import DocumentRequest from "@/components/documents/DocumentRequest";
import { toast } from "sonner";

const RequestView = () => {
  const [autoRequestEnabled, setAutoRequestEnabled] = useState(true);
  const [weeklyMode, setWeeklyMode] = useState(true);
  
  // Group documents by provider for weekly requests
  const providerDocumentGroups = [
    {
      id: "weekly-1",
      providerId: "provider-1",
      providerName: "Bauunternehmen Schmidt GmbH",
      nextScheduledDate: "2025-05-20",
      documents: [
        "Unbedenklichkeitsbescheinigung Finanzamt",
        "Unbedenklichkeitsbescheinigung Berufsgenossenschaft",
        "Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen"
      ]
    },
    {
      id: "weekly-2",
      providerId: "provider-2",
      providerName: "Elektrotechnik Müller AG",
      nextScheduledDate: "2025-05-21",
      documents: [
        "A1-Bescheinigung für Max Schmidt",
        "Betriebshaftpflichtversicherung",
        "Gewerbeanmeldung"
      ]
    },
    {
      id: "weekly-3",
      providerId: "provider-3",
      providerName: "Sanitär Weber & Söhne",
      nextScheduledDate: "2025-05-22",
      documents: [
        "Betriebshaftpflichtversicherung",
        "Handelsregisterauszug",
        "Unbedenklichkeitsbescheinigung Krankenkasse"
      ]
    }
  ];

  // Simulierte Anfragen für einzelne Dokumente
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

  // Handler für das Senden einer wöchentlichen Anfrage
  const handleSendWeeklyRequest = (groupId: string) => {
    toast.success("Wöchentliche Dokumentenanfrage wurde erfolgreich versendet");
  };

  // Handler für das Senden einer Erinnerung
  const handleSendReminder = (requestId: string) => {
    toast.success("Erinnerung wurde erfolgreich versendet");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dokumentenanfragen</h1>
          <p className="text-muted-foreground mt-1">
            Automatisierte Anfragen für fehlende oder abgelaufende Dokumente
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline">Zurück zum Dashboard</Button>
          </Link>
          <DocumentRequest />
        </div>
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
          
          <div className="mt-6 border-t pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">
                  {weeklyMode ? "Wöchentliche Sammelanfragen" : "Einzelne Dokumentenanfragen"}
                </h3>
                <p className="text-muted-foreground">
                  {weeklyMode 
                    ? "Dokumente werden wöchentlich gesammelt und in einer Anfrage zusammengefasst." 
                    : "Jedes Dokument wird einzeln angefragt."}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setWeeklyMode(!weeklyMode)}
                >
                  {weeklyMode ? <Calendar className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                </Button>
                <Switch 
                  checked={weeklyMode} 
                  onCheckedChange={setWeeklyMode} 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {weeklyMode ? (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle>Wöchentliche Dokumentenanfragen</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Unternehmen</TableHead>
                  <TableHead>Anzahl Dokumente</TableHead>
                  <TableHead>Nächste geplante Anfrage</TableHead>
                  <TableHead className="text-right">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {providerDocumentGroups.map((group) => {
                  return (
                    <TableRow key={group.id}>
                      <TableCell className="font-medium">{group.providerName}</TableCell>
                      <TableCell>{group.documents.length} Dokumente</TableCell>
                      <TableCell>{new Date(group.nextScheduledDate).toLocaleDateString('de-DE')}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSendWeeklyRequest(group.id)}
                        >
                          Jetzt senden
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => {
                            document.getElementById(`details-${group.id}`)?.classList.toggle('hidden');
                          }}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            {/* Details für jede wöchentliche Anfrage */}
            {providerDocumentGroups.map((group) => (
              <div 
                key={`details-${group.id}`}
                id={`details-${group.id}`}
                className="mt-4 bg-muted p-4 rounded-md hidden"
              >
                <h4 className="text-md font-semibold mb-2">{group.providerName} - Benötigte Dokumente</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {group.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <span>{doc}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => toast.success(`Einzelne Anfrage für "${doc}" wurde gesendet`)}
                      >
                        Einzeln anfragen
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSendReminder(request.id)}
                        >
                          Erinnern
                        </Button>
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
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-500" />
            <CardTitle>Geplante Anfragen (Bald ablaufende Dokumente)</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Dokumente, die in den nächsten 30 Tagen ablaufen, werden automatisch im wöchentlichen Rhythmus angefragt.
          </p>
          <div className="flex justify-end">
            <Button onClick={() => toast.success("Alle geplanten Anfragen wurden manuell ausgelöst")}>
              Alle geplanten Anfragen jetzt senden
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestView;
