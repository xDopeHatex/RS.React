import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../../../components/UI/Button.tsx';
import { describe, test, expect, vi } from 'vitest';

describe('Button Component', () => {
  test('renders button with given title', () => {
    render(<Button title="Click Me" />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button title="Click Me" onClick={handleClick} />);

    const button = screen.getByText('Click Me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disables the button when isDisabled is true', () => {
    render(<Button title="Disabled" isDisabled />);

    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:cursor-not-allowed');
  });

  test('applies custom styles passed as props', () => {
    render(<Button title="Styled" styles="custom-class" />);

    const button = screen.getByText('Styled');
    expect(button).toHaveClass('custom-class');
  });

  test('renders with active state when isActive is true', () => {
    render(<Button title="Active" isActive />);

    const button = screen.getByText('Active');
    expect(button).toHaveClass('bg-secondary-color'); // Active button class
  });

  test('renders with default primary color when isActive is false', () => {
    render(<Button title="Inactive" />);

    const button = screen.getByText('Inactive');
    expect(button).toHaveClass('bg-primary-color'); // Default button class
  });

  test('renders with an icon', () => {
    render(
      <Button title="Icon Button" icon={<span data-testid="icon">🔥</span>} />
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
  });
});
