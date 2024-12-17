import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { apiSlice } from "../Slices/Asynslices/fetchSlice";
import { postSlice } from "../Slices/Asynslices/postSlice";
import { updateSlice } from "../Slices/Asynslices/updateSlice";
import { deleteSlice } from "../Slices/Asynslices/deleteSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({ 
    [apiSlice.reducerPath]: apiSlice.reducer,
    [postSlice.reducerPath]: postSlice.reducer,
    [updateSlice.reducerPath]: updateSlice.reducer,
    [deleteSlice.reducerPath]: deleteSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware,  postSlice.middleware, updateSlice.middleware, deleteSlice.middleware), 
});

setupListeners(store.dispatch);