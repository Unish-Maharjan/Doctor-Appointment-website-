import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
  reducerPath: "doctorApi",
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

  tagTypes: ["Doctor"],

  endpoints: (builder) => ({
    // Get all doctors
    getDoctors: builder.query({
      query: () => "doctors",
      providesTags: ["Doctor"],
    }),

    // Get doctor by ID
    getDoctorById: builder.query({
      query: (id) => `doctors/${id}`,
    }),

    // Add doctor (Admin)
    addDoctor: builder.mutation({
      query: (doctorData) => ({
        url: "doctors",
        method: "POST",
        body: doctorData,
      }),
      invalidatesTags: ["Doctor"],
    }),

    // Update doctor (Admin)
    updateDoctor: builder.mutation({
      query: ({ id, ...doctorData }) => ({
        url: `doctors/${id}`,
        method: "PUT",
        body: doctorData,
      }),
      invalidatesTags: ["Doctor"],
    }),

    // Delete doctor (Admin)
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `doctors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Doctor"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;