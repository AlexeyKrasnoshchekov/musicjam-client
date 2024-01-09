import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const searchApi = createApi({
    reducerPath: 'searchApi',
    // baseQuery: fetchBaseQuery({baseUrl:`http://localhost:8000`}),
    baseQuery: fetchBaseQuery({baseUrl:`https://musicjam-server.vercel.app`}),
    endpoints: (build) => ({
        getSearch: build.query({
            query: (term) => `search/${term}`
        })
    })
});

export const {useGetSearchQuery} = searchApi;
