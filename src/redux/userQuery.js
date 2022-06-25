import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl:`https://musicjamserver.herokuapp.com`}),
    endpoints: (build) => ({
        getUser: build.query({
            query: () => `user`
        })
    })
});

export const {useGetUserQuery} = userApi;