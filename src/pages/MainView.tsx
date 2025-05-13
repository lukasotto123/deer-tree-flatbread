
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "@/components/ui/StatusBadge";
import { Settings } from "lucide-react";
import { providers } from "@/data/dummy-data";

const MainView = () => {
  const [activeTab, setActiveTab] = useState("niederlassung-a");

  const filteredProviders = providers.filter(provider => 
    activeTab === "niederlassung-a" ? ["provider-1", "provider-2", "provider-3"].includes(provider.id) : 
    ["provider-4", "provider-5"].includes(provider.id)
  );

  const personaldienstleister = filteredProviders.filter(p => p.type === "personaldienstleister");
  const subunternehmer = filteredProviders.filter(p => p.type === "subunternehmer");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Compliance-Dashboard</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="niederlassung-a">Niederlassung A</TabsTrigger>
          <TabsTrigger value="niederlassung-b">Niederlassung B</TabsTrigger>
        </TabsList>

        <TabsContent value="niederlassung-a" className="space-y-6">
          <ComplianceOverview title="Personaldienstleister" providers={personaldienstleister} />
          <ComplianceOverview title="Subunternehmer" providers={subunternehmer} />
        </TabsContent>

        <TabsContent value="niederlassung-b" className="space-y-6">
          <ComplianceOverview title="Personaldienstleister" providers={personaldienstleister} />
          <ComplianceOverview title="Subunternehmer" providers={subunternehmer} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-8">
        <Link to="/document-requirements">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Dokumentenmanagement
          </Button>
        </Link>
      </div>
    </div>
  );
};

interface ComplianceOverviewProps {
  title: string;
  providers: typeof providers;
}

const ComplianceOverview = ({ title, providers }: ComplianceOverviewProps) => {
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
                <TableCell className="font-medium">{provider.name}</TableCell>
                <TableCell>
                  <StatusBadgeGerman status={provider.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span className="text-green-600">{provider.documentsCount.valid}</span>
                    <span className="text-yellow-600">{provider.documentsCount.expiring}</span>
                    <span className="text-red-600">{provider.documentsCount.expired}</span>
                    <span className="text-gray-600">{provider.documentsCount.missing}</span>
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
