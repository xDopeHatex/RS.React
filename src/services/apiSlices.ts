import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ANIME_URL } from '../constants.ts';
import { AnimeBaseResponse, AnimeItem } from './apiSlices.types.ts';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: ANIME_URL.toString() }),
  endpoints: (builder) => ({
    getAnimeList: builder.query<
      AnimeBaseResponse,
      {
        limit: number;
        page: number;
        q?: string;
      }
    >({
      query: (params: { limit: number; page: number; q?: string }) => {
        const queryParams = { ...params };
        if (queryParams.q === undefined) {
          delete queryParams.q;
        }
        return {
          url: '',
          method: 'GET',
          params: queryParams,
        };
      },
    }),
    getAnimeById: builder.query<{ data: AnimeItem }, { id: number }>({
      query: (params: { id: number }) => {
        return {
          url: `${ANIME_URL}/${params.id}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetAnimeByIdQuery, useGetAnimeListQuery } = apiSlice;
