import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../../../components/UI/Input.tsx';

describe('Input Component', () => {
  it('renders with correct placeholder', () => {
    render(
      <Input
        placeholder="Enter text"
        value=""
        onChange={() => {}}
        name="test-input"
      />
    );

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  it('updates value on change', () => {
    const handleChange = vi.fn();
    render(
      <Input
        placeholder="Type here"
        value=""
        onChange={handleChange}
        name="test-input"
      />
    );

    const inputElement = screen.getByPlaceholderText('Type here');

    fireEvent.change(inputElement, { target: { value: 'Hello' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders with the correct initial value', () => {
    render(
      <Input
        placeholder="Enter text"
        value="Initial Value"
        onChange={() => {}}
        name="test-input"
      />
    );

    const inputElement = screen.getByPlaceholderText(
      'Enter text'
    ) as HTMLInputElement;
    expect(inputElement.value).toBe('Initial Value');
  });
});
