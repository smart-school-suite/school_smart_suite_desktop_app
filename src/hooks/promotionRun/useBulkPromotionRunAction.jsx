import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import {
  bulkCancelPromotionRuns,
  bulkRetryPromotionRuns,
  bulkTriggerPromotionRuns,
} from "../../services/promotion";

const ACTIONS = {
  trigger: { fn: bulkTriggerPromotionRuns, title: "Promotion Runs Triggered" },
  retry: { fn: bulkRetryPromotionRuns, title: "Promotion Runs Retried" },
  cancel: { fn: bulkCancelPromotionRuns, title: "Promotion Runs Cancelled" },
};

/**
 * Bulk trigger / retry / cancel of promotion runs. The toast says how many
 * runs were changed and how many were skipped; errors go to the caller's
 * onError (the dialog's error banner).
 */
export const useBulkPromotionRunAction = (action, handleClose, resetAll) => {
  const queryClient = useQueryClient();
  const config = ACTIONS[action];
  return useMutation({
    mutationFn: config.fn,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["promotion-runs"] });
      handleClose?.();
      resetAll?.();
      toast.custom(<ToastSuccess title={config.title} description={response?.message ?? "Done."} />);
    },
  });
};
