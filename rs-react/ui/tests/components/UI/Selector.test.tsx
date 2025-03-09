import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Selector from '../../../components/UI/Selector.tsx';

describe('Selector Component', () => {
  const mockOnChange = vi.fn();
  const options = [
    { name: 'Option 1', value: 'option1' },
    { name: 'Option 2', value: 'option2' },
    { name: 'Option 3', value: 'option3' },
  ];
  const selectName = 'Test Select';
  const currentValue = 'option2';

  it('renders correctly with given options', () => {
    render(
      <Selector
        options={options}
        selectName={selectName}
        onChange={mockOnChange}
        currentValue={currentValue}
      />
    );

    expect(screen.getByLabelText(selectName)).toBeInTheDocument();
    options.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('sets the correct selected option', () => {
    render(
      <Selector
        options={options}
        selectName={selectName}
        onChange={mockOnChange}
        currentValue={currentValue}
      />
    );

    const selectElement = screen.getByLabelText(selectName);
    expect(selectElement).toHaveValue(currentValue);
  });

  it('calls onChange when a new option is selected', async () => {
    render(
      <Selector
        options={options}
        selectName={selectName}
        onChange={mockOnChange}
        currentValue={currentValue}
      />
    );

    const selectElement = screen.getByLabelText(selectName);
    fireEvent.change(selectElement, { target: { value: 'option1' } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'option1' }),
      })
    );
  });
});
