import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const billingApi = createApi({
  reducerPath: "billingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "https://doctor-appointment-website-9j3t.onrender.com/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Invoice", "Payment", "Stats", "AuditLog"],

  endpoints: (builder) => ({
    // Patient: fetch own invoices
    getMyInvoices: builder.query({
      query: () => "billing/my",
      providesTags: ["Invoice"],
    }),

    // Fetch invoice by ID (patient or admin)
    getInvoiceById: builder.query({
      query: (id) => `billing/${id}`,
      providesTags: (result, error, id) => [{ type: "Invoice", id }],
    }),

    // Admin: fetch all invoices with optional query params
    getAllInvoices: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params || {}).toString();
        return queryParams ? `billing?${queryParams}` : "billing";
      },
      providesTags: ["Invoice"],
    }),

    // Admin: billing & revenue statistics
    getBillingStats: builder.query({
      query: () => "billing/stats/dashboard",
      providesTags: ["Stats", "Invoice", "Payment"],
    }),

    // Admin: create manual invoice
    createInvoice: builder.mutation({
      query: (invoiceData) => ({
        url: "billing",
        method: "POST",
        body: invoiceData,
      }),
      invalidatesTags: ["Invoice", "Stats"],
    }),

    // Generate invoice from appointment
    generateFromAppointment: builder.mutation({
      query: (appointmentId) => ({
        url: `billing/generate-from-appointment/${appointmentId}`,
        method: "POST",
      }),
      invalidatesTags: ["Invoice", "Stats"],
    }),

    // Admin: update invoice
    updateInvoice: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `billing/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Invoice", "Stats", { type: "Invoice", id }],
    }),

    // Admin: cancel invoice
    cancelInvoice: builder.mutation({
      query: (id) => ({
        url: `billing/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Invoice", "Stats"],
    }),

    // Process Demo Payment
    processPayment: builder.mutation({
      query: (paymentData) => ({
        url: "payments/pay",
        method: "POST",
        body: paymentData,
      }),
      invalidatesTags: ["Invoice", "Payment", "Stats"],
    }),

    // Admin: get all payments
    getAllPayments: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params || {}).toString();
        return queryParams ? `payments?${queryParams}` : "payments";
      },
      providesTags: ["Payment"],
    }),

    // Patient: get my payment transactions
    getMyPayments: builder.query({
      query: () => "payments/my",
      providesTags: ["Payment"],
    }),

    // Admin: refund payment
    refundPayment: builder.mutation({
      query: ({ id, reason }) => ({
        url: `payments/${id}/refund`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["Invoice", "Payment", "Stats"],
    }),

    // Admin: audit logs
    getAuditLogs: builder.query({
      query: () => "billing/audit-logs",
      providesTags: ["AuditLog"],
    }),
  }),
});

export const {
  useGetMyInvoicesQuery,
  useGetInvoiceByIdQuery,
  useGetAllInvoicesQuery,
  useGetBillingStatsQuery,
  useCreateInvoiceMutation,
  useGenerateFromAppointmentMutation,
  useUpdateInvoiceMutation,
  useCancelInvoiceMutation,
  useProcessPaymentMutation,
  useGetAllPaymentsQuery,
  useGetMyPaymentsQuery,
  useRefundPaymentMutation,
  useGetAuditLogsQuery,
} = billingApi;
