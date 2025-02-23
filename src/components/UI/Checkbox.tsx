import { twMerge } from 'tailwind-merge';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  position: 'top' | 'bottom';
}

const Checkbox = ({ checked, onChange, position }: CheckboxProps) => {
  return (
    <input
      className={twMerge(
        'z-50 absolute ',
        position === 'top' && 'h-7 w-7',
        position === 'bottom' && 'bottom-0 h-15 w-15'
      )}
      type="checkbox"
      onClick={(e) => e.stopPropagation()}
      onChange={onChange}
      checked={checked}
    ></input>
  );
};

export default Checkbox;
