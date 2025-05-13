
import { cn } from "@/lib/utils";
import { AlertCircle, Check, Clock, Hourglass } from "lucide-react";

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
    valid: <Check className="h-4 w-4 text-green-500 mr-1" />,
    expiring: <Hourglass className="h-4 w-4 text-yellow-500 mr-1" />,
    expired: <Clock className="h-4 w-4 text-red-500 mr-1" />,
    missing: <AlertCircle className="h-4 w-4 text-red-500 mr-1" />,
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
