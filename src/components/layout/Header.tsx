
import { Bell, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">CompliancePro</span>
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">BETA</span>
          </div>
        </div>
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
      </div>
    </header>
  );
};

export default Header;
