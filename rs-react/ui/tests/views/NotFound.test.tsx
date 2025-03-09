import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../../views/NotFound.tsx';
import * as themeHook from '../../hooks/useTheme.tsx';
import { vi } from 'vitest';

describe('NotFound Component', () => {
  it('renders the 404 message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders the Go Home link', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/home');
  });

  it('applies correct styles for dark theme', () => {
    vi.spyOn(themeHook, 'default').mockReturnValue('dark');

    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /go home/i });
    expect(homeLink).toHaveClass('text-black bg-blue-100');
  });

  it('applies correct styles for light theme', () => {
    vi.spyOn(themeHook, 'default').mockReturnValue('light');

    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /go home/i });
    expect(homeLink).toHaveClass('text-white bg-blue-500');
  });

  it('has appropriate accessibility attributes', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole('link', { name: /go home/i });
    expect(homeLink).toHaveAccessibleName('Go Home');
  });
});
