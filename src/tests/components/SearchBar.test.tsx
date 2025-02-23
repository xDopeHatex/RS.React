import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import SearchBar from '../../components/SearchBar';

const placeholderText = 'Type what kind of anime are you looking for?';

describe('SearchBar Component', () => {
  it('renders input and button correctly', () => {
    render(
      <SearchBar
        onSubmit={vi.fn()}
        onChange={vi.fn()}
        value=""
        name="search"
        placeholder={placeholderText}
      />
    );

    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onChange when typing in the input', () => {
    const handleChange = vi.fn();

    render(
      <SearchBar
        onSubmit={vi.fn()}
        onChange={handleChange}
        value=""
        name="search"
        placeholder={placeholderText}
      />
    );

    const input = screen.getByPlaceholderText(placeholderText);
    fireEvent.change(input, { target: { value: 'Naruto' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit when the form is submitted', () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <SearchBar
        onSubmit={handleSubmit}
        onChange={vi.fn()}
        value=""
        name="search"
        placeholder={placeholderText}
      />
    );

    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
