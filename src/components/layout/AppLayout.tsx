
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="flex flex-col min-h-screen">
          <Header />
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
