
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import MainView from "./pages/MainView";
import ProviderView from "./pages/ProviderView";
import SubmissionReview from "./pages/SubmissionReview";
import DocumentRequirements from "./pages/DocumentRequirements";
import SingleDocumentView from "./pages/SingleDocumentView";
import RequestView from "./pages/RequestView";
import PersonView from "./pages/PersonView";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<MainView />} />
            <Route path="/provider/:id" element={<ProviderView />} />
            <Route path="/submission-review/:providerId/:documentId" element={<SubmissionReview />} />
            <Route path="/document-requirements" element={<DocumentRequirements />} />
            <Route path="/document/:id" element={<SingleDocumentView />} />
            <Route path="/requests" element={<RequestView />} />
            <Route path="/person/:providerId/:employeeId" element={<PersonView />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
