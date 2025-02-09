import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../../components/Pagination.tsx';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import { PaginationProps } from '../../views/Layout.tsx';

const mockFetchPage = vi.fn();

const renderPagination = (paginationProps: PaginationProps) => {
  render(
    <MemoryRouter initialEntries={['/?q=nar&page=1&limit=4']}>
      <Pagination pagination={paginationProps} fetchPage={mockFetchPage} />
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

  it('calls fetchPage when changing items per page', async () => {
    renderPagination(paginationProps);
    fireEvent.change(screen.getByLabelText('Items Per Page'), {
      target: { value: '6' },
    });
    expect(mockFetchPage).toHaveBeenCalled();
  });
});
