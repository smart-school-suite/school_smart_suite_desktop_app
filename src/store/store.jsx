import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
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
import autoGenTimetableSliceReducer from "../Slices/Asynslices/AutoGenTimetableSlice";
import themeReducer from "../Slices/Asynslices/ThemeSlice";
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
    "schoolAuthData",
  ], 
};
const themePersistConfig = {
   key:"theme",
   storage,
   whitelist:[
     "darkMode"
   ]
}
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), 
  theme: persistReducer(themePersistConfig, themeReducer),
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
  autoGenTimetable:autoGenTimetableSliceReducer
});


export const store = configureStore({
  reducer: rootReducer,
});


export const persistor = persistStore(store);

setupListeners(store.dispatch);
