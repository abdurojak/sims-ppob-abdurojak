import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counterSlice";
import registerReducer from "../redux/registerSlice";
import authReducer from "../redux/authSlice";
import profileReducer from "../redux/profileSlice";
import balanceReducer from "../redux/balanceSlice";
import bannerReducer from "../redux/bannerSlice";
import serviceReducer from "../redux/serviceSlice";
import topUpReducer from "../redux/topupSlice";
import transactionHistoryReducer from "../redux/transactionHistorySlice";
import transactionReducer from "../redux/transactionSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        register: registerReducer,
        auth: authReducer,
        profile: profileReducer,
        balance: balanceReducer,
        banner: bannerReducer,
        service: serviceReducer,
        topUp: topUpReducer,
        transactionHistory: transactionHistoryReducer,
        transaction: transactionReducer
    },
});