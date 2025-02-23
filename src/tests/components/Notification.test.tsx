import { describe, it, beforeEach, afterEach, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedAnimeReducer, {
  removeAllAnime,
} from '../../store/slices/selectedAnimeSlice';
import Notification from '../../components/Notification.tsx';
import { AnimeItem } from '../../services/apiSlices.types.ts';

const createTestStore = (preloadedState: {
  selectedAnimeList: AnimeItem[];
}) => {
  return configureStore({
    reducer: {
      selectedAnime: selectedAnimeReducer,
    },
    preloadedState: {
      selectedAnime: preloadedState,
    },
  });
};

describe('Notification Component', () => {
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore({
      selectedAnimeList: [
        {
          mal_id: 1,
          title: 'Naruto',
          title_english: 'Naruto',
          title_japanese: 'ナルト',
          genres: [{ name: 'Action' }, { name: 'Adventure' }],
          episodes: 220,
          status: 'Finished Airing',
          aired: {
            prop: {
              from: { day: 3, month: 10, year: 2002 },
              to: { day: 8, month: 2, year: 2007 },
            },
          },
          score: 7.9,
          synopsis: 'Ninja adventure story.',
          images: {
            jpg: {
              large_image_url: 'https://example.com/naruto.jpg',
            },
          },
        },
        {
          mal_id: 2,
          title: 'One Piece',
          title_english: 'One Piece',
          title_japanese: 'ワンピース',
          genres: [{ name: 'Adventure' }, { name: 'Comedy' }],
          episodes: 1000,
          status: 'Airing',
          aired: {
            prop: {
              from: { day: 20, month: 10, year: 1999 },
              to: { day: 1, month: 1, year: 2025 },
            },
          },
          score: 8.9,
          synopsis: 'Pirate adventure story.',
          images: {
            jpg: {
              large_image_url: 'https://example.com/onepiece.jpg',
            },
          },
        },
      ],
    });

    vi.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly when anime is selected', () => {
    render(
      <Provider store={store}>
        <Notification />
      </Provider>
    );

    const title = screen.getByText(/You have selected 2 anime/i);
    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    const downloadButton = screen.getByRole('button', { name: /download/i });

    expect(title).toBeInTheDocument();
    expect(unselectButton).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();
  });

  it('should dispatch removeAllAnime action on clicking "Unselect all"', () => {
    render(
      <Provider store={store}>
        <Notification />
      </Provider>
    );

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    fireEvent.click(unselectButton);

    expect(store.dispatch).toHaveBeenCalledWith(removeAllAnime());
  });
});
