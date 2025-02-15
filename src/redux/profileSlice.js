import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Token tidak tersedia");

    try {
        const response = await fetch("https://take-home-test-api.nutech-integrasi.com/profile", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();
        if (result.status === 0) {
            return result.data;
        } else {
            return rejectWithValue(result.message);
        }
    } catch (error) {
        return rejectWithValue("Network Error");
    }
});

export const updateProfile = createAsyncThunk("profile/updateProfile", async (profileData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue("Token tidak tersedia");

    try {
        const response = await fetch("https://take-home-test-api.nutech-integrasi.com/profile/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });

        const result = await response.json();
        if (result.status === 0) {
            return result.data;
        } else {
            return rejectWithValue(result.message);
        }
    } catch (error) {
        return rejectWithValue("Network Error");
    }
});

export const updateProfileImage = createAsyncThunk(
    "profile/updateImage",
    async (file, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        if (!token) return rejectWithValue("Token tidak tersedia");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/profile/image", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (result.status === 0) {
                return result.data.profile_image;
            } else {
                return rejectWithValue(result.message);
            }
        } catch (error) {
            return rejectWithValue("Network Error");
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        email: "",
        first_name: "",
        last_name: "",
        profile_image: "",
        status: null,
        message: "",
    },
    reducers: {
        resetProfile: (state) => {
            state.email = "";
            state.first_name = "";
            state.last_name = "";
            state.profile_image = "";
            state.status = null;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = "success";
                state.email = action.payload.email;
                state.first_name = action.payload.first_name;
                state.last_name = action.payload.last_name;
                state.profile_image = action.payload.profile_image;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = "error";
                state.message = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.status = "updating";
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = "success";
                state.first_name = action.payload.first_name;
                state.last_name = action.payload.last_name;
                state.message = "Profil berhasil diperbarui!";
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = "error";
                state.message = action.payload;
            })
            .addCase(updateProfileImage.fulfilled, (state, action) => {
                state.profile_image = action.payload;
            });
    },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;