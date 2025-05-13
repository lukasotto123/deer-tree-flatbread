
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      <footer className="py-4 px-6 border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DocGuardian. Alle Rechte vorbehalten.
          </div>
          <div className="text-sm text-muted-foreground flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Impressum</a>
            <a href="#" className="hover:text-primary transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-primary transition-colors">Kontakt</a>
          </div>
        </div>
      </footer>
      <Toaster />
      <Sonner />
    </div>
  );
};

export default AppLayout;
