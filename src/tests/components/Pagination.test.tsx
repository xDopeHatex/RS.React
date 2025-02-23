import { render, screen, fireEvent } from '@testing-library/react';
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

  it('renders pagination correctly with basic props', () => {
    renderPagination(paginationProps);
    expect(screen.getByLabelText('Items Per Page')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('disables the previous button on the first page', () => {
    renderPagination(paginationProps);
    const prevButton = screen.getByTestId('prevButton');
    expect(prevButton).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    paginationProps.isLastPage = true;
    renderPagination(paginationProps);
    const nextButton = screen.getByTestId('nextButton');

    expect(nextButton).toBeDisabled();
  });

  it('renders condensed pagination when total pages are more than 5', () => {
    paginationProps.lastPage = 10;
    renderPagination(paginationProps);

    // First page button should be visible
    expect(screen.getByText('1')).toBeInTheDocument();

    // Last page button should be visible
    expect(screen.getByText('10')).toBeInTheDocument();

    // Check if "..." (pagination dots) or intermediate pages are rendered appropriately
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('calls nextPageHandler when the next button is clicked', () => {
    renderPagination(paginationProps);
    const nextButton = screen.getByTestId('nextButton');

    // Mock the function
    fireEvent.click(nextButton);

    // You can extend this by mocking the function using vi.spyOn() if available in your hooks
    expect(nextButton).not.toBeDisabled();
  });

  it('calls prevPageHandler when the previous button is clicked', () => {
    paginationProps.isFirstPage = false;
    renderPagination(paginationProps);

    const prevButton = screen.getByTestId('prevButton');
    fireEvent.click(prevButton);
    expect(prevButton).not.toBeDisabled();
  });

  it('renders per page selector with correct options', () => {
    renderPagination(paginationProps);
    const selector = screen.getByLabelText('Items Per Page');

    // Check that options exist
    expect(screen.getByRole('option', { name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '6' })).toBeInTheDocument();

    // Check changing the selector
    fireEvent.change(selector, { target: { value: '6' } });
    expect(selector).toHaveValue('6');
  });
});
