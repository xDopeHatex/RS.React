import { ChangeEventHandler, MutableRefObject } from 'react';

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
  return (
    <input
      ref={ref}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="w-full min-w-[150px] rounded-primary-border-radius bg-secondary-color-lighter text-primary-color px-5 py-2 placeholder-light-gray focus:outline-none focus:bg-secondary-color-light"
    />
  );
};

export default Input;
