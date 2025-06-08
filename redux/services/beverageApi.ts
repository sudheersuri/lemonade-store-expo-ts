import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Beverage } from '@/types/beverage';

// Define our API service
export const beverageApi = createApi({
  reducerPath: 'beverageApi',
  baseQuery: fetchBaseQuery({ baseUrl:  process.env.EXPO_PUBLIC_API_URL+'beverages'}),
  tagTypes: ['Beverage'],
  endpoints: (builder) => ({
    getBeverages: builder.query<Beverage[], void>({
      query: () => '',
      providesTags: ['Beverage'],
    }),
    getBeverageById: builder.query<Beverage, string>({
      query: (id) =>  id,
      providesTags: (result, error, id) => [{ type: 'Beverage', id }],
    }),
  }),
});

export const { useGetBeveragesQuery, useGetBeverageByIdQuery } = beverageApi;