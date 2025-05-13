
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FileText, Home, User, Zap } from "lucide-react";
import pactosFavicon from "/favicon.ico"; // Using the default favicon for now

const Sidebar = () => {
  const location = useLocation();
  
  const navigationItems = [
    { name: "Bewerbungen", path: "/bewerbungen", icon: Zap },
    { name: "Subunternehmer", path: "/", icon: FileText, active: true },
  ];
  
  return (
    <div className="w-64 h-screen bg-[#002626] text-white flex flex-col fixed">
      <div className="p-6 border-b border-[#00414141]">
        <Link to="/" className="flex items-center gap-2">
          <img src={pactosFavicon} alt="Pactos Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">Pactos</h1>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md hover:bg-[#00414141] transition-colors",
                  (location.pathname === item.path || item.active) && "bg-[#00414141]"
                )}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-[#00414141]">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-black mr-3">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Lukas Otto</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
