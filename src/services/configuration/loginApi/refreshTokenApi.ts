import { tokenApiSlice } from "../../api/tokenApiConfig";

export const getTokenApi = tokenApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRefreshToken: builder.mutation({
            query: (inputData) => ({
                url: `auth/realms/roadwaysrealm/protocol/openid-connect/token`,
                method: "POST",
                body: inputData
            }),
        }),
    }),
});

export const { useGetRefreshTokenMutation } = getTokenApi;


// const inputData: InputData = {
//     grant_type: "refresh_token",
//     client_id: "roadwaysclient",
//     client_secret: "hQuKg2etb6uWTXA1ri6lryfSSXkfksXR",
//     refresh_token: accessTokenstring
//   };
