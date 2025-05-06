
import { FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/StatusBadge";
import { Document } from "@/types";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface ExpiringDocumentsTableProps {
  documents: Document[];
}

const ExpiringDocumentsTable = ({ documents }: ExpiringDocumentsTableProps) => {
  const expiringOrExpired = documents.filter(
    (doc) => doc.status === "expiring" || doc.status === "expired"
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold">Bald ablaufende & abgelaufene Dokumente</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Dokumente, die in den nächsten 30 Tagen ablaufen oder bereits abgelaufen sind
        </p>
      </div>

      <div className="overflow-x-auto">
        {expiringOrExpired.length > 0 ? (
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Dokument</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Dienstleister</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Typ</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Ablaufdatum</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Status</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Aktion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {expiringOrExpired.map((doc) => (
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
                    {doc.expiryDate ? format(new Date(doc.expiryDate), "dd.MM.yyyy", { locale: de }) : "-"}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <Button size="sm" variant="outline">
                      <Info className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">
              Keine ablaufenden oder abgelaufenen Dokumente gefunden
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpiringDocumentsTable;
