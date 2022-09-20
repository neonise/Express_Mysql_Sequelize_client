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

    addNewProduct: builder.mutation({
      query: (payload) => ({
        url: "/addProduct",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),

    updateProduct: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Post"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        //credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useAddNewProductMutation,
  useUpdateProductMutation,
} = productApi;
