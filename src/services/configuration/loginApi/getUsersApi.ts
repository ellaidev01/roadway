import { tokenApiSlice } from "../../api/tokenApiConfig";

export const getUsersApi = tokenApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: `roadways/users`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUsersQuery } = getUsersApi;


