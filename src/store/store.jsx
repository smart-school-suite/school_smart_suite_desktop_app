import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import academicYearReducer from "../Slices/academics/academicYearSlice";
import examResultReducer from "../Slices/academics/examResultSlice";
import gradeScaleReducer from "../Slices/academics/gradeScaleSlice";
import jointCourseReducer from "../Slices/academics/jointCourseSlice";
import semesterReducer from "../Slices/academics/semesterSlice";
import activationCodeReducer from "../Slices/activationCode/activationCodeSlice";
import activationCodeTransactionReducer from "../Slices/activationCode/activationCodeTransactionSlice";
import activationCodeUsageReducer from "../Slices/activationCode/activationCodeUsageSlice";
import studentActivationCodeReducer from "../Slices/activationCode/studentActivationCodeSlice";
import teacherActivationCodeReducer from "../Slices/activationCode/teacherActivationCodeSlice";
import additionalFeeBillingReducer from "../Slices/additionalFee/additionalFeeBillingSlice";
import additionalFeeCategoryReducer from "../Slices/additionalFee/additionalFeeCategorySlice";
import courseReducer from "../Slices/administrator/courseSlice";
import departmentReducer from "../Slices/administrator/departmentSlice";
import hallReducer from "../Slices/administrator/hallSlice";
import hallSpecialtyReducer from "../Slices/administrator/hallSpecialtySlice";
import schoolAdminReducer from "../Slices/administrator/schoolAdminSlice";
import specialtyReducer from "../Slices/administrator/specialtySlice";
import activeAnnouncementReducer from "../Slices/announcement/activeAnnouncementSlice";
import announcementCatReducer from "../Slices/announcement/announcementCatSlice";
import announcementReducer from "../Slices/announcement/announcementSlice";
import draftAnnouncementReducer from "../Slices/announcement/draftAnnouncementSlice";
import scheduledAnnouncementReducer from "../Slices/announcement/scheduledAnnouncementSlice";
import authReducer from "../Slices/Asynslices/AuthSlice";
import autoGenTimetableSliceReducer from "../Slices/Asynslices/AutoGenTimetableSlice";
import createCaScoreReducer from "../Slices/Asynslices/CaScoreSlice";
import createExamScoreReducer from "../Slices/Asynslices/ExamScoreSlice";
import examtimetableReducer from "../Slices/Asynslices/ExamTimetableSlice";
import resitExamTimetableReducer from "../Slices/Asynslices/ResitExamTimetableSlice";
import createResitExamScoreReducer from "../Slices/Asynslices/ResitScoreSlice";
import semesterTimetableReducer from "../Slices/Asynslices/semesterTimetableSlice";
import specialtyTimetableReducer from "../Slices/Asynslices/SpecialtyTimetableSlice";
import studentScoreReducer from "../Slices/Asynslices/StudentScoreSlice";
import pricingReducer from "../Slices/Asynslices/subcriptionPricingSlice";
import themeReducer from "../Slices/Asynslices/ThemeSlice";
import timetableReducer from "../Slices/Asynslices/TimetableSlice";
import electionApplicationReducer from "../Slices/election/electionApplicationSlice";
import electionCandidateReducer from "../Slices/election/electionCandidateSlice";
import electionRoleReducer from "../Slices/election/electionRoleSlice";
import electionReducer from "../Slices/election/electionSlice";
import electionTypeReducer from "../Slices/election/electionTypeSlice";
import examCandidateReducer from "../Slices/exam/examCandidateSlice";
import examInvigilatorReducer from "../Slices/exam/examInvigilatorSlice";
import examReducer from "../Slices/exam/examSlice";
import caEvaluationReducer from "../Slices/examEvaluation/caEvaluationSlice";
import examEvaluationReducer from "../Slices/examEvaluation/examEvaluationSlice";
import additionalFeeReducer from "../Slices/finance/additionalFeeSlice";
import registrationFeeReducer from "../Slices/finance/registrationFeeSlice";
import schoolExpenseReducer from "../Slices/finance/schoolExpenseSlice";
import tuitionFeeTransactionReducer from "../Slices/finance/tuitionFeeTransacSlice";
import semesterJointCourseReducer from "../Slices/jointCourse/semesterJointCourseSlice";
import registrationFeeTransactionReducer from "../Slices/registrationFee/registrationFeeTransacSlice";
import resitCandidateReducer from "../Slices/resit/resitCandidateSlice";
import resitEvaluationReducer from "../Slices/resit/resitEvaluationSlice";
import resitExamReducer from "../Slices/resit/resitExamSlice";
import resitReducer from "../Slices/resit/resitSlice";
import resitFeeReducer from "../Slices/resitFee/resitFeeSlice";
import resitFeeTransactionReducer from "../Slices/resitFee/resitFeeTransactionSlice";
import eventCategoryReducer from "../Slices/schoolEvent/eventCategorySlice";
import schoolEventReducer from "../Slices/schoolEvent/schoolEventSlice";
import expenseCategoryReducer from "../Slices/schoolExpense/expenseCategorySlice";
import parentReducer from "../Slices/student/parentSlice";
import studentBatchReducer from "../Slices/student/studentBatchSlice";
import studentReducer from "../Slices/student/studentSlice";
import teacherCourseReducer from "../Slices/teacher/teacherCourseSlice";
import teacherReducer from "../Slices/teacher/teacherSlice";
import teacherSpecialtyReducer from "../Slices/teacher/teacherSpecialtySlice";
import teacherTimePrefReducer from "../Slices/teacher/teacherTimePrefSlice";
import tuitionFeeScheduleReducer from "../Slices/tuitionFee/tuitionFeeScheduleSlice";
import tuitionFeeReducer from "../Slices/tuitionFee/tuitionFeeSlice";
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
  autoGenTimetable: autoGenTimetableSliceReducer,
  semesterTimetable: semesterTimetableReducer,
  teachers: persistReducer(teacherPersistConfig, teacherReducer),
  specialty: persistReducer({ key: "specialties", storage }, specialtyReducer),
  department: persistReducer({ key: "department", storage }, departmentReducer),
  student: persistReducer({ key: "student", storage }, studentReducer),
  parent: persistReducer({ key: "parent", storage }, parentReducer),
  resitExam: persistReducer({ key: "resitExam", storage }, resitExamReducer),
  examResult: persistReducer({ key: "examResult", storage }, examResultReducer),
  hallSpecialty: persistReducer(
    {
      key: "hallSpecialty",
      storage,
    },
    hallSpecialtyReducer,
  ),
  semesterJointCourse: persistReducer(
    { key: "semesterJointCourse", storage },
    semesterJointCourseReducer,
  ),
  electionApplication: persistReducer(
    {
      key: "electionApplication",
      storage,
    },
    electionApplicationReducer,
  ),
  schoolEvent: persistReducer(
    {
      key: "schoolEvent",
      storage,
    },
    schoolEventReducer,
  ),
  eventCategory: persistReducer(
    {
      key: "eventCategory",
      storage,
    },
    eventCategoryReducer,
  ),
  activeAnnouncement: persistReducer(
    { key: "activeAnnouncement", storage },
    activeAnnouncementReducer,
  ),
  draftAnnouncement:
    ({
      key: "draftAnnouncement",
      storage,
    },
    draftAnnouncementReducer),
  scheduledAnnouncement:
    ({
      key: "scheduledAnnouncement",
      storage,
    },
    scheduledAnnouncementReducer),
  election: persistReducer(
    {
      key: "election",
      storage,
    },
    electionReducer,
  ),
  announcement: persistReducer(
    { key: "announcement", storage },
    announcementReducer,
  ),
  electionCandidate: persistReducer(
    {
      key: "electionCandidate",
      storage,
    },
    electionCandidateReducer,
  ),
  electionType: persistReducer(
    {
      key: "electionType",
      storage,
    },
    electionTypeReducer,
  ),
  electionRole: persistReducer(
    {
      key: "electionRole",
      storage,
    },
    electionRoleReducer,
  ),
  activationCodeTransaction: persistReducer(
    {
      key: "activationCodeTransaction",
      storage,
    },
    activationCodeTransactionReducer,
  ),
  activationCodeUsage: persistReducer(
    {
      key: "activationCodeUsage",
      storage,
    },
    activationCodeUsageReducer,
  ),
  teacherActivationCode: persistReducer(
    {
      key: "teacherActivationCode",
      storage,
    },
    teacherActivationCodeReducer,
  ),
  studentActivationCode: persistReducer(
    {
      key: "studentActivationCode",
      storage,
    },
    studentActivationCodeReducer,
  ),
  additionalFeeCategory: persistReducer(
    {
      key: "additionalFeeCategory",
      storage,
    },
    additionalFeeCategoryReducer,
  ),
  additionalFeeBilling: persistReducer(
    { key: "additionalFeeBilling", storage },
    additionalFeeBillingReducer,
  ),
  registrationFeeTransaction: persistReducer(
    {
      key: "registrationFeeTransaction",
      storage,
    },
    registrationFeeTransactionReducer,
  ),
  studentBatch: persistReducer(
    { key: "studentBatch", storage },
    studentBatchReducer,
  ),
  resitCandidate: persistReducer(
    {
      key: "resitCandidate",
      storage,
    },
    resitCandidateReducer,
  ),
  tuitionFeeSchedule: persistReducer(
    {
      key: "tuitionFeeSchedule",
      storage,
    },
    tuitionFeeScheduleReducer,
  ),
  resit: persistReducer({ key: "resit", storage }, resitReducer),
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
  caEvaluation: persistReducer(
    {
      key: "caEvalutation",
      storage,
    },
    caEvaluationReducer,
  ),
  resitEvaluation: persistReducer(
    {
      key: "resitEvaluation",
      storage,
    },
    resitEvaluationReducer,
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
  examCandidate: persistReducer(
    {
      key: "examCandidate",
      storage,
    },
    examCandidateReducer,
  ),
  examEvaluation: persistReducer(
    {
      key: "examEvaluation",
      storage,
    },
    examEvaluationReducer,
  ),
  examInvigilator: persistReducer(
    {
      key: "examInvigilator",
      storage,
    },
    examInvigilatorReducer,
  ),
  announcementCategory: persistReducer(
    {
      key: "announcementCategory",
      storage,
    },
    announcementCatReducer,
  ),
  expenseCategory: persistReducer(
    {
      key: "expenseCategory",
      storage,
    },
    expenseCategoryReducer,
  ),
  resitFee: persistReducer(
    {
      key: "resitFee",
      storage,
    },
    resitFeeReducer,
  ),
  resitFeeTransaction: persistReducer(
    {
      key: "resitFeeTransaction",
      storage,
    },
    resitFeeTransactionReducer,
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
      immutableCheck: { warnAfter: 1000 },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
