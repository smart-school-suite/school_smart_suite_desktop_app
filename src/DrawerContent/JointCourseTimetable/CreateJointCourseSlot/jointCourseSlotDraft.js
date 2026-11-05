import { createContext, useContext } from "react";

export const JointCourseSlotDraftContext = createContext(null);

export const useJointCourseSlotDraft = () => useContext(JointCourseSlotDraftContext);

export const SESSION_LENGTHS = [60, 90, 120, 150, 180, 240];
export const WEEK_DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"];

export const initialDraft = (course) => ({
  teacherId: course?.teachers?.length === 1 ? course.teachers[0].id : null,
  sessions: 1,
  duration: 120,
  days: [...WEEK_DAYS],
  hall: null,
  picks: [],
});

export const errorDescription = (error, fallback) =>
  error?.response?.data?.errors?.description ?? error?.response?.data?.message ?? fallback;
