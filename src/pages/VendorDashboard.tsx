import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle, FileText, Euro, Plus, ChevronDown, ChevronUp, Users, History } from "lucide-react";
import { documents, documentTypes } from "@/data/dummy-data";
import StatusBadge from "@/components/ui/StatusBadge";

const VendorDashboard = () => {
  // Fake employees data - modified to match the IDs used in the VendorPersonView
  const employees = [
    { id: "employee-1", name: "Hans Schmidt", position: "Bauleiter", documents: { valid: 4, expiring: 1, missing: 0 } },
    { id: "employee-2", name: "Maria Wagner", position: "Elektrikerin", documents: { valid: 3, expiring: 0, missing: 2 } },
    { id: "employee-3", name: "Pierre Dubois", position: "Maurer", documents: { valid: 5, expiring: 0, missing: 0 } },
    { id: "employee-4", name: "Isabella Romano", position: "Installateur", documents: { valid: 2, expiring: 2, missing: 1 } },
  ];

  // Customer data
  const customers = [
    { id: "customer-1", name: "Bauunternehmen Müller GmbH" },
    { id: "customer-2", name: "Schmidt Industriebau AG" },
    { id: "customer-3", name: "Bau & Technik Fischer KG" },
  ];

  // Define document categories matching the ProviderView categorization
  const documentCategories = [
    {
      title: "Sozial- & Versicherungsnachweise",
      documents: [
        { id: "doc-1", name: "Unbedenklichkeitsbescheinigung Berufsgenossenschaft", status: "valid", expiryDate: "2025-12-31" },
        { id: "doc-2", name: "Unbedenklichkeitsbescheinigung der SOKA Bau", status: "expiring", expiryDate: "2025-06-30" },
        { id: "doc-3", name: "Betriebshaftpflichtversicherung", status: "valid", expiryDate: "2025-12-31" },
      ]
    },
    {
      title: "Arbeits- & Mindestlohn-compliance",
      documents: [
        { id: "doc-5", name: "Bescheinigung für Tätigkeiten im Baugewerbe § 13b UStG", status: "valid", expiryDate: "2025-12-31" },
        { id: "doc-6", name: "Mitteilung des Steuerberaters (Mitarbeiter u. Mindestlöhne)", status: "valid", expiryDate: "2025-12-31" },
        { id: "doc-7", name: "Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen", status: "expiring", expiryDate: "2025-06-15" }
      ]
    },
    {
      title: "Behördliche & steuerliche Nachweise",
      documents: [
        { id: "doc-8", name: "Testergebnis Scheinselbstständigkeit", status: "valid", expiryDate: "2026-01-31" },
        { id: "doc-9", name: "Freistellungsbescheinigung der Finanzverwaltung § 48b EStG", status: "valid", expiryDate: null },
        { id: "doc-10", name: "Gewerbeanmeldung", status: "valid", expiryDate: "2025-12-31" },
        { id: "doc-11", name: "Unbedenklichkeitsbescheinigung Finanzamt", status: "valid", expiryDate: "2025-12-31" },
        { id: "doc-12", name: "Handelsregisterauszug", status: "valid", expiryDate: "2026-01-31" },
        { id: "doc-13", name: "Handwerkskarte bzw. Eintragung in die Handwerksrolle", status: "valid", expiryDate: "2025-11-30" },
        { id: "doc-14", name: "Unternehmerbescheinigung vom Finanzamt", status: "expiring", expiryDate: "2025-06-15" },
        { id: "doc-15", name: "Gewerbezentralregisterauszug", status: "valid", expiryDate: "2025-10-31" }
      ]
    },
    {
      title: "Bonitäts- & Risikoprüfung",
      documents: [
        { id: "doc-16", name: "Creditreform-Selbstauskunft über Liquidität", status: "valid", expiryDate: "2025-09-30" }
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

  // Function to generate a random issuance date for each document
  const getRandomIssuanceDate = (expiryDate: string | null) => {
    if (!expiryDate) return '-';
    
    const expiry = new Date(expiryDate);
    // Generate a random date between 1-3 years before expiry
    const yearsBack = Math.floor(Math.random() * 3) + 1;
    const issuanceDate = new Date(expiry);
    issuanceDate.setFullYear(expiry.getFullYear() - yearsBack);
    
    return issuanceDate.toLocaleDateString('de-DE');
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((employee) => (
              <Card key={employee.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {employee.documents.missing > 0 ? (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                          Fehlend
                        </span>
                      ) : employee.documents.expiring > 0 ? (
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full font-medium">
                          Ablaufend
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                          Gültig
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{employee.documents.valid}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span>{employee.documents.expiring}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span>{employee.documents.missing}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Link to={`/person/${employee.id}`}>
                      <Button variant="outline" size="sm">Details</Button>
                    </Link>
                  </div>
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
                          <TableHead>Ausstellungsdatum</TableHead>
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
                              <StatusBadge status={doc.status} />
                            </TableCell>
                            <TableCell>{getRandomIssuanceDate(doc.expiryDate)}</TableCell>
                            <TableCell>{formatDate(doc.expiryDate)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  {doc.status !== "valid" ? "Hochladen" : "Anzeigen"}
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <History className="h-4 w-4" />
                                  Historie
                                </Button>
                              </div>
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
                  <TableHead>Ausstellungsdatum</TableHead>
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
                      <StatusBadge status={doc.status} />
                    </TableCell>
                    <TableCell>{getRandomIssuanceDate(doc.expiryDate)}</TableCell>
                    <TableCell>{formatDate(doc.expiryDate)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          {doc.status !== "valid" ? "Hochladen" : "Anzeigen"}
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <History className="h-4 w-4" />
                          Historie
                        </Button>
                      </div>
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
