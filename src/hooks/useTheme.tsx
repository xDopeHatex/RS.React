import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider.tsx';

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
