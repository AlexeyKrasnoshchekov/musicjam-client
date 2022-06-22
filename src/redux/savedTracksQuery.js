import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const savedTracksApi = createApi({
    reducerPath: 'savedTracksApi',
    baseQuery: fetchBaseQuery({baseUrl:`http://localhost:8000`}),
    endpoints: (build) => ({
        getSavedTracks: build.query({
            query: () => 'tracks'
        }),
        saveTrack: build.mutation({
            query: (body) => ({
                url: 'track',
                method: 'POST',
                body,
            })
        }),
        deleteSavedTrack: build.mutation({
            query: (trackId) => ({
                url: `track/${trackId}`,
                method: 'DELETE'
            })
            
        }),
    })
});

export const {useGetSavedTracksQuery, useSaveTrackMutation, useDeleteSavedTrackMutation} = savedTracksApi;