
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ProviderCard from "./ProviderCard";
import { Provider } from "@/types";
import { Plus } from "lucide-react";

interface ProvidersOverviewProps {
  providers: Provider[];
}

const ProvidersOverview = ({ providers }: ProvidersOverviewProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredProviders = providers.filter(provider => {
    if (activeTab === "all") return true;
    if (activeTab === "personaldienstleister") return provider.type === "personaldienstleister";
    if (activeTab === "nachunternehmer") return provider.type === "nachunternehmer";
    return true;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Alle</TabsTrigger>
            <TabsTrigger value="personaldienstleister">Personaldienstleister</TabsTrigger>
            <TabsTrigger value="nachunternehmer">Nachunternehmer</TabsTrigger>
          </TabsList>
        </Tabs>
        
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
      
      <TabsContent value="all" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="personaldienstleister" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="nachunternehmer" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      </TabsContent>
    </div>
  );
};

export default ProvidersOverview;
