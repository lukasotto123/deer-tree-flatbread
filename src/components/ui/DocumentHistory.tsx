
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { documentHistory } from "@/data/document-history";

interface DocumentHistoryProps {
  documentId: string;
}

const DocumentHistory = ({ documentId }: DocumentHistoryProps) => {
  const history = documentHistory.filter(h => h.documentId === documentId);
  
  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dokumentenhistorie</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Keine Historieneinträge für dieses Dokument verfügbar.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dokumentenhistorie</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum</TableHead>
              <TableHead>Aktion</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bearbeiter</TableHead>
              <TableHead>Kommentar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(entry.date).toLocaleDateString('de-DE')}</TableCell>
                <TableCell>{entry.action}</TableCell>
                <TableCell>
                  {entry.status && (
                    <StatusBadgeGerman document={entry.status} />
                  )}
                </TableCell>
                <TableCell>{entry.user}</TableCell>
                <TableCell className="max-w-xs truncate" title={entry.comment}>
                  {entry.comment}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const StatusBadgeGerman = ({ document }: { document: 'valid' | 'expiring' | 'expired' | 'missing' }) => {
  const docStatusMap = {
    valid: { text: "Gültig", className: "bg-green-100 text-green-800" },
    expiring: { text: "Läuft bald ab", className: "bg-yellow-100 text-yellow-800" },
    expired: { text: "Abgelaufen", className: "bg-red-100 text-red-800" },
    missing: { text: "Fehlt", className: "bg-gray-100 text-gray-800" },
  };
  
  const { text, className } = docStatusMap[document];
  
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${className}`}>
      {text}
    </span>
  );
};

export default DocumentHistory;
