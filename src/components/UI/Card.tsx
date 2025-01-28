import './Card.scss';
import { Component } from 'react';

export default class Card extends Component<{
  title: string;
  imgLink: string;
}> {
  render() {
    const { title } = this.props;
    const { imgLink } = this.props;
    return (
      <figure>
        <img src={imgLink} alt={`image of the ${title} anime`} />
        <figcaption>{title}</figcaption>
      </figure>
    );
  }
}
