import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/products/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/allProducts",
      providesTags: ["Post"],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
