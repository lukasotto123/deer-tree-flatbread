
import { useState } from "react";
import { FileText, AlertTriangle, Clock, Euro, CheckCircle, Users, Upload, Plus, Building } from "lucide-react";
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

// Named employees for better identification
const employees = [
  { id: "employee-1", name: "Max Müller", position: "Bauarbeiter", valid: 3, expiring: 1, expired: 0 },
  { id: "employee-2", name: "Anna Schmidt", position: "Elektrikerin", valid: 2, expiring: 0, expired: 1 },
  { id: "employee-3", name: "Klaus Weber", position: "Vorarbeiter", valid: 4, expiring: 0, expired: 0 },
  { id: "employee-4", name: "Sarah Fischer", position: "Ingenieurin", valid: 1, expiring: 2, expired: 1 }
];

// Mock customers for vendor-specific documents with required document types
const customers = [
  { 
    id: "customer-1", 
    name: "Bauunternehmen Müller GmbH",
    documents: [
      { name: "Meldung an die Generalzolldirektion nach § 18 AEntG", status: "valid" },
      { name: "Werkverträge", status: "expiring" },
      { name: "Auftragsverarbeitungsvereinbarung", status: "expired" },
      { name: "Onboarding Selbstauskunft", status: "valid" },
      { name: "Erklärung Subunternehmer", status: "valid" }
    ]
  },
  { 
    id: "customer-2", 
    name: "Schmidt Immobilien AG",
    documents: [
      { name: "Meldung an die Generalzolldirektion nach § 18 AEntG", status: "valid" },
      { name: "Werkverträge", status: "valid" },
      { name: "Auftragsverarbeitungsvereinbarung", status: "valid" },
      { name: "Onboarding Selbstauskunft", status: "expired" },
      { name: "Erklärung Subunternehmer", status: "expiring" }
    ]
  },
  { 
    id: "customer-3", 
    name: "Technische Gebäudeausstattung Berlin",
    documents: [
      { name: "Meldung an die Generalzolldirektion nach § 18 AEntG", status: "expired" },
      { name: "Werkverträge", status: "expired" },
      { name: "Auftragsverarbeitungsvereinbarung", status: "valid" },
      { name: "Onboarding Selbstauskunft", status: "valid" },
      { name: "Erklärung Subunternehmer", status: "valid" }
    ]
  }
];

// Additional document examples for each category
const categoryDocuments = {
  "Behördliche & steuerliche Nachweise": [
    { id: "doc-1", name: "Umsatzsteuer-Identifikationsnummer", status: "valid" },
    { id: "doc-2", name: "Handelsregisterauszug", status: "valid" },
    { id: "doc-3", name: "Gewerbeanmeldung", status: "expiring" }
  ],
  "Sozial- & Versicherungsnachweise": [
    { id: "doc-4", name: "Unbedenklichkeitsbescheinigung Krankenkasse", status: "valid" },
    { id: "doc-5", name: "Unbedenklichkeitsbescheinigung Berufsgenossenschaft", status: "expired" },
    { id: "doc-6", name: "Betriebshaftpflichtversicherung", status: "valid" }
  ],
  "Arbeits- & Mindestlohn-compliance": [
    { id: "doc-7", name: "Selbsterklärung Mindestlohn", status: "valid" },
    { id: "doc-8", name: "Bescheinigung über Zahlung Mindestlohn", status: "valid" },
    { id: "doc-9", name: "Verpflichtungserklärung AEntG", status: "expiring" }
  ],
  "Bonitäts- & Risikoprüfung": [
    { id: "doc-10", name: "Creditreform-Selbstauskunft über Liquidität", status: "expired" },
    { id: "doc-11", name: "Jahresabschluss", status: "valid" },
    { id: "doc-12", name: "Bestätigung Zahlungsfähigkeit", status: "valid" }
  ],
  "Personal- & Qualifikationsnachweise": [
    { id: "doc-13", name: "Qualifikationszertifikate", status: "valid" },
    { id: "doc-14", name: "Schulungsnachweise", status: "expiring" },
    { id: "doc-15", name: "Arbeitserlaubnis", status: "valid" }
  ]
};

// Group documents by category
const groupDocumentsByCategory = () => {
  const categorized = {};
  
  documentCategories.forEach(category => {
    if (category !== "Kundenspezifisch") {
      categorized[category] = categoryDocuments[category] || [];
    } else {
      categorized[category] = [];
    }
  });
  
  return categorized;
};

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
              if (docs.length === 0 && category !== "Kundenspezifisch") return null;
              
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
                              <p>Upload-Formular für {category}</p>
                              <p className="text-sm text-muted-foreground">
                                Wählen Sie aus, ob dieses Dokument für das gesamte Unternehmen oder 
                                für eine bestimmte Niederlassung gilt.
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Button variant="outline" size="sm">Hauptsitz</Button>
                                <Button variant="outline" size="sm">Niederlassung Nord</Button>
                                <Button variant="outline" size="sm">Niederlassung Süd</Button>
                              </div>
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
                                    <div className="flex items-center space-x-2 mt-2">
                                      <Button variant="outline" size="sm">Alle Standorte</Button>
                                      <Button variant="outline" size="sm">Nur Hauptsitz</Button>
                                    </div>
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
                    <p className="text-muted-foreground text-sm mb-2">{employee.position}</p>
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
                    <div className="space-y-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="w-full">
                            Dokumente verwalten
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{employee.name} - Dokumente</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-1">Personendaten</h4>
                                  <div className="space-y-2">
                                    <div className="p-2 border rounded">
                                      <p className="text-sm font-medium">Name</p>
                                      <p>{employee.name}</p>
                                    </div>
                                    <div className="p-2 border rounded">
                                      <p className="text-sm font-medium">Position</p>
                                      <p>{employee.position}</p>
                                    </div>
                                    <div className="p-2 border rounded">
                                      <p className="text-sm font-medium">Personalausweis</p>
                                      <div className="flex justify-between">
                                        <p className="text-muted-foreground">Gültig bis 12.06.2027</p>
                                        <Button size="sm" variant="outline">Anzeigen</Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-1">Dokumente</h4>
                                  <div className="space-y-2">
                                    {["A1-Bescheinigung", "Arbeitsvertrag", "Qualifikationsnachweise"].map((doc, i) => (
                                      <div key={i} className="p-2 border rounded flex justify-between items-center">
                                        <div className="flex items-center">
                                          {i === 0 ? <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> : 
                                           i === 1 ? <Clock className="h-4 w-4 text-amber-500 mr-2" /> :
                                           <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />}
                                          <span>{doc}</span>
                                        </div>
                                        <div className="flex gap-2">
                                          <Button variant="ghost" size="sm">
                                            <Upload className="h-3 w-3 mr-1" />
                                            Hochladen
                                          </Button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium my-2">Einsätze</h4>
                                <div className="border rounded p-2">
                                  <div className="flex justify-between">
                                    <p>Bauunternehmen Müller GmbH</p>
                                    <p className="text-muted-foreground">01.01.2025 - 30.06.2025</p>
                                  </div>
                                  <p className="text-sm text-muted-foreground">Projekt: Neubau Fachmarktzentrum</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
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
                    <div className="flex justify-between items-center w-full pr-4">
                      <span>{customer.name}</span>
                      <div className="flex gap-3">
                        <Badge variant="outline" className="bg-green-50">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                          {customer.documents.filter(d => d.status === "valid").length}
                        </Badge>
                        <Badge variant="outline" className="bg-amber-50">
                          <Clock className="h-4 w-4 text-amber-500 mr-1" />
                          {customer.documents.filter(d => d.status === "expiring").length}
                        </Badge>
                        <Badge variant="outline" className="bg-red-50">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-1" />
                          {customer.documents.filter(d => d.status === "expired").length}
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <div className="mb-3 flex justify-between">
                      <h4 className="font-medium">Dokumente für {customer.name}</h4>
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Dokument hochladen
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {customer.documents.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            {doc.status === 'valid' && <CheckCircle className="h-4 w-4 text-green-600 mr-2" />}
                            {doc.status === 'expiring' && <Clock className="h-4 w-4 text-amber-500 mr-2" />}
                            {doc.status === 'expired' && <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />}
                            <span>{doc.name}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Anzeigen</Button>
                            <Button variant="secondary" size="sm">
                              <Upload className="h-3 w-3 mr-1" />
                              Hochladen
                            </Button>
                          </div>
                        </div>
                      ))}
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
                          <Button variant="secondary" size="sm" className="h-6 text-xs">
                            <Upload className="h-3 w-3 mr-1" />
                            Hochladen
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end">
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
