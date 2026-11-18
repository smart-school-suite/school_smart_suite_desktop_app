import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkPromoteStudents, bulkRepeatStudents } from "../../services/promotionRecord";

const ACTIONS = {
  promote: { fn: bulkPromoteStudents, title: "Promotions Approved" },
  repeat: { fn: bulkRepeatStudents, title: "Repeats Approved" },
};

/**
 * Bulk approve promotion / approve repeat of promotion records. The toast
 * says how many students were decided and how many were skipped; errors go
 * to the caller's onError (the dialog's error banner).
 */
export const useBulkPromotionDecision = (action, handleClose, resetAll) => {
  const queryClient = useQueryClient();
  const config = ACTIONS[action];
  return useMutation({
    mutationFn: config.fn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["promotion-records"] });
      handleClose?.();
      resetAll?.();
      toast.custom(<ToastSuccess title={config.title} description={response?.message ?? "Done."} />);
    },
  });
};
