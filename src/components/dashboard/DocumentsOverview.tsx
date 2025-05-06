
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Document } from "@/types";

interface DocumentsOverviewProps {
  documents: Document[];
}

const DocumentsOverview = ({ documents }: DocumentsOverviewProps) => {
  const validCount = documents.filter(doc => doc.status === 'valid').length;
  const expiringCount = documents.filter(doc => doc.status === 'expiring').length;
  const expiredCount = documents.filter(doc => doc.status === 'expired').length;
  const missingCount = documents.filter(doc => doc.status === 'missing').length;

  const data = [
    { name: 'Gültig', value: validCount, color: '#22c55e' },
    { name: 'Läuft ab', value: expiringCount, color: '#eab308' },
    { name: 'Abgelaufen', value: expiredCount, color: '#ef4444' },
    { name: 'Fehlt', value: missingCount, color: '#9ca3af' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Dokumentenstatus</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value} Dokumente`, 'Anzahl']} />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DocumentsOverview;
