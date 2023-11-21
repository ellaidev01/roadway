import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer/reducer";
import { tokenApiSlice } from "../services/api/tokenApiConfig";
import { commonApiConfig } from "../services/api/commonApiConfig";

export const store = configureStore({
  reducer: {
    ...rootReducer,
    [tokenApiSlice.reducerPath]: tokenApiSlice.reducer,
    [commonApiConfig.reducerPath]: commonApiConfig.reducer
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tokenApiSlice.middleware, commonApiConfig.middleware),
});


export type RootStateType = ReturnType<typeof store.getState>;

export type AppDispatchType = typeof store.dispatch;
