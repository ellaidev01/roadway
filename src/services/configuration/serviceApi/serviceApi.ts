import { commonApiConfig } from "../../api/commonApiConfig";

export const serviceApi = commonApiConfig.injectEndpoints({
    endpoints: (builder) => ({
        getServiceType: builder.query({
            query: () => ({
                url: `roadways/mstrdata?type=eq.ServiceType&status=eq.1`,
                method: "GET",
            }),
            // providedTags: [""],
        }),
        activateSubscription: builder.mutation({
            query: (inputData) => ({
                url: `roadways/rpc/upsert_subsr`,
                method: "POST",
                body: inputData
            }),
            // invalidatesTags: [""],
        }),

        addServiceCities: builder.mutation({
            query: (inputData) => ({
                url: `roadways/srvcities`,
                method: "POST",
                body: inputData
            }),
            // invalidatesTags: [""],
        }),
        getAddedVehicle: builder.query({
            query: () => ({
                url: `roadways/vehicles`,
                method: "GET",
            }),
            // providedTags: [""],
        }),
        getVehicleBrand: builder.query({
            query: () => ({
                url: `roadways/brands`,
                method: "GET",
            }),
            // providedTags: [""],
        }),
        getVehicleType: builder.query({
            query: () => ({
                url: `roadways/vehicletypes`,
                method: "GET",
            }),
            // providedTags: [""],
        }),
        getVehicleModel: builder.query({
            query: ({ vtype, vbrand }) => ({
                url: `roadways/vmodels?vtypeid=eq.${vtype}&vbrandid=eq.${vbrand}`,
                method: "GET",
            }),
            providesTags: ["GetVehicle"],
        }),
        addVehicle: builder.mutation({
            query: (inputData) => ({
                url: `roadways/vehicles`,
                method: "POST",
                body: inputData
            }),
            invalidatesTags: ["PostVehicle"],
        }),
    }),
});

export const { useGetServiceTypeQuery, useActivateSubscriptionMutation, useAddServiceCitiesMutation, useGetAddedVehicleQuery, useAddVehicleMutation, useGetVehicleBrandQuery, useGetVehicleModelQuery, useGetVehicleTypeQuery } = serviceApi;
