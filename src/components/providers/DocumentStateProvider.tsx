
import React, { useState, ReactNode } from 'react';
import { DocumentStateContext } from '@/hooks/useDocumentState';

interface DocumentStateProviderProps {
  children: ReactNode;
}

export const DocumentStateProvider = ({ children }: DocumentStateProviderProps) => {
  const [isJanKowalskiA1Accepted, setIsJanKowalskiA1Accepted] = useState(false);

  const toggleJanKowalskiA1 = () => {
    setIsJanKowalskiA1Accepted(prev => {
      const newState = !prev;
      console.log('Jan Kowalski A1 Status changed to:', newState);
      return newState;
    });
  };

  return (
    <DocumentStateContext.Provider 
      value={{
        isJanKowalskiA1Accepted,
        toggleJanKowalskiA1,
      }}
    >
      {children}
    </DocumentStateContext.Provider>
  );
};
