import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';

import { playlistsApi } from '../redux/playlistsQuery';
import { albumsApi } from './albumsQuery';

const rootReducer = combineReducers({
  [playlistsApi.reducerPath]: playlistsApi.reducer,
  [albumsApi.reducerPath]: albumsApi.reducer,
})


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(playlistsApi.middleware)

});
