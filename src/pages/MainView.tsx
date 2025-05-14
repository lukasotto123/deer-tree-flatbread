
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Euro, Clock, Hourglass, AlertTriangle, CheckCircle } from "lucide-react";
import { providers, documents } from "@/data/dummy-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import StatusBadge from "@/components/ui/StatusBadge";
import { getDocumentStatusIcon } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Modified historical data with percentages instead of absolute values
const modifiedHistoricalData = [
  { name: "Jan", beitragsrückstände: 12, fehlend: 25, ablaufend: 13, gültig: 50 },
  { name: "Feb", beitragsrückstände: 13, fehlend: 22, ablaufend: 14, gültig: 51 },
  { name: "März", beitragsrückstände: 11, fehlend: 20, ablaufend: 12, gültig: 57 },
  { name: "Apr", beitragsrückstände: 14, fehlend: 19, ablaufend: 11, gültig: 56 },
  { name: "Mai", beitragsrückstände: 10, fehlend: 17, ablaufend: 13, gültig: 60 },
  { name: "Jun", beitragsrückstände: 8, fehlend: 19, ablaufend: 10, gültig: 63 },
  { name: "Jul", beitragsrückstände: 9, fehlend: 16, ablaufend: 9, gültig: 66 },
  { name: "Aug", beitragsrückstände: 7, fehlend: 17, ablaufend: 11, gültig: 65 },
  { name: "Sep", beitragsrückstände: 8, fehlend: 15, ablaufend: 8, gültig: 69 },
  { name: "Okt", beitragsrückstände: 6, fehlend: 14, ablaufend: 9, gültig: 71 },
  { name: "Nov", beitragsrückstände: 5, fehlend: 13, ablaufend: 7, gültig: 75 },
  { name: "Dez", beitragsrückstände: 4, fehlend: 12, ablaufend: 6, gültig: 78 },
];

// Chart configuration
const chartConfig = {
  beitragsrückstände: {
    label: "Beitragsrückstände",
    color: "#ff5555"
  },
  fehlend: {
    label: "Fehlende Dokumente",
    color: "#ff8c00"
  },
  ablaufend: {
    label: "Ablaufende Dokumente",
    color: "#ffb74d"
  },
  gültig: {
    label: "Gültige Dokumente",
    color: "#75C270" // Green color for valid documents
  }
};

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
    (total, provider) => total + provider.documentsCount.missing + provider.documentsCount.expired, 0
  );
  
  const ablaufendeDokumente = filteredProviders.reduce(
    (total, provider) => total + provider.documentsCount.expiring, 0
  );

  // Helper function to render the icon based on the new utils format
  const renderIcon = (iconData: ReturnType<typeof getDocumentStatusIcon>) => {
    if ('icon' in iconData) {
      const IconComponent = iconData.icon;
      return <IconComponent className={iconData.className} />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Compliance-Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Überblick über den aktuellen Status aller Dokumente und Dienstleister
        </p>
      </div>

      {/* Übersichtskarten basierend auf dem Screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="flex justify-center items-center mb-2">
                <Euro className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-lg font-medium">Beitragsrückstände</h3>
              </div>
              <p className="text-4xl font-bold">{beitragsrückstände}</p>
            </div>
            <div className="mt-6">
              <Button className="w-full" disabled>
                Anzeigen
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="flex justify-center items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                <h3 className="text-lg font-medium">Fehlende oder abgelaufene Dokumente</h3>
              </div>
              <p className="text-4xl font-bold">{fehlendeDokumente}</p>
            </div>
            <div className="mt-6">
              <Button className="w-full" asChild>
                <Link to="/requests">Anzeigen</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="flex justify-center items-center mb-2">
                <Hourglass className="h-5 w-5 text-amber-500 mr-2" />
                <h3 className="text-lg font-medium">Ablaufende Dokumente</h3>
              </div>
              <p className="text-4xl font-bold">{ablaufendeDokumente}</p>
              <p className="text-sm text-muted-foreground mt-1">in den nächsten 30 Tagen</p>
            </div>
            <div className="mt-6">
              <Button className="w-full" asChild>
                <Link to="/requests">Anzeigen</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Updated historical chart with percentages */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Compliance Entwicklung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <AreaChart
                data={modifiedHistoricalData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                stackOffset="expand"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `${Math.round(value * 100)}%`} 
                  domain={[0, 1]}
                />
                <ChartTooltip 
                  content={
                    <ChartTooltipContent 
                      formatter={(value, name) => [`${Math.round(Number(value) * 100)}%`, name]}
                    />
                  }
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="gültig" 
                  name="Gültige Dokumente" 
                  stackId="1" 
                  stroke="#75C270" 
                  fill="#75C270" 
                />
                <Area 
                  type="monotone" 
                  dataKey="ablaufend" 
                  name="Ablaufende Dokumente" 
                  stackId="1" 
                  stroke="#ffb74d" 
                  fill="#ffb74d" 
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
                  dataKey="beitragsrückstände" 
                  name="Beitragsrückstände" 
                  stackId="1" 
                  stroke="#ff5555" 
                  fill="#ff5555" 
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Legend card */}
      <Card>
        <CardHeader>
          <CardTitle>Legende</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Dokument ist gültig</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <span>Dokument fehlt oder ist abgelaufen</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <span>Dokument läuft in 30 Tagen ab</span>
            </div>
            <div className="flex items-center gap-2">
              <Euro className="h-5 w-5 text-red-600" />
              <span>Beitragsrückstände</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/lovable-uploads/581e8146-ca78-4135-9b39-79770af11286.png" className="h-5 w-5" alt="Soon" />
              <span>Gültigkeitsstart liegt in der Zukunft</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs and ComplianceTable */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="niederlassung-a">Niederlassung A</TabsTrigger>
            <TabsTrigger value="niederlassung-b">Niederlassung B</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex gap-1 items-center">
              <Plus className="h-4 w-4" />
              <span>Personaldienstleister hinzufügen</span>
            </Button>
            <Button variant="outline" size="sm" className="flex gap-1 items-center">
              <Plus className="h-4 w-4" />
              <span>Subunternehmer hinzufügen</span>
            </Button>
          </div>
        </div>

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
                  <div className="flex items-center gap-2">
                    {getProviderStatusIcon(provider)}
                    <Link to={`/provider/${provider.id}`} className="text-primary hover:underline">
                      {provider.name}
                    </Link>
                  </div>
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
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{provider.documentsCount.valid}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span>{provider.documentsCount.expiring}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <span>{provider.documentsCount.expired}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
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

// Helper function to determine the worst-case status icon for a provider
const getProviderStatusIcon = (provider: typeof providers[0]) => {
  const hasBeitragsrückstände = provider.documentsCount.expired > 0 && 
    documents.some(d => 
      d.providerId === provider.id && 
      d.status === 'expired' && 
      (d.name.includes("Unbedenklichkeitsbescheinigung") || d.name.includes("Beitrag"))
    );

  if (hasBeitragsrückstände) {
    return <Euro className="h-5 w-5 text-red-600" />;
  } else if (provider.documentsCount.missing > 0 || provider.documentsCount.expired > 0) {
    return <AlertTriangle className="h-5 w-5 text-amber-600" />;
  } else if (provider.documentsCount.expiring > 0) {
    return <Clock className="h-5 w-5 text-amber-500" />;
  } else {
    return <CheckCircle className="h-5 w-5 text-green-600" />;
  }
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
