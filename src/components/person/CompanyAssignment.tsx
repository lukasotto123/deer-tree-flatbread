
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building } from "lucide-react";
import { toast } from "sonner";

interface CompanyAssignmentProps {
  assignedCompany: string;
  availableCompanies: any[];
  employeeName: string;
  onCompanyAssignment: (company: string) => void;
}

const CompanyAssignment = ({ assignedCompany, availableCompanies, employeeName, onCompanyAssignment }: CompanyAssignmentProps) => {
  const handleCompanyAssignment = (company: string) => {
    onCompanyAssignment(company);
    toast.success(`${employeeName} wurde erfolgreich zum Unternehmen zugewiesen`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unternehmenzuweisung</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Zugewiesenes Unternehmen</p>
          <div className="flex items-center gap-2">
            <Select value={assignedCompany} onValueChange={handleCompanyAssignment}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Unternehmen auswählen" />
              </SelectTrigger>
              <SelectContent>
                {availableCompanies.map(company => (
                  <SelectItem key={company.id} value={company.id}>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span>{company.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyAssignment;
