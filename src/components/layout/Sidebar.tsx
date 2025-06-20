
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ShieldCheck, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  activeMode: "kunde" | "lieferant";
  onModeChange: (mode: "kunde" | "lieferant") => void;
}

const Sidebar = ({ activeMode, onModeChange }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleModeChange = (mode: "kunde" | "lieferant") => {
    onModeChange(mode);
    navigate("/");
  };
  
  return (
    <div className="w-[240px] h-screen bg-[#002626] text-white flex flex-col fixed">
      <div className="p-6 border-b border-[#00414141]">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/6690430b-aa6f-4db0-b6fc-7116c43b37f2.png" alt="Pactos Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">Pactos</h1>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li className="pt-2">
            <div className="flex items-center px-4 py-3 rounded-md bg-[#00414141]">
              <ShieldCheck className="h-5 w-5 mr-3" />
              <span>CompliancePro Kunde</span>
            </div>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-[#00414141]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center w-full hover:bg-[#00414141] rounded-md p-2 transition-colors">
              <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-black mr-3">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">Max Mustermann</p>
              </div>
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 bg-white border border-gray-200 shadow-lg z-50"
          >
            <DropdownMenuItem 
              onClick={() => handleModeChange("kunde")}
              className={cn(
                "cursor-pointer",
                activeMode === "kunde" && "bg-gray-100"
              )}
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              CompliancePro Kunde
              {activeMode === "kunde" && <span className="ml-auto text-xs text-gray-500">Aktiv</span>}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleModeChange("lieferant")}
              className={cn(
                "cursor-pointer",
                activeMode === "lieferant" && "bg-gray-100"
              )}
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              CompliancePro Lieferant
              {activeMode === "lieferant" && <span className="ml-auto text-xs text-gray-500">Aktiv</span>}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
