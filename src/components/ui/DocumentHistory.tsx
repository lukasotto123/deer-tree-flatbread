
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { documentHistory } from "@/data/document-history";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FileText } from "lucide-react";

interface DocumentHistoryProps {
  documentId: string;
}

const DocumentHistory = ({ documentId }: DocumentHistoryProps) => {
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  
  const history = documentHistory.filter(h => h.documentId === documentId);
  
  const handleViewDocument = (index: number) => {
    setSelectedEntry(index);
    setShowPdfDialog(true);
  };
  
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
    <>
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
                <TableHead className="text-right">Aktionen</TableHead>
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
                  <TableCell className="text-right">
                    {entry.action.includes("hochgeladen") && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDocument(index)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Anzeigen
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showPdfDialog} onOpenChange={setShowPdfDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Dokument vom {selectedEntry !== null && history[selectedEntry] 
                ? new Date(history[selectedEntry].date).toLocaleDateString('de-DE') 
                : ''}
            </DialogTitle>
          </DialogHeader>
          <div className="border rounded-md overflow-hidden">
            <AspectRatio ratio={1 / 1.414}>
              <img 
                src="/lovable-uploads/666d55f0-3a14-41c8-ada9-829e8a7aef6c.png" 
                alt="Document Preview" 
                className="object-contain w-full h-full"
              />
            </AspectRatio>
          </div>
        </DialogContent>
      </Dialog>
    </>
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
