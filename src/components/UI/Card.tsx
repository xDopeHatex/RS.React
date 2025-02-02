import './Card.scss';
import { Component, ReactNode } from 'react';

export default class Card extends Component<{
  title: string;
  imgLink: string;
  description: string | ReactNode | ReactNode[];
}> {
  render() {
    const { title } = this.props;
    const { imgLink } = this.props;
    const { description } = this.props;
    return (
      <figure>
        <img src={imgLink} alt={`image of the ${title} anime`} />
        <figcaption>
          <p>{title}</p>
          <p className="description">{description}</p>
        </figcaption>
      </figure>
    );
  }
}
