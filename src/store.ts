import { configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetPostsRequest, GetPostsResponse } from './types/posts';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (build) => ({
    posts: build.query<GetPostsResponse, GetPostsRequest>({
      query: (params) => ({ url: '/posts', params }),
    }),
  }),
});

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddelware) =>
    getDefaultMiddelware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
