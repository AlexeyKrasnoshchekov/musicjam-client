import { configureStore } from "@reduxjs/toolkit";

import { playlistsApi } from "../redux/playlistsQuery";
import { albumsApi } from "./albumsQuery";
import { artistApi } from "./artistQuery";
import { loginApi } from "./loginQuery";
import { savedTracksApi } from "./savedTracksQuery";
import { searchApi } from "./searchQuery";
import { userApi } from "./userQuery";

export const store = configureStore({
  reducer: {
    [playlistsApi.reducerPath]: playlistsApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [savedTracksApi.reducerPath]: savedTracksApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [artistApi.reducerPath]: artistApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(savedTracksApi.middleware),
});
