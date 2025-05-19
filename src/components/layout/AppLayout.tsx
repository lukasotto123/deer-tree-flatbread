
import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  userMode: "kunde" | "lieferant";
  onModeChange: (mode: "kunde" | "lieferant") => void;
}

const AppLayout = ({ userMode, onModeChange }: AppLayoutProps) => {
  const location = useLocation();
  
  // Define navigation links for each mode
  const kundeNavLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Dokumentenanforderungen", path: "/document-requirements" },
    { name: "Dokumentenprüfung", path: "/document-review/provider-3/new" },
    { name: "Anfragen", path: "/requests" }
  ];
  
  // For lieferant view, add Anfragen to the navigation links
  const lieferantNavLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Anfragen", path: "/requests" }
  ];
  
  const navigationLinks = userMode === "kunde" ? kundeNavLinks : lieferantNavLinks;
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeMode={userMode} onModeChange={onModeChange} />
      <div className="flex-1 ml-64">
        <div className="flex flex-col min-h-screen">
          <Header mode={userMode} />
          <div className="py-1 px-6 border-b border-border bg-white">
            <div className="flex gap-2">
              {navigationLinks.map((link) => (
                <Button 
                  key={link.path} 
                  asChild
                  variant={location.pathname === link.path ? "default" : "outline"}
                  className={cn(
                    location.pathname === link.path 
                      ? "bg-[#005B41] hover:bg-[#005B41]/90 text-white" 
                      : "bg-white hover:bg-slate-100 hover:text-black text-black"
                  )}
                >
                  <Link to={link.path}>
                    {link.name}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <main className="flex-grow p-6">
            <Outlet context={{ userMode }} />
          </main>
          <footer className="py-4 px-6 border-t border-border">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} CompliancePro by Pactos. Alle Rechte vorbehalten.
              </div>
              <div className="text-sm text-muted-foreground flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">Impressum</a>
                <a href="#" className="hover:text-primary transition-colors">Datenschutz</a>
                <a href="#" className="hover:text-primary transition-colors">Kontakt</a>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <Toaster />
      <Sonner />
    </div>
  );
};

export default AppLayout;
