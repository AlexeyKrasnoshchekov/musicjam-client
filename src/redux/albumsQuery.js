import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const albumsApi = createApi({
    reducerPath: 'albumsApi',
    // baseQuery: fetchBaseQuery({baseUrl:`http://localhost:8000`}),
    baseQuery: fetchBaseQuery({baseUrl:`https://musicjam-server.vercel.app/`}),
    endpoints: (build) => ({
        getAlbums: build.query({
            query: () => 'albums'
        }),
        getAlbum: build.query({
            query: (albumId) => `album/${albumId}`
        }),
        saveAlbum: build.mutation({
            query: (body) => ({
                url: 'albums',
                method: 'POST',
                body,
            })
        }),
        deleteAlbum: build.mutation({
            query: (albumId) => ({
                url: `album/${albumId}`,
                method: 'DELETE'
            })
            
        }),
    })
});

export const {useGetAlbumsQuery, useGetAlbumQuery, useSaveAlbumMutation, useDeleteAlbumMutation} = albumsApi;
