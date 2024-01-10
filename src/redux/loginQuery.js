import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const loginApi = createApi({
    reducerPath: 'loginApi',
    // baseQuery: fetchBaseQuery({baseUrl:`http://localhost:8000`}),
    baseQuery: fetchBaseQuery({baseUrl:`https://musicjam-server.vercel.app/`}),
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
