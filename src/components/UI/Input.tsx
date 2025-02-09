import { ChangeEventHandler } from 'react';

const Input = ({
  placeholder,
  value,
  onChange,
  name,
}: {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  name: string;
}) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="w-full min-w-[150px] rounded-primary-border-radius bg-secondary-color-lighter text-primary-color px-5 py-2 placeholder-light-gray focus:outline-none focus:bg-secondary-color-light"
    />
  );
};

export default Input;
