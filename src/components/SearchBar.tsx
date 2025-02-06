import { ChangeEventHandler, FormEvent } from 'react';
import Input from './UI/Input.tsx';
import Button from './UI/Button.tsx';
import Wrapper from './UI/Wrapper.tsx';

const SearchBar = ({
  onSubmit,
  value,
  onChange,
  name,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  value: string;
  name: string;
}) => {
  return (
    <Wrapper>
      <form
        className="flex p-5 border-2 border-secondary-color-light rounded-primary-border-radius w-full gap-5 shadow-md shadow-secondary-color-light"
        onSubmit={onSubmit}
      >
        <Input
          name={name}
          value={value}
          placeholder={'Type what kind of anime are you looking for?'}
          onChange={onChange}
        />
        <Button title="Search" type="submit" />
      </form>
    </Wrapper>
  );
};

export default SearchBar;
