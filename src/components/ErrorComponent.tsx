import { Component } from 'react';

export default class ErrorComponent extends Component {
  render() {
    throw new Error('Intentional Error');
    return <></>;
  }
}
