import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
    reducerPath: 'loginApi',
    baseQuery: fetchBaseQuery({baseUrl:`https://musicjamserver.herokuapp.com`}),
    endpoints: (build) => ({
        getUrl: build.query({
            query: () => `login`
        }),
        getToken: build.query({
            query: (code) => `callback${code}`
        })
    })
});

export const {useGetUrlQuery, useGetTokenQuery} = loginApi;