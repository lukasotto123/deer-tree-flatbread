
import { Building, CheckCircle, Clock, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Provider } from "@/types";

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  const providerTypeText = provider.type === 'personaldienstleister' 
    ? 'Personaldienstleister' 
    : 'Subunternehmer';
  
  const statusConfig = {
    active: { color: 'bg-green-100 text-green-800', text: 'Aktiv' },
    inactive: { color: 'bg-gray-100 text-gray-800', text: 'Inaktiv' },
    pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Ausstehend' },
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
      <div className="p-6 border-b border-border flex justify-between items-start">
        <div className="flex items-start">
          <div className="bg-primary/10 rounded-lg p-3 mr-4">
            <Building className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{provider.name}</h3>
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
              <CheckCircle className="h-4 w-4 text-success mr-1" />
              <span>{provider.documentsCount.valid}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-warning mr-1" />
              <span>{provider.documentsCount.expiring}</span>
            </div>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-destructive mr-1" />
              <span>{provider.documentsCount.expired}</span>
            </div>
            <div className="flex items-center">
              <Info className="h-4 w-4 text-muted-foreground mr-1" />
              <span>{provider.documentsCount.missing}</span>
            </div>
          </div>
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
