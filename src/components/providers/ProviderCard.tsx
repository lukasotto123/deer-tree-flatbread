
import { Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Provider } from "@/types";
import StatusBadge from "@/components/ui/StatusBadge";
import { CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react";
import { useProviderDocumentCounts } from "@/hooks/useSupabaseData";

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  // Use the new hook to get real-time aggregated document counts
  const { data: documentCounts } = useProviderDocumentCounts(provider.id);
  
  const providerTypeText = provider.type === 'personaldienstleister' 
    ? 'Personaldienstleister' 
    : 'Nachunternehmer';
  
  const statusConfig = {
    active: { color: 'bg-green-100 text-green-800', text: 'Aktiv' },
    inactive: { color: 'bg-gray-100 text-gray-800', text: 'Inaktiv' },
    pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Ausstehend' },
  };
  
  // Use the real-time aggregated counts from the database function
  const displayCounts = {
    valid: Number(documentCounts?.valid_documents || 0),
    expiring: Number(documentCounts?.expiring_documents || 0),
    expired: Number(documentCounts?.expired_documents || 0),
    missing: Number(documentCounts?.missing_documents || 0),
  };
  
  // Check for Beitragsrückstände (specific expired document types)
  const beitragsrueckstaende = Number(documentCounts?.beitragsrueckstaende || 0);
  
  // Determine worst document status based on actual counts
  const hasExpired = displayCounts.expired > 0;
  const hasMissing = displayCounts.missing > 0;
  const hasExpiring = displayCounts.expiring > 0;
  const hasBeitragsrueckstaende = beitragsrueckstaende > 0;
  
  // Prioritize Beitragsrückstände as the worst status
  const worstStatus = hasBeitragsrueckstaende ? "expired" : 
                    (hasExpired ? "expired" : 
                    (hasMissing ? "missing" : 
                    (hasExpiring ? "expiring" : "valid")));
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <div className="p-6 border-b border-border flex justify-between items-start">
        <div className="flex items-start">
          <div className="bg-primary/10 rounded-lg p-3 mr-4">
            <Building className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{provider.name}</h3>
              <StatusBadge status={worstStatus} />
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant="outline">{providerTypeText}</Badge>
              <Badge className={cn(statusConfig[provider.status].color)}>
                {statusConfig[provider.status].text}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground">E-Mail</p>
            <p className="font-medium">{provider.contactEmail}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Telefon</p>
            <p className="font-medium">{provider.contactPhone}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">Adresse</p>
          <p className="font-medium">{provider.address}</p>
        </div>
        
        <div className="border-t border-border pt-4 mt-4">
          <p className="font-medium mb-2">Dokumentenstatus</p>
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
              <span>{displayCounts.valid}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-amber-500" />
              <span>{displayCounts.expiring}</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1 text-red-600" />
              <span>{displayCounts.expired}</span>
            </div>
            <div className="flex items-center">
              <XCircle className="h-4 w-4 mr-1 text-gray-600" />
              <span>{displayCounts.missing}</span>
            </div>
          </div>
          
          {/* Show Beitragsrückstände if any exist */}
          {beitragsrueckstaende > 0 && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
              <div className="flex items-center text-red-700 text-sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>{beitragsrueckstaende} Beitragsrückstand{beitragsrueckstaende > 1 ? 'e' : ''}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Letzte Aktualisierung: {provider.lastUpdated}
          </p>
          <Button size="sm">Details</Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
