import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const PaginationElement = ({
  isActive,
  icon,
  name,
}: {
  icon?: ReactNode;
  name?: string | null;
  isActive?: boolean;
}) => {
  return (
    <li
      className={twMerge(
        'rounded-primary-border-radius  text-white p-2 h-12 w-12 grid place-content-center text-xl',
        isActive ? 'bg-secondary-color' : 'bg-primary-color'
      )}
    >
      {icon}
      {name || '...'}
    </li>
  );
};

export default PaginationElement;
