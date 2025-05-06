
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, FileText, CheckCircle, AlertTriangle } from "lucide-react";

const AIAgent = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{type: "user" | "bot", content: string}>>([
    {
      type: "bot",
      content: "Hallo! Ich bin Ihr DocGuardian KI-Assistent. Wie kann ich Ihnen heute helfen?"
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: "user", content: message }]);

    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: "bot", 
        content: "Ich verstehe Ihre Anfrage. Hier sind die verfügbaren Funktionen von DocGuardian:"
      }]);
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>KI-Assistent</CardTitle>
              <CardDescription>
                Stellen Sie Fragen zu Dokumenten, Dienstleistern oder lassen Sie Dokumente automatisch prüfen
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                {chatHistory.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      msg.type === "user" 
                        ? "bg-primary text-white" 
                        : "bg-muted"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nachricht eingeben..."
                  className="flex-grow"
                />
                <Button type="submit">Senden</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>KI-Funktionen</CardTitle>
              <CardDescription>Verfügbare intelligente Funktionen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Dokumentenerkennung</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatische Erkennung von Dokumenttypen und Extraktion von Daten
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Dokumentvalidierung</h3>
                  <p className="text-sm text-muted-foreground">
                    Überprüfung der Echtheit und Gültigkeit von Dokumenten
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
                    Erkennung von potenziell gefälschten oder manipulierten Dokumenten
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Automatisierte Anfragen</h3>
                  <p className="text-sm text-muted-foreground">
                    KI-gestützte Erstellung und Versand von Dokumentenanfragen an Dienstleister
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;
