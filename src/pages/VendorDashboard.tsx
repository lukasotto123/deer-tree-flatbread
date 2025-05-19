
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle, FileText, Euro, Plus, ChevronDown, ChevronUp, Users } from "lucide-react";
import { documents } from "@/data/dummy-data";

const VendorDashboard = () => {
  // Fake employees data
  const employees = [
    { id: "emp-1", name: "Thomas Schmidt", position: "Bauleiter", documents: { valid: 4, expiring: 1, missing: 0 } },
    { id: "emp-2", name: "Anna Müller", position: "Elektrikerin", documents: { valid: 3, expiring: 0, missing: 2 } },
    { id: "emp-3", name: "Michael Weber", position: "Maurer", documents: { valid: 5, expiring: 0, missing: 0 } },
    { id: "emp-4", name: "Julia Fischer", position: "Installateur", documents: { valid: 2, expiring: 2, missing: 1 } },
  ];

  // Customer data
  const customers = [
    { id: "customer-1", name: "Bauunternehmen Müller GmbH" },
    { id: "customer-2", name: "Schmidt Industriebau AG" },
    { id: "customer-3", name: "Bau & Technik Fischer KG" },
  ];

  // Document categories for vendor
  const documentCategories = [
    {
      title: "Sozial- & Versicherungsnachweise",
      documents: [
        { id: "doc-1", name: "Unbedenklichkeitsbescheinigung Finanzamt", status: "valid", expiryDate: "2025-12-31" },
        { id: "doc-2", name: "Unbedenklichkeitsbescheinigung Berufsgenossenschaft", status: "expiring", expiryDate: "2025-06-30" },
        { id: "doc-3", name: "Unbedenklichkeitsbescheinigung Krankenkasse", status: "valid", expiryDate: "2025-12-31" },
        { id: "doc-4", name: "Unbedenklichkeitsbescheinigung Rentenversicherung", status: "expired", expiryDate: "2025-03-31" }
      ]
    },
    {
      title: "Arbeits- & Mindestlohn-compliance",
      documents: [
        { id: "doc-5", name: "Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen", status: "valid", expiryDate: "2025-12-31" },
        { id: "doc-6", name: "AEntG-Bestätigung", status: "valid", expiryDate: "2025-12-31" },
        { id: "doc-7", name: "Arbeitsverträge", status: "expiring", expiryDate: "2025-06-15" }
      ]
    },
    {
      title: "Behördliche & steuerliche Nachweise",
      documents: [
        { id: "doc-8", name: "Handelsregisterauszug", status: "valid", expiryDate: "2026-01-31" },
        { id: "doc-9", name: "Gewerbeanmeldung", status: "valid", expiryDate: null },
        { id: "doc-10", name: "Freistellungsbescheinigung § 48b EStG", status: "valid", expiryDate: "2025-12-31" }
      ]
    },
    {
      title: "Bonitäts- & Risikoprüfung",
      documents: [
        { id: "doc-11", name: "Creditreform-Selbstauskunft über Liquidität", status: "valid", expiryDate: "2025-09-30" },
        { id: "doc-12", name: "Bilanz des letzten Geschäftsjahres", status: "expired", expiryDate: "2025-03-31" },
        { id: "doc-13", name: "Bankauskunft", status: "expiring", expiryDate: "2025-06-30" }
      ]
    }
  ];

  // Stats
  const documentStats = {
    beitragsrückstände: 3,
    fehlendOderAbgelaufen: documents.filter(d => d.status === 'expired').length,
    ablaufend: documents.filter(d => d.status === 'expiring').length,
  };

  // State for collapsible sections
  const [expandedCustomers, setExpandedCustomers] = useState<Record<string, boolean>>({});

  const toggleCustomer = (customerId: string) => {
    setExpandedCustomers(prev => ({
      ...prev,
      [customerId]: !prev[customerId]
    }));
  };

  const getStatusIcon = (status: string) => {
    if (status === 'valid') return <CheckCircle className="h-5 w-5 text-green-600" />;
    if (status === 'expiring') return <Clock className="h-5 w-5 text-amber-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-600" />;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Lieferanten Portal</h1>
        <p className="text-muted-foreground mt-1">
          Verwalten Sie Ihre Dokumente und Anfragen
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="flex justify-center items-center mb-2">
                <Euro className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="text-lg font-medium">Beitragsrückstände</h3>
              </div>
              <p className="text-4xl font-bold">{documentStats.beitragsrückstände}</p>
            </div>
            <div className="mt-6">
              <Button className="w-full">
                Anzeigen
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="flex justify-center items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                <h3 className="text-lg font-medium">Fehlende oder abgelaufene Dokumente</h3>
              </div>
              <p className="text-4xl font-bold">{documentStats.fehlendOderAbgelaufen}</p>
            </div>
            <div className="mt-6">
              <Button className="w-full">
                Anzeigen
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col h-full">
            <div className="text-center flex-grow">
              <div className="flex justify-center items-center mb-2">
                <Clock className="h-5 w-5 text-amber-500 mr-2" />
                <h3 className="text-lg font-medium">Ablaufende Dokumente</h3>
              </div>
              <p className="text-4xl font-bold">{documentStats.ablaufend}</p>
              <p className="text-sm text-muted-foreground mt-1">in den nächsten 30 Tagen</p>
            </div>
            <div className="mt-6">
              <Button className="w-full">
                Anzeigen
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employees Section */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Mitarbeiter</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Mitarbeiter hinzufügen
          </Button>
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

      {/* Customer-specific Documents */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Kundenspezifische Dokumente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customers.map((customer) => (
              <Card key={customer.id} className="bg-white">
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleCustomer(customer.id)}
                >
                  <h3 className="font-medium">{customer.name}</h3>
                  {expandedCustomers[customer.id] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
                
                {expandedCustomers[customer.id] && (
                  <div className="p-4 pt-0 border-t">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Dokument</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Ablaufdatum</TableHead>
                          <TableHead className="text-right">Aktion</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* Just showing random documents for each customer */}
                        {documentCategories[0].documents.slice(0, 3).map(doc => (
                          <TableRow key={`${customer.id}-${doc.id}`}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                {doc.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                {getStatusIcon(doc.status)}
                                <span className="ml-2 capitalize">{doc.status}</span>
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(doc.expiryDate)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                {doc.status !== "valid" ? "Hochladen" : "Anzeigen"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Categories */}
      {documentCategories.map(category => (
        <Card key={category.title} className="mt-6">
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dokument</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ablaufdatum</TableHead>
                  <TableHead className="text-right">Aktion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getStatusIcon(doc.status)}
                        <span className="ml-2 capitalize">{doc.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(doc.expiryDate)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        {doc.status !== "valid" ? "Hochladen" : "Anzeigen"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default VendorDashboard;
