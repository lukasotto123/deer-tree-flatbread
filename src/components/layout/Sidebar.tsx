
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ShieldCheck, User } from "lucide-react";

interface SidebarProps {
  activeMode: "kunde" | "lieferant";
  onModeChange: (mode: "kunde" | "lieferant") => void;
}

const Sidebar = ({ activeMode, onModeChange }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Removed the navigationItems array that contained Bewerbungen and Nachunternehmer Compliance
  
  const handleModeChange = (mode: "kunde" | "lieferant") => {
    onModeChange(mode);
    navigate("/");
  };
  
  return (
    <div className="w-[76.8px] h-screen bg-[#002626] text-white flex flex-col fixed">
      <div className="p-6 border-b border-[#00414141]">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/6690430b-aa6f-4db0-b6fc-7116c43b37f2.png" alt="Pactos Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">Pactos</h1>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li className="pt-2">
            <button
              className={cn(
                "flex items-center w-full px-4 py-3 rounded-md hover:bg-[#00414141] transition-colors",
                activeMode === "kunde" && "bg-[#00414141]",
              )}
              onClick={() => handleModeChange("kunde")}
            >
              <ShieldCheck className="h-5 w-5 mr-3" />
              <span>CompliancePro Kunde</span>
            </button>
          </li>
          
          <li>
            <button
              className={cn(
                "flex items-center w-full px-4 py-3 rounded-md hover:bg-[#00414141] transition-colors",
                activeMode === "lieferant" && "bg-[#00414141]",
              )}
              onClick={() => handleModeChange("lieferant")}
            >
              <ShieldCheck className="h-5 w-5 mr-3" />
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
