
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FileText, Search, Download, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/StatusBadge";
import DocumentUpload from "./DocumentUpload";
import { Document } from "@/types";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface DocumentsListProps {
  documents: Document[];
}

const DocumentsList = ({ documents }: DocumentsListProps) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [providerTypeFilter, setProviderTypeFilter] = useState<string>("all");

  const filteredDocuments = documents.filter((doc) => {
    // Status Filter
    if (statusFilter !== "all" && doc.status !== statusFilter) return false;
    
    // Provider Type Filter
    if (
      providerTypeFilter !== "all" &&
      doc.providerType !== providerTypeFilter
    )
      return false;
    
    // Search Term
    if (
      searchTerm &&
      !doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !doc.provider.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Dokumente suchen..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              <SelectItem value="valid">Gültig</SelectItem>
              <SelectItem value="expiring">Läuft bald ab</SelectItem>
              <SelectItem value="expired">Abgelaufen</SelectItem>
              <SelectItem value="missing">Fehlt</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={providerTypeFilter}
            onValueChange={setProviderTypeFilter}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Dienstleister-Typ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Dienstleister</SelectItem>
              <SelectItem value="personaldienstleister">Personaldienstleister</SelectItem>
              <SelectItem value="subunternehmer">Subunternehmer</SelectItem>
            </SelectContent>
          </Select>

          <DocumentUpload />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          {filteredDocuments.length > 0 ? (
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Dokument</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Dienstleister</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Typ</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Ausstellungsdatum</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Ablaufdatum</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id}>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                        <span className="font-medium">{doc.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">{doc.provider}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm">
                      {doc.providerType === "personaldienstleister"
                        ? "Personaldienstl."
                        : "Subunternehmer"}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {format(new Date(doc.issuedDate), "dd.MM.yyyy", { locale: de })}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {doc.expiryDate
                        ? format(new Date(doc.expiryDate), "dd.MM.yyyy", { locale: de })
                        : "-"}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Info className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">Keine Dokumente gefunden</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsList;
