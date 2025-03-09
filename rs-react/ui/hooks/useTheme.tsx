import { useContext } from "react";
import { ThemeContext } from "@/ui/providers/ThemeProvider";

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
