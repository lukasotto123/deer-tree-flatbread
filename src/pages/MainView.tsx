
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Euro, Clock, Hourglass, AlertTriangle, CheckCircle, Users, ShieldCheck } from "lucide-react";
import { providers, documents } from "@/data/dummy-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import StatusBadge from "@/components/ui/StatusBadge";
import { getDocumentStatusIcon } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { useDocumentState } from "@/hooks/useDocumentState";

// Updated historical data from July to June with more realistic variations
const modifiedHistoricalData = [
  { name: "Jul", beitragsrückstände: 18, fehlend: 28, ablaufend: 22, gültig: 32 },
  { name: "Aug", beitragsrückstände: 16, fehlend: 26, ablaufend: 19, gültig: 39 },
  { name: "Sep", beitragsrückstände: 15, fehlend: 24, ablaufend: 21, gültig: 40 },
  { name: "Okt", beitragsrückstände: 12, fehlend: 22, ablaufend: 18, gültig: 48 },
  { name: "Nov", beitragsrückstände: 14, fehlend: 20, ablaufend: 16, gültig: 50 },
  { name: "Dez", beitragsrückstände: 10, fehlend: 19, ablaufend: 14, gültig: 57 },
  { name: "Jan", beitragsrückstände: 8, fehlend: 17, ablaufend: 15, gültig: 60 },
  { name: "Feb", beitragsrückstände: 9, fehlend: 15, ablaufend: 13, gültig: 63 },
  { name: "Mär", beitragsrückstände: 6, fehlend: 14, ablaufend: 12, gültig: 68 },
  { name: "Apr", beitragsrückstände: 4, fehlend: 12, ablaufend: 9, gültig: 75 },
  { name: "Mai", beitragsrückstände: 2, fehlend: 8, ablaufend: 5, gültig: 85 },
  { name: "Jun", beitragsrückstände: 0, fehlend: 3, ablaufend: 0, gültig: 97 },
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
  const { isJanKowalskiA1Accepted } = useDocumentState();

  // Helper function to get modified provider data with correct document counts
  const getModifiedProviderData = (provider: any) => {
    // Nowak Construction Group - dynamisch basierend auf Jan Kowalski A1 Status
    if (provider.id === "provider-3") {
      if (isJanKowalskiA1Accepted) {
        // Alle Dokumente sind gültig wenn A1 akzeptiert
        return {
          ...provider,
          documentsCount: {
            valid: 12,
            expiring: 0,
            expired: 0,
            missing: 0
          },
          status: 'active' as const
        };
      } else {
        // 1 abgelaufenes Dokument wenn A1 nicht akzeptiert
        return {
          ...provider,
          documentsCount: {
            valid: 11,
            expiring: 0,
            expired: 1,
            missing: 0
          },
          status: 'active' as const
        };
      }
    }
    
    // Elektro Schaltbau GmbH and Metallbau Schmidt GmbH should have all valid documents
    if (provider.id === "provider-4" || provider.id === "provider-6") {
      return {
        ...provider,
        documentsCount: {
          valid: 12,
          expiring: 0,
          expired: 0,
          missing: 0
        },
        status: 'active' as const
      };
    }
    
    return provider;
  };

  const filteredProviders = providers
    .filter(provider => 
      provider.type === 'nachunternehmer' && (
      activeTab === "niederlassung-a" ? ["provider-3", "provider-4", "provider-6"].includes(provider.id) : 
      ["provider-5", "provider-7", "provider-8"].includes(provider.id))
    )
    .map(getModifiedProviderData);

  // Calculate totals for the overview
  const allDocuments = documents.filter(doc => 
    filteredProviders.some(p => p.id === doc.providerId)
  );
  
  const beitragsrückstände = allDocuments.filter(doc => 
    doc.status === 'expired' && 
    (doc.name.includes("Unbedenklichkeitsbescheinigung") || doc.name.includes("Beitrag"))
  ).length;
  
  // Dynamische Berechnung basierend auf Jan Kowalski A1 Status
  const fehlendeDokumente = isJanKowalskiA1Accepted ? 0 : filteredProviders.reduce(
    (total, provider) => total + provider.documentsCount.missing + provider.documentsCount.expired, 0
  );
  
  const ablaufendeDokumente = filteredProviders.reduce(
    (total, provider) => total + provider.documentsCount.expiring, 0
  );

  // Calculate compliant and non-compliant Nachunternehmer
  const nachunternehmer = filteredProviders;
  const compliantNachunternehmer = nachunternehmer.filter(p => 
    p.documentsCount.expired === 0 && 
    p.documentsCount.missing === 0 && 
    p.status === 'active'
  );
  const nonCompliantNachunternehmer = nachunternehmer.filter(p => 
    p.documentsCount.expired > 0 || 
    p.documentsCount.missing > 0 || 
    p.status !== 'active'
  );

  // Update chart data based on Jan Kowalski A1 status
  const dynamicHistoricalData = modifiedHistoricalData.map(item => {
    if (item.name === "Jun" && isJanKowalskiA1Accepted) {
      return {
        ...item,
        fehlend: 0,
        gültig: 100
      };
    }
    return item;
  });

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

      {/* Redesigned Übersichtskarten */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Hidden Nachunternehmer Compliance Card - kept for easy restoration */}
        <Card className="overflow-hidden border-muted-foreground/20" style={{ display: 'none' }}>
          <CardContent className="pt-6 pb-4 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="flex justify-center items-center mb-2">
                <ShieldCheck className="h-5 w-5 text-primary mr-2" />
                <h3 className="text-lg font-medium text-center">Nachunternehmer Compliance</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex flex-col items-center p-3 rounded-md">
                  <span className="font-bold text-3xl">{compliantNachunternehmer.length}</span>
                  <span className="text-sm block text-muted-foreground mt-1">Compliant</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-md">
                  <span className="font-bold text-3xl">{nonCompliantNachunternehmer.length}</span>
                  <span className="text-sm block text-muted-foreground mt-1">Nicht Compliant</span>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Button className="w-full">
                Anzeigen
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-muted-foreground/20">
          <CardContent className="pt-6 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="flex justify-center items-center mb-2">
                <Euro className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-lg font-medium">Beitragsrückstände</h3>
              </div>
              <p className="text-4xl font-bold">0</p>
            </div>
            <div className="mt-6">
              <Button className="w-full" asChild>
                <Link to="/requests">Anzeigen</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-muted-foreground/20">
          <CardContent className="pt-6 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="flex justify-center items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                <h3 className="text-lg font-medium">Fehlende oder abgelaufene Dokumente</h3>
              </div>
              <p className={`text-4xl font-bold ${isJanKowalskiA1Accepted ? 'text-green-600' : ''}`}>
                {fehlendeDokumente}
              </p>
              {isJanKowalskiA1Accepted && (
                <p className="text-sm text-green-600 mt-1">✓ Jan Kowalski A1 akzeptiert</p>
              )}
            </div>
            <div className="mt-6">
              <Button className="w-full" asChild>
                <Link to="/requests">Anzeigen</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-muted-foreground/20">
          <CardContent className="pt-6 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="flex justify-center items-center mb-2">
                <Clock className="h-5 w-5 text-amber-500 mr-2" />
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

      {/* Updated historical chart with dynamic data */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Compliance Entwicklung</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 my-8">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dynamicHistoricalData}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                stackOffset="expand"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  tickFormatter={(value) => `${Math.round(value * 100)}%`} 
                  domain={[0, 1]}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  labelFormatter={(label) => `Monat: ${label}`}
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
            </ResponsiveContainer>
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
              <span>Nachunternehmer hinzufügen</span>
            </Button>
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-6">
          <ComplianceTable title="Nachunternehmer" providers={filteredProviders} />
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
                      <Euro className="h-4 w-4 text-red-600" />
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

// Helper function to determine the correct status icon for a provider - korrigierte Logik für Nowak
const getProviderStatusIcon = (provider: typeof providers[0]) => {
  // Spezielle Behandlung für Nowak Construction Group (provider-3)
  if (provider.id === "provider-3") {
    // Wenn alle Dokumente gültig sind (A1 akzeptiert), dann grünes Häkchen
    if (provider.documentsCount.expired === 0 && provider.documentsCount.missing === 0) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
    // Wenn es abgelaufene Dokumente gibt (A1 nicht akzeptiert), dann Warnung
    if (provider.documentsCount.expired > 0) {
      return <AlertTriangle className="h-5 w-5 text-amber-600" />;
    }
  }

  // Allgemeine Logik für alle anderen Provider
  if (provider.documentsCount.expired === 0 && provider.documentsCount.missing === 0) {
    return <CheckCircle className="h-5 w-5 text-green-600" />;
  }

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
