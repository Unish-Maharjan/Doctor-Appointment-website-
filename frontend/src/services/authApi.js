import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
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

  endpoints: (builder) => ({
    // Register
    register: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Get profile (protected)
    getProfile: builder.query({
      query: () => "auth/profile",
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
} = authApi;