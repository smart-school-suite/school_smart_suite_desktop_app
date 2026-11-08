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

export const useGetExamTimetableConstraints = () =>
  useQuery({
    queryKey: [EXAM_TIMETABLE_KEYS.constraints],
    queryFn: getExamTimetableConstraints,
    staleTime: Infinity,
  });

export const useGetExamSchedulingData = (examId) =>
  useQuery({
    queryKey: [EXAM_TIMETABLE_KEYS.schedulingData, examId],
    queryFn: () => getExamSchedulingData(examId),
    enabled: !!examId,
  });

// Polled while a version is generating, so a lost realtime event can't leave the page stuck.
export const useGetExamTimetableVersions = (examId) =>
  useQuery({
    queryKey: [EXAM_TIMETABLE_KEYS.versions, examId],
    queryFn: () => getExamTimetableVersions(examId),
    enabled: !!examId,
    refetchInterval: (query) =>
      query.state.data?.data?.some(isGenerating) ? GENERATION_POLL_INTERVAL_MS : false,
    refetchIntervalInBackground: true,
  });

export const useGetExamTimetableSlots = (versionId) =>
  useQuery({
    queryKey: [EXAM_TIMETABLE_KEYS.slots, versionId],
    queryFn: () => getExamTimetableSlots(versionId),
    enabled: !!versionId,
  });

export const useGetExamTimetableSolutions = (versionId) =>
  useQuery({
    queryKey: [EXAM_TIMETABLE_KEYS.solutions, versionId],
    queryFn: () => getExamTimetableSolutions(versionId),
    enabled: !!versionId,
  });

// Refused with a 422 when the version is not ready or the exam has ended.
export const useGetExamTimetableActivationCheck = (versionId) =>
  useQuery({
    queryKey: [EXAM_TIMETABLE_KEYS.activationCheck, versionId],
    queryFn: () => examTimetableActivationCheck(versionId),
    enabled: !!versionId,
    retry: false,
    staleTime: 0,
  });

export const useGetActiveExamTimetable = (examId) =>
  useQuery({
    queryKey: [EXAM_TIMETABLE_KEYS.active, examId],
    queryFn: () => getActiveExamTimetable(examId),
    enabled: !!examId,
  });
