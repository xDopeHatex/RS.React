import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import Details from '../../views/Details.tsx';
import { getAnimeById } from '../../services/api.ts';

vi.mock('../../services/api.ts', () => ({
  getAnimeById: vi.fn(),
}));

const mockNavigate = vi.fn(); // Define mockNavigate outside

vi.mock('react-router', () => ({
  useSearchParams: () => [{ get: () => '1' }],
  useNavigate: () => mockNavigate, // Use the defined mockNavigate
}));

describe('Details Component', () => {
  const mockAnimeData = {
    data: {
      data: {
        title: 'Mock Anime',
        title_english: 'Mock Anime English',
        episodes: 12,
        status: 'Finished Airing',
        aired: {
          prop: {
            from: { day: 1, month: 1, year: 2020 },
            to: { day: 31, month: 12, year: 2020 },
          },
        },
        score: 8.5,
        synopsis: 'This is a mock synopsis.',
        images: { jpg: { large_image_url: 'https://mockimage.com/anime.jpg' } },
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks(); // Reset mock functions before each test
  });

  it('renders spinner while loading', async () => {
    (getAnimeById as Mock).mockImplementation(() => new Promise(() => {}));
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders anime details when API fetch is successful', async () => {
    (getAnimeById as Mock).mockResolvedValue(mockAnimeData);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Title - Mock Anime')).toBeInTheDocument()
    );
    expect(screen.getByText('Score - 8.5')).toBeInTheDocument();
    expect(screen.getByText('Status - Finished Airing')).toBeInTheDocument();
    expect(
      screen.getByText('Aired from 2020.1.1 to 2020.12.31')
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://mockimage.com/anime.jpg'
    );
  });

  it('renders error message when API fetch fails', async () => {
    (getAnimeById as Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('An unknown error occurred')).toBeInTheDocument()
    );
  });

  it('closes modal when clicking close button', async () => {
    (getAnimeById as Mock).mockResolvedValue(mockAnimeData);

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Title - Mock Anime')).toBeInTheDocument()
    );
    const closeButton = screen.getByText('close');
    await fireEvent.click(closeButton);
    expect(mockNavigate).toHaveBeenCalled();
  });
});
