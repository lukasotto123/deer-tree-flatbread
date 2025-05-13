
import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FileText, Check, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  comments: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

const SubmissionReview = () => {
  const { providerId, documentId } = useParams<{ providerId: string; documentId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const employeeIdParam = searchParams.get("employeeId");
  const documentTypeParam = searchParams.get("documentType");
  
  // Simplified approach - no document fetching
  const isNewDocument = documentId === 'new';
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comments: "",
    },
  });
  
  // Handle approval
  const handleApprove = () => {
    setIsSubmitting(true);
    console.log("Document approved");
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigateBack();
    }, 1000);
  };
  
  // Handle rejection
  const handleReject = () => {
    setIsSubmitting(true);
    console.log("Document rejected", form.getValues());
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigateBack();
    }, 1000);
  };

  // Function to handle navigation back
  const navigateBack = () => {
    if (employeeIdParam) {
      navigate(`/person/${providerId}/${employeeIdParam}`);
    } else {
      navigate(`/provider/${providerId}`);
    }
  };

  // Extracted document information (mock data)
  const extractedData = {
    documentType: "Arbeitnehmerüberlassungserlaubnis",
    issuer: "Behörde für Arbeit und Soziales",
    issuedDate: "01.03.2023",
    expiryDate: "28.02.2025",
    registrationNumber: "AÜG-2023-78291",
    providerName: "Top Personal GmbH",
    verificationStatus: "Prüfung ausstehend"
  };

  // Pending documents count (mock data)
  const pendingDocumentsCount = 7;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dokumentprüfung</h1>
          <p className="text-muted-foreground mt-1">
            Bitte überprüfen Sie die extrahierten Informationen und bestätigen oder lehnen Sie das Dokument ab
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={navigateBack}
        >
          Zurück
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document placeholder - Left side */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dokumentvorschau</CardTitle>
              <CardDescription>
                {isNewDocument 
                  ? "Neues Dokument" 
                  : "Vorschau des eingereichten Dokuments"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-2xl border rounded-md overflow-hidden">
                <AspectRatio ratio={1 / 1.414}>
                  <div className="h-full w-full bg-muted flex flex-col items-center justify-center p-6">
                    <FileText className="h-20 w-20 text-muted-foreground mb-4" />
                    <div className="text-center w-full">
                      <p className="text-lg font-medium mb-6">
                        {extractedData.documentType}
                      </p>
                      <div className="space-y-4 w-full px-6">
                        <div className="h-4 bg-gray-200 rounded-full w-full" />
                        <div className="h-4 bg-gray-200 rounded-full w-5/6 mx-auto" />
                        <div className="h-4 bg-gray-200 rounded-full w-full" />
                        <div className="py-2"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-full" />
                        <div className="h-4 bg-gray-200 rounded-full w-4/6 mx-auto" />
                        <div className="py-2"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-full" />
                        <div className="h-4 bg-gray-200 rounded-full w-3/4 mx-auto" />
                        <div className="h-4 bg-gray-200 rounded-full w-full" />
                      </div>
                      <p className="text-muted-foreground mt-6">
                        {isNewDocument ? "Neues Dokument" : "Dokument zur Überprüfung"}
                      </p>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Extracted data display - Right side */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Extrahierte Daten</CardTitle>
              <CardDescription>
                Automatisch erkannte Informationen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-4">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label>Dokumenttyp</Label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {extractedData.documentType}
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Aussteller</Label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {extractedData.issuer}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Ausstellungsdatum</Label>
                        <div className="p-2 bg-gray-50 rounded border">
                          {extractedData.issuedDate}
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label>Ablaufdatum</Label>
                        <div className="p-2 bg-gray-50 rounded border text-amber-600 font-medium">
                          {extractedData.expiryDate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Registrierungsnummer</Label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {extractedData.registrationNumber}
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Dienstleister</Label>
                      <div className="p-2 bg-gray-50 rounded border">
                        {extractedData.providerName}
                      </div>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kommentare</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Fügen Sie hier Ihre Kommentare hinzu..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="destructive" 
                onClick={form.handleSubmit(handleReject)}
                disabled={isSubmitting}
                className="flex-1 mr-2"
              >
                <X className="mr-1" />
                Ablehnen
              </Button>
              <Button 
                onClick={handleApprove}
                disabled={isSubmitting}
                className="flex-1"
              >
                <Check className="mr-1" />
                Akzeptieren
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Pending documents counter - Full width box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-500 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4">
              {pendingDocumentsCount}
            </div>
            <div>
              <p className="font-medium">Dokumente warten auf Prüfung</p>
              <p className="text-sm text-muted-foreground">Es gibt noch weitere Dokumente, die geprüft werden müssen</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => console.log("Navigate to pending documents")}>
            Alle anzeigen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionReview;
