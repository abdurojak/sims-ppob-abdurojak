import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchServices = createAsyncThunk("service/fetchServices", async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await fetch("https://take-home-test-api.nutech-integrasi.com/services", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();

        if (result.status === 0) {
            return result.data;
        } else {
            return rejectWithValue(result.message);
        }
    } catch (error) {
        return rejectWithValue("Network error");
    }
});

const serviceSlice = createSlice({
    name: "service",
    initialState: { services: [], status: "idle", message: "" },
    reducers: {
        resetServices: (state) => {
            state.services = [];
            state.status = "idle";
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.status = "success";
                state.services = action.payload;
            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.status = "error";
                state.message = action.payload;
            });
    },
});

export const { resetServices } = serviceSlice.actions;
export default serviceSlice.reducer;