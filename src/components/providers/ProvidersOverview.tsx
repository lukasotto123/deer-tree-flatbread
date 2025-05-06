
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProviderCard from "./ProviderCard";
import { Provider } from "@/types";

interface ProvidersOverviewProps {
  providers: Provider[];
}

const ProvidersOverview = ({ providers }: ProvidersOverviewProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  
  const filteredProviders = providers.filter(provider => {
    if (activeTab === "all") return true;
    if (activeTab === "personaldienstleister") return provider.type === "personaldienstleister";
    if (activeTab === "subunternehmer") return provider.type === "subunternehmer";
    return true;
  });

  return (
    <div>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Alle</TabsTrigger>
          <TabsTrigger value="personaldienstleister">Personaldienstleister</TabsTrigger>
          <TabsTrigger value="subunternehmer">Subunternehmer</TabsTrigger>
        </TabsList>
        
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
        
        <TabsContent value="subunternehmer" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProvidersOverview;
