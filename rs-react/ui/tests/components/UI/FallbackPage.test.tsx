import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FallbackPage from '../../../components/UI/FallbackPage.tsx';

vi.mock('../../../components/UI/Wrapper', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="wrapper">{children}</div>
  ),
}));

describe('FallbackPage', () => {
  it('renders the fallback message inside the Wrapper', () => {
    render(<FallbackPage />);

    expect(screen.getByText(/Something Wrong Happened/i)).toBeInTheDocument();

    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });
});
