
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Update the document title to the new app name
document.title = "CompliancePro by Pactos";

createRoot(document.getElementById("root")!).render(<App />);
