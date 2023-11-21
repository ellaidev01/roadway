import { tokenApiSlice } from "../../api/tokenApiConfig";

export const getUserByMobileApi = tokenApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserByMobile: builder.query({
            query: (mobile) => ({
                url: `roadways/users?select=name,uniqueid,usertype,idnumber&mobile=eq.${mobile}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetUserByMobileQuery } = getUserByMobileApi;


