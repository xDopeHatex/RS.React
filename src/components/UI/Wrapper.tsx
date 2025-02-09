import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <div
      data-testid="wrapper"
      className="mx-auto max-w-[1280px] py-[10px] px-[60px]"
    >
      {children}
    </div>
  );
};

export default Wrapper;
