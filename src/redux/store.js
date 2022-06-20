import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';

import { playlistsApi } from '../redux/playlistsQuery';
import { albumsApi } from './albumsQuery';
import { savedTracksApi } from './savedTracksQuery';
import { searchApi } from './searchQuery';

const rootReducer = combineReducers({
  [playlistsApi.reducerPath]: playlistsApi.reducer,
  [albumsApi.reducerPath]: albumsApi.reducer,
  [savedTracksApi.reducerPath]: savedTracksApi.reducer,
  [searchApi.reducerPath]: searchApi.reducer,
})


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(playlistsApi.middleware)

});
