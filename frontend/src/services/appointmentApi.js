import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
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

  tagTypes: ["Appointment"],

  endpoints: (builder) => ({
    // Create appointment
    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: "appointments",
        method: "POST",
        body: appointmentData,
      }),
      invalidatesTags: ["Appointment"],
    }),

    // Get logged-in user's appointments
    getMyAppointments: builder.query({
      query: () => "appointments/my",
      providesTags: ["Appointment"],
    }),

    // Get all appointments (Admin)
    getAllAppointments: builder.query({
      query: () => "appointments",
      providesTags: ["Appointment"],
    }),

    // Update appointment status (Admin)
    updateAppointmentStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `appointments/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Appointment"],
    }),

    // Cancel appointment
    cancelAppointment: builder.mutation({
      query: (id) => ({
        url: `appointments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Appointment"],
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetMyAppointmentsQuery,
  useGetAllAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
  useCancelAppointmentMutation,
} = appointmentApi;