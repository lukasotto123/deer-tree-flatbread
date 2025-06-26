
import { FileText, CheckCircle, Clock } from "lucide-react";
import StatCard from "./StatCard";
import ExpiringDocumentsTable from "./ExpiringDocumentsTable";
import DocumentsOverview from "./DocumentsOverview";
import { useProviders, useDocuments, useLocationDocumentSummary } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: documents = [], isLoading: documentsLoading, error: documentsError } = useDocuments();
  const { data: providers = [], isLoading: providersLoading, error: providersError } = useProviders();
  const { data: locationSummary = [], isLoading: locationLoading, error: locationError } = useLocationDocumentSummary();

  // Handle loading states
  if (documentsLoading || providersLoading || locationLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  // Handle error states
  if (documentsError || providersError || locationError) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <p className="text-destructive mb-2">Fehler beim Laden der Daten</p>
          <p className="text-muted-foreground text-sm">
            {documentsError?.message || providersError?.message || locationError?.message}
          </p>
        </div>
      </div>
    );
  }

  // Calculate real document statistics from aggregated data
  const documentStats = {
    total: documents.length,
    valid: documents.filter(doc => doc.status === 'valid').length,
    expiring: documents.filter(doc => doc.status === 'expiring').length,
    expired: documents.filter(doc => doc.status === 'expired').length,
  };

  // Calculate compliant and non-compliant Partners using real provider data with updated counts
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
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Überblick über den aktuellen Status aller Dokumente und Dienstleister
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Hidden Partner Compliance Card - kept for easy restoration */}
        <div className="bg-white rounded-lg shadow" style={{ display: 'none' }}>
          <div className="p-6">
            <h3 className="text-lg font-medium text-center">
              Partner Compliance
            </h3>
            <div className="flex justify-center items-center gap-4 mt-3">
              <div className="text-center">
                <span className="font-bold text-2xl">{compliantPartners.length}</span>
                <span className="text-xs block">compliant</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-2xl">{nonCompliantPartners.length}</span>
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
    </div>
  );
};

export default Dashboard;
