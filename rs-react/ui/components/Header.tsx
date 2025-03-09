import Wrapper from "@/ui/components/UI/Wrapper";
import Button from "@/ui/components/UI/Button";
import useTheme from "@/ui/hooks/useTheme";
import useThemeUpdate from "@/ui/hooks/useThemeUpdate";

const Header = () => {
  const theme = useTheme();
  const changeTheme = useThemeUpdate();
  return (
    <Wrapper>
      <header className="flex text-secondary-color text-2xl items-center justify-between">
        <h1>Find Anime that you have always dreamt of!</h1>
        <Button
          title={theme === "dark" ? "light theme" : "dark theme"}
          onClick={changeTheme}
        />
      </header>
    </Wrapper>
  );
};

export default Header;
