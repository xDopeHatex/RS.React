import './Header.scss';
import { Component } from 'react';
import Wrapper from './UI/Wrapper.tsx';

export default class Header extends Component {
  render() {
    return (
      <Wrapper>
        <header>
          <h1>Find Anime that you've always dreamt of!</h1>
        </header>
      </Wrapper>
    );
  }
}
