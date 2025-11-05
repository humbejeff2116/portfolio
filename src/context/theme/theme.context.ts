import { createContext, useContext } from "react";

type InitialContext = {
  theme: string; 
  toggleTheme: () => void;
  showTransition: boolean;
}

const initialContext: InitialContext = {
  theme: 'light', 
  toggleTheme: () => null,
  showTransition: false
}

export const ThemeContext = createContext<InitialContext>(initialContext);

export function useThemeContext() {
  return useContext(ThemeContext);
}
