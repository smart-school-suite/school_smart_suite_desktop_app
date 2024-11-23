// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { apiSlice } from "../Slices/Asynslices/fetchSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({ 
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware), 
});

setupListeners(store.dispatch);