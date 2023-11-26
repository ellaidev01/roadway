import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cookieToken } from "../../constants/constants";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const commonApiConfig = createApi({
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = cookieToken(0);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["GetVehicle", "PostVehicle"],
  endpoints: () => ({}),
});
