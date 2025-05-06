
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Building, FileText, Home, Users } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const navigationItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Dienstleister", path: "/providers", icon: Building },
    { name: "Dokumente", path: "/documents", icon: FileText },
  ];
  
  return (
    <div className="w-64 h-screen bg-sidebar text-sidebar-foreground flex flex-col fixed">
      <div className="p-6 border-b border-sidebar-accent">
        <h1 className="text-xl font-bold">Vendor Doc Guardian</h1>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md hover:bg-sidebar-accent transition-colors",
                  location.pathname === item.path && "bg-sidebar-accent"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-accent">
        <div className="text-sm text-sidebar-foreground/70">
          <p>© 2025 Vendor Doc Guardian</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
