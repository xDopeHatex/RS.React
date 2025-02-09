import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({
  title,
  type,
  onClick,
  icon,
  styles,
  isDisabled,
  isActive,
}: {
  title?: string | ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  icon?: ReactNode;
  styles?: string;
  isDisabled?: boolean;
  isActive?: boolean;
}) => {
  return (
    <button
      disabled={isDisabled}
      className={twMerge(
        'rounded-primary-border-radius text-xl text-white px-5 py-2 transition-all duration-transition-duration hover:bg-secondary-color active:scale-110 cursor-pointer disabled:cursor-not-allowed disabled:bg-light-gray disabled:active:scale-100',
        isActive ? 'bg-secondary-color' : 'bg-primary-color',
        styles
      )}
      type={type}
      onClick={onClick || undefined}
    >
      {icon}
      {title}
    </button>
  );
};

export default Button;
