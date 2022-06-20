import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const albumsApi = createApi({
    reducerPath: 'albumsApi',
    baseQuery: fetchBaseQuery({baseUrl:`http://localhost:8000`}),
    endpoints: (build) => ({
        getAlbums: build.query({
            query: () => 'getMySavedAlbums'
        }),
        getAlbum: build.query({
            query: (albumId) => `getMySavedAlbums/${albumId}`
        })
    })
});

export const {useGetAlbumsQuery, useGetAlbumQuery} = albumsApi;