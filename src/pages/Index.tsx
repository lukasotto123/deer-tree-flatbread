
import { FileText, AlertTriangle, Clock, CheckCircle, Building, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "@/components/dashboard/StatCard";
import ExpiringDocumentsTable from "@/components/dashboard/ExpiringDocumentsTable";
import DocumentsOverview from "@/components/dashboard/DocumentsOverview";
import { documents, providers } from "@/data/dummy-data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Adjust the distribution to match 70% valid, 30% others
  const documentStats = {
    total: documents.length,
    valid: Math.round(documents.length * 0.7), // 70% valid documents
    expiring: Math.round(documents.length * 0.15), // 15% expiring
    expired: Math.round(documents.length * 0.15), // 15% expired
  };

  // Calculate compliant and non-compliant Nachunternehmer
  const nachunternehmer = providers.filter(p => p.type === 'nachunternehmer');
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Überblick über den aktuellen Status aller Dokumente und Dienstleister
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Nachunternehmer Compliance"
          description={`${compliantNachunternehmer.length} compliant, ${nonCompliantNachunternehmer.length} nicht compliant`}
          value={nachunternehmer.length}
          icon={<Users className="h-5 w-5" />}
          colorClass="bg-blue-600 text-white"
          actionButton={<Button variant="secondary" size="sm" className="mt-2 w-full">Anzeigen</Button>}
        />
        <StatCard
          title="Gesamt Dokumente"
          value={documentStats.total}
          icon={<FileText className="h-5 w-5" />}
          colorClass="bg-primary text-white"
        />
        <StatCard
          title="Gültige Dokumente"
          value={documentStats.valid}
          icon={<CheckCircle className="h-5 w-5" />}
          colorClass="bg-success text-white"
        />
        <StatCard
          title="Bald ablaufend"
          value={documentStats.expiring}
          icon={<Clock className="h-5 w-5" />}
          colorClass="bg-warning text-warning-foreground"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExpiringDocumentsTable documents={documents} />
        </div>
        <div>
          <DocumentsOverview documents={documents} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dienstleister nach Typ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Personaldienstleister</h3>
                  <p className="text-2xl font-bold">{providers.filter(p => p.type === 'personaldienstleister').length}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Nachunternehmer</h3>
                  <p className="text-2xl font-bold">{providers.filter(p => p.type === 'nachunternehmer').length}</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/providers">Alle Dienstleister anzeigen</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>KI-Prüfungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              <div className="flex items-center justify-between">
                <span>Verifizierte Dokumente</span>
                <span className="font-medium text-success">{Math.floor(documents.length * 0.7)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Verdächtige Dokumente</span>
                <span className="font-medium text-destructive">{Math.floor(documents.length * 0.1)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ausstehende Prüfungen</span>
                <span className="font-medium text-muted-foreground">{Math.floor(documents.length * 0.2)}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/ai-agent">Zum KI-Assistenten</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
