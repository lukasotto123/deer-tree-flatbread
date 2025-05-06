
import { documents } from "@/data/dummy-data";
import DocumentsList from "@/components/documents/DocumentsList";

const Documents = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dokumente</h1>
        <p className="text-muted-foreground mt-1">
          Übersicht und Verwaltung aller erforderlichen Dokumente
        </p>
      </div>

      <DocumentsList documents={documents} />
    </div>
  );
};

export default Documents;
