import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBalance = createAsyncThunk("balance/fetchBalance", async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await fetch("https://take-home-test-api.nutech-integrasi.com/balance", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });
        const result = await response.json();

        if (result.status === 0) {
            return result.data.balance;
        } else {
            return rejectWithValue(result.message);
        }
    } catch (error) {
        return rejectWithValue("Network error");
    }
});

const balanceSlice = createSlice({
    name: "balance",
    initialState: { balance: 0, status: "idle", message: "" },
    reducers: {
        resetBalance: (state) => {
            state.balance = 0;
            state.status = "idle";
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalance.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.status = "success";
                state.balance = action.payload;
            })
            .addCase(fetchBalance.rejected, (state, action) => {
                state.status = "error";
                state.message = action.payload;
            });
    },
});

export const { resetBalance } = balanceSlice.actions;
export default balanceSlice.reducer;