
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FileText, User, Zap } from "lucide-react";

interface SidebarProps {
  activeMode: "kunde" | "lieferant";
  onModeChange: (mode: "kunde" | "lieferant") => void;
}

const Sidebar = ({ activeMode, onModeChange }: SidebarProps) => {
  const location = useLocation();
  
  const navigationItems = [
    { name: "Bewerbungen", path: "#", icon: Zap },
  ];
  
  return (
    <div className="w-64 h-screen bg-[#002626] text-white flex flex-col fixed">
      <div className="p-6 border-b border-[#00414141]">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/6690430b-aa6f-4db0-b6fc-7116c43b37f2.png" alt="Pactos Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">Pactos</h1>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <div
                className={cn(
                  "flex items-center px-4 py-3 rounded-md hover:bg-[#00414141] transition-colors cursor-default",
                  (location.pathname === item.path) && "bg-[#00414141]"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </div>
            </li>
          ))}
          
          <li className="pt-2">
            <button
              className={cn(
                "flex items-center w-full px-4 py-3 rounded-md hover:bg-[#00414141] transition-colors",
                activeMode === "kunde" && "bg-[#00414141]",
              )}
              onClick={() => onModeChange("kunde")}
            >
              <FileText className="h-5 w-5 mr-3" />
              <span>CompliancePro Kunde</span>
            </button>
          </li>
          
          <li>
            <button
              className={cn(
                "flex items-center w-full px-4 py-3 rounded-md hover:bg-[#00414141] transition-colors",
                activeMode === "lieferant" && "bg-[#00414141]",
              )}
              onClick={() => onModeChange("lieferant")}
            >
              <FileText className="h-5 w-5 mr-3" />
              <span>CompliancePro Lieferant</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-[#00414141]">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-black mr-3">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Max Mustermann</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
