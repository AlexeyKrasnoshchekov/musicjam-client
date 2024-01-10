import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const savedTracksApi = createApi({
  reducerPath: 'savedTracksApi',
  tagTypes: ['savedTracks'],
  // baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000` }),
  baseQuery: fetchBaseQuery({ baseUrl: `https://musicjam-server.vercel.app` }),
  endpoints: (build) => ({
    getSavedTracks: build.query({
      query: () => ({
        url: 'tracks',
        mode: 'no-cors',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'savedTracks', id })),
              { type: 'savedTracks', id: 'LIST' },
            ]
          : [{ type: 'savedTracks', id: 'LIST' }],
    }),
    saveTrack: build.mutation({
      query: (body) => ({
        url: 'track',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'savedTracks', id: 'LIST' }],
    }),
    deleteSavedTrack: build.mutation({
      query: (trackId) => ({
        url: `track/${trackId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'savedTracks', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetSavedTracksQuery,
  useSaveTrackMutation,
  useDeleteSavedTrackMutation,
} = savedTracksApi;
