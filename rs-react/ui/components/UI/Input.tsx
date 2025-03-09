import { ChangeEventHandler, MutableRefObject } from "react";
import useTheme from "@/ui/hooks/useTheme";
import { twMerge } from "tailwind-merge";

const Input = ({
  placeholder,
  value,
  onChange,
  name,
  ref,
}: {
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  name: string;
  ref?: MutableRefObject<null | HTMLInputElement>;
}) => {
  const theme = useTheme();

  return (
    <input
      ref={ref}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={twMerge(
        "w-full min-w-[150px] rounded-primary-border-radius  px-5 py-2 focus:outline-none ",
        theme === "light" &&
          "bg-secondary-color-lighter-light-theme text-primary-color placeholder-light-gray-light-theme focus:bg-secondary-color-light-light-theme",
        theme === "dark" &&
          "bg-secondary-color-lighter-dark-theme text-secondary-color placeholder-light-gray-dark-theme focus:bg-secondary-color-light-dark-theme",
      )}
    />
  );
};

export default Input;
