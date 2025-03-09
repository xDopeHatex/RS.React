import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/services/apiSlices";
import selectedAnimeSlice from "@/store/slices/selectedAnimeSlice";

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
