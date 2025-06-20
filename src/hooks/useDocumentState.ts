
import { useState, useEffect, createContext, useContext } from 'react';

interface DocumentState {
  isJanKowalskiA1Accepted: boolean;
  toggleJanKowalskiA1: () => void;
}

const DocumentStateContext = createContext<DocumentState | undefined>(undefined);

export const useDocumentState = () => {
  const context = useContext(DocumentStateContext);
  if (!context) {
    throw new Error('useDocumentState must be used within a DocumentStateProvider');
  }
  return context;
};

// Hook für lokale Nutzung ohne Provider
export const useLocalDocumentState = () => {
  const [isJanKowalskiA1Accepted, setIsJanKowalskiA1Accepted] = useState(false);

  const toggleJanKowalskiA1 = () => {
    setIsJanKowalskiA1Accepted(prev => !prev);
    console.log('Jan Kowalski A1 Status toggled:', !isJanKowalskiA1Accepted);
  };

  return {
    isJanKowalskiA1Accepted,
    toggleJanKowalskiA1,
  };
};

export { DocumentStateContext };
