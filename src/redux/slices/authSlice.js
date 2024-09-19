import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:  {
        signUp: (state, action) => {
            state.token = action.payload.token
            localStorage.setItem("token", state.token)
        },
        logIn: (state, action) => {
            state.token = action.payload.token
            localStorage.setItem("token", state.token)
        },
        logOut: (state) => {
            state.token = null
            localStorage.removeItem("token");
        }
    }
})

export const {signUp, logIn, logOut} = authSlice.actions;
export default authSlice.reducer