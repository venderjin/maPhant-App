import { Dispatch, SetStateAction, createContext } from "react";
export type ThemeContextType = [boolean, Dispatch<SetStateAction<boolean>>];
export const ThemeContext = createContext<ThemeContextType>([false, () => {}]);
