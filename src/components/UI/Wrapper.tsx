import './Wrapper.scss';
import { Component, ReactNode } from 'react';

export default class Wrapper extends Component<{
  children: ReactNode | ReactNode[];
}> {
  render() {
    const { children } = this.props;
    return <div className="wrapper">{children}</div>;
  }
}
