import { render, screen } from '@testing-library/react';
import Header from '../../components/Header.tsx';
import { describe, it, expect } from 'vitest';

describe('Header Component', () => {
  it('renders the header text correctly', () => {
    render(<Header />);

    const headerElement = screen.getByText(
      /Find Anime that you have always dreamt of!/i
    );
    expect(headerElement).toBeInTheDocument();
  });
});
