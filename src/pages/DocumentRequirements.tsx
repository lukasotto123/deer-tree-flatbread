
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { documentTypes } from "@/data/dummy-data";

const DocumentRequirements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "personaldienstleister" | "subunternehmer">("all");

  const filteredDocuments = documentTypes.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || doc.providerType === filter;
    return matchesSearch && matchesFilter;
  });

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
                <TableHead>Prüffrequenz</TableHead>
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
                  <TableCell>{doc.checkFrequency.secure}</TableCell>
                  <TableCell className="text-right">
                    <Link to={`/document/${doc.id}`}>
                      <Button variant="outline" size="sm">Details</Button>
                    </Link>
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
