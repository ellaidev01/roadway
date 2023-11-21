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
        availableSubscription: builder.mutation({
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
            query: () => ({
                url: `roadways/vmodels?vtypeid=eq.1&vbrandid=eq.1`,
                method: "GET",
            }),
            // providedTags: [""],
        }),
        addVehicle: builder.mutation({
            query: (inputData) => ({
                url: `roadways/vehicles`,
                method: "POST",
                body: inputData
            }),
            // invalidatesTags: [""],
        }),
    }),
  
});

export const { useGetServiceTypeQuery, useAvailableSubscriptionMutation, useAddServiceCitiesMutation,useGetAddedVehicleQuery, useAddVehicleMutation, useGetVehicleBrandQuery,useGetVehicleModelQuery, useGetVehicleTypeQuery } = serviceApi;
