
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { documentTypes, providers } from "@/data/dummy-data";
import { ProviderType } from "@/types";

const DocumentUpload = () => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [providerType, setProviderType] = useState<ProviderType | "">("");
  const [open, setOpen] = useState(false);

  const filteredDocumentTypes = documentTypes.filter((docType) => {
    if (!providerType) return false;
    return docType.providerType === providerType;
  });

  const handleProviderChange = (value: string) => {
    setSelectedProvider(value);
    const provider = providers.find((p) => p.id === value);
    if (provider) {
      setProviderType(provider.type);
    } else {
      setProviderType("");
    }
    setSelectedDocType("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProvider || !selectedDocType || !selectedFile) {
      toast.error("Bitte alle erforderlichen Felder ausfüllen");
      return;
    }

    // Hier würde die Logik zum Hochladen der Datei kommen
    toast.success("Dokument wurde erfolgreich hochgeladen");
    setOpen(false);
    setSelectedProvider("");
    setSelectedDocType("");
    setSelectedFile(null);
    setProviderType("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Dokument hochladen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Neues Dokument hochladen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Dienstleister auswählen</Label>
            <Select value={selectedProvider} onValueChange={handleProviderChange}>
              <SelectTrigger id="provider">
                <SelectValue placeholder="Dienstleister auswählen" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentType">Dokumenttyp</Label>
            <Select
              value={selectedDocType}
              onValueChange={setSelectedDocType}
              disabled={!providerType}
            >
              <SelectTrigger id="documentType">
                <SelectValue placeholder="Dokumenttyp auswählen" />
              </SelectTrigger>
              <SelectContent>
                {filteredDocumentTypes.map((docType) => (
                  <SelectItem key={docType.id} value={docType.id}>
                    {docType.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!providerType && (
              <p className="text-sm text-muted-foreground">
                Bitte zuerst einen Dienstleister auswählen
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Datei auswählen</Label>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button type="submit">Hochladen</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUpload;
