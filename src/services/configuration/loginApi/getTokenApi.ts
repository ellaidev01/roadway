import { tokenApiSlice } from "../../api/tokenApiConfig";

export const getTokenApi = tokenApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: (inputData) => ({
        url: `auth/realms/roadwaysrealm/protocol/openid-connect/token`,
        method: "POST",
        body: inputData,
      }),
    }),
  }),
});

export const { useGetTokenMutation } = getTokenApi;


