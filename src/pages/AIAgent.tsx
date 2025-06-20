import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CompanyDocumentView from "@/components/documents/CompanyDocumentView";
import { 
  Sparkles, 
  Mail, 
  FileCheck, 
  Clock, 
  MoreHorizontal, 
  Eye, 
  Download,
  Globe,
  Building,
  Smartphone
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
    recipient: "Nowak Construction Group",
    contact: "Jan Kowalski",
    email: "j.kowalski@nowak-construction.de",
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
    id: "doc-2",
    sender: "Nowak Construction Group",
    contact: "Jan Kowalski",
    email: "j.kowalski@nowak-construction.de",
    documentType: "A1-Bescheinigung",
    receivedDate: "2024-06-15T16:20:00Z",
    status: "accepted",
    documentLevel: "employee",
    receptionMethod: "email"
  },
  {
    id: "doc-1",
    sender: "Bauunternehmen Schmidt GmbH",
    contact: "Hans Schmidt", 
    email: "schmidt@bauunternehmen.de",
    documentType: "Unbedenklichkeitsbescheinigung",
    receivedDate: "2024-06-14T11:30:00Z",
    status: "rejected",
    documentLevel: "employee",
    receptionMethod: "app"
  },
  {
    id: "doc-3",
    sender: "French Services SARL",
    contact: "Pierre Dubois",
    email: "p.dubois@frenchservices.fr", 
    documentType: "Reisepass",
    receivedDate: "2024-06-16T08:45:00Z",
    status: "pending",
    documentLevel: "employee",
    receptionMethod: "email"
  },
  {
    id: "comp-doc-1",
    sender: "Bauunternehmen Schmidt GmbH",
    contact: "Hans Schmidt",
    email: "info@bauunternehmen-schmidt.de",
    documentType: "Gewerbeanmeldung",
    receivedDate: "2024-06-12T14:20:00Z",
    status: "pending",
    documentLevel: "company",
    receptionMethod: "app"
  },
  {
    id: "comp-doc-2",
    sender: "Nowak Construction Group",
    contact: "Jan Kowalski",
    email: "office@nowak-construction.de",
    documentType: "Handelsregisterauszug",
    receivedDate: "2024-06-11T09:15:00Z",
    status: "accepted",
    documentLevel: "company",
    receptionMethod: "email"
  },
  {
    id: "comp-doc-3",
    sender: "French Services SARL",
    contact: "Pierre Dubois",
    email: "contact@frenchservices.fr",
    documentType: "Betriebshaftpflichtversicherung",
    receivedDate: "2024-06-10T16:30:00Z",
    status: "rejected",
    documentLevel: "company",
    receptionMethod: "app"
  }
];

const AIAgent = () => {
  const [selectedTab, setSelectedTab] = useState("reminders");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "document">("list");
  const [selectedDocumentId, setSelectedDocumentId] = useState<string>("");

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

  const getReceptionMethodBadge = (method: string) => {
    const methodConfig = {
      email: { text: "E-Mail", variant: "outline" as const, icon: Mail },
      app: { text: "Pactos-App", variant: "secondary" as const, icon: Smartphone }
    };
    const config = methodConfig[method as keyof typeof methodConfig];
    const IconComponent = config.icon;
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  const handleDocumentClick = (documentId: string) => {
    setSelectedDocumentId(documentId);
    setViewMode("document");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedDocumentId("");
  };

  if (viewMode === "document" && selectedDocumentId) {
    return (
      <CompanyDocumentView 
        documentId={selectedDocumentId}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            KI-Agent
          </h1>
          <p className="text-muted-foreground mt-1">
            Automatische Dokumenten-Erinnerungen und intelligente Verarbeitung
          </p>
        </div>
        <Button>
          <Sparkles className="h-4 w-4 mr-2" />
          KI-Einstellungen
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hidden Nachunternehmer Compliance Card - kept for easy restoration */}
        <Card style={{ display: 'none' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nachunternehmer Compliance</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col items-center p-3 rounded-md bg-green-50">
                <span className="text-green-600 font-bold text-3xl">0</span>
                <span className="text-sm block text-muted-foreground mt-1">Compliant</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-md bg-red-50">
                <span className="text-red-600 font-bold text-3xl">3</span>
                <span className="text-sm block text-muted-foreground mt-1">Nicht Compliant</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beitragsrückstände</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">+0 diese Woche</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fehlende oder abgelaufene Dokumente</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9</div>
            <p className="text-xs text-muted-foreground">+2 diese Woche</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ablaufende Dokumente</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">in den nächsten 30 Tagen</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reminders">Email-Erinnerungen</TabsTrigger>
          <TabsTrigger value="documents">Erhaltene Dokumente</TabsTrigger>
        </TabsList>

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
                    <TableHead>Ebene</TableHead>
                    <TableHead>Empfangen</TableHead>
                    <TableHead>Empfangsmethode</TableHead>
                    <TableHead>Status</TableHead>
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
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {doc.documentLevel === "company" ? (
                            <Building className="h-3 w-3" />
                          ) : (
                            <Globe className="h-3 w-3" />
                          )}
                          <span className="text-xs">
                            {doc.documentLevel === "company" ? "Unternehmen" : "Mitarbeiter"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(doc.receivedDate).toLocaleDateString('de-DE')}</TableCell>
                      <TableCell>{getReceptionMethodBadge(doc.receptionMethod)}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDocumentClick(doc.id)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Dokument anzeigen
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Herunterladen
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Sparkles className="h-4 w-4 mr-2" />
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
