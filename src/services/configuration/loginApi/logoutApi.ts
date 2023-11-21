import { tokenApiSlice } from "../../api/tokenApiConfig";

export const getTokenApi = tokenApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation({
            query: (inputData) => ({
                url: `https://api.teckiko.com/auth/realms/roadwaysrealm/protocol/openid-connect/logout`,
                method: "POST",
                body:inputData
            }),
        }),
    }),
});

export const { useLogoutMutation } = getTokenApi;

