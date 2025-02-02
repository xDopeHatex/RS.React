import './FallbackPage.scss';
import { Component } from 'react';
import Wrapper from './Wrapper.tsx';

export default class Header extends Component {
  render() {
    return (
      <Wrapper>
        <h2>Something Wrong Happened ;(</h2>
      </Wrapper>
    );
  }
}
