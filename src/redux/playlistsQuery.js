import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({baseUrl:`http://localhost:8000`}),
    endpoints: (build) => ({
        getPlaylists: build.query({
            query: () => 'playlists'
        }),
        getPlaylist: build.query({
            query: (playlistId) => `playlist/${playlistId}`
        })
    })
});

export const {useGetPlaylistsQuery, useGetPlaylistQuery} = playlistsApi;