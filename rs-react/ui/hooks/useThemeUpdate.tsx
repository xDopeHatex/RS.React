import { useContext } from "react";
import { ThemeUpdateContext } from "@/ui/providers/ThemeProvider";

const useUpdateTheme = () => {
  return useContext(ThemeUpdateContext);
};

export default useUpdateTheme;
