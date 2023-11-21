import { commonApiConfig } from "../../api/commonApiConfig";

export const verifyOTPApi = commonApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    verifyOTP: builder.mutation({
      query: (inputData) => ({
        url: `/gord/verifyotp`,
        method: "POST",
        body: inputData,
      }),
      // invalidatesTags: [""],
    }),
  }),
});

export const { useVerifyOTPMutation } = verifyOTPApi;
