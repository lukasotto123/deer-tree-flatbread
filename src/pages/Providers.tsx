
import { providers } from "@/data/dummy-data";
import ProvidersOverview from "@/components/providers/ProvidersOverview";

const Providers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dienstleister</h1>
        <p className="text-muted-foreground mt-1">
          Übersicht aller Personaldienstleister und Subunternehmer
        </p>
      </div>

      <ProvidersOverview providers={providers} />
    </div>
  );
};

export default Providers;
