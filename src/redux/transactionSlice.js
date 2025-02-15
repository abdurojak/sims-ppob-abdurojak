import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const makeTransaction = createAsyncThunk(
    "transaction/makeTransaction",
    async (service_code, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        if (!token) return rejectWithValue("Token tidak tersedia");
        try {
            const response = await fetch("https://take-home-test-api.nutech-integrasi.com/transaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ service_code })
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data);
            }

            return data;
        } catch (error) {
            return rejectWithValue({ status: 500, message: "Terjadi kesalahan server" });
        }
    }
);

const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        status: null,
        message: "",
        data: null
    },
    reducers: {
        resetTransaction: (state) => {
            state.status = null;
            state.message = "";
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(makeTransaction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(makeTransaction.fulfilled, (state, action) => {
                state.status = "success";
                state.message = action.payload.message;
                state.data = action.payload.data;
            })
            .addCase(makeTransaction.rejected, (state, action) => {
                state.status = "error";
                state.message = action.payload.message;
                state.data = null;
            });
    }
});

export const { resetTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;