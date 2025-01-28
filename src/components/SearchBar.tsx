import './SearchBar.scss';
import { ChangeEventHandler, Component, FormEvent } from 'react';
import Input from './UI/Input.tsx';
import Button from './UI/Button.tsx';
import Wrapper from './UI/Wrapper.tsx';

export default class SearchBar extends Component<{
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  value: string;
}> {
  render() {
    const { onSubmit } = this.props;
    const { onChange } = this.props;
    const { value } = this.props;

    return (
      <Wrapper>
        <form className="search-bar" onSubmit={onSubmit}>
          <Input
            value={value}
            placeholder={'Type what kind of anime are you looking for?'}
            onChange={onChange}
          />
          <Button title="Search" type="submit" />
        </form>
      </Wrapper>
    );
  }
}
