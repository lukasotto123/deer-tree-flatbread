
import { useState } from "react";
import { FileText, AlertTriangle, Clock, Euro, CheckCircle, Users, Upload, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { documents } from "@/data/dummy-data";

// Document categories from the user's request
const documentCategories = [
  "Behördliche & steuerliche Nachweise",
  "Sozial- & Versicherungsnachweise",
  "Arbeits- & Mindestlohn-compliance",
  "Bonitäts- & Risikoprüfung",
  "Personal- & Qualifikationsnachweise",
  "Kundenspezifisch"
];

// Mock customers for vendor-specific documents
const customers = [
  { id: "customer-1", name: "Bauunternehmen Müller GmbH" },
  { id: "customer-2", name: "Schmidt Immobilien AG" },
  { id: "customer-3", name: "Technische Gebäudeausstattung Berlin" }
];

// Group documents by category
const groupDocumentsByCategory = () => {
  const categorized: Record<string, typeof documents> = {};
  
  documentCategories.forEach(category => {
    categorized[category] = documents.filter(doc => 
      doc.category === category && 
      !doc.employeeId // Only non-employee documents
    );
  });
  
  return categorized;
};

// Group employee documents
const employeeDocuments = documents.filter(doc => doc.employeeId);
const employees = Array.from(new Set(employeeDocuments.map(doc => doc.employeeId)))
  .filter(Boolean)
  .map(id => {
    const docs = employeeDocuments.filter(doc => doc.employeeId === id);
    return {
      id,
      name: `Mitarbeiter ${id}`,
      documents: docs,
      valid: docs.filter(d => d.status === 'valid').length,
      expiring: docs.filter(d => d.status === 'expiring').length,
      expired: docs.filter(d => d.status === 'expired').length
    };
  });

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const categorizedDocuments = groupDocumentsByCategory();
  
  // Stats for the top boxes
  const beitragsrückstände = documents.filter(doc => 
    doc.status === 'expired' && 
    (doc.name.includes("Unbedenklichkeitsbescheinigung") || doc.name.includes("Beitrag"))
  ).length;
  
  const fehlendeDokumente = documents.filter(doc => doc.status === 'expired').length;
  const ablaufendeDokumente = documents.filter(doc => doc.status === 'expiring').length;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Lieferanten Portal</h1>
          <p className="text-muted-foreground mt-1">
            Verwalten Sie Ihre Dokumente und Anfragen
          </p>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="requests">Anfragen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          {/* Top Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center items-center mb-2">
                  <Euro className="h-5 w-5 text-red-600 mr-2" />
                  <h3 className="text-lg font-medium">Beitragsrückstände</h3>
                </div>
                <p className="text-4xl font-bold text-center">{beitragsrückstände}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                  <h3 className="text-lg font-medium">Fehlende oder abgelaufene Dokumente</h3>
                </div>
                <p className="text-4xl font-bold text-center">{fehlendeDokumente}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-center items-center mb-2">
                  <Clock className="h-5 w-5 text-amber-500 mr-2" />
                  <h3 className="text-lg font-medium">Ablaufende Dokumente</h3>
                </div>
                <p className="text-4xl font-bold text-center">{ablaufendeDokumente}</p>
                <p className="text-sm text-muted-foreground mt-1 text-center">in den nächsten 30 Tagen</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Document Categories */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Dokumente nach Kategorien</h2>
            
            {documentCategories.map((category) => {
              const docs = categorizedDocuments[category] || [];
              const validDocs = docs.filter(d => d.status === 'valid').length;
              const expiringDocs = docs.filter(d => d.status === 'expiring').length;
              const expiredDocs = docs.filter(d => d.status === 'expired').length;
              
              // Skip empty categories
              if (docs.length === 0) return null;
              
              return (
                <Accordion type="single" collapsible key={category}>
                  <AccordionItem value={category}>
                    <AccordionTrigger className="hover:bg-slate-50 px-4 py-2 rounded-md">
                      <div className="flex justify-between items-center w-full pr-4">
                        <span>{category}</span>
                        <div className="flex gap-3">
                          <Badge variant="outline" className="bg-green-50">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                            {validDocs}
                          </Badge>
                          <Badge variant="outline" className="bg-amber-50">
                            <Clock className="h-4 w-4 text-amber-500 mr-1" />
                            {expiringDocs}
                          </Badge>
                          <Badge variant="outline" className="bg-red-50">
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                            {expiredDocs}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pt-2">
                      <div className="mb-3 flex justify-between">
                        <h4 className="font-medium">Dokumente in dieser Kategorie</h4>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Dokument hochladen
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Neues Dokument hochladen</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              {/* Upload form would go here */}
                              <p>Upload-Formular für {category}</p>
                              <p className="text-sm text-muted-foreground">
                                Wählen Sie aus, ob dieses Dokument für das gesamte Unternehmen oder 
                                für eine bestimmte Niederlassung gilt.
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="space-y-2">
                        {docs.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center">
                              {doc.status === 'valid' && <CheckCircle className="h-4 w-4 text-green-600 mr-2" />}
                              {doc.status === 'expiring' && <Clock className="h-4 w-4 text-amber-500 mr-2" />}
                              {doc.status === 'expired' && <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />}
                              <span>{doc.name}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Anzeigen</Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="secondary" size="sm">Aktualisieren</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Dokument aktualisieren</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <p>Upload-Formular für {doc.name}</p>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </div>
          
          {/* Employee Documents */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Mitarbeiter Dokumente</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Neuer Mitarbeiter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Neuen Mitarbeiter anlegen</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {/* New employee form would go here */}
                    <p>Formular für neuen Mitarbeiter und Unternehmenszuweisung</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {employees.map((employee) => (
                <Card key={employee.id}>
                  <CardHeader>
                    <CardTitle>{employee.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-3 mb-3">
                      <Badge variant="outline" className="bg-green-50">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                        {employee.valid}
                      </Badge>
                      <Badge variant="outline" className="bg-amber-50">
                        <Clock className="h-4 w-4 text-amber-500 mr-1" />
                        {employee.expiring}
                      </Badge>
                      <Badge variant="outline" className="bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                        {employee.expired}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Dokumente verwalten
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Customer-Specific Documents */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Kundenspezifische Dokumente</h2>
            
            {customers.map((customer) => (
              <Accordion type="single" collapsible key={customer.id}>
                <AccordionItem value={customer.id}>
                  <AccordionTrigger className="hover:bg-slate-50 px-4 py-2 rounded-md">
                    {customer.name}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <div className="mb-3 flex justify-between">
                      <h4 className="font-medium">Dokumente für {customer.name}</h4>
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Dokument hochladen
                      </Button>
                    </div>
                    <div className="p-4 text-center text-muted-foreground">
                      <p>Keine spezifischen Dokumente für diesen Kunden vorhanden.</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Dokument hochladen
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="requests" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dokumentenanfragen von Kunden</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Requests from different customers */}
              {customers.map((customer, index) => (
                <div key={customer.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">{customer.name}</h3>
                    <Badge variant={index % 3 === 0 ? "destructive" : "outline"}>
                      {index % 3 === 0 ? "Dringend" : "Standard"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Anfrage vom {new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toLocaleDateString('de-DE')}
                  </p>
                  <div className="space-y-2 mb-3">
                    <h4 className="text-sm font-medium">Angeforderte Dokumente:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {["Unbedenklichkeitsbescheinigung Finanzamt", 
                        "Unbedenklichkeitsbescheinigung Berufsgenossenschaft", 
                        "Betriebshaftpflichtversicherung"].map((docName, i) => (
                        <li key={i} className="text-sm flex justify-between">
                          <span>{docName}</span>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-5 text-xs">
                                <Upload className="h-3 w-3 mr-1" />
                                Hochladen
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Dokument hochladen</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <p>Upload-Formular für {docName}</p>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Später erledigen</Button>
                    <Button size="sm">Alle hochladen</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorDashboard;
