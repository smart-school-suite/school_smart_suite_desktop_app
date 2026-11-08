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

export const useCreateExamTimetableVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExamTimetableVersion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.versions] });
      toast.custom(
        <ToastSuccess title="Exam Timetable Version Created" description="The new exam timetable version was created." />,
      );
    },
    onError: (error) => errorToast(error, "Could Not Create Version"),
  });
};

export const useDeleteExamTimetableVersion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExamTimetableVersion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.versions] });
      toast.custom(<ToastSuccess title="Version Deleted" description="The exam timetable version was deleted." />);
    },
    onError: (error) => errorToast(error, "Could Not Delete Version"),
  });
};

export const useGenerateExamTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: generateExamTimetableVersion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.versions] });
      toast.custom(
        <ToastSuccess
          title="Exam Timetable Generating..."
          description="Every exam is being placed with halls and invigilators. This may take a moment."
        />,
      );
    },
    onError: (error) => {
      // The request may not have reached the server; re-read the real status.
      queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.versions] });
      errorToast(error, "Could Not Start Generation");
    },
  });
};

// Errors are shown inline in the drawer, so no toast here.
export const useApplyExamTimetableSolutions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ versionId, solutionIds }) =>
      applyExamTimetableSolutions(versionId, { solution_ids: solutionIds }),
    onSuccess: (_response, { versionId }) => {
      queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.versions] });
      queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.solutions, versionId] });
    },
    onError: (_error, { versionId }) => {
      queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.solutions, versionId] });
    },
  });
};

// A 422 conflict carries errors.conflicts; the modal shows it.
export const useActivateExamTimetable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ versionId }) => activateExamTimetableVersion(versionId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.active] });
      queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.activationCheck] });
      queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.versions] });
      toast.custom(
        <ToastSuccess
          title="Exam Timetable Activated"
          description={response?.data?.message ?? "The selected version is now the exam timetable in use."}
        />,
      );
    },
    onError: (_error, { versionId }) => {
      queryClient.invalidateQueries({ queryKey: [EXAM_TIMETABLE_KEYS.activationCheck, versionId] });
    },
  });
};
