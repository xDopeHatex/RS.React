import axios from 'axios';
import { ANIME_URL } from '../constants.ts';

export const getAnimeByName = (name: string) => {
  const url = new URL(ANIME_URL);
  url.searchParams.append('q', name.trim().toLowerCase());
  return axios.get(url.toString());
};
