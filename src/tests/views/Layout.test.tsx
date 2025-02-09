import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../../views/Layout.tsx';
import useFetchAnime from '../../hooks/useFetchAnime.tsx';

// Mock the custom hook useFetchAnime
vi.mock('../../hooks/useFetchAnime.tsx', () => ({
  default: vi.fn(),
}));

describe('Layout Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header and search bar', () => {
    (useFetchAnime as Mock).mockReturnValue({
      animeList: [],
      getAnimeList: vi.fn(),
      animeName: '',
      setAnimeName: vi.fn(),
      fetchAnimeListBySearchParams: vi.fn(),
      pagination: {},
      errorMessage: '',
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // Search input
  });

  it('displays loading spinner when fetching data', () => {
    (useFetchAnime as Mock).mockReturnValue({
      animeList: [],
      getAnimeList: vi.fn(),
      animeName: '',
      setAnimeName: vi.fn(),
      fetchAnimeListBySearchParams: vi.fn(),
      pagination: {},
      errorMessage: '',
      isLoading: true,
    });

    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays error message when error occurs', () => {
    (useFetchAnime as Mock).mockReturnValue({
      animeList: [],
      getAnimeList: vi.fn(),
      animeName: '',
      setAnimeName: vi.fn(),
      fetchAnimeListBySearchParams: vi.fn(),
      pagination: {},
      errorMessage: 'Failed to fetch anime',
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(screen.getByText('Failed to fetch anime')).toBeInTheDocument();
  });

  it('shows no results message when animeList is empty', () => {
    (useFetchAnime as Mock).mockReturnValue({
      animeList: [],
      getAnimeList: vi.fn(),
      animeName: '',
      setAnimeName: vi.fn(),
      fetchAnimeListBySearchParams: vi.fn(),
      pagination: {},
      errorMessage: '',
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(
      screen.getByText('Sorry, there is nothing to show. Try again')
    ).toBeInTheDocument();
  });

  it('handles search input change', () => {
    const setAnimeNameMock = vi.fn();

    (useFetchAnime as Mock).mockReturnValue({
      animeList: [],
      getAnimeList: vi.fn(),
      animeName: '',
      setAnimeName: setAnimeNameMock,
      fetchAnimeListBySearchParams: vi.fn(),
      pagination: {},
      errorMessage: '',
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Naruto' } });

    expect(setAnimeNameMock).toHaveBeenCalledWith('Naruto');
  });

  it('triggers search function on form submission', () => {
    const getAnimeListMock = vi.fn();

    (useFetchAnime as Mock).mockReturnValue({
      animeList: [],
      getAnimeList: getAnimeListMock,
      animeName: '',
      setAnimeName: vi.fn(),
      fetchAnimeListBySearchParams: vi.fn(),
      pagination: {},
      errorMessage: '',
      isLoading: false,
    });

    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);

    expect(getAnimeListMock).toHaveBeenCalled();
  });
});
