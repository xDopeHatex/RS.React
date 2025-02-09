import { describe, it, expect, vi, afterEach, Mock } from 'vitest';
import axios from 'axios';
import { getAnimeTitles, getAnimeById } from '../../services/api.ts';
import { ANIME_URL } from '../../constants.ts';

vi.mock('axios'); // Mock axios

describe('Anime API functions', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch anime titles with correct URL parameters', async () => {
    const searchParams = new URLSearchParams({ q: 'Naruto' });
    const mockResponse = { data: [{ id: 1, title: 'Naruto' }] };

    (axios.get as Mock).mockResolvedValue(mockResponse);

    const response = await getAnimeTitles(searchParams);

    expect(axios.get).toHaveBeenCalledWith(`${ANIME_URL}?q=Naruto`);
    expect(response).toEqual(mockResponse);
  });

  it('should fetch anime by ID', async () => {
    const animeId = '123';
    const mockResponse = { data: { id: 123, title: 'One Piece' } };

    (axios.get as Mock).mockResolvedValue(mockResponse);

    const response = await getAnimeById(animeId);

    expect(axios.get).toHaveBeenCalledWith(`${ANIME_URL}/123`);
    expect(response).toEqual(mockResponse);
  });

  it('should handle errors when fetching anime titles', async () => {
    const searchParams = new URLSearchParams({ q: 'Naruto' });
    const mockError = new Error('Network Error');

    (axios.get as Mock).mockRejectedValue(mockError);

    await expect(getAnimeTitles(searchParams)).rejects.toThrow('Network Error');
  });

  it('should handle errors when fetching anime by ID', async () => {
    const animeId = '999';
    const mockError = new Error('Anime not found');

    (axios.get as Mock).mockRejectedValue(mockError);

    await expect(getAnimeById(animeId)).rejects.toThrow('Anime not found');
  });
});
