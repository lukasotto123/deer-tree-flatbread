import { Bell, User } from "lucide-react";

interface HeaderProps {
  mode?: "kunde" | "lieferant";
}

const Header = ({ mode = "kunde" }: HeaderProps) => {
  return (
    <header className="bg-white border-b">
      <div className="h-16 px-6 flex items-center justify-between">
        <h1 className="font-medium">
          {mode === "kunde" ? "CompliancePro Kunde" : "CompliancePro Lieferant"}
        </h1>
        
        <div className="flex items-center space-x-4">
          <button className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
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
    </header>
  );
};

export default Header;
