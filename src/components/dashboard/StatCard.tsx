
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  colorClass?: string;
  actionButton?: React.ReactNode;
  valueColorClass?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  colorClass = "bg-primary text-white",
  actionButton,
  valueColorClass = ""
}: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className={cn("text-2xl font-bold mt-1", valueColorClass)}>{value}</h3>
          {description && (
            <div className="text-sm text-muted-foreground mt-1">{description}</div>
          )}
        </div>
        {icon && (
          <div className={cn("rounded-full p-2 flex items-center justify-center", colorClass)}>
            <div className="w-5 h-5 flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
      </div>
      {actionButton && (
        <div className="mt-2">
          {actionButton}
        </div>
      )}
    </div>
  );
};

export default StatCard;
