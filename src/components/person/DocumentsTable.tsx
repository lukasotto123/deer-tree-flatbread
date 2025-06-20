
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FileText, Eye, MoreHorizontal } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import DocumentHistory from "@/components/ui/DocumentHistory";
import { shouldDocumentBeMissing, getDocumentStatus, getDocumentExpiryDate, getRemindersCount } from "./documentStatusUtils";

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
              <TableHead className="text-right">Mehr</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {relevantDocTypes.map((docType) => {
              // Check if this document should be missing for this employee
              const forceMissing = shouldDocumentBeMissing(employeeId, docType.id);
              const doc = forceMissing ? null : employeeDocuments.find(d => d.type === docType.id);
              
              const documentStatus = getDocumentStatus(employeeId, docType.id);
              const expiryDate = getDocumentExpiryDate(employeeId, docType.id);
              const remindersCount = getRemindersCount(employeeId, docType.id);
              
              // Special case for A1-Bescheinigung - only relevant for non-Germans
              const isA1Doc = docType.id === "doc-type-11";
              const isRequired = isA1Doc ? citizenship !== "Deutschland" : true;

              // Spezielle Relevanz-Anzeige für Jan Kowalski's A1-Bescheinigung
              const getRelevanceLabel = () => {
                if (isA1Doc && employeeId === "employee-15") {
                  return "Relevant"; // Für Jan's A1-Bescheinigung "Relevant" anzeigen
                }
                if (isA1Doc && citizenship !== "Deutschland") {
                  return "Verpflichtend (A1)";
                }
                return isRequired ? "Relevant" : "Nicht relevant";
              };

              const hasHistory = doc && selectedDocumentId === doc.id;
              const isMissing = !doc;

              // Special handling for Jan Kowalski's A1 certificate - don't show "Nächste" date
              const isJanA1Doc = employeeId === "employee-15" && docType.id === "doc-type-11";

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
                      {!isMissing && expiryDate
                        ? new Date(expiryDate).toLocaleDateString('de-DE')
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {(isMissing || documentStatus === "expired") && (
                        <div className="text-sm">
                          <div>{remindersCount} gesendet</div>
                          {!isJanA1Doc && (
                            <div className="text-xs text-muted-foreground">
                              Nächste: {new Date().toLocaleDateString('de-DE')}
                            </div>
                          )}
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
                          {getRelevanceLabel()}
                        </Label>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleShowDocumentHistory(doc ? doc.id : `missing-${docType.id}`)}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            Historie
                          </DropdownMenuItem>
                          
                          {doc && (
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Anzeigen
                            </DropdownMenuItem>
                          )}
                          
                          {(isMissing || (doc && documentStatus !== "valid")) && (
                            isMissing ? (
                              <DropdownMenuItem>
                                Hochladen
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem asChild>
                                <Link to={`/submission-review/${providerId}/${doc.id}?employeeId=${employeeId}`}>
                                  Prüfen
                                </Link>
                              </DropdownMenuItem>
                            )
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
