import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PaginationElement from '../../../components/UI/PaginationElement.tsx';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';

describe('PaginationElement Component', () => {
  it('renders with default text when name is not provided', () => {
    render(<PaginationElement />);

    const element = screen.getByText('...');
    expect(element).toBeInTheDocument();
  });

  it('renders with the provided name', () => {
    render(<PaginationElement name="Page 1" />);

    const element = screen.getByText('Page 1');
    expect(element).toBeInTheDocument();
  });

  it('renders with the provided icon', () => {
    render(
      <PaginationElement
        icon={<ArrowLongLeftIcon data-testid="pagination-icon" />}
      />
    );

    const iconElement = screen.getByTestId('pagination-icon');
    expect(iconElement).toBeInTheDocument();
  });

  it('applies correct styles when isActive is true', () => {
    render(<PaginationElement isActive />);

    const element = screen.getByText('...');
    expect(element).toHaveClass('bg-secondary-color');
  });

  it('applies correct styles when isActive is false or undefined', () => {
    render(<PaginationElement />);

    const element = screen.getByText('...');
    expect(element).toHaveClass('bg-primary-color');
  });
});
