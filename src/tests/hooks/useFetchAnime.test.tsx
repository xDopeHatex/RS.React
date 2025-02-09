import { renderHook, act } from '@testing-library/react';
import { useSearchParams } from 'react-router';
import { getAnimeTitles } from '../../services/api.ts';
import useFetchAnime from '../../hooks/useFetchAnime.tsx';
import { vi, describe, it, beforeEach, expect, Mock } from 'vitest';
import { AxiosError } from 'axios';

vi.mock('../../services/api.ts', () => ({
  getAnimeTitles: vi.fn(),
}));

vi.mock('react-router', () => ({
  useSearchParams: vi.fn(),
}));

describe('useFetchAnime Hook', () => {
  let mockSetSearchParams: Mock;

  beforeEach(() => {
    mockSetSearchParams = vi.fn();
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ q: '', limit: '4', page: '1' }),
      mockSetSearchParams,
    ]);
    localStorage.clear();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useFetchAnime());
    expect(result.current.animeName).toBe('');
    expect(result.current.animeList).toEqual([]);
    expect(result.current.errorMessage).toBe('');
  });

  it('should fetch anime list and update state', async () => {
    const mockData = {
      data: {
        pagination: {
          current_page: 1,
          has_next_page: true,
          last_visible_page: 10,
        },
        data: [
          {
            mal_id: 1,
            title_english: 'Naruto',
            title: 'Naruto',
            title_japanese: 'ナルト',
            synopsis: 'A ninja story.',
            images: { jpg: { large_image_url: 'image_url' } },
            genres: [{ name: 'Action' }],
          },
        ],
      },
    };
    (getAnimeTitles as Mock).mockResolvedValue(mockData);

    const { result } = renderHook(() => useFetchAnime());

    await act(async () => {
      await result.current.fetchAnimeListBySearchParams(
        new URLSearchParams({ q: 'Naruto' })
      );
    });

    expect(result.current.animeList).toHaveLength(1);
    expect(result.current.animeList[0].title_english).toBe('Naruto');
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle API error correctly', async () => {
    (getAnimeTitles as Mock).mockRejectedValue(new AxiosError('Network Error'));

    const { result } = renderHook(() => useFetchAnime());

    await act(async () => {
      await result.current.fetchAnimeListBySearchParams(
        new URLSearchParams({ q: 'Invalid' })
      );
    });

    expect(result.current.errorMessage).toBe('Network Error');
    expect(result.current.isLoading).toBe(false);
  });
});
