import { Component } from 'react';
import Wrapper from './UI/Wrapper.tsx';

export default class Header extends Component {
  render() {
    return (
      <Wrapper>
        <header className="flex text-[#00c898] text-2xl max-w-[700px]">
          <h1>Find Anime that you have always dreamt of!</h1>
        </header>
      </Wrapper>
    );
  }
}
