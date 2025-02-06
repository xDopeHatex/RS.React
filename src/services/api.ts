import axios from 'axios';
import { ANIME_URL } from '../constants.ts';

// export const getAnimeTitles = (searchParams: URLSearchParams) => {
//   const url = new URL(ANIME_URL);
//   url.searchParams.append('q', 'chainsaw');
//   console.log('URL TO STRING', url.toString());
//   return axios.get(url.toString());
// };

export const getAnimeTitles = (searchParams: URLSearchParams) => {
  console.log(searchParams);
  return axios.get(`${ANIME_URL}?${searchParams}`);
};

// https://api.jikan.moe/v4/anime/?q=chainsaw

// https://api.jikan.moe/v4/anime?q=chainsaw
