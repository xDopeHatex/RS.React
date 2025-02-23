import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Details from '../../views/Details.tsx';
import ThemeProvider from '../../providers/ThemeProvider.tsx';

const createWrapper = (initialEntry: string) => {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialEntry]}>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
  }
  return Wrapper;
};

describe('Details Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders spinner initially', () => {
    render(<Details />, { wrapper: createWrapper('/details?id=123') });
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
