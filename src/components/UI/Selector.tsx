import { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import useTheme from '../../hooks/useTheme.tsx';

const Selector = ({
  options,
  selectName,
  onChange,
  styles,
  currentValue,
}: {
  options: { name: string; value: string }[];
  selectName: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => Promise<void>;
  styles?: string;
  currentValue: string;
}) => {
  const theme = useTheme();

  return (
    <div className="flex  items-center gap-4">
      <label
        title={selectName}
        htmlFor={selectName}
        className={twMerge(
          theme === 'light' && 'text-black',
          theme === 'dark' && 'text-white'
        )}
      >
        {selectName}
      </label>
      <select
        data-testid="select"
        defaultValue={currentValue}
        name={selectName}
        id={selectName}
        onChange={onChange}
        className={twMerge(
          'bg-primary-color text-white rounded-primary-border-radius px-8 h-12 focus:outline-none',
          styles
        )}
      >
        {selectName}
        {options.map(({ name, value }) => (
          <option key={name} value={value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
