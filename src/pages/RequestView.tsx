
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Upload } from "lucide-react";
import { providers, documents } from "@/data/dummy-data";
import DocumentRequest from "@/components/documents/DocumentRequest";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AppLayoutContext {
  userMode: "kunde" | "lieferant";
}

const RequestView = () => {
  const { userMode } = useOutletContext<AppLayoutContext>();
  
  return userMode === "kunde" ? <CustomerRequestView /> : <VendorRequestView />;
};

const CustomerRequestView = () => {
  // Group documents by provider for weekly requests
  const providerDocumentGroups = [
    {
      id: "weekly-1",
      providerId: "provider-1",
      providerName: "Bauunternehmen Schmidt GmbH",
      nextScheduledDate: "2025-05-20",
      documents: [
        "Unbedenklichkeitsbescheinigung Finanzamt",
        "Unbedenklichkeitsbescheinigung Berufsgenossenschaft",
        "Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen"
      ]
    },
    {
      id: "weekly-2",
      providerId: "provider-2",
      providerName: "Elektrotechnik Müller AG",
      nextScheduledDate: "2025-05-21",
      documents: [
        "A1-Bescheinigung für Max Schmidt",
        "Betriebshaftpflichtversicherung",
        "Gewerbeanmeldung"
      ]
    },
    {
      id: "weekly-3",
      providerId: "provider-3",
      providerName: "Sanitär Weber & Söhne",
      nextScheduledDate: "2025-05-22",
      documents: [
        "Betriebshaftpflichtversicherung",
        "Handelsregisterauszug",
        "Unbedenklichkeitsbescheinigung Krankenkasse"
      ]
    }
  ];

  // Handler für das Senden einer wöchentlichen Anfrage
  const handleSendWeeklyRequest = (groupId: string) => {
    toast.success("Wöchentliche Dokumentenanfrage wurde erfolgreich versendet");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dokumentenanfragen</h1>
          <p className="text-muted-foreground mt-1">
            Wöchentliche Anfragen für fehlende oder abgelaufene Dokumente
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline">Zurück zum Dashboard</Button>
          </Link>
          <DocumentRequest />
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Wöchentliche Dokumentenanfragen</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unternehmen</TableHead>
                <TableHead>Anzahl Dokumente</TableHead>
                <TableHead>Nächste geplante Anfrage</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {providerDocumentGroups.map((group) => {
                return (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.providerName}</TableCell>
                    <TableCell>{group.documents.length} Dokumente</TableCell>
                    <TableCell>{new Date(group.nextScheduledDate).toLocaleDateString('de-DE')}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSendWeeklyRequest(group.id)}
                      >
                        Jetzt senden
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => {
                          document.getElementById(`details-${group.id}`)?.classList.toggle('hidden');
                        }}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {/* Details für jede wöchentliche Anfrage */}
          {providerDocumentGroups.map((group) => (
            <div 
              key={`details-${group.id}`}
              id={`details-${group.id}`}
              className="mt-4 bg-muted p-4 rounded-md hidden"
            >
              <h4 className="text-md font-semibold mb-2">{group.providerName} - Benötigte Dokumente</h4>
              <ul className="list-disc pl-5 space-y-1">
                {group.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{doc}</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="text-xs"
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Hochladen
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Dokument hochladen</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <p>Upload-Formular für "{doc}"</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

const VendorRequestView = () => {
  const requestGroups = [
    {
      id: "request-1",
      customerName: "Bauunternehmen Müller GmbH",
      requestDate: "2025-05-10",
      status: "pending",
      documents: [
        "Unbedenklichkeitsbescheinigung Finanzamt",
        "Unbedenklichkeitsbescheinigung Berufsgenossenschaft",
        "Eidesstattliche Erklärung zur Zahlung von Mindestlöhnen"
      ]
    },
    {
      id: "request-2",
      customerName: "Schmidt Industriebau AG",
      requestDate: "2025-05-12",
      status: "pending",
      documents: [
        "A1-Bescheinigung für Max Schmidt",
        "Betriebshaftpflichtversicherung",
        "Gewerbeanmeldung"
      ]
    },
    {
      id: "request-3",
      customerName: "Bau & Technik Fischer KG",
      requestDate: "2025-05-15",
      status: "pending",
      documents: [
        "Betriebshaftpflichtversicherung",
        "Handelsregisterauszug",
        "Unbedenklichkeitsbescheinigung Krankenkasse"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dokumentenanfragen</h1>
          <p className="text-muted-foreground mt-1">
            Offene Dokumentenanfragen von Ihren Kunden
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline">Zurück zum Dashboard</Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Dokumentenanfragen von Kunden</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kunde</TableHead>
                <TableHead>Anzahl Dokumente</TableHead>
                <TableHead>Anfragedatum</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requestGroups.map((group) => {
                return (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">{group.customerName}</TableCell>
                    <TableCell>{group.documents.length} Dokumente</TableCell>
                    <TableCell>{new Date(group.requestDate).toLocaleDateString('de-DE')}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="secondary" 
                        size="sm"
                        onClick={() => {
                          document.getElementById(`details-${group.id}`)?.classList.toggle('hidden');
                        }}
                      >
                        Details anzeigen
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {/* Details für jede Anfrage */}
          {requestGroups.map((group) => (
            <div 
              key={`details-${group.id}`}
              id={`details-${group.id}`}
              className="mt-4 bg-muted p-4 rounded-md hidden"
            >
              <h4 className="text-md font-semibold mb-2">{group.customerName} - Benötigte Dokumente</h4>
              <ul className="list-disc pl-5 space-y-1">
                {group.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span>{doc}</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          className="text-xs"
                        >
                          <Upload className="h-3 w-3 mr-1" />
                          Hochladen
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Dokument hochladen</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <p>Upload-Formular für "{doc}"</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestView;
