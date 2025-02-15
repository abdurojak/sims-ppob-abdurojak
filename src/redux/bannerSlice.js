import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBanners = createAsyncThunk("banner/fetchBanners", async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
        const response = await fetch("https://take-home-test-api.nutech-integrasi.com/banner", {
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

const bannerSlice = createSlice({
    name: "banner",
    initialState: { banners: [], status: "idle", message: "" },
    reducers: {
        resetBanners: (state) => {
            state.banners = [];
            state.status = "idle";
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanners.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.status = "success";
                state.banners = action.payload;
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.status = "error";
                state.message = action.payload;
            });
    },
});

export const { resetBanners } = bannerSlice.actions;
export default bannerSlice.reducer;