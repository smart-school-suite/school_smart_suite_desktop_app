import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import {
  activateExamTimetableVersion,
  applyExamTimetableSolutions,
  createExamTimetableVersion,
  deleteExamTimetableVersion,
  generateExamTimetableVersion,
} from "../../services/examTimetableGeneration";
import { EXAM_TIMETABLE_KEYS } from "./queries";

const errorToast = (error, fallbackTitle) =>
  toast.custom(
    <ToastDanger
      title={error?.response?.data?.errors?.title ?? fallbackTitle}
      description={
        error?.response?.data?.errors?.description ??
        "Something went wrong. Please try again."
      }
    />,
  );

/**
 * The mutations of a timetable of exams for an API, its query keys and the
 * words its toasts use (`Noun` is "Exam" or "Resit").
 */
export function makeTimetableMutations(api, keys, { Noun = "Exam", noun = "exam" } = {}) {
  return {
    useCreateVersion: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: api.createVersion,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [keys.versions] });
          toast.custom(
            <ToastSuccess title={`${Noun} Timetable Version Created`} description={`The new ${noun} timetable version was created.`} />,
          );
        },
        onError: (error) => errorToast(error, "Could Not Create Version"),
      });
    },

    useDeleteVersion: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: api.deleteVersion,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [keys.versions] });
          toast.custom(<ToastSuccess title="Version Deleted" description={`The ${noun} timetable version was deleted.`} />);
        },
        onError: (error) => errorToast(error, "Could Not Delete Version"),
      });
    },

    useGenerate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: api.generate,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [keys.versions] });
          toast.custom(
            <ToastSuccess
              title={`${Noun} Timetable Generating...`}
              description={`Every ${noun} is being placed with halls and invigilators. This may take a moment.`}
            />,
          );
        },
        onError: (error) => {
          // The request may not have reached the server; re-read the real status.
          queryClient.invalidateQueries({ queryKey: [keys.versions] });
          // Refused for joint courses without a time: refresh them so the page shows which.
          if (error?.response?.data?.errors?.joint_courses) {
            queryClient.invalidateQueries({ queryKey: [keys.schedulingData] });
          }
          errorToast(error, "Could Not Start Generation");
        },
      });
    },

    // Errors are shown inline in the drawer, so no toast here.
    useApplySolutions: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ versionId, solutionIds }) => api.applySolutions(versionId, { solution_ids: solutionIds }),
        onSuccess: (_response, { versionId }) => {
          queryClient.invalidateQueries({ queryKey: [keys.versions] });
          queryClient.invalidateQueries({ queryKey: [keys.solutions, versionId] });
        },
        onError: (_error, { versionId }) => {
          queryClient.invalidateQueries({ queryKey: [keys.solutions, versionId] });
        },
      });
    },

    // A 422 conflict carries errors.conflicts; the modal shows it.
    useActivate: () => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationFn: ({ versionId }) => api.activate(versionId),
        onSuccess: (response) => {
          queryClient.invalidateQueries({ queryKey: [keys.active] });
          queryClient.invalidateQueries({ queryKey: [keys.activationCheck] });
          queryClient.invalidateQueries({ queryKey: [keys.versions] });
          toast.custom(
            <ToastSuccess
              title={`${Noun} Timetable Activated`}
              description={response?.data?.message ?? `The selected version is now the ${noun} timetable in use.`}
            />,
          );
        },
        onError: (_error, { versionId }) => {
          queryClient.invalidateQueries({ queryKey: [keys.activationCheck, versionId] });
        },
      });
    },
  };
}

export const examTimetableMutations = makeTimetableMutations(
  {
    createVersion: createExamTimetableVersion,
    deleteVersion: deleteExamTimetableVersion,
    generate: generateExamTimetableVersion,
    applySolutions: applyExamTimetableSolutions,
    activate: activateExamTimetableVersion,
  },
  EXAM_TIMETABLE_KEYS,
);

export const useCreateExamTimetableVersion = examTimetableMutations.useCreateVersion;
export const useDeleteExamTimetableVersion = examTimetableMutations.useDeleteVersion;
export const useGenerateExamTimetable = examTimetableMutations.useGenerate;
export const useApplyExamTimetableSolutions = examTimetableMutations.useApplySolutions;
export const useActivateExamTimetable = examTimetableMutations.useActivate;
