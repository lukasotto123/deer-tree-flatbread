
import { cn } from "@/lib/utils";
import { Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "valid" | "expiring" | "expired" | "missing";
  className?: string;
  useIcon?: boolean;
}

const StatusBadge = ({ status, className, useIcon = true }: StatusBadgeProps) => {
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

  const renderStatusIcon = () => {
    if (!useIcon) return null;
    
    switch(status) {
      case 'valid':
        return <CheckCircle className="h-5 w-5 mr-1 text-green-600" />;
      case 'expiring':
        return <Clock className="h-5 w-5 mr-1 text-amber-500" />;
      case 'expired':
        return <AlertTriangle className="h-5 w-5 mr-1 text-red-600" />;
      case 'missing':
        return <XCircle className="h-5 w-5 mr-1 text-gray-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-1">
      {renderStatusIcon()}
      <span className={cn(baseClasses, statusClasses[status], className)}>
        {statusText[status]}
      </span>
    </div>
  );
};

export default StatusBadge;
