import { ChangeEventHandler, FormEvent, MutableRefObject } from "react";
import Input from "@/ui/components/UI/Input";
import Button from "@/ui/components/UI/Button";
import Wrapper from "@/ui/components/UI/Wrapper";
import useTheme from "@/ui/hooks/useTheme";
import { twMerge } from "tailwind-merge";

const SearchBar = ({
  onSubmit,
  value,
  onChange,
  name,
  placeholder,
  ref,
}: {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  value?: string;
  name: string;
  placeholder: string;
  ref?: MutableRefObject<null | HTMLInputElement>;
}) => {
  const theme = useTheme();
  return (
    <Wrapper>
      <form
        data-testid="search-form"
        className={twMerge(
          "flex p-5 border-2  rounded-primary-border-radius w-full gap-5 shadow-md shadow-secondary-color-light",
          theme === "dark" && "border-secondary-color-light-dark-theme",
          theme === "light" && "border-secondary-color-light-light-theme",
        )}
        onSubmit={onSubmit}
      >
        <Input
          ref={ref}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <Button title="Search" type="submit" />
      </form>
    </Wrapper>
  );
};

export default SearchBar;
