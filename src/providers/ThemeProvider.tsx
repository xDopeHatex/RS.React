import { createContext, ReactNode, useState } from 'react';

export type Theme = 'light' | 'dark';
export const ThemeContext = createContext<Theme>('dark');

export const ThemeUpdateContext = createContext(() => {});

export const ThemeProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
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

export default ThemeProvider;
