import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    media: [],
    loading: false,
};

const mediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
        setMedia: (state, action) => {
            state.media = action.payload;
        },
        addMedia: (state, action) => {
            state.media.push(action.payload);
        },
        deleteMedia: (state, action) => {
            state.media = state.media.filter((item) => item.id !== action.payload);
        },
    },
});

export const { setMedia, addMedia, deleteMedia } = mediaSlice.actions;

export const fetchMedia = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token') || ""
        const res = await axios.get(import.meta.env.VITE_BACKEND_BASE_URL + "/api/media", {
            headers: {
                'Authorization': token,
            }
        });
        console.log('media response', res.data);
        dispatch(setMedia(res.data.files));
    } catch (error) {
        console.error(error);
    }
};

export default mediaSlice.reducer;
