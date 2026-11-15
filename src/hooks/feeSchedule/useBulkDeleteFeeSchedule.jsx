import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteFeeSchedule } from "../../services/feeSchedule";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteFeeSchedule = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteFeeSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeSchedules"] });
      if (handleClose) {
        handleClose();
      }
      if (resetAll) {
        resetAll();
      }
      toast.custom(
        <ToastSuccess
          title={"Delete Successful"}
          description={"Fee Schedules Deleted Successfully"}
        />
      );
    },
  });
};
