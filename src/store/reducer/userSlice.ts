import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

export const setAuthorizationHeader = (token: string | null) => {
    api.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
};

export const getUserByMobileRequest = createAsyncThunk(
    "user/getUser",
    async (mobileNo: string, thunkAPI) => {
        try {
            const res = await api.get(`/roadways/users?select=name,uniqueid,usertype,idnumber&mobile=eq.${mobileNo}`);
            const data = res.data;
            return data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // If it's an AxiosError, you can access the response and narrow down the type
                const error = err.response?.data?.error || "Unknown error";
                return thunkAPI.rejectWithValue(error);
            } else {
                // If it's not an AxiosError, you can handle it as you see fit
                return thunkAPI.rejectWithValue("Unknown error");
            }
        }
    }
);

interface userState {
    loading: boolean;
    userType: string | null;
    err: string | null;
    data: null;
}

const getUserSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        err: null,
        data: null,
    } as userState,

    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(getUserByMobileRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserByMobileRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                const userType = action?.payload[0]?.usertype;

                if (userType === "Service Provider") {
                    localStorage.setItem("username", action.payload[0]?.name);
                    localStorage.setItem("user", action.payload[0]?.uniqueid);
                }
            })
            .addCase(getUserByMobileRequest.rejected, (state, action) => {
                state.err = action.payload as string;
                state.loading = false;
            })
    },
});

export type UserReducer = ReturnType<typeof getUserSlice.reducer>;

export default getUserSlice.reducer;

