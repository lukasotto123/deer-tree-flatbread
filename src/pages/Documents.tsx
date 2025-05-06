
import { useState } from "react";
import { documents } from "@/data/dummy-data";
import DocumentsList from "@/components/documents/DocumentsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documents = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dokumente</h1>
        <p className="text-muted-foreground mt-1">
          Automatisierte Dokumentenanfragen und KI-gestützte Validierung
        </p>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">Alle Dokumente</TabsTrigger>
          <TabsTrigger value="requested">Angefragt</TabsTrigger>
          <TabsTrigger value="validated">Validiert</TabsTrigger>
          <TabsTrigger value="flagged">Potenziell gefälscht</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <DocumentsList 
            documents={documents} 
            activeTab={activeTab}
          />
        </TabsContent>
        
        <TabsContent value="requested" className="mt-0">
          <DocumentsList 
            documents={documents.filter(doc => doc.status === "missing")} 
            activeTab={activeTab}
          />
        </TabsContent>
        
        <TabsContent value="validated" className="mt-0">
          <DocumentsList 
            documents={documents.filter(doc => doc.status === "valid")} 
            activeTab={activeTab}
          />
        </TabsContent>
        
        <TabsContent value="flagged" className="mt-0">
          <DocumentsList 
            documents={documents.filter(doc => doc.status === "expired")}
            activeTab={activeTab}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
