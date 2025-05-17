
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle, FileText } from "lucide-react";
import { documents } from "@/data/dummy-data";

const VendorDashboard = () => {
  // Group documents by customer
  const documentsByCustomer = documents.reduce((acc, doc) => {
    if (!acc[doc.providerId]) {
      acc[doc.providerId] = [];
    }
    acc[doc.providerId].push(doc);
    return acc;
  }, {} as Record<string, typeof documents>);

  const customerIds = ["customer-1", "customer-2", "customer-3"];
  const customerNames = {
    "customer-1": "Bauunternehmen Müller GmbH",
    "customer-2": "Schmidt Industriebau AG",
    "customer-3": "Bau & Technik Fischer KG",
  };

  // Customer-specific documents required
  const customerSpecificDocuments = [
    "Meldung an die Generalzolldirektion nach § 18 AEntG",
    "Werkverträge",
    "Auftragsverarbeitungsvereinbarung",
    "Onboarding Selbstauskunft",
    "Erklärung Subunternehmer"
  ];

  // Document categories for vendor
  const documentCategories = [
    {
      title: "Unternehmensdokumente",
      documents: [
        "Handelsregisterauszug",
        "Gewerbeanmeldung",
        "Freistellungsbescheinigung",
        "Versicherungsnachweis"
      ]
    },
    {
      title: "Bonitäts- & Risikoprüfung",
      documents: [
        "Creditreform-Selbstauskunft über Liquidität",
        "Bilanz des letzten Geschäftsjahres",
        "Bankauskunft",
        "SCHUFA-Auskunft"
      ]
    },
    {
      title: "Arbeitsschutz & Qualitätssicherung",
      documents: [
        "Arbeitsschutzorganisation",
        "Gefährdungsbeurteilung",
        "Qualitätsmanagement-Zertifikat",
        "Umweltmanagement-Nachweis"
      ]
    },
    {
      title: "Compliance & Ethik",
      documents: [
        "Verhaltenskodex",
        "Anti-Korruptionsrichtlinie",
        "Datenschutzerklärung",
        "Nachhaltigkeitsbericht"
      ]
    }
  ];

  // Fake employees data
  const employees = [
    { id: "emp-1", name: "Thomas Schmidt", position: "Bauleiter", documents: { valid: 4, expiring: 1, missing: 0 } },
    { id: "emp-2", name: "Anna Müller", position: "Elektrikerin", documents: { valid: 3, expiring: 0, missing: 2 } },
    { id: "emp-3", name: "Michael Weber", position: "Maurer", documents: { valid: 5, expiring: 0, missing: 0 } },
    { id: "emp-4", name: "Julia Fischer", position: "Installateur", documents: { valid: 2, expiring: 2, missing: 1 } },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Lieferanten Portal</h1>
        <p className="text-muted-foreground mt-1">
          Verwalten Sie Ihre Dokumente und Anfragen
        </p>
      </div>

      {/* Document Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-lg font-medium mb-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>Gesamt Dokumente</span>
            </div>
            <div className="text-3xl font-bold text-center">{documents.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-lg font-medium mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Gültige Dokumente</span>
            </div>
            <div className="text-3xl font-bold text-center">{documents.filter(d => d.status === 'valid').length}</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-lg font-medium mb-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <span>Bald ablaufend</span>
            </div>
            <div className="text-3xl font-bold text-center">{documents.filter(d => d.status === 'expiring').length}</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-lg font-medium mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Fehlende/Abgelaufen</span>
            </div>
            <div className="text-3xl font-bold text-center">{documents.filter(d => d.status === 'expired').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Customer-specific Documents */}
      {customerIds.map((customerId) => (
        <Card key={customerId} className="mt-6">
          <CardHeader>
            <CardTitle>Kundenspezifische Dokumente: {customerNames[customerId as keyof typeof customerNames]}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {customerSpecificDocuments.map((docName, index) => {
                // Randomly determine document status for demo
                const statusNum = (index + customerId.charCodeAt(0)) % 3;
                const status = statusNum === 0 ? 'valid' : statusNum === 1 ? 'expiring' : 'expired';
                
                const statusIcon = 
                  status === 'valid' ? <CheckCircle className="h-5 w-5 text-green-600" /> :
                  status === 'expiring' ? <Clock className="h-5 w-5 text-amber-500" /> :
                  <AlertTriangle className="h-5 w-5 text-red-600" />;
                
                return (
                  <Card key={docName} className="bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-2 mb-3">
                        {statusIcon}
                        <span className="text-sm font-medium">{docName}</span>
                      </div>
                      <div className="mt-auto">
                        <Button variant="outline" size="sm" className="w-full">
                          {status === 'valid' ? 'Anzeigen' : 'Hochladen'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Document Categories */}
      {documentCategories.map(category => (
        <Card key={category.title} className="mt-6">
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.documents.map((docName, index) => {
                // Randomly determine document status for demo
                const statusNum = (index + category.title.charCodeAt(0)) % 3;
                const status = statusNum === 0 ? 'valid' : statusNum === 1 ? 'expiring' : 'expired';
                
                const statusIcon = 
                  status === 'valid' ? <CheckCircle className="h-5 w-5 text-green-600" /> :
                  status === 'expiring' ? <Clock className="h-5 w-5 text-amber-500" /> :
                  <AlertTriangle className="h-5 w-5 text-red-600" />;
                
                return (
                  <Card key={docName} className="bg-white">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-2 mb-3">
                        {statusIcon}
                        <span className="text-sm font-medium">{docName}</span>
                      </div>
                      <div className="mt-auto">
                        <Button variant="outline" size="sm" className="w-full">
                          {status === 'valid' ? 'Anzeigen' : 'Hochladen'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Employees Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Mitarbeiter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {employees.map((employee) => (
              <Card key={employee.id} className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold mb-2">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                  </div>
                  
                  <div className="flex justify-center gap-3 mb-3">
                    <div className="text-center">
                      <span className="text-green-600 font-bold">{employee.documents.valid}</span>
                      <span className="text-xs block">Gültig</span>
                    </div>
                    <div className="text-center">
                      <span className="text-amber-500 font-bold">{employee.documents.expiring}</span>
                      <span className="text-xs block">Ablaufend</span>
                    </div>
                    <div className="text-center">
                      <span className="text-red-600 font-bold">{employee.documents.missing}</span>
                      <span className="text-xs block">Fehlend</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={`/person/vendor-1/${employee.id}`}>Verwalten</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorDashboard;
