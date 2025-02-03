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
      <button
        className="rounded-primary-border-radius bg-primary-color text-white px-5 py-2 transition-all duration-transition-duration hover:bg-secondary-color active:scale-110 cursor-pointer"
        type={type}
        onClick={onClick || undefined}
      >
        {title}
      </button>
    );
  }
}
