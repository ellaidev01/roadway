import { tokenApiSlice } from "../../api/tokenApiConfig";

export const signUpApi = tokenApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserTypeData: builder.query({
      query: () => ({
        url: `roadways/mstrdata?select=value&type=eq.utype&status=eq.1`,
        method: "GET",
      }),
      // providesTags: [],
    }),
    getCountriesData: builder.query({
      query: () => ({
        url: `roadways/countries`,
        method: "GET",
      }),
      // providesTags: [],
    }),
    getStatesData: builder.query({
      query: (data) => ({
        url: `roadways/states?country_code=eq.${data}`,
        method: "GET",
      }),
      // providesTags: [],
    }),
    getCitiesData: builder.query({
      query: (data) => ({
        url: `roadways/cities?state_code=eq.${data}`,
        method: "GET",
      }),
      // providesTags: [],
    }),
    signUp: builder.mutation({
      query: (inputData) => ({
        url: `/gord/insert`,
        method: "POST",
        body: inputData,
      }),
      // invalidatesTags: [""],
    }),
  }),
});

export const { useGetUserTypeDataQuery, useGetCitiesDataQuery, useGetCountriesDataQuery, useGetStatesDataQuery, useSignUpMutation } = signUpApi;
