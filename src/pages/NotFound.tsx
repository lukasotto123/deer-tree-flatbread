
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-7xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Seite nicht gefunden</h2>
      <p className="mt-2 text-muted-foreground max-w-md">
        Die angeforderte Seite konnte nicht gefunden werden. Bitte überprüfen Sie die URL oder kehren Sie zur Startseite zurück.
      </p>
      <Link to="/" className="mt-8">
        <Button>Zurück zur Startseite</Button>
      </Link>
    </div>
  );
};

export default NotFound;
