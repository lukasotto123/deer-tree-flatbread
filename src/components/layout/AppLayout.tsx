
import { Link, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AppLayout = () => {
  const location = useLocation();
  
  // Define navigation links
  const navigationLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Dokumentenanforderungen", path: "/document-requirements" },
    { name: "Dokumentenprüfung", path: "/document-review/provider-3/new" },
    { name: "Anfragen", path: "/requests" }
  ];
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="py-3 px-6 border-b border-border bg-white">
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
            <Outlet />
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
