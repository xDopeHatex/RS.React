import { useContext } from 'react';
import { ThemeUpdateContext } from '../providers/ThemeProvider.tsx';

const useUpdateTheme = () => {
  return useContext(ThemeUpdateContext);
};

export default useUpdateTheme;
