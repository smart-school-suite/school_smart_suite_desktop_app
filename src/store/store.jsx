import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
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
import semesterTimetableReducer from "../Slices/Asynslices/semesterTimetableSlice";
import teacherReducer from "../Slices/teacher/teacherSlice";
import specialtyReducer from "../Slices/administrator/specialtySlice";
import departmentReducer from "../Slices/administrator/departmentSlice";
import schoolAdminReducer from "../Slices/administrator/schoolAdminSlice";
import hallReducer from "../Slices/administrator/hallSlice";
import courseReducer from "../Slices/administrator/courseSlice";
import semesterReducer from "../Slices/academics/semesterSlice";
import academicYearReducer from "../Slices/academics/academicYearSlice";
import gradeScaleReducer from "../Slices/academics/gradeScaleSlice";
import examReducer from "../Slices/exam/examSlice";
import studentReducer from "../Slices/student/studentSlice";
import parentReducer from "../Slices/student/parentSlice";
import studentBatchReducer from "../Slices/student/studentBatchSlice";
import tuitionFeeReducer from "../Slices/tuitionFee/tuitionFeeSlice";
import tuitionFeeTransactionReducer from "../Slices/finance/tuitionFeeTransacSlice";
import schoolExpenseReducer from "../Slices/finance/schoolExpenseSlice";
import registrationFeeReducer from "../Slices/finance/registrationFeeSlice";
import additionalFeeReducer from "../Slices/finance/additionalFeeSlice";
import activationCodeReducer from "../Slices/activationCode/activationCodeSlice";
import teacherSpecialtyReducer from "../Slices/teacher/teacherSpecialtySlice";
import teacherCourseReducer from "../Slices/teacher/teacherCourseSlice";
import teacherTimePrefReducer from "../Slices/teacher/teacherTimePrefSlice";
import jointCourseReducer from "../Slices/academics/jointCourseSlice";

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
  key: "theme",
  storage,
  whitelist: ["darkMode"],
};

const teacherPersistConfig = {
  key: "teachers",
  storage,
  whitelist: [
    "selectedTeachers",
    "rowCount",
    "searchText",
    "columns",
    "import",
  ],
  blacklist: ["isLoading", "error"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  theme: persistReducer(themePersistConfig, themeReducer),
  pricing: pricingReducer,
  timetable: timetableReducer,
  examtimetable: examtimetableReducer,
  studentScore: studentScoreReducer,
  specialtyTimetable: specialtyTimetableReducer,
  createCaScore: createCaScoreReducer,
  createExamScore: createExamScoreReducer,
  resitExamTimetable: resitExamTimetableReducer,
  createResitExamScore: createResitExamScoreReducer,
  announcement: announcementReducer,
  autoGenTimetable: autoGenTimetableSliceReducer,
  semesterTimetable: semesterTimetableReducer,
  teachers: persistReducer(teacherPersistConfig, teacherReducer),
  specialty: persistReducer({ key: "specialties", storage }, specialtyReducer),
  department: persistReducer({ key: "department", storage }, departmentReducer),
  student: persistReducer({ key: "student", storage }, studentReducer),
  parent: persistReducer({ key: "parent", storage }, parentReducer),
  studentBatch: persistReducer(
    { key: "studentBatch", storage },
    studentBatchReducer,
  ),
  tuitionFee: persistReducer({ key: "tuitionFee", storage }, tuitionFeeReducer),
  tuitionFeeTransaction: persistReducer(
    { key: "tuitionFeeTransaction", storage },
    tuitionFeeTransactionReducer,
  ),
  schoolExpense: persistReducer(
    { key: "schoolExpense", storage },
    schoolExpenseReducer,
  ),
  registrationFee: persistReducer(
    {
      key: "registrationFee",
      storage,
    },
    registrationFeeReducer,
  ),
  additionalFee: persistReducer(
    { key: "additionalFee", storage },
    additionalFeeReducer,
  ),
  activationCode: persistReducer(
    {
      key: "activationCode",
      storage,
    },
    activationCodeReducer,
  ),
  teacherSpecialty: persistReducer(
    {
      key: "teacherSpecialty",
      storage,
    },
    teacherSpecialtyReducer,
  ),
  teacherCourse: persistReducer(
    {
      key: "teacherCourse",
      storage,
    },
    teacherCourseReducer,
  ),
  teacherTimePref: persistReducer(
    {
      key: "teacherTimePref",
      storage,
    },
    teacherTimePrefReducer,
  ),
  jointCourse: persistReducer(
    {
      key: "jointCourse",
      storage,
    },
    jointCourseReducer,
  ),
  schoolAdmin: schoolAdminReducer,
  hall: hallReducer,
  course: courseReducer,
  semester: semesterReducer,
  academicYear: academicYearReducer,
  gradeScale: gradeScaleReducer,
  exam: examReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
