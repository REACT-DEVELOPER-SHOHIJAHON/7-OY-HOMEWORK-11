import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { api } from "../api";
import likeReducer from "../slices/likeSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        like: likeReducer,
        [api.reducerPath] : api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})