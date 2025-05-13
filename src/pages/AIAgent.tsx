
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, FileText, CheckCircle, AlertTriangle, Bot, Search } from "lucide-react";

const AIAgent = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{type: "user" | "bot", content: string}>>([
    {
      type: "bot",
      content: "Hallo! Ich bin Ihr DocGuardian KI-Assistent. Wie kann ich Ihnen heute helfen?"
    }
  ]);
  const [activeTab, setActiveTab] = useState("chat");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: "user", content: message }]);

    // Simulate AI response based on content
    setTimeout(() => {
      let response = "Ich verstehe Ihre Anfrage. Wie kann ich Ihnen weiterhelfen?";
      
      if (message.toLowerCase().includes("dokument")) {
        response = "Ich kann Ihnen bei der Dokumentenanalyse helfen. Möchten Sie ein Dokument prüfen lassen oder eine neue Anfrage stellen?";
      } else if (message.toLowerCase().includes("dienstleister")) {
        response = "Ich kann Ihnen Informationen zu Ihren Dienstleistern geben. Welchen Dienstleister möchten Sie überprüfen?";
      } else if (message.toLowerCase().includes("prüf") || message.toLowerCase().includes("validi")) {
        response = "Unsere KI-Validierung kann Dokumente auf Echtheit prüfen und potenzielle Fälschungen erkennen. Möchten Sie ein bestimmtes Dokument validieren?";
      }
      
      setChatHistory(prev => [...prev, { type: "bot", content: response }]);
    }, 1000);

    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">KI-Assistent</h1>
        <p className="text-muted-foreground mt-1">
          Ihr intelligenter Helfer für Dokumentenverwaltung und -prüfung
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="verify">
            <CheckCircle className="h-4 w-4 mr-2" />
            Dokumente prüfen
          </TabsTrigger>
          <TabsTrigger value="features">
            <Bot className="h-4 w-4 mr-2" />
            Funktionen
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="h-[600px] flex flex-col lg:col-span-2">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-primary" />
                  DocGuardian KI-Assistent
                </CardTitle>
                <CardDescription>
                  Stellen Sie Fragen zu Dokumenten, Dienstleistern oder lassen Sie Dokumente automatisch prüfen
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col p-0">
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {chatHistory.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                        msg.type === "user" 
                          ? "bg-primary text-white" 
                          : "bg-muted"
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Nachricht eingeben..."
                      className="flex-grow"
                    />
                    <Button type="submit">Senden</Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vorschläge</CardTitle>
                <CardDescription>Mögliche Fragen an den KI-Assistenten</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-3" 
                  onClick={() => {
                    setMessage("Welche Dokumente laufen bald ab?");
                    document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                  }}
                >
                  <Search className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Welche Dokumente laufen bald ab?</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-3" 
                  onClick={() => {
                    setMessage("Erstelle eine Dokumentenanfrage für den Dienstleister XYZ");
                    document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                  }}
                >
                  <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Erstelle eine Dokumentenanfrage für den Dienstleister XYZ</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-3" 
                  onClick={() => {
                    setMessage("Überprüfe die Echtheit des Dokuments 'AÜG-Bescheinigung.pdf'");
                    document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Überprüfe die Echtheit des Dokuments 'AÜG-Bescheinigung.pdf'</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-3" 
                  onClick={() => {
                    setMessage("Zeige mir alle verdächtigen Dokumente");
                    document.querySelector("form")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
                  }}
                >
                  <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>Zeige mir alle verdächtigen Dokumente</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="verify" className="mt-0">
          <Card className="border border-dashed border-primary/50">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Dokument zur KI-Prüfung hochladen</h3>
                <p className="text-muted-foreground mb-6">
                  Laden Sie ein Dokument hoch, um es auf Echtheit und Gültigkeit zu überprüfen
                </p>
                <div className="flex flex-col items-center justify-center gap-4">
                  <Button>Dokument auswählen</Button>
                  <p className="text-xs text-muted-foreground">oder per Drag & Drop</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Letzte Prüfungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>AÜG-Bescheinigung.pdf</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Vor 2 Stunden</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span>DGUV-Nachweis.pdf</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Gestern</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>ISO-Zertifikat.pdf</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Vor 3 Tagen</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Automatische Erkennung</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Dokumenttyperkennung</h3>
                      <p className="text-sm text-muted-foreground">
                        KI erkennt automatisch den Typ des Dokuments
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Datumserkennung</h3>
                      <p className="text-sm text-muted-foreground">
                        Automatisches Auslesen von Ausstellungs- und Ablaufdaten
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Fälschungserkennung</h3>
                      <p className="text-sm text-muted-foreground">
                        Identifizierung von verdächtigen Merkmalen oder Manipulationen
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="features" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Dokumentenerkennung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Automatische Erkennung von Dokumenttypen und Extraktion von Daten aus hochgeladenen Dokumenten.
                </p>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Erkennung von Dokumenttypen</li>
                  <li>Extraktion von Ausstellungs- und Ablaufdaten</li>
                  <li>Erkennung von Ausstellern und Dienstleistern</li>
                  <li>Automatische Kategorisierung</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  Dokumentvalidierung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Überprüfung der Echtheit und Gültigkeit von Dokumenten durch fortschrittliche KI-Analysen.
                </p>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Validierung von Dokumenteninhalten</li>
                  <li>Überprüfung von Unterschriften</li>
                  <li>Verifikation von Stempeln und Siegeln</li>
                  <li>Echtheitszertifikat für geprüfte Dokumente</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
                  Fälschungserkennung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Erkennung von potenziell gefälschten oder manipulierten Dokumenten mit modernsten KI-Algorithmen.
                </p>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Erkennung von manipulierten Bildern</li>
                  <li>Identifikation von veränderten Texten</li>
                  <li>Prüfung auf inkonsistente Formatierungen</li>
                  <li>Echtzeitmeldungen bei verdächtigen Merkmalen</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Automatisierte Anfragen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  KI-gestützte Erstellung und Versand von Dokumentenanfragen an Dienstleister mit intelligenten Vorlagen.
                </p>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Automatische Erinnerungen bei ablaufenden Dokumenten</li>
                  <li>Personalisierte Anfragen für fehlende Dokumente</li>
                  <li>Nachverfolgung offener Anfragen</li>
                  <li>Automatische Dokumentenkategorisierung bei Erhalt</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-primary" />
                  KI-Assistenz
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Intelligenter Chat-Assistent für alle Fragen rund um Dokumente und Dienstleister.
                </p>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Natürlichsprachige Interaktion</li>
                  <li>Dokumentensuche durch Spracheingabe</li>
                  <li>Automatische Vorschläge zur Dokumentenverwaltung</li>
                  <li>Intelligente Analysen des Dokumentenbestands</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-primary" />
                  Intelligente Suche
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Durchsuchen Sie Dokumente nach Inhalten, nicht nur nach Metadaten.
                </p>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Volltextsuche in allen Dokumenten</li>
                  <li>Semantische Suche nach ähnlichen Inhalten</li>
                  <li>Filterung nach erkannten Entitäten</li>
                  <li>Suche nach visuell ähnlichen Dokumenten</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAgent;
