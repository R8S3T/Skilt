import React from 'react';

interface NextButtonVisibilityData {
  showNextButton: boolean;
  setShowNextButton: (show: boolean) => void;
}

// Create the context with default values
export const NextButtonVisibilityContext = React.createContext<NextButtonVisibilityData>({
  showNextButton: false,
  setShowNextButton: () => {}, // Empty function as a placeholder
});

export const useNextButtonVisibility = () => React.useContext(NextButtonVisibilityContext);