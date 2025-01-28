import './Input.scss';
import { Component } from 'react';

export default class Input extends Component<{
  placeholder: string;
  onChange: () => void;
}> {
  render() {
    const { placeholder } = this.props;
    const { onChange } = this.props;
    return (
      <input placeholder={placeholder} onChange={onChange} className="input" />
    );
  }
}
