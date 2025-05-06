
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Send } from "lucide-react";
import { toast } from "sonner";
import { documentTypes, providers } from "@/data/dummy-data";
import { ProviderType } from "@/types";

const DocumentRequest = () => {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [providerType, setProviderType] = useState<ProviderType | "">("");
  const [message, setMessage] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [branch, setBranch] = useState("");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProvider || !selectedDocType) {
      toast.error("Bitte alle erforderlichen Felder ausfüllen");
      return;
    }

    // Hier würde die Logik zur Dokumentenanfrage kommen
    toast.success("Dokumentenanfrage wurde erfolgreich versendet");
    setOpen(false);
    setSelectedProvider("");
    setSelectedDocType("");
    setProviderType("");
    setMessage("");
    setDueDate("");
    setBranch("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Dokument anfragen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Neue Dokumentenanfrage erstellen</DialogTitle>
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
            <Label htmlFor="branch">Niederlassung zuordnen</Label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger id="branch">
                <SelectValue placeholder="Niederlassung auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hauptsitz">Hauptniederlassung</SelectItem>
                <SelectItem value="nord">Niederlassung Nord</SelectItem>
                <SelectItem value="sued">Niederlassung Süd</SelectItem>
                <SelectItem value="west">Niederlassung West</SelectItem>
                <SelectItem value="ost">Niederlassung Ost</SelectItem>
                <SelectItem value="direkt">Direkt zum Kunden</SelectItem>
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
            <Label htmlFor="dueDate">Fälligkeitsdatum</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Nachricht (optional)</Label>
            <Textarea
              id="message"
              placeholder="Zusätzliche Informationen oder Anweisungen..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Abbrechen
            </Button>
            <Button type="submit">Anfrage senden</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentRequest;
