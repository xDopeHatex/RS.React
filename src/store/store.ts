import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/apiSlices.ts';
import selectedAnimeSlice from './slices/selectedAnimeSlice.ts';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    selectedAnime: selectedAnimeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type ApplicationState = ReturnType<typeof store.getState>;

export type ApplicationDispatch = typeof store.dispatch;

export default store;
