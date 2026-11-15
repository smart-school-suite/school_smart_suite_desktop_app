import { makeJointCourseHooks } from "../examJointCourseTimetable";
import { RESIT_TIMETABLE_KEYS } from "../resitTimetableGeneration";
import {
  confirmResitJointCourseTime,
  generateResitJointCourseTimes,
  getResitJointCourseTerm,
  getResitJointCourseTerms,
  removeResitJointCourseTime,
  syncResitJointCourses,
} from "../../services/resitJointCourseTimetable";

export const RESIT_JOINT_TERMS_KEY = "resit-joint-course-terms";
export const RESIT_JOINT_TERM_KEY = "resit-joint-course-term";

export const resitJointCourseHooks = makeJointCourseHooks(
  {
    getTerms: getResitJointCourseTerms,
    getTerm: getResitJointCourseTerm,
    generate: generateResitJointCourseTimes,
    confirm: confirmResitJointCourseTime,
    remove: removeResitJointCourseTime,
    sync: syncResitJointCourses,
  },
  { termsKey: RESIT_JOINT_TERMS_KEY, termKey: RESIT_JOINT_TERM_KEY, schedulingDataKey: RESIT_TIMETABLE_KEYS.schedulingData },
  { Noun: "Joint Resit", noun: "joint resit", owners: "resit exam(s)" },
);
