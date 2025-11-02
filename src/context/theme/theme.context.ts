import { createContext, useContext } from "react";


type InitialContext = {
  theme: string; 
  toggleTheme: () => void;
}

const initialContext: InitialContext = {
  theme: 'light', 
  toggleTheme: () => null,
}

export const ThemeContext = createContext<InitialContext>(initialContext);

export function useThemeContext() {
  return useContext(ThemeContext);
}
