import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {  CreateOrderResponse, Order } from '@/types/order';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL+'orders' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => '',
      providesTags: ['Order'],
    }),
    getOrderById: builder.query<Order, string>({
      query: (id) => id,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
   createOrder: builder.mutation<CreateOrderResponse, Omit<Order, 'id'>>({
      query: (orderData) => ({
        url: '', 
        method: 'POST',
        headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(orderData),
      }),
      invalidatesTags: ['Order'], 
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderByIdQuery, useCreateOrderMutation } = orderApi;