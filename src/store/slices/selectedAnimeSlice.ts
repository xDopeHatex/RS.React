import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnimeItem } from '../../services/apiSlices.types.ts';

const initialState: { selectedAnimeList: AnimeItem[] } = {
  selectedAnimeList: [],
};

const selectedAnimeSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addAnime: (state, action: PayloadAction<AnimeItem>) => {
      state.selectedAnimeList.push(action.payload);
    },
    removeAnime: (state, action: PayloadAction<AnimeItem>) => {
      state.selectedAnimeList = state.selectedAnimeList.filter(
        ({ mal_id }) => mal_id !== action.payload.mal_id
      );
    },
    removeAllAnime: (state) => {
      state.selectedAnimeList = [];
    },
  },
});

export const { addAnime, removeAnime, removeAllAnime } =
  selectedAnimeSlice.actions;
export default selectedAnimeSlice.reducer;
