
import { Search, Bell, Sun, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Header = () => {
  const [currentClient, setCurrentClient] = useState("hauptkunde");
  
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-white">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="hidden md:block">
          <div className="flex items-center gap-2">
            <span className="font-bold">DocGuardian</span>
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">BETA</span>
          </div>
        </div>
        
        <Select value={currentClient} onValueChange={setCurrentClient} className="ml-4">
          <SelectTrigger className="w-[220px] border-primary/20 bg-primary/5">
            <SelectValue placeholder="Kunde auswählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hauptkunde">Mustermann GmbH</SelectItem>
            <SelectItem value="kunde2">Beispiel AG</SelectItem>
            <SelectItem value="kunde3">Bau & Partner KG</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Suchen..."
            className="pl-10 h-9 w-64"
          />
        </div>
        
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
        </Button>
        
        <Button variant="outline" size="icon">
          <Sun className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            AB
          </div>
          <div className="text-sm hidden md:block">
            <p className="font-medium">Admin Benutzer</p>
            <p className="text-muted-foreground">admin@example.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
