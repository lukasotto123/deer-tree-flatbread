
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmployeeInformationProps {
  employee: any;
  provider: any;
  employeeName: string;
  citizenship: string;
}

const EmployeeInformation = ({ employee, provider, employeeName, citizenship }: EmployeeInformationProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mitarbeiterinformationen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Position</p>
            <p>{employee.position}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Staatsbürgerschaft</p>
            <p>{citizenship}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Unternehmen</p>
            <p>{provider.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Unternehmenstyp</p>
            <p>{provider.type === "personaldienstleister" ? "Personaldienstleister" : "Subunternehmer"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <span className="rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-800">
              Aktiv
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeInformation;
