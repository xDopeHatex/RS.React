import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import ErrorBoundary from '../../components/ErrorBoundary.tsx';
import ErrorComponent from '../../components/ErrorComponent.tsx';

vi.spyOn(console, 'error').mockImplementation(() => {});

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <div>Normal Child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal Child')).toBeInTheDocument();
  });

  it('displays the fallback UI when an error occurs', () => {
    render(
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
