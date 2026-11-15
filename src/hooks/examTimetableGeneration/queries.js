import { useQuery } from "@tanstack/react-query";
import {
  examTimetableActivationCheck,
  getActiveExamTimetable,
  getExamSchedulingData,
  getExamTimetableConstraints,
  getExamTimetableSlots,
  getExamTimetableSolutions,
  getExamTimetableVersions,
} from "../../services/examTimetableGeneration";
import {
  GENERATION_POLL_INTERVAL_MS,
  isGenerating,
} from "../../utils/semesterTimetable/schedulerStatus";

export const EXAM_TIMETABLE_KEYS = Object.freeze({
  versions: "exam-timetable-versions",
  slots: "exam-timetable-slots",
  solutions: "exam-timetable-solutions",
  activationCheck: "exam-timetable-activation-check",
  active: "exam-timetable-active",
  constraints: "exam-timetable-constraints",
  schedulingData: "exam-scheduling-data",
});

/**
 * The queries of a timetable of exams, for an API and its query keys.
 * The exam and resit timetables share them; `ownerId` is the exam or resit exam.
 */
export function makeTimetableQueries(api, keys) {
  return {
    useConstraints: () =>
      useQuery({
        queryKey: [keys.constraints],
        queryFn: api.getConstraints,
        staleTime: Infinity,
      }),

    useSchedulingData: (ownerId) =>
      useQuery({
        queryKey: [keys.schedulingData, ownerId],
        queryFn: () => api.getSchedulingData(ownerId),
        enabled: !!ownerId,
      }),

    // Polled while a version is generating, so a lost realtime event can't leave the page stuck.
    useVersions: (ownerId) =>
      useQuery({
        queryKey: [keys.versions, ownerId],
        queryFn: () => api.getVersions(ownerId),
        enabled: !!ownerId,
        refetchInterval: (query) =>
          query.state.data?.data?.some(isGenerating) ? GENERATION_POLL_INTERVAL_MS : false,
        refetchIntervalInBackground: true,
      }),

    useSlots: (versionId) =>
      useQuery({
        queryKey: [keys.slots, versionId],
        queryFn: () => api.getSlots(versionId),
        enabled: !!versionId,
      }),

    useSolutions: (versionId) =>
      useQuery({
        queryKey: [keys.solutions, versionId],
        queryFn: () => api.getSolutions(versionId),
        enabled: !!versionId,
      }),

    // Refused with a 422 when the version is not ready or the exam has ended.
    useActivationCheck: (versionId) =>
      useQuery({
        queryKey: [keys.activationCheck, versionId],
        queryFn: () => api.activationCheck(versionId),
        enabled: !!versionId,
        retry: false,
        staleTime: 0,
      }),

    useActive: (ownerId) =>
      useQuery({
        queryKey: [keys.active, ownerId],
        queryFn: () => api.getActive(ownerId),
        enabled: !!ownerId,
      }),
  };
}

export const examTimetableQueries = makeTimetableQueries(
  {
    getConstraints: getExamTimetableConstraints,
    getSchedulingData: getExamSchedulingData,
    getVersions: getExamTimetableVersions,
    getSlots: getExamTimetableSlots,
    getSolutions: getExamTimetableSolutions,
    activationCheck: examTimetableActivationCheck,
    getActive: getActiveExamTimetable,
  },
  EXAM_TIMETABLE_KEYS,
);

export const useGetExamTimetableConstraints = examTimetableQueries.useConstraints;
export const useGetExamSchedulingData = examTimetableQueries.useSchedulingData;
export const useGetExamTimetableVersions = examTimetableQueries.useVersions;
export const useGetExamTimetableSlots = examTimetableQueries.useSlots;
export const useGetExamTimetableSolutions = examTimetableQueries.useSolutions;
export const useGetExamTimetableActivationCheck = examTimetableQueries.useActivationCheck;
export const useGetActiveExamTimetable = examTimetableQueries.useActive;
