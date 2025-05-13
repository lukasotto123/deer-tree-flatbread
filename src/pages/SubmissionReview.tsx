
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { documents, providers } from "@/data/dummy-data";

const SubmissionReview = () => {
  const { providerId, documentId } = useParams<{ providerId: string; documentId: string }>();
  
  const provider = providers.find(p => p.id === providerId);
  const document = documents.find(d => d.id === documentId);
  
  // Anzahl der verbleibenden Dokumente (simuliert)
  const remainingDocuments = 5;

  if (!provider) {
    return <div>Dienstleister nicht gefunden</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dokumentprüfung</h1>
        <Link to={`/provider/${providerId}`}>
          <Button variant="outline">Zurück zum Dienstleister</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PDF Vorschau */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">PDF Dokument</h2>
            <div className="border rounded-md overflow-hidden bg-gray-50">
              <AspectRatio ratio={3/4}>
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground text-center p-6">
                    {document 
                      ? "PDF Vorschau für: " + document.name 
                      : "Hochgeladenes PDF Dokument"}
                  </p>
                </div>
              </AspectRatio>
            </div>
          </CardContent>
        </Card>

        {/* Extrahierte Inhalte */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Extrahierte Inhalte</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Dokumenttyp</p>
                <p className="font-medium">
                  {document ? document.name : "Neues Dokument"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unternehmen</p>
                <p className="font-medium">{provider.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ausstellungsdatum</p>
                <p className="font-medium">
                  {document ? new Date(document.issuedDate).toLocaleDateString('de-DE') : "01.05.2025"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ablaufdatum</p>
                <p className="font-medium">
                  {document && document.expiryDate 
                    ? new Date(document.expiryDate).toLocaleDateString('de-DE') 
                    : "01.05.2026"}
                </p>
              </div>

              <div className="pt-4 flex space-x-4">
                <Button className="flex-1 gap-2" variant="outline" size="lg">
                  <X className="h-5 w-5" />
                  Ablehnen
                </Button>
                <Button className="flex-1 gap-2" size="lg">
                  <Check className="h-5 w-5" />
                  Akzeptieren
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-muted p-4 rounded-md mt-8">
        <p className="text-center text-muted-foreground">
          {remainingDocuments} weitere Dokumente warten auf Überprüfung
        </p>
      </div>
    </div>
  );
};

export default SubmissionReview;
