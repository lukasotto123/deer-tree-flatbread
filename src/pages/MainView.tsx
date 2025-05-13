
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Check, Clock, FileText, Hourglass, Settings } from "lucide-react";
import { providers, documents } from "@/data/dummy-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { historicalData } from "@/data/dummy-data";

const MainView = () => {
  const [activeTab, setActiveTab] = useState("niederlassung-a");

  const filteredProviders = providers.filter(provider => 
    provider.type === 'subunternehmer' && (
    activeTab === "niederlassung-a" ? ["provider-3", "provider-4", "provider-6"].includes(provider.id) : 
    ["provider-5", "provider-7", "provider-8"].includes(provider.id))
  );

  // Calculate totals for the overview
  const allDocuments = documents.filter(doc => 
    filteredProviders.some(p => p.id === doc.providerId)
  );
  
  const beitragsrückstände = allDocuments.filter(doc => 
    doc.status === 'expired' && 
    (doc.name.includes("Unbedenklichkeitsbescheinigung") || doc.name.includes("Beitrag"))
  ).length;
  
  const fehlendeDokumente = filteredProviders.reduce(
    (total, provider) => total + provider.documentsCount.missing, 0
  );
  
  const ablaufendeDokumente = filteredProviders.reduce(
    (total, provider) => total + provider.documentsCount.expiring, 0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Compliance-Dashboard</h1>
        
        <div className="flex gap-2">
          <Button asChild>
            <Link to="/document-requirements">Dokumentenanforderungen</Link>
          </Button>
          <Button asChild>
            <Link to="/document-review/provider-3/new">Dokumentenprüfung</Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>

      {/* Übersichtskarten basierend auf dem Screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Beitragsrückstände</h3>
              <p className="text-4xl font-bold">{beitragsrückstände}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Fehlende Dokumente</h3>
              <p className="text-4xl font-bold">{fehlendeDokumente}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Ablaufende Dokument</h3>
              <p className="text-4xl font-bold">{ablaufendeDokumente}</p>
              <p className="text-sm text-muted-foreground mt-1">in den nächsten 30 Tagen</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historischer Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Entwicklung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={historicalData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="beitragsrückstände" 
                  name="Beitragsrückstände" 
                  stackId="1" 
                  stroke="#ff5555" 
                  fill="#ff5555" 
                />
                <Area 
                  type="monotone" 
                  dataKey="fehlend" 
                  name="Fehlende Dokumente" 
                  stackId="1" 
                  stroke="#ff8c00" 
                  fill="#ff8c00" 
                />
                <Area 
                  type="monotone" 
                  dataKey="ablaufend" 
                  name="Ablaufende Dokumente" 
                  stackId="1" 
                  stroke="#ffb74d" 
                  fill="#ffb74d" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Legende</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>Alle erforderlichen Dokumente vorhanden</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-red-500" />
              <span>Dokument ist abgelaufen</span>
            </div>
            <div className="flex items-center gap-2">
              <Hourglass className="h-5 w-5 text-yellow-500" />
              <span>Dokument läuft in 30 Tagen ab</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span>Handlungsbedarf (z.B. Beitragsrückstände oder fehlende Dokumente)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">SOON</span>
              <span>Gültigkeitsstart liegt in der Zukunft</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="niederlassung-a">Niederlassung A</TabsTrigger>
          <TabsTrigger value="niederlassung-b">Niederlassung B</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          <ComplianceTable title="Subunternehmer" providers={filteredProviders} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ComplianceTableProps {
  title: string;
  providers: typeof providers;
}

const ComplianceTable = ({ title, providers }: ComplianceTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>ANÜ</TableHead>
              <TableHead>Dokumente</TableHead>
              <TableHead>Letzte Aktualisierung</TableHead>
              <TableHead className="text-right">Aktion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell className="font-medium">
                  <Link to={`/provider/${provider.id}`} className="text-primary hover:underline">
                    {provider.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <StatusBadgeGerman status={provider.status} />
                </TableCell>
                <TableCell className={provider.hasANUPermission ? 'text-success' : 'text-destructive'}>
                  {provider.hasANUPermission ? 'Ja' : 'Nein'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{provider.documentsCount.valid}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Hourglass className="h-4 w-4 text-yellow-500" />
                      <span>{provider.documentsCount.expiring}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-red-500" />
                      <span>{provider.documentsCount.expired}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span>{provider.documentsCount.missing}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{new Date(provider.lastUpdated).toLocaleDateString('de-DE')}</TableCell>
                <TableCell className="text-right">
                  <Link to={`/provider/${provider.id}`}>
                    <Button variant="outline" size="sm">Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
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

export default MainView;
