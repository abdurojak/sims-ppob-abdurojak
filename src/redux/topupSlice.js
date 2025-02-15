import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const topUp = createAsyncThunk("topUp/topUpAmount", async (amount, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Ambil token dari Redux state
    if (!token) return rejectWithValue("Token tidak tersedia");

    try {
        const response = await fetch("https://take-home-test-api.nutech-integrasi.com/topup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ top_up_amount: amount }),
        });

        const data = await response.json();
        if (data.status !== 0) {
            return rejectWithValue(data);
        }

        return data;
    } catch (error) {
        return rejectWithValue("Network Error");
    }
});


const topUpSlice = createSlice({
    name: "topUp",
    initialState: {
        status: "idle",
        message: "",
        data: null,
    },
    reducers: {
        resetTopUpState: (state) => {
            state.status = "idle";
            state.message = "";
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(topUp.pending, (state) => {
                state.status = "loading";
            })
            .addCase(topUp.fulfilled, (state, action) => {
                state.status = "success";
                state.message = action.payload.message;
                state.data = action.payload.data;
            })
            .addCase(topUp.rejected, (state, action) => {
                state.status = "error";
                state.message = action.payload.message;
            });
    },
});

export const { resetTopUpState } = topUpSlice.actions;
export default topUpSlice.reducer;