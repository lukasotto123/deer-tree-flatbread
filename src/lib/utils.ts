
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Euro, Clock } from "lucide-react";
import { documents } from "@/data/dummy-data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to check if a document is related to contributions
export function isBeitragsrückstand(doc: typeof documents[0]) {
  return doc.status === 'expired' && 
    (doc.name.includes("Unbedenklichkeitsbescheinigung") || 
     doc.name.includes("Beitrag") || 
     doc.name.includes("Sozialversicherung"));
}

// Get the appropriate icon based on document status
export function getDocumentStatusIcon(status: string, isBeitrag: boolean = false) {
  if (status === 'expired' && isBeitrag) {
    return <Euro className="h-5 w-5 text-red-600" />;
  } else if (status === 'expired' || status === 'missing') {
    return <Clock className="h-5 w-5 text-amber-600" />;
  } else if (status === 'expiring') {
    return <Clock className="h-5 w-5 text-amber-500" />;
  } else {
    return <img src="/lovable-uploads/dfa3a23e-acc3-4e0e-9f2b-25a4942a6753.png" className="h-5 w-5" alt="Check" />;
  }
}
