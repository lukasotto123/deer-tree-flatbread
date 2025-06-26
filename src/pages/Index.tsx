
import { FileText, AlertTriangle, Clock, CheckCircle, Building, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "@/components/dashboard/StatCard";
import ExpiringDocumentsTable from "@/components/dashboard/ExpiringDocumentsTable";
import DocumentsOverview from "@/components/dashboard/DocumentsOverview";
import { useDocuments, useProviders } from "@/hooks/useSupabaseData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { data: documents = [], isLoading: documentsLoading } = useDocuments();
  const { data: providers = [], isLoading: providersLoading } = useProviders();

  if (documentsLoading || providersLoading) {
    return <div>Laden...</div>;
  }

  // Use real document statistics instead of adjusted distribution
  const documentStats = {
    total: documents.length,
    valid: documents.filter(doc => doc.status === 'valid').length,
    expiring: documents.filter(doc => doc.status === 'expiring').length,
    expired: documents.filter(doc => doc.status === 'expired').length,
  };

  // Calculate compliant and non-compliant Partners using updated aggregated counts
  const nachunternehmer = providers.filter(p => p.type === 'nachunternehmer');
  const personaldienstleister = providers.filter(p => p.type === 'personaldienstleister');
  const allPartners = [...nachunternehmer, ...personaldienstleister];
  
  const compliantPartners = allPartners.filter(p => 
    p.documentsCount.expired === 0 && 
    p.documentsCount.missing === 0 && 
    p.status === 'active'
  );
  const nonCompliantPartners = allPartners.filter(p => 
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
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium text-center">
              Partner Compliance
            </h3>
            <div className="flex justify-center items-center gap-4 mt-3">
              <div className="text-center">
                <span className="text-green-600 font-bold text-2xl">{compliantPartners.length}</span>
                <span className="text-xs block">compliant</span>
              </div>
              <div className="text-center">
                <span className="text-red-600 font-bold text-2xl">{nonCompliantPartners.length}</span>
                <span className="text-xs block">nicht compliant</span>
              </div>
            </div>
            <Button variant="default" size="sm" className="mt-4 w-full bg-[#005B41] hover:bg-[#005B41]/90" asChild>
              <Link to="/providers">Anzeigen</Link>
            </Button>
          </div>
        </div>
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
