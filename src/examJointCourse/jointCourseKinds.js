import { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import { useGetExams } from "../hooks/exam/useGetExams";
import { examJointCourseHooks } from "../hooks/examJointCourseTimetable";
import { resitJointCourseHooks } from "../hooks/resitJointCourseTimetable";
import { useGetAllResitExams } from "../hooks/resitExam/useGetResitExams";
import { setExamJointCourseTerm, setSelectedExamJointCourse } from "../Slices/ExamJointCourse/examJointCourseTimetableSlice";
import { resitJointCourseTimetableActions } from "../Slices/ResitJointCourse/resitJointCourseTimetableSlice";

/**
 * A joint course timetable: exams shared by several specialties, or resits
 * several specialties sit. Both use the same page, components and API shapes;
 * a kind says which hooks, state and words they use.
 */
export const EXAM_JOINT_COURSE_KIND = Object.freeze({
  id: "exam",
  stateKey: "examJointCourseTimetable",
  hooks: examJointCourseHooks,
  actions: { setTerm: setExamJointCourseTerm, setSelected: setSelectedExamJointCourse },
  // Exams to link to their joint exams with "Find joint exams".
  useSyncIds: () => {
    const { data } = useGetExams();
    return (data?.data ?? []).filter((exam) => exam.exam_type !== "resit").map((exam) => exam.id);
  },
  copy: {
    listTitle: "Joint exams",
    find: "Find joint exams",
    finding: "Finding joint exams…",
    findHint: "Links every exam to the courses it shares with other specialties. New exams are linked when they are created.",
    search: "Find a joint exam",
    choose: "Choose an academic year and exam above.",
    loadError: "Could not load joint exams.",
    category: "Joint exam",
    noun: "joint exam",
    timetables: "exam timetables",
    sitsTogether: "specialties sit it together",
    selectHint: "Select a joint exam from the list to see and set its time.",
    noTermHint: "Choose an academic year and exam to see the courses several specialties sit together.",
    noTime: "This joint exam has no time yet. Find the times every linked specialty is free, then pick one.",
    period: "Exam period",
    term: {
      title: "Select academic year and exam",
      hint: "Choose which exam's joint courses to schedule",
      search: "Search academic year or exam",
      empty: "No exams found. Create an exam first.",
    },
    termMeta: (term) =>
      term.joint_course_count === 0 ? "No joint exams" : `${term.configured_count} of ${term.joint_course_count} joint exams set`,
  },
});

export const RESIT_JOINT_COURSE_KIND = Object.freeze({
  id: "resit",
  stateKey: "resitJointCourseTimetable",
  hooks: resitJointCourseHooks,
  actions: { setTerm: resitJointCourseTimetableActions.setExamJointCourseTerm, setSelected: resitJointCourseTimetableActions.setSelectedExamJointCourse },
  useSyncIds: () => {
    const { data } = useGetAllResitExams();
    return (data?.data ?? []).map((resitExam) => resitExam.id);
  },
  copy: {
    listTitle: "Joint resits",
    find: "Find joint resits",
    finding: "Finding joint resits…",
    findHint: "Checks who resits what and links every resit exam to the courses other specialties resit too. Opening a term does this as well.",
    search: "Find a joint resit",
    choose: "Choose an academic year and resit exam above.",
    loadError: "Could not load joint resits.",
    category: "Joint resit",
    noun: "joint resit",
    timetables: "resit timetables",
    sitsTogether: "specialties resit it together",
    selectHint: "Select a joint resit from the list to see and set its time.",
    noTermHint: "Choose an academic year and resit exam to see the courses students of several specialties resit together.",
    noTime: "This joint resit has no time yet. Find the times every candidate is free, then pick one.",
    period: "Resit period",
    term: {
      title: "Select academic year and resit exam",
      hint: "Choose which resit exam's joint courses to schedule",
      search: "Search academic year or resit exam",
      empty: "No resit exams found. Resit exams are created when students fail courses.",
    },
    termMeta: (term) =>
      term.joint_course_count === 0 ? "No joint resits yet" : `${term.configured_count} of ${term.joint_course_count} joint resits set`,
  },
});

export const JointCourseKindContext = createContext(EXAM_JOINT_COURSE_KIND);
export const JointCourseKindProvider = JointCourseKindContext.Provider;
export const useJointCourseKind = () => useContext(JointCourseKindContext);

/** Reads the current kind's page state. */
export function useJointCourseState(select) {
  const kind = useJointCourseKind();
  return useSelector((state) => select(state[kind.stateKey]));
}
