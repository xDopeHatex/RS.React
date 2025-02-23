import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../../components/Pagination.tsx';
import { describe, beforeEach, it, expect } from 'vitest';
import { PaginationProps } from '../../views/Layout.tsx';
import { Provider } from 'react-redux';
import store from '../../store/store.ts';
import ThemeProvider from '../../providers/ThemeProvider.tsx';

const renderPagination = (paginationProps: PaginationProps) => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <ThemeProvider>
          <Pagination pagination={paginationProps} />
        </ThemeProvider>
      </Provider>
    </MemoryRouter>
  );
};

describe('Pagination Component', () => {
  let paginationProps: PaginationProps;

  beforeEach(() => {
    paginationProps = {
      isFirstPage: true,
      isLastPage: false,
      lastPage: 5,
    };
  });

  it('renders pagination correctly', () => {
    renderPagination(paginationProps);
    expect(screen.getByLabelText('Items Per Page')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
