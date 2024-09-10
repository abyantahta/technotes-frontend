import { configureStore } from "@reduxjs/toolkit";
import {apiSlice} from './api/apiSlice'
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authReducer,
    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware), 
    devtools: false //kalo mau dipublish di false in dulu, kalo mode dev boleh di true
})

setupListeners(store.dispatch)