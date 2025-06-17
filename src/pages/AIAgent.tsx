
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  Mail, 
  FileCheck, 
  Clock, 
  Users, 
  MoreHorizontal, 
  Eye, 
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Calendar,
  Globe
} from "lucide-react";

// Mock data for AI Agent
const emailReminders = [
  {
    id: "rem-1",
    recipient: "Bauunternehmen Schmidt GmbH",
    contact: "Hans Schmidt",
    email: "schmidt@bauunternehmen.de",
    documentType: "Unbedenklichkeitsbescheinigung Krankenkasse",
    sentDate: "2024-06-15T10:30:00Z",
    status: "sent",
    language: "de",
    dueDate: "2024-06-20",
    reminderCount: 1
  },
  {
    id: "rem-2", 
    recipient: "Polish Construction Ltd.",
    contact: "Jan Kowalski",
    email: "j.kowalski@polishconstruction.pl",
    documentType: "A1-Bescheinigung",
    sentDate: "2024-06-14T14:15:00Z",
    status: "responded",
    language: "pl",
    dueDate: "2024-06-18",
    reminderCount: 2
  },
  {
    id: "rem-3",
    recipient: "French Services SARL",
    contact: "Pierre Dubois", 
    email: "p.dubois@frenchservices.fr",
    documentType: "Reisepass",
    sentDate: "2024-06-13T09:45:00Z",
    status: "overdue",
    language: "fr",
    dueDate: "2024-06-17",
    reminderCount: 3
  }
];

const receivedDocuments = [
  {
    id: "doc-1",
    sender: "Jan Kowalski",
    email: "j.kowalski@polishconstruction.pl",
    documentType: "A1-Bescheinigung",
    receivedDate: "2024-06-15T16:20:00Z",
    status: "accepted",
    aiConfidence: 95,
    extractedData: {
      validFrom: "2024-01-01",
      validUntil: "2024-12-31",
      issuingCountry: "Polen",
      employeeName: "Jan Kowalski"
    },
    aiComment: "Dokument vollständig und gültig. Alle erforderlichen Informationen vorhanden."
  },
  {
    id: "doc-2",
    sender: "Maria Wagner", 
    email: "m.wagner@services.de",
    documentType: "Unbedenklichkeitsbescheinigung",
    receivedDate: "2024-06-14T11:30:00Z",
    status: "rejected",
    aiConfidence: 88,
    extractedData: {
      validFrom: "2024-01-01",
      validUntil: "2024-05-31",
      issuingAuthority: "Krankenkasse ABC"
    },
    aiComment: "Dokument ist abgelaufen. Gültigkeitsdatum liegt in der Vergangenheit."
  },
  {
    id: "doc-3",
    sender: "Pierre Dubois",
    email: "p.dubois@frenchservices.fr", 
    documentType: "Reisepass",
    receivedDate: "2024-06-16T08:45:00Z",
    status: "pending",
    aiConfidence: 72,
    extractedData: {
      validUntil: "2026-03-15",
      nationality: "Französisch",
      passportNumber: "12AB34567"
    },
    aiComment: "Bildqualität unzureichend für vollständige Verifikation. Manuelle Prüfung empfohlen."
  }
];

const AIAgent = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      sent: { text: "Versendet", variant: "secondary" as const },
      responded: { text: "Beantwortet", variant: "default" as const },
      overdue: { text: "Überfällig", variant: "destructive" as const },
      accepted: { text: "Akzeptiert", variant: "default" as const },
      rejected: { text: "Abgelehnt", variant: "destructive" as const },
      pending: { text: "Prüfung", variant: "secondary" as const }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            KI-Agent
          </h1>
          <p className="text-muted-foreground mt-1">
            Automatische Dokumenten-Erinnerungen und intelligente Verarbeitung
          </p>
        </div>
        <Button>
          <Brain className="h-4 w-4 mr-2" />
          KI-Einstellungen
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Versendete Erinnerungen</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 diese Woche</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Erhaltene Dokumente</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+7 diese Woche</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">KI-Akzeptanzrate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% vs. letzter Monat</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offene Anfragen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">2 überfällig</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Übersicht</TabsTrigger>
          <TabsTrigger value="reminders">Email-Erinnerungen</TabsTrigger>
          <TabsTrigger value="documents">Erhaltene Dokumente</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Letzte Erinnerungen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emailReminders.slice(0, 3).map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{reminder.recipient}</div>
                        <div className="text-sm text-muted-foreground">{reminder.documentType}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Globe className="h-3 w-3" />
                          <span className="text-xs">{reminder.language.toUpperCase()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(reminder.status)}
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(reminder.sentDate).toLocaleDateString('de-DE')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5" />
                  Neueste Dokumente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {receivedDocuments.slice(0, 3).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{doc.sender}</div>
                        <div className="text-sm text-muted-foreground">{doc.documentType}</div>
                        <div className={`text-xs font-medium ${getConfidenceColor(doc.aiConfidence)} mt-1`}>
                          KI-Vertrauen: {doc.aiConfidence}%
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(doc.status)}
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(doc.receivedDate).toLocaleDateString('de-DE')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Suche nach Empfänger oder Dokumenttyp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="sent">Versendet</SelectItem>
                <SelectItem value="responded">Beantwortet</SelectItem>
                <SelectItem value="overdue">Überfällig</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empfänger</TableHead>
                    <TableHead>Kontakt</TableHead>
                    <TableHead>Dokumenttyp</TableHead>
                    <TableHead>Sprache</TableHead>
                    <TableHead>Gesendet</TableHead>
                    <TableHead>Fälligkeitsdatum</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Erinnerungen</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailReminders.map((reminder) => (
                    <TableRow key={reminder.id}>
                      <TableCell className="font-medium">{reminder.recipient}</TableCell>
                      <TableCell>
                        <div>{reminder.contact}</div>
                        <div className="text-xs text-muted-foreground">{reminder.email}</div>
                      </TableCell>
                      <TableCell>{reminder.documentType}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{reminder.language.toUpperCase()}</Badge>
                      </TableCell>
                      <TableCell>{new Date(reminder.sentDate).toLocaleDateString('de-DE')}</TableCell>
                      <TableCell>{new Date(reminder.dueDate).toLocaleDateString('de-DE')}</TableCell>
                      <TableCell>{getStatusBadge(reminder.status)}</TableCell>
                      <TableCell>{reminder.reminderCount}x</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Email anzeigen
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Erneut senden
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Suche nach Absender oder Dokumenttyp..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Status</SelectItem>
                <SelectItem value="accepted">Akzeptiert</SelectItem>
                <SelectItem value="rejected">Abgelehnt</SelectItem>
                <SelectItem value="pending">Prüfung</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Absender</TableHead>
                    <TableHead>Dokumenttyp</TableHead>
                    <TableHead>Empfangen</TableHead>
                    <TableHead>KI-Vertrauen</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Extrahierte Daten</TableHead>
                    <TableHead className="text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receivedDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="font-medium">{doc.sender}</div>
                        <div className="text-xs text-muted-foreground">{doc.email}</div>
                      </TableCell>
                      <TableCell>{doc.documentType}</TableCell>
                      <TableCell>{new Date(doc.receivedDate).toLocaleDateString('de-DE')}</TableCell>
                      <TableCell>
                        <div className={`font-medium ${getConfidenceColor(doc.aiConfidence)}`}>
                          {doc.aiConfidence}%
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell>
                        <div className="text-xs space-y-1">
                          {Object.entries(doc.extractedData).map(([key, value]) => (
                            <div key={key} className="flex gap-1">
                              <span className="font-medium">{key}:</span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Dokument anzeigen
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Herunterladen
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Brain className="h-4 w-4 mr-2" />
                              KI-Analyse anzeigen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAgent;
