
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

  const statusIcons = {
    valid: <img src="/lovable-uploads/dfa3a23e-acc3-4e0e-9f2b-25a4942a6753.png" className="h-4 w-4 mr-1" alt="Check" />,
    expiring: <img src="/lovable-uploads/ea473a11-611d-4bb0-8828-d510a457a99b.png" className="h-4 w-4 mr-1" alt="Hourglass" />,
    expired: <img src="/lovable-uploads/666d55f0-3a14-41c8-ada9-829e8a7aef6c.png" className="h-4 w-4 mr-1" alt="Clock" />,
    missing: <img src="/lovable-uploads/77a453bb-338d-4749-8726-3a6bfe7a0190.png" className="h-4 w-4 mr-1" alt="Alert" />,
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
