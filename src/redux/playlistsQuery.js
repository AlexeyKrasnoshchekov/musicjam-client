import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    tagTypes: ['Playlists'],
    baseQuery: fetchBaseQuery({baseUrl:`http://localhost:8000`}),
    endpoints: (build) => ({
        getPlaylists: build.query({
            query: () => 'playlists',
            providesTags: (result) => result
            ? [
                ...result.map(({ id }) => ({ type: 'Playlists', id })),
                { type: 'Playlists', id: 'LIST' },
              ]
            : [{ type: 'Playlists', id: 'LIST' }],
        }),
        getPlaylist: build.query({
            query: (playlistId) => `playlist/${playlistId}`
        }),
        createPlaylist: build.mutation({
            query: (name) => ({
                url: 'playlists',
                method: 'POST',
                body: name,
            }),
            invalidatesTags: [{type: 'Playlists', id: 'LIST'}]
        }),
        addToPlaylist: build.mutation({
            query: (body) => ({
                url: 'playlist',
                method: 'POST',
                body,
            })
        }),
        deleteFromPlaylist: build.mutation({
            query: (body) => ({
                url: `playlist`,
                method: 'DELETE',
                body
            })
            
        }),
    })
});

export const {useGetPlaylistsQuery, useGetPlaylistQuery, useCreatePlaylistMutation, useAddToPlaylistMutation, useDeleteFromPlaylistMutation} = playlistsApi;