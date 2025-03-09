import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header.tsx';
import { describe, it, expect, vi } from 'vitest';
import * as useThemeHook from '../../hooks/useTheme.tsx';
import * as useThemeUpdateHook from '../../hooks/useThemeUpdate.tsx';

describe('Header Component', () => {
  it('renders the header text correctly', () => {
    render(<Header />);
    const headerElement = screen.getByText(
      /Find Anime that you have always dreamt of!/i
    );
    expect(headerElement).toBeInTheDocument();
  });

  it('renders button text correctly when theme is dark', () => {
    vi.spyOn(useThemeHook, 'default').mockReturnValue('dark');
    render(<Header />);
    const buttonElement = screen.getByRole('button', { name: /light theme/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders button text correctly when theme is light', () => {
    vi.spyOn(useThemeHook, 'default').mockReturnValue('light');
    render(<Header />);
    const buttonElement = screen.getByRole('button', { name: /dark theme/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls theme change function on button click for dark theme', () => {
    vi.spyOn(useThemeHook, 'default').mockReturnValue('dark');
    const mockChangeTheme = vi.fn();
    vi.spyOn(useThemeUpdateHook, 'default').mockReturnValue(mockChangeTheme);

    render(<Header />);
    const buttonElement = screen.getByRole('button', { name: /light theme/i });
    fireEvent.click(buttonElement);
    expect(mockChangeTheme).toHaveBeenCalledTimes(1);
  });

  it('calls theme change function on button click for light theme', () => {
    vi.spyOn(useThemeHook, 'default').mockReturnValue('light');
    const mockChangeTheme = vi.fn();
    vi.spyOn(useThemeUpdateHook, 'default').mockReturnValue(mockChangeTheme);

    render(<Header />);
    const buttonElement = screen.getByRole('button', { name: /dark theme/i });
    fireEvent.click(buttonElement);
    expect(mockChangeTheme).toHaveBeenCalledTimes(1);
  });
});
