import Wrapper from './UI/Wrapper.tsx';
import Button from './UI/Button.tsx';
import { useTheme, useUpdateTheme } from '../providers/ThemeProvider.tsx';

const Header = () => {
  const theme = useTheme();
  const changeTheme = useUpdateTheme();
  return (
    <Wrapper>
      <header className="flex text-secondary-color text-2xl max-w-[700px] items-center justify-between">
        <h1>Find Anime that you have always dreamt of!</h1>
        <Button
          title={
            theme === 'dark'
              ? 'light theme'
              : theme === 'light'
                ? 'dark theme'
                : 'some theme'
          }
          onClick={changeTheme}
        />
      </header>
    </Wrapper>
  );
};

export default Header;
