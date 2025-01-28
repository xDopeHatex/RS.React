import './Button.scss';
import { Component } from 'react';

export default class Button extends Component<{
  title: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}> {
  render() {
    const { title } = this.props;
    const { onClick } = this.props;
    const { type = 'button' } = this.props;
    return (
      <button className="button" type={type} onClick={onClick || undefined}>
        {title}
      </button>
    );
  }
}
