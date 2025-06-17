
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FileText, Eye } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import DocumentHistory from "@/components/ui/DocumentHistory";
import { shouldDocumentBeMissing, getDocumentStatus } from "./documentStatusUtils";

interface DocumentsTableProps {
  relevantDocTypes: any[];
  employeeDocuments: any[];
  employeeId: string;
  providerId: string;
  citizenship: string;
}

const DocumentsTable = ({ relevantDocTypes, employeeDocuments, employeeId, providerId, citizenship }: DocumentsTableProps) => {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  const handleShowDocumentHistory = (docId: string) => {
    setSelectedDocumentId(docId === selectedDocumentId ? null : docId);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Dokumente</CardTitle>
        <Link to={`/submission-review/${providerId}/new?employeeId=${employeeId}`}>
          <Button size="sm">Dokument hochladen</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dokument</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ausstellungsdatum</TableHead>
              <TableHead>Ablaufdatum</TableHead>
              <TableHead>Erinnerungen</TableHead>
              <TableHead>Relevanz</TableHead>
              <TableHead className="text-right">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {relevantDocTypes.map((docType) => {
              // Check if this document should be missing for this employee
              const forceMissing = shouldDocumentBeMissing(employeeId, docType.id);
              const doc = forceMissing ? null : employeeDocuments.find(d => d.type === docType.id);
              
              const documentStatus = getDocumentStatus(employeeId, docType.id);
              
              // Special case for A1-Bescheinigung - only relevant for non-Germans
              const isA1Doc = docType.id === "doc-type-11";
              const isRequired = isA1Doc ? citizenship !== "Deutschland" : true;

              const hasHistory = doc && selectedDocumentId === doc.id;
              const isMissing = !doc;

              return (
                <React.Fragment key={docType.id}>
                  <TableRow>
                    <TableCell>{docType.name}</TableCell>
                    <TableCell>
                      {isMissing ? (
                        <StatusBadge status="missing" />
                      ) : (
                        <StatusBadge status={documentStatus} />
                      )}
                    </TableCell>
                    <TableCell>
                      {doc ? new Date(doc.issuedDate).toLocaleDateString('de-DE') : '-'}
                    </TableCell>
                    <TableCell>
                      {!isMissing && (documentStatus === "expiring" || documentStatus === "expired")
                        ? new Date(new Date().setMonth(new Date().getMonth() + (documentStatus === "expiring" ? 1 : -1))).toLocaleDateString('de-DE')
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {(isMissing || documentStatus === "expired") && (
                        <div className="text-sm">
                          <div>{Math.floor(Math.random() * 3)} gesendet</div>
                          <div className="text-xs text-muted-foreground">
                            Nächste: {new Date().toLocaleDateString('de-DE')}
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id={`relevance-${docType.id}`} 
                          checked={isRequired}
                        />
                        <Label htmlFor={`relevance-${docType.id}`}>
                          {isA1Doc && citizenship !== "Deutschland" 
                            ? "Verpflichtend (A1)" 
                            : (isRequired ? "Relevant" : "Nicht relevant")}
                        </Label>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {/* Only show History button */}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShowDocumentHistory(doc ? doc.id : `missing-${docType.id}`)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Historie
                        </Button>
                        
                        {/* Only show View button for existing documents */}
                        {doc && (
                          <Button 
                            variant="outline" 
                            size="sm"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Anzeigen
                          </Button>
                        )}
                        
                        {/* Upload/Check button for non-valid or missing documents */}
                        {(isMissing || (doc && documentStatus !== "valid")) && (
                          isMissing ? (
                            <Button variant="outline" size="sm">
                              Hochladen
                            </Button>
                          ) : (
                            <Link to={`/submission-review/${providerId}/${doc.id}?employeeId=${employeeId}`}>
                              <Button variant="outline" size="sm">
                                Prüfen
                              </Button>
                            </Link>
                          )
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  {hasHistory && (
                    <TableRow>
                      <TableCell colSpan={7} className="p-0 border-b-0">
                        <div className="py-3">
                          <DocumentHistory documentId={doc.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DocumentsTable;
