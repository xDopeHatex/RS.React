import Wrapper from './UI/Wrapper.tsx';
import Button from './UI/Button.tsx';
import useTheme from '../hooks/useTheme.tsx';
import useThemeUpdate from '../hooks/useThemeUpdate.tsx';

const Header = () => {
  const theme = useTheme();
  const changeTheme = useThemeUpdate();
  return (
    <Wrapper>
      <header className="flex text-secondary-color text-2xl items-center justify-between">
        <h1>Find Anime that you have always dreamt of!</h1>
        <Button
          title={theme === 'dark' ? 'light theme' : 'dark theme'}
          onClick={changeTheme}
        />
      </header>
    </Wrapper>
  );
};

export default Header;
