import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTransactionHistory = createAsyncThunk(
    "transaction/fetchHistory",
    async ({ offset, limit }, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        if (!token) return rejectWithValue("Token tidak tersedia");

        try {
            const response = await fetch(
                `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${offset}&limit=${limit}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();
            if (result.status === 0) {
                return result.data;
            } else {
                return rejectWithValue(result.message);
            }
        } catch (error) {
            return rejectWithValue("Network Error");
        }
    }
);

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        records: [],
        offset: 0,
        limit: 5,
        status: "idle",
        error: null,
    },
    reducers: {
        resetTransactionState: (state) => {
            state.records = [];
            state.offset = 0;
            state.status = "idle";
            state.error = null;
        },
        resetTransactionHistory: (state) => {
            state.records = [];
            state.offset = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionHistory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.records = [...state.records, ...action.payload.records];
                state.offset += state.limit;
            })
            .addCase(fetchTransactionHistory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { resetTransactionState, resetTransactionHistory } = transactionSlice.actions;
export default transactionSlice.reducer;