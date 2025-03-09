import { renderHook, act } from '@testing-library/react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import usePaginationHandlers from '../../hooks/usePaginationHandlers.tsx';

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('usePaginationHandlers', () => {
  let setSearchParamsMock: (params: URLSearchParams) => void;

  beforeEach(() => {
    setSearchParamsMock = vi.fn();

    (useLocation as unknown as Mock).mockReturnValue({
      search: '?page=1&limit=10',
    });

    (useSearchParams as unknown as Mock).mockReturnValue([
      new URLSearchParams({ page: '1', limit: '10' }),
      setSearchParamsMock,
    ]);
  });

  it('should change the page', async () => {
    const { result } = renderHook(() => usePaginationHandlers());

    await act(async () => {
      await result.current.changePageHandler('3');
    });

    expect(setSearchParamsMock).toHaveBeenCalledWith(
      new URLSearchParams({ page: '3', limit: '10' })
    );
  });

  it('should change items per page and reset page to 1', async () => {
    const { result } = renderHook(() => usePaginationHandlers());

    await act(async () => {
      await result.current.changePerPageHandler('20');
    });

    expect(setSearchParamsMock).toHaveBeenCalledWith(
      new URLSearchParams({ page: '1', limit: '20' })
    );
  });

  it('should go to the previous page', async () => {
    const { result } = renderHook(() => usePaginationHandlers());

    await act(async () => {
      await result.current.prevPageHandler();
    });

    expect(setSearchParamsMock).toHaveBeenCalledWith(
      new URLSearchParams({ page: '0', limit: '10' })
    );
  });

  it('should go to the next page', async () => {
    const { result } = renderHook(() => usePaginationHandlers());

    await act(async () => {
      await result.current.nextPageHandler();
    });

    expect(setSearchParamsMock).toHaveBeenCalledWith(
      new URLSearchParams({ page: '2', limit: '10' })
    );
  });
});
