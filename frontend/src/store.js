import { configureStore } from "@reduxjs/toolkit";



import { authApi } from "./services/authApi";
import { doctorApi } from "./services/doctorApi";
import { newsApi } from "./services/newsApi";
import { appointmentApi } from "./services/appointmentApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      doctorApi.middleware,
      newsApi.middleware,
      appointmentApi.middleware
    ),
});