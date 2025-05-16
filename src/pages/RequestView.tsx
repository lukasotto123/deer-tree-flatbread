
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { providers, documents } from "@/data/dummy-data";
import DocumentRequest from "@/components/documents/DocumentRequest";
import { toast } from "sonner";

const RequestView = () => {
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => toast.success(`Einzelne Anfrage für "${doc}" wurde gesendet`)}
                    >
                      Einzeln anfragen
                    </Button>
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
