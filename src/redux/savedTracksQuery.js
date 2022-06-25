import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const savedTracksApi = createApi({
  reducerPath: "savedTracksApi",
  tagTypes: ["savedTracks"],
  baseQuery: fetchBaseQuery({ baseUrl: `https://musicjamserver.herokuapp.com` }),
  endpoints: (build) => ({
    getSavedTracks: build.query({
      query: () => "tracks",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "savedTracks", id })),
              { type: "savedTracks", id: "LIST" },
            ]
          : [{ type: "savedTracks", id: "LIST" }],
    }),
    saveTrack: build.mutation({
      query: (body) => ({
        url: "track",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "savedTracks", id: "LIST" }],
    }),
    deleteSavedTrack: build.mutation({
      query: (trackId) => ({
        url: `track/${trackId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "savedTracks", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSavedTracksQuery,
  useSaveTrackMutation,
  useDeleteSavedTrackMutation,
} = savedTracksApi;
