import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteTuitionFees } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteTuitionFees = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteTuitionFees,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tuitionFees"] });
      queryClient.invalidateQueries({ queryKey: ["feesPaid"] });
      if (handleClose) {
        handleClose();
      }
      if (resetAll) {
        resetAll();
      }
      toast.custom(
        <ToastSuccess
          title={"Delete Successful"}
          description={"Tuition Fees Deleted Successfully"}
        />
      );
    },
  });
};
