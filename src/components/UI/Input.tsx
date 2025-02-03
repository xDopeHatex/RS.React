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
        className="w-full min-w-[150px] rounded-primary-border-radius bg-secondary-color-lighter text-primary-color px-5 py-2 placeholder-light-gray focus:outline-none focus:bg-secondary-color-light"
      />
    );
  }
}
