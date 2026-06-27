import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://doctor-appointment-website-9j3t.onrender.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["News"],

  endpoints: (builder) => ({
    // Get all news
    getNews: builder.query({
      query: () => "news",
      providesTags: ["News"],
    }),

    // Get news by ID
    getNewsById: builder.query({
      query: (id) => `news/${id}`,
    }),

    // Add news (Admin)
    addNews: builder.mutation({
      query: (newsData) => ({
        url: "news",
        method: "POST",
        body: newsData,
      }),
      invalidatesTags: ["News"],
    }),

    // Update news (Admin)
    updateNews: builder.mutation({
      query: ({ id, ...newsData }) => ({
        url: `news/${id}`,
        method: "PUT",
        body: newsData,
      }),
      invalidatesTags: ["News"],
    }),

    // Delete news (Admin)
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `news/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetNewsByIdQuery,
  useAddNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;