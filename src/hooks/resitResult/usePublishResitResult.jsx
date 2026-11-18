import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { publishResitResult } from "../../services/resitResults";

/** Publishes (or schedules) a resit exam's results; errors go to the caller's onError. */
export const usePublishResitResult = (handleClose, resitExamId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: publishResitResult,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["result-resit-exams"] });
      queryClient.removeQueries({ queryKey: ["resit-result-publish-details", resitExamId] });
      handleClose?.();
      toast.custom(
        <ToastSuccess
          title={response?.data?.publication_status === "scheduled" ? "Results Scheduled" : "Results Published"}
          description={response?.message ?? "Resit results published."}
        />,
      );
    },
  });
};
