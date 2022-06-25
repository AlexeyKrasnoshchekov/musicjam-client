import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({baseUrl:`https://musicjamserver.herokuapp.com`}),
    endpoints: (build) => ({
        getSearch: build.query({
            query: (term) => `search/${term}`
        })
    })
});

export const {useGetSearchQuery} = searchApi;