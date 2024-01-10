import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    // baseQuery: fetchBaseQuery({baseUrl:`http://localhost:8000`}),
    baseQuery: fetchBaseQuery({baseUrl:`https://musicjam-server.vercel.app`}),
    endpoints: (build) => ({
        getUser: build.query({
            query: () => ({
                url: `user`,
                mode: 'no-cors'
            })
        })
    })
});

export const {useGetUserQuery} = userApi;
