import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <div className="mx-auto max-w-[1280px] py-[20px] px-[60px]">{children}</div>
  );
};

export default Wrapper;
