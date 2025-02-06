import { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

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
  return (
    <div className="flex  items-center gap-4">
      <label title={selectName} htmlFor={selectName} className="text-black">
        {selectName}
      </label>
      <select
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
          <option key={name} value={value} selected={currentValue === value}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
