import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const savedTracksApi = createApi({
    reducerPath: 'savedTracksApi',
    baseQuery: fetchBaseQuery({baseUrl:`http://localhost:8000`}),
    endpoints: (build) => ({
        getSavedTracks: build.query({
            query: () => 'track'
        }),
        saveTrack: build.mutation({
            query: (body) => ({
                url: 'track',
                method: 'POST',
                body,
            })
        }),
    })
});

export const {useGetSavedTracksQuery, useSaveTrackMutation} = savedTracksApi;