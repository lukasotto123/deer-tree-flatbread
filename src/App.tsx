
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DocumentStateProvider } from '@/components/providers/DocumentStateProvider';
import AppLayout from '@/components/layout/AppLayout';
import Index from '@/pages/Index';
import MainView from '@/pages/MainView';
import Providers from '@/pages/Providers';
import ProviderView from '@/pages/ProviderView';
import Documents from '@/pages/Documents';
import PersonView from '@/pages/PersonView';
import VendorPersonView from '@/pages/VendorPersonView';
import VendorDashboard from '@/pages/VendorDashboard';
import SingleDocumentView from '@/pages/SingleDocumentView';
import DocumentRequirements from '@/pages/DocumentRequirements';
import AIAgent from '@/pages/AIAgent';
import RequestView from '@/pages/RequestView';
import SubmissionReview from '@/pages/SubmissionReview';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DocumentStateProvider>
          <Router>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<MainView />} />
                <Route path="dashboard" element={<Index />} />
                <Route path="providers" element={<Providers />} />
                <Route path="provider/:providerId" element={<ProviderView />} />
                <Route path="documents" element={<Documents />} />
                <Route path="person/:personId" element={<PersonView />} />
                <Route path="vendor-person/:personId" element={<VendorPersonView />} />
                <Route path="vendor-dashboard" element={<VendorDashboard />} />
                <Route path="document/:documentId" element={<SingleDocumentView />} />
                <Route path="document-requirements" element={<DocumentRequirements />} />
                <Route path="ai-agent" element={<AIAgent />} />
                <Route path="requests" element={<RequestView />} />
                <Route path="submission-review" element={<SubmissionReview />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Router>
          <Toaster />
        </DocumentStateProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
