import { examTimetableMutations } from "../hooks/examTimetableGeneration/mutations";
import { EXAM_TIMETABLE_KEYS, examTimetableQueries } from "../hooks/examTimetableGeneration/queries";
import { RESIT_TIMETABLE_KEYS, resitTimetableMutations, resitTimetableQueries } from "../hooks/resitTimetableGeneration";
import {
  addExamRequest,
  patchExamConstraint,
  removeExamRequest,
  setExamConstraint,
  setExamTimetableVersion,
  setTimetableExam,
  updateExamRequest,
} from "../Slices/ExamTimetable/examTimetableSlice";
import { resitTimetableActions } from "../Slices/ResitTimetable/resitTimetableSlice";
import { ExamDropdown, ResitExamDropdown } from "./OwnerDropdown";

/**
 * A timetable of exams: the exam timetable or the resit timetable. Both use
 * the same page, components and generation flow; a kind says which API,
 * state, picker and words they use. Components read it with useTimetableKind().
 */
export const EXAM_TIMETABLE_KIND = Object.freeze({
  id: "exam",
  stateKey: "examTimetable",
  noun: "exam",
  Noun: "Exam",
  ownerKey: "exam_id",
  keys: EXAM_TIMETABLE_KEYS,
  queries: examTimetableQueries,
  mutations: examTimetableMutations,
  actions: {
    setOwner: setTimetableExam,
    setVersion: setExamTimetableVersion,
    setConstraint: setExamConstraint,
    patchConstraint: patchExamConstraint,
    addRequest: addExamRequest,
    updateRequest: updateExamRequest,
    removeRequest: removeExamRequest,
  },
  OwnerDropdown: ExamDropdown,
  events: { channel: "examTimetable", eventName: "examTimetable.generation" },
  copy: {
    selectOwner: "Select an exam from the dropdown above to get started.",
    setupFirst: "Something needs to be set up first, such as exam candidates, exam halls or invigilators. Open the list to see what to fix.",
    period: "Exam period",
    periodMissing: "Set on the exam",
    activeDescription: "Students, invigilators and admins will see this version as the exam timetable. Its halls and invigilators become busy for other exams.",
    candidates: "candidates",
  },
  joint: {
    // Joint exams get their time on their own page; generation waits for it.
    needsTime: true,
    path: "/exam/joint-course-timetable",
    pageName: "Joint Course Timetable",
    rowLabel: "Joint courses",
    title: "Courses examined with other specialties",
    description:
      "A course several specialties take is examined once, at the same time for all of them. Its time is set on the Joint Course Timetable page and this timetable places it exactly there, so it can't be changed here.",
    emptyTitle: "No joint courses",
    emptyText: "This exam has no course shared with other specialties, so there is nothing to wait for.",
    fixedBy: "Fixed by the Joint Course Timetable",
    requestNote: "Joint courses are not listed: their exam time is set on the Joint Course Timetable page.",
    gridBadge: "joint",
  },
});

export const RESIT_TIMETABLE_KIND = Object.freeze({
  id: "resit",
  stateKey: "resitTimetable",
  noun: "resit",
  Noun: "Resit",
  ownerKey: "resit_exam_id",
  keys: RESIT_TIMETABLE_KEYS,
  queries: resitTimetableQueries,
  mutations: resitTimetableMutations,
  actions: {
    setOwner: resitTimetableActions.setTimetableExam,
    setVersion: resitTimetableActions.setExamTimetableVersion,
    setConstraint: resitTimetableActions.setExamConstraint,
    patchConstraint: resitTimetableActions.patchExamConstraint,
    addRequest: resitTimetableActions.addExamRequest,
    updateRequest: resitTimetableActions.updateExamRequest,
    removeRequest: resitTimetableActions.removeExamRequest,
  },
  OwnerDropdown: ResitExamDropdown,
  events: { channel: "resitTimetable", eventName: "resitTimetable.generation" },
  copy: {
    selectOwner: "Select a resit exam from the dropdown above to get started.",
    setupFirst: "Something needs to be set up first, such as resit candidates, exam halls or resit invigilators. Open the list to see what to fix.",
    period: "Resit period",
    periodMissing: "Set on the resit exam",
    activeDescription:
      "Students, invigilators and admins will see this version as the resit timetable. Its halls, invigilators and candidates become busy for exams and other resits.",
    candidates: "resit candidates",
  },
  joint: {
    // Joint resits get their time on the resit joint course timetable; generation waits for it.
    needsTime: true,
    path: "/resit/joint-course-timetable",
    pageName: "Resit Joint Course Timetable",
    rowLabel: "Joint resits",
    title: "Courses resat with other specialties",
    description:
      "A course students of several specialties resit is sat once, at the same time for all of them. Its time is set on the Resit Joint Course Timetable page and this timetable places it exactly there, so it can't be changed here.",
    emptyTitle: "No joint resits",
    emptyText: "No course of this resit exam is resat by another specialty, so there is nothing to wait for.",
    fixedBy: "Fixed by the Resit Joint Course Timetable",
    requestNote: "Joint resits are not listed: their time is set on the Resit Joint Course Timetable page.",
    gridBadge: "joint",
  },
});
