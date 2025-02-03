import { Component, ReactNode } from 'react';

export default class Wrapper extends Component<{
  children: ReactNode | ReactNode[];
}> {
  render() {
    const { children } = this.props;
    return (
      <div className="mx-auto max-w-[1280px] py-[40px] px-[60px]">
        {children}
      </div>
    );
  }
}
