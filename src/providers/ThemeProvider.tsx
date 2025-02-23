import { createContext, ReactNode, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<Theme>('dark');
const ThemeUpdateContext = createContext(() => {});

const ThemeProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const changeThemeHandler = () => {
    const changeThemeTo = theme === 'dark' ? 'light' : 'dark';
    setTheme(changeThemeTo);
  };

  return (
    <ThemeUpdateContext.Provider value={changeThemeHandler}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ThemeUpdateContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export const useUpdateTheme = () => useContext(ThemeUpdateContext);

export default ThemeProvider;
