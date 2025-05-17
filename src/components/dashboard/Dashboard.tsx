
import { FileText, Euro, Clock, CheckCircle, Users, AlertTriangle } from "lucide-react";
import StatCard from "./StatCard";
import ExpiringDocumentsTable from "./ExpiringDocumentsTable";
import DocumentsOverview from "./DocumentsOverview";
import { documents, providers } from "@/data/dummy-data";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const documentStats = {
    total: documents.length,
    valid: documents.filter(doc => doc.status === 'valid').length,
    expiring: documents.filter(doc => doc.status === 'expiring').length,
    expired: documents.filter(doc => doc.status === 'expired').length,
  };

  // Calculate compliant and non-compliant Partners
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Partner Compliance"
          description={
            <div className="flex justify-between items-center mt-2">
              <div>
                <span className="text-green-600 font-bold text-2xl">{compliantPartners.length}</span>
                <span className="text-xs block">compliant</span>
              </div>
              <div>
                <span className="text-red-600 font-bold text-2xl">{nonCompliantPartners.length}</span>
                <span className="text-xs block">nicht compliant</span>
              </div>
            </div>
          }
          value={allPartners.length}
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
    </div>
  );
};

export default Dashboard;
