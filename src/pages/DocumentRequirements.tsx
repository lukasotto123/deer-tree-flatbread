
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { documentTypes } from "@/data/dummy-data";
import { Trash2 } from "lucide-react";

const DocumentRequirements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "personaldienstleister" | "subunternehmer">("all");

  // Mark Werksverträge as "Verpflichtend" - update in UI only
  const modifiedDocumentTypes = documentTypes.map(doc => {
    if (doc.name.includes("Werksvertrag")) {
      return {
        ...doc,
        requiredFor: {
          ...doc.requiredFor,
          secure: "Verpflichtend",
          basic: "Verpflichtend"
        }
      };
    }
    return doc;
  });

  const filteredDocuments = modifiedDocumentTypes.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || doc.providerType === filter;
    return matchesSearch && matchesFilter;
  });

  // Dummy function for delete button
  const handleDeleteDocument = (docId: string) => {
    console.log(`Document deletion requested for ID: ${docId}`);
    // This is just a dummy function with no actual implementation
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dokumentenanforderungen</h1>
        <Link to="/">
          <Button variant="outline">Zurück zum Dashboard</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Dokument suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                Alle
              </Button>
              <Button 
                variant={filter === "personaldienstleister" ? "default" : "outline"}
                onClick={() => setFilter("personaldienstleister")}
              >
                Personaldienstleister
              </Button>
              <Button 
                variant={filter === "subunternehmer" ? "default" : "outline"}
                onClick={() => setFilter("subunternehmer")}
              >
                Subunternehmer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Dokumente</CardTitle>
          <Button size="sm">Neues Dokument hinzufügen</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dokumentenname</TableHead>
                <TableHead>Unternehmenstyp</TableHead>
                <TableHead>Pro Mitarbeiter</TableHead>
                <TableHead>Klientenspezifisch</TableHead>
                <TableHead>Prüffrequenz (Sicher)</TableHead>
                <TableHead>Prüffrequenz (Basis)</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    {doc.providerType === "personaldienstleister" 
                      ? "Personaldienstleister" 
                      : "Subunternehmer"}
                  </TableCell>
                  <TableCell>{doc.isPerEmployee ? "Ja" : "Nein"}</TableCell>
                  <TableCell>{doc.isClientSpecific ? "Ja" : "Nein"}</TableCell>
                  <TableCell>{doc.checkFrequency.secure}</TableCell>
                  <TableCell>{doc.checkFrequency.basic}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/document/${doc.id}`}>
                        <Button variant="outline" size="sm">Details</Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Löschen</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentRequirements;
