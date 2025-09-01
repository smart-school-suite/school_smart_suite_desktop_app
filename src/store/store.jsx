import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { apiSlice } from "../Slices/Asynslices/fetchSlice";
import { postSlice } from "../Slices/Asynslices/postSlice";
import { updateSlice } from "../Slices/Asynslices/updateSlice";
import { deleteSlice } from "../Slices/Asynslices/deleteSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import authReducer from "../Slices/Asynslices/AuthSlice";
import pricingReducer from "../Slices/Asynslices/subcriptionPricingSlice";
import timetableReducer from "../Slices/Asynslices/TimetableSlice";
import examtimetableReducer from "../Slices/Asynslices/ExamTimetableSlice";
import studentScoreReducer from "../Slices/Asynslices/StudentScoreSlice";
import specialtyTimetableReducer from "../Slices/Asynslices/SpecialtyTimetableSlice";
import createCaScoreReducer from "../Slices/Asynslices/CaScoreSlice";
import createExamScoreReducer from "../Slices/Asynslices/ExamScoreSlice";
import resitExamTimetableReducer from "../Slices/Asynslices/ResitExamTimetableSlice";
import createResitExamScoreReducer from "../Slices/Asynslices/ResitScoreSlice";
import announcementReducer from "../Slices/Asynslices/AnnouncementSlice";
import appSettingReducer  from "../Slices/Asynslices/AppSetting";
import autoGenTimetableSliceReducer from "../Slices/Asynslices/AutoGenTimetableSlice";
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: [
    "isAuthenticated", 
    "user", 
    "token", 
    "otpTokenHeader",
    "apiKey",
    "passwordResetOtpToken",
    "passwordResetToken",
    "schoolAuthData"
  ], 
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [postSlice.reducerPath]: postSlice.reducer,
  [updateSlice.reducerPath]: updateSlice.reducer,
  [deleteSlice.reducerPath]: deleteSlice.reducer,
  auth: persistReducer(authPersistConfig, authReducer), 
  pricing: pricingReducer,
  timetable: timetableReducer,
  examtimetable: examtimetableReducer,
  studentScore: studentScoreReducer,
  specialtyTimetable: specialtyTimetableReducer,
  createCaScore:createCaScoreReducer,
  createExamScore:createExamScoreReducer,
  resitExamTimetable:resitExamTimetableReducer,
  createResitExamScore:createResitExamScoreReducer,
  announcement:announcementReducer,
  appSetting:appSettingReducer,
  autoGenTimetable:autoGenTimetableSliceReducer
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      apiSlice.middleware,
      postSlice.middleware,
      updateSlice.middleware,
      deleteSlice.middleware
    ),
});


export const persistor = persistStore(store);

setupListeners(store.dispatch);
