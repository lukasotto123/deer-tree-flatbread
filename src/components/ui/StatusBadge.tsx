
import { cn } from "@/lib/utils";

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

  return (
    <span className={cn(baseClasses, statusClasses[status], className)}>
      {statusText[status]}
    </span>
  );
};

export default StatusBadge;
