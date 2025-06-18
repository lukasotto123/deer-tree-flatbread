
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

interface CompanyDocumentViewProps {
  documentId: string;
  onBack: () => void;
}

const CompanyDocumentView = ({ documentId, onBack }: CompanyDocumentViewProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comments: "",
    },
  });
  
  // Mock data based on document ID
  const getDocumentData = (id: string) => {
    const documents = {
      "doc-2": {
        documentType: "A1-Bescheinigung",
        issuer: "Instytucja ubezpieczeniowa w państwie",
        issuedDate: "15.06.2025",
        expiryDate: "29.12.2025",
        registrationNumber: "A1J7J578N",
        companyName: "Kowalski",
        firstName: "Jan",
        birthDate: "04.12.1987",
        birthPlace: "Warszawa",
        nationality: "Polska",
        address: "ul. Zielona 15, 00-123 Warszawa, Polska",
        workAddress: "Industriestraße 12, 90441 Nürnberg, DE",
        verificationStatus: "Prüfung ausstehend",
        isA1Certificate: true
      },
      "comp-doc-1": {
        documentType: "Gewerbeanmeldung",
        issuer: "Gewerbeamt München",
        issuedDate: "15.01.2024",
        expiryDate: "Unbefristet",
        registrationNumber: "GEW-2024-15892",
        companyName: "Bauunternehmen Schmidt GmbH",
        verificationStatus: "Prüfung ausstehend"
      },
      "comp-doc-2": {
        documentType: "Handelsregisterauszug",
        issuer: "Amtsgericht München",
        issuedDate: "03.02.2024",
        expiryDate: "31.12.2024",
        registrationNumber: "HRB 245891",
        companyName: "Polish Construction Ltd.",
        verificationStatus: "Prüfung ausstehend"
      },
      "comp-doc-3": {
        documentType: "Betriebshaftpflichtversicherung",
        issuer: "Allianz Versicherung",
        issuedDate: "01.01.2024",
        expiryDate: "31.12.2024",
        registrationNumber: "BHV-2024-78321",
        companyName: "French Services SARL",
        verificationStatus: "Prüfung ausstehend"
      }
    };
    return documents[id as keyof typeof documents] || documents["comp-doc-1"];
  };

  const extractedData = getDocumentData(documentId);
  
  // Handle approval
  const handleApprove = () => {
    setIsSubmitting(true);
    console.log("Document approved", documentId);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onBack();
    }, 1000);
  };
  
  // Handle rejection
  const handleReject = () => {
    setIsSubmitting(true);
    console.log("Document rejected", documentId, form.getValues());
    
    setTimeout(() => {
      setIsSubmitting(false);
      onBack();
    }, 1000);
  };

  const isA1Certificate = extractedData.isA1Certificate;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {isA1Certificate ? "A1-Bescheinigung Prüfung" : "Unternehmens-Dokumentprüfung"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Bitte überprüfen Sie die extrahierten Informationen und bestätigen oder lehnen Sie das Dokument ab
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={onBack}
        >
          Zurück
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document preview - Left side */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dokumentvorschau</CardTitle>
              <CardDescription>
                {isA1Certificate ? "Vorschau der eingereichten A1-Bescheinigung" : "Vorschau des eingereichten Unternehmensdokuments"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-2xl border rounded-md overflow-hidden">
                <AspectRatio ratio={1 / 1.414}>
                  {isA1Certificate ? (
                    <img 
                      src="/lovable-uploads/f954e506-57f9-4794-ab78-53210d1a419d.png" 
                      alt="A1 Bescheinigung"
                      className="object-contain w-full h-full"
                    />
                  ) : (
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
                          Unternehmensdokument zur Überprüfung
                        </p>
                      </div>
                    </div>
                  )}
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
                    
                    {isA1Certificate ? (
                      <>
                        <div className="grid gap-2">
                          <Label>Ausweisnummer</Label>
                          <div className="p-2 bg-gray-50 rounded border">
                            {extractedData.registrationNumber}
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>Name</Label>
                          <div className="p-2 bg-gray-50 rounded border">
                            {extractedData.companyName}
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>Vorname</Label>
                          <div className="p-2 bg-gray-50 rounded border">
                            {extractedData.firstName}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label>Geburtsdatum</Label>
                            <div className="p-2 bg-gray-50 rounded border">
                              {extractedData.birthDate}
                            </div>
                          </div>
                          
                          <div className="grid gap-2">
                            <Label>Geburtsort</Label>
                            <div className="p-2 bg-gray-50 rounded border">
                              {extractedData.birthPlace}
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>Staatsangehörigkeit</Label>
                          <div className="p-2 bg-gray-50 rounded border">
                            {extractedData.nationality}
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>Wohnadresse</Label>
                          <div className="p-2 bg-gray-50 rounded border">
                            {extractedData.address}
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label>Arbeitsadresse</Label>
                          <div className="p-2 bg-gray-50 rounded border">
                            {extractedData.workAddress}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label>Gültig ab</Label>
                            <div className="p-2 bg-gray-50 rounded border">
                              {extractedData.issuedDate}
                            </div>
                          </div>
                          
                          <div className="grid gap-2">
                            <Label>Gültig bis</Label>
                            <div className="p-2 bg-gray-50 rounded border text-amber-600 font-medium">
                              {extractedData.expiryDate}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
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
                          <Label>Unternehmen</Label>
                          <div className="p-2 bg-gray-50 rounded border">
                            {extractedData.companyName}
                          </div>
                        </div>
                      </>
                    )}
                    
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
    </div>
  );
};

export default CompanyDocumentView;
