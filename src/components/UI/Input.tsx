import './Input.scss';
import { Component, ChangeEventHandler } from 'react';

export default class Input extends Component<{
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}> {
  render() {
    const { placeholder } = this.props;
    const { onChange } = this.props;
    const { value } = this.props;
    return (
      <input
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="input"
      />
    );
  }
}
