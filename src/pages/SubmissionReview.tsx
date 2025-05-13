
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { documents, providers, documentTypes } from "@/data/dummy-data";
import DocumentHistory from "@/components/ui/DocumentHistory";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  comments: z.string().optional(),
  isApproved: z.boolean().default(false)
});

type FormValues = z.infer<typeof formSchema>;

const SubmissionReview = () => {
  const { providerId, documentId } = useParams<{ providerId: string; documentId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get document if it exists
  const document = documents.find(d => d.id === documentId);
  // Get document type
  const documentType = document 
    ? documentTypes.find(dt => dt.id === document.type)
    : documentTypes.find(dt => dt.id === new URLSearchParams(window.location.search).get("documentType"));
  
  // Get provider
  const provider = providers.find(p => p.id === providerId);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comments: "",
      isApproved: false,
    },
  });
  
  // Handle form submission
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    console.log("Submitting review:", data);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/provider/${providerId}`);
    }, 1000);
  };

  if (!provider) {
    return <div>Dienstleister nicht gefunden</div>;
  }
  
  if (!documentType) {
    return <div>Dokumenttyp nicht gefunden</div>;
  }

  const isNewDocument = documentId === 'new';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{isNewDocument ? `Neues Dokument: ${documentType.name}` : documentType.name}</h1>
          <p className="text-muted-foreground mt-1">
            Dienstleister: {provider.name}
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={() => navigate(`/provider/${providerId}`)}
        >
          Zurück zum Dienstleister
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Document preview */}
          <Card>
            <CardHeader>
              <CardTitle>Dokumentvorschau</CardTitle>
              <CardDescription>
                {isNewDocument 
                  ? "Sie können ein neues Dokument hochladen" 
                  : "Überprüfen Sie das eingereichte Dokument"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-2xl border rounded-md overflow-hidden">
                <AspectRatio ratio={1 / 1.414}>
                  {document?.fileUrl ? (
                    <img
                      src={document.fileUrl}
                      alt="Document Preview"
                      className="object-contain"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      {isNewDocument ? (
                        <div className="text-center p-4">
                          <p className="text-muted-foreground mb-4">Ziehen Sie eine Datei hierher oder klicken Sie, um eine Datei auszuwählen</p>
                          <Button>Datei auswählen</Button>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">Keine Vorschau verfügbar</p>
                      )}
                    </div>
                  )}
                </AspectRatio>
              </div>
            </CardContent>
          </Card>
          
          {/* Document history - Only show for existing documents */}
          {!isNewDocument && (
            <DocumentHistory documentId={documentId || ""} />
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{isNewDocument ? "Dokument hochladen" : "Dokument prüfen"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <div>
                      <Label>Dokumenttyp</Label>
                      <p className="text-sm mt-1">{documentType.name}</p>
                    </div>
                    
                    <div>
                      <Label>Beschreibung</Label>
                      <p className="text-sm mt-1">{documentType.description}</p>
                    </div>

                    {document && (
                      <>
                        <div>
                          <Label>Status</Label>
                          <p className="text-sm mt-1">
                            {document.status === "valid" ? "Gültig" : 
                             document.status === "expiring" ? "Läuft bald ab" :
                             document.status === "expired" ? "Abgelaufen" : "Fehlt"}
                          </p>
                        </div>
                        
                        {document.issuedDate && (
                          <div>
                            <Label>Ausstellungsdatum</Label>
                            <p className="text-sm mt-1">
                              {new Date(document.issuedDate).toLocaleDateString('de-DE')}
                            </p>
                          </div>
                        )}
                        
                        {document.expiryDate && (
                          <div>
                            <Label>Ablaufdatum</Label>
                            <p className="text-sm mt-1">
                              {new Date(document.expiryDate).toLocaleDateString('de-DE')}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                    
                    {isNewDocument && (
                      <>
                        <div className="pt-2">
                          <Label htmlFor="issuedDate">Ausstellungsdatum</Label>
                          <input 
                            type="date" 
                            id="issuedDate"
                            className="w-full px-3 py-2 border rounded-md mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="expiryDate">Ablaufdatum (optional)</Label>
                          <input 
                            type="date" 
                            id="expiryDate"
                            className="w-full px-3 py-2 border rounded-md mt-1"
                          />
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
                    
                    <FormField
                      control={form.control}
                      name="isApproved"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              {isNewDocument ? "Dokument bestätigen" : "Dokument genehmigen"}
                            </FormLabel>
                            <FormDescription>
                              {isNewDocument 
                                ? "Bestätigen Sie, dass das Dokument korrekt ist" 
                                : "Genehmigen Sie das eingereichte Dokument"}
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => navigate(`/provider/${providerId}`)}
              >
                Abbrechen
              </Button>
              <Button 
                onClick={form.handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Wird gesendet..." : (isNewDocument ? "Hochladen" : "Bewerten")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmissionReview;
