import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    password: "",
    token: sessionStorage.getItem("token") || null,
    status: null,
    message: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.status = 0;
            state.message = "Login Sukses";
            sessionStorage.setItem("token", action.payload.token);
        },
        loginFail: (state, action) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
        },
        logout: (state) => {
            state.token = null;
            state.status = null;
            state.message = "";
            sessionStorage.removeItem("token");
        },
    },
});

export const { updateField, loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;