
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ProviderCard from "./ProviderCard";
import { Provider } from "@/types";
import { Plus, Users, FileText, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ProvidersOverviewProps {
  providers: Provider[];
}

// Mock employees data for providers
const mockEmployees = [
  { id: "emp1", name: "Max Müller", position: "Bauarbeiter", status: "active" },
  { id: "emp2", name: "Anna Schmidt", position: "Elektrikerin", status: "active" },
  { id: "emp3", name: "Hans Weber", position: "Vorarbeiter", status: "inactive" },
  { id: "emp4", name: "Maria Becker", position: "Maurerin", status: "active" },
  { id: "emp5", name: "Thomas Krause", position: "Maler", status: "active" }
];

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
            <div key={provider.id} className="space-y-6">
              <ProviderCard provider={provider} />
              
              {/* Employees card for each provider */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Mitarbeiter
                    </CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Hinzufügen
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Mitarbeiter hinzufügen</DialogTitle>
                        </DialogHeader>
                        <div className="p-4">
                          <p>Formular zum Hinzufügen eines neuen Mitarbeiters</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockEmployees.slice(0, 3).map(employee => (
                      <div key={employee.id} className="p-2 border rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.position}</div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-1" />
                                Dokumente
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Dokumente für {employee.name}</DialogTitle>
                              </DialogHeader>
                              <div className="p-4">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Personendaten</h4>
                                      <div className="space-y-2">
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">Name</p>
                                          <p>{employee.name}</p>
                                        </div>
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">Position</p>
                                          <p>{employee.position}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Dokumente</h4>
                                      <div className="space-y-2">
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">Personalausweis</p>
                                          <p className="text-muted-foreground">Gültig bis 12.06.2027</p>
                                        </div>
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">A1-Bescheinigung</p>
                                          <p className="text-muted-foreground">Gültig bis 31.12.2025</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Einsätze</h4>
                                    <div className="p-2 border rounded">
                                      <div className="flex justify-between">
                                        <p>Projekt ABC</p>
                                        <p className="text-muted-foreground">01.01.2025 - 30.06.2025</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Building className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {mockEmployees.length > 3 && (
                      <Button variant="ghost" className="w-full text-sm" size="sm">
                        Alle {mockEmployees.length} Mitarbeiter anzeigen
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="personaldienstleister" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="space-y-6">
              <ProviderCard provider={provider} />
              
              {/* Employees card for each provider */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Mitarbeiter
                    </CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Hinzufügen
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Mitarbeiter hinzufügen</DialogTitle>
                        </DialogHeader>
                        <div className="p-4">
                          <p>Formular zum Hinzufügen eines neuen Mitarbeiters</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockEmployees.slice(0, 3).map(employee => (
                      <div key={employee.id} className="p-2 border rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.position}</div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-1" />
                                Dokumente
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Dokumente für {employee.name}</DialogTitle>
                              </DialogHeader>
                              <div className="p-4">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Personendaten</h4>
                                      <div className="space-y-2">
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">Name</p>
                                          <p>{employee.name}</p>
                                        </div>
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">Position</p>
                                          <p>{employee.position}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Dokumente</h4>
                                      <div className="space-y-2">
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">Personalausweis</p>
                                          <p className="text-muted-foreground">Gültig bis 12.06.2027</p>
                                        </div>
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">A1-Bescheinigung</p>
                                          <p className="text-muted-foreground">Gültig bis 31.12.2025</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Einsätze</h4>
                                    <div className="p-2 border rounded">
                                      <div className="flex justify-between">
                                        <p>Projekt ABC</p>
                                        <p className="text-muted-foreground">01.01.2025 - 30.06.2025</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Building className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {mockEmployees.length > 3 && (
                      <Button variant="ghost" className="w-full text-sm" size="sm">
                        Alle {mockEmployees.length} Mitarbeiter anzeigen
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="nachunternehmer" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="space-y-6">
              <ProviderCard provider={provider} />
              
              {/* Employees card for each provider */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Mitarbeiter
                    </CardTitle>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Hinzufügen
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Mitarbeiter hinzufügen</DialogTitle>
                        </DialogHeader>
                        <div className="p-4">
                          <p>Formular zum Hinzufügen eines neuen Mitarbeiters</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockEmployees.slice(0, 3).map(employee => (
                      <div key={employee.id} className="p-2 border rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-muted-foreground">{employee.position}</div>
                        </div>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <FileText className="h-4 w-4 mr-1" />
                                Dokumente
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Dokumente für {employee.name}</DialogTitle>
                              </DialogHeader>
                              <div className="p-4">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium mb-2">Personendaten</h4>
                                      <div className="space-y-2">
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">Name</p>
                                          <p>{employee.name}</p>
                                        </div>
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">Position</p>
                                          <p>{employee.position}</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-medium mb-2">Dokumente</h4>
                                      <div className="space-y-2">
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">Personalausweis</p>
                                          <p className="text-muted-foreground">Gültig bis 12.06.2027</p>
                                        </div>
                                        <div className="p-2 border rounded">
                                          <p className="text-sm font-medium">A1-Bescheinigung</p>
                                          <p className="text-muted-foreground">Gültig bis 31.12.2025</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Einsätze</h4>
                                    <div className="p-2 border rounded">
                                      <div className="flex justify-between">
                                        <p>Projekt ABC</p>
                                        <p className="text-muted-foreground">01.01.2025 - 30.06.2025</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Building className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {mockEmployees.length > 3 && (
                      <Button variant="ghost" className="w-full text-sm" size="sm">
                        Alle {mockEmployees.length} Mitarbeiter anzeigen
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </TabsContent>
    </div>
  );
};

export default ProvidersOverview;
