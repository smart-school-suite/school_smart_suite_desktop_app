import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createElement } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { resetAssignInvigilatorState } from "../../Slices/exam/examInvigilatorSlice";
import { makeTimetableMutations } from "../examTimetableGeneration/mutations";
import { makeTimetableQueries } from "../examTimetableGeneration/queries";
import {
  activateResitTimetableVersion,
  applyResitTimetableSolutions,
  assignResitInvigilators,
  createResitTimetableVersion,
  deleteResitTimetableVersion,
  generateResitTimetableVersion,
  getActiveResitTimetable,
  getPotentialResitInvigilators,
  getResitInvigilators,
  getResitSchedulingData,
  getResitTimetableConstraints,
  getResitTimetableSlots,
  getResitTimetableSolutions,
  getResitTimetableVersions,
  removeResitInvigilators,
  resitTimetableActivationCheck,
} from "../../services/resitTimetableGeneration";

export const RESIT_TIMETABLE_KEYS = Object.freeze({
  versions: "resit-timetable-versions",
  slots: "resit-timetable-slots",
  solutions: "resit-timetable-solutions",
  activationCheck: "resit-timetable-activation-check",
  active: "resit-timetable-active",
  constraints: "resit-timetable-constraints",
  schedulingData: "resit-scheduling-data",
  invigilators: "resit-invigilators",
  potentialInvigilators: "resit-potential-invigilators",
});

export const resitTimetableQueries = makeTimetableQueries(
  {
    getConstraints: getResitTimetableConstraints,
    getSchedulingData: getResitSchedulingData,
    getVersions: getResitTimetableVersions,
    getSlots: getResitTimetableSlots,
    getSolutions: getResitTimetableSolutions,
    activationCheck: resitTimetableActivationCheck,
    getActive: getActiveResitTimetable,
  },
  RESIT_TIMETABLE_KEYS,
);

export const resitTimetableMutations = makeTimetableMutations(
  {
    createVersion: createResitTimetableVersion,
    deleteVersion: deleteResitTimetableVersion,
    generate: generateResitTimetableVersion,
    applySolutions: applyResitTimetableSolutions,
    activate: activateResitTimetableVersion,
  },
  RESIT_TIMETABLE_KEYS,
  { Noun: "Resit", noun: "resit" },
);

// ── Invigilators of a resit exam ─────────────────────────────────────────

export const useGetResitInvigilators = (resitExamId) =>
  useQuery({
    queryKey: [RESIT_TIMETABLE_KEYS.invigilators, resitExamId],
    queryFn: () => getResitInvigilators(resitExamId),
    enabled: !!resitExamId,
  });

export const useGetPotentialResitInvigilators = (resitExamId) =>
  useQuery({
    queryKey: [RESIT_TIMETABLE_KEYS.potentialInvigilators, resitExamId],
    queryFn: () => getPotentialResitInvigilators(resitExamId),
    enabled: !!resitExamId,
  });

const useInvalidateInvigilators = () => {
  const queryClient = useQueryClient();
  return () =>
    [RESIT_TIMETABLE_KEYS.invigilators, RESIT_TIMETABLE_KEYS.potentialInvigilators, RESIT_TIMETABLE_KEYS.schedulingData].forEach((key) =>
      queryClient.invalidateQueries({ queryKey: [key] }),
    );
};

const dangerToast = (error, title) =>
  toast.custom(
    createElement(ToastDanger, {
      title: error?.response?.data?.errors?.title ?? title,
      description: error?.response?.data?.errors?.description ?? "Something went wrong. Please try again.",
    }),
  );

// The assign drawer shows errors inline, like the exam one.
export const useAssignResitInvigilators = () => {
  const invalidate = useInvalidateInvigilators();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: assignResitInvigilators,
    onSuccess: () => {
      invalidate();
      toast.custom(createElement(ToastSuccess, { title: "Assignment Successful", description: "Invigilators assigned to the resit exam." }));
      dispatch(resetAssignInvigilatorState());
    },
  });
};

export const useRemoveResitInvigilators = () => {
  const invalidate = useInvalidateInvigilators();
  return useMutation({
    mutationFn: removeResitInvigilators,
    onSuccess: () => {
      invalidate();
      toast.custom(createElement(ToastSuccess, { title: "Removal Successful", description: "Invigilator removed from the resit exam." }));
    },
    onError: (error) => dangerToast(error, "Could Not Remove Invigilator"),
  });
};

/** Resit exams in the shape the exam pickers use ({ data: [exam] }). */
export { useResitExamsAsExams } from "./useResitExamsAsExams";
