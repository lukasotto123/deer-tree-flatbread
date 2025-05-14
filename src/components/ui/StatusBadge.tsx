
import { cn } from "@/lib/utils";
import { Euro, Clock, Hourglass, CheckCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "valid" | "expiring" | "expired" | "missing";
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const baseClasses = "rounded-full px-2 py-1 text-xs font-medium";
  
  const statusClasses = {
    valid: "bg-green-100 text-green-800",
    expiring: "bg-yellow-100 text-yellow-800",
    expired: "bg-red-100 text-red-800",
    missing: "bg-gray-100 text-gray-800",
  };

  const statusText = {
    valid: "Gültig",
    expiring: "Läuft bald ab",
    expired: "Abgelaufen",
    missing: "Fehlt",
  };

  const statusIcons = {
    valid: <CheckCircle className="h-4 w-4 mr-1 text-green-600" />,
    expiring: <Hourglass className="h-4 w-4 mr-1 text-amber-500" />,
    expired: <Clock className="h-4 w-4 mr-1 text-amber-600" />,
    missing: <Clock className="h-4 w-4 mr-1 text-amber-600" />,
  };

  return (
    <div className="flex items-center gap-1">
      {statusIcons[status]}
      <span className={cn(baseClasses, statusClasses[status], className)}>
        {statusText[status]}
      </span>
    </div>
  );
};

export default StatusBadge;
