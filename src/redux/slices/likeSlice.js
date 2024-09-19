import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likes: localStorage.getItem("likes")?.split(",") || [],
}

const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers:  {
        addLike: (state, action) => {
            state.likes.push(action.payload);
            localStorage.setItem("likes",state.likes);  

        },
        removeLike: (state, action) => {
            state.likes = state.likes.filter((like) => like !== action.payload);
            localStorage.setItem("likes",state.likes);
        }
    }
})

export const { addLike, removeLike } = likeSlice.actions;
export default likeSlice.reducer;
