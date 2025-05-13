
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  comments: z.string().optional(),
  isApproved: z.boolean().default(false)
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
  
  // Placeholder document type name
  const documentTypeName = isNewDocument ? "Neues Dokument" : "Bestehendes Dokument";
  
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
      
      // Navigate based on whether this is for an employee or just a provider
      if (employeeIdParam) {
        navigate(`/person/${providerId}/${employeeIdParam}`);
      } else {
        navigate(`/provider/${providerId}`);
      }
    }, 1000);
  };

  // Function to handle navigation back
  const handleGoBack = () => {
    if (employeeIdParam) {
      navigate(`/person/${providerId}/${employeeIdParam}`);
    } else {
      navigate(`/provider/${providerId}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{isNewDocument ? `Neues Dokument` : "Dokumentprüfung"}</h1>
          <p className="text-muted-foreground mt-1">
            Bitte überprüfen Sie die Details und geben Sie Ihre Bewertung ab
          </p>
        </div>
        <Button 
          variant="outline"
          onClick={handleGoBack}
        >
          Zurück
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Document placeholder - No actual document loaded */}
          <Card>
            <CardHeader>
              <CardTitle>Dokumentvorschau</CardTitle>
              <CardDescription>
                {isNewDocument 
                  ? "Dokumentenupload-Bereich" 
                  : "Vorschau des eingereichten Dokuments"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-2xl border rounded-md overflow-hidden">
                <AspectRatio ratio={1 / 1.414}>
                  <div className="h-full w-full bg-muted flex flex-col items-center justify-center p-6">
                    <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                    {isNewDocument ? (
                      <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                          Hier können Sie Ihr Dokument hochladen.
                        </p>
                        <div className="border border-dashed border-gray-300 rounded-md p-8 mb-4">
                          <p className="text-muted-foreground mb-2">
                            Ziehen Sie eine Datei hierher oder klicken Sie, um eine Datei auszuwählen
                          </p>
                          <Button className="mt-2">Datei auswählen</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Unterstützte Formate: PDF, JPG, PNG (max. 10MB)
                        </p>
                      </div>
                    ) : (
                      <div className="text-center w-full">
                        <p className="text-lg font-medium mb-6">
                          {documentTypeName}
                        </p>
                        <div className="space-y-4 w-full">
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-8 w-3/4" />
                          <div className="py-4"></div>
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-8 w-5/6" />
                          <div className="py-4"></div>
                          <Skeleton className="h-8 w-full" />
                          <Skeleton className="h-8 w-2/3" />
                        </div>
                        <p className="text-muted-foreground mt-6">
                          Das Dokument wird aus Sicherheitsgründen nicht angezeigt
                        </p>
                      </div>
                    )}
                  </div>
                </AspectRatio>
              </div>
            </CardContent>
          </Card>
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
                      <p className="text-sm mt-1">
                        {isNewDocument ? "Bitte wählen Sie einen Dokumenttyp" : "Dokumenttyp"}
                      </p>
                    </div>
                    
                    <div>
                      <Label>Beschreibung</Label>
                      <p className="text-sm mt-1">
                        {isNewDocument 
                          ? "Beschreibung des ausgewählten Dokumenttyps" 
                          : "Dieses Dokument enthält wichtige Informationen für die Compliance"}
                      </p>
                    </div>

                    {isNewDocument ? (
                      <>
                        <div className="pt-2">
                          <Label htmlFor="issuedDate">Ausstellungsdatum</Label>
                          <Input 
                            type="date" 
                            id="issuedDate"
                            className="w-full"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="expiryDate">Ablaufdatum (optional)</Label>
                          <Input 
                            type="date" 
                            id="expiryDate"
                            className="w-full"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <Label>Status</Label>
                          <p className="text-sm mt-1">Prüfung ausstehend</p>
                        </div>
                        
                        <div>
                          <Label>Ausstellungsdatum</Label>
                          <p className="text-sm mt-1">01.01.2023</p>
                        </div>
                        
                        <div>
                          <Label>Ablaufdatum</Label>
                          <p className="text-sm mt-1">31.12.2025</p>
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
                            <CardDescription>
                              {isNewDocument 
                                ? "Bestätigen Sie, dass das Dokument korrekt ist" 
                                : "Genehmigen Sie das eingereichte Dokument"}
                            </CardDescription>
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
                onClick={handleGoBack}
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
