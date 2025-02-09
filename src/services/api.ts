import axios from 'axios';
import { ANIME_URL } from '../constants.ts';

export const getAnimeTitles = (searchParams: URLSearchParams) => {
  console.log(searchParams);
  return axios.get(`${ANIME_URL}?${searchParams}`);
};

export const getAnimeById = (id: string) => {
  return axios.get(`${ANIME_URL}/${id}`);
};
