
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import MainView from "./pages/MainView";
import VendorDashboard from "./pages/VendorDashboard";
import ProviderView from "./pages/ProviderView";
import SubmissionReview from "./pages/SubmissionReview";
import DocumentRequirements from "./pages/DocumentRequirements";
import SingleDocumentView from "./pages/SingleDocumentView";
import RequestView from "./pages/RequestView";
import PersonView from "./pages/PersonView";
import VendorPersonView from "./pages/VendorPersonView";
import AIAgent from "./pages/AIAgent";
import NotFound from "./pages/NotFound";
import { useState } from "react";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  const [userMode, setUserMode] = useState<"kunde" | "lieferant">("kunde");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout userMode={userMode} onModeChange={setUserMode} />}>
              {/* Customer (Kunde) routes */}
              <Route path="/" element={userMode === "kunde" ? <MainView /> : <VendorDashboard />} />
              <Route path="/provider/:id" element={<ProviderView />} />
              <Route path="/document-review/:providerId/:documentId" element={<SubmissionReview />} />
              <Route path="/submission-review/:providerId/:documentId" element={<SubmissionReview />} />
              <Route path="/document-requirements" element={<DocumentRequirements />} />
              <Route path="/document/:id" element={<SingleDocumentView />} />
              <Route path="/requests" element={<RequestView />} />
              <Route path="/ai-agent" element={<AIAgent />} />
              
              {/* Shared routes based on user mode */}
              <Route path="/person/:providerId/:employeeId" element={<PersonView />} />
              <Route path="/person/:employeeId" element={<VendorPersonView />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
