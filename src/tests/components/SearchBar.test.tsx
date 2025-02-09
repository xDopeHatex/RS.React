import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import SearchBar from '../../components/SearchBar.tsx';

describe('SearchBar Component', () => {
  it('renders input and button correctly', () => {
    render(
      <SearchBar onSubmit={vi.fn()} onChange={vi.fn()} value="" name="search" />
    );

    expect(
      screen.getByPlaceholderText(
        'Type what kind of anime are you looking for?'
      )
    ).toBeInTheDocument();
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
      />
    );

    const input = screen.getByPlaceholderText(
      'Type what kind of anime are you looking for?'
    );
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
      />
    );

    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
