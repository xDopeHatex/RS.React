import './Button.scss';
import { Component } from 'react';

export default class Button extends Component<{
  title: string;
  onClick: () => void;
}> {
  render() {
    const { title } = this.props;
    const { onClick } = this.props;
    return (
      <button className="button" onClick={onClick}>
        {title}
      </button>
    );
  }
}
