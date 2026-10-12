import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReverseTuitionFeeTransaction } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkReverseTuitionFeeTransactions = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkReverseTuitionFeeTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tuitionFeesTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["feesPaid"] });
      queryClient.invalidateQueries({ queryKey: ["tuitionFees"] });
      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Reverse Successfull"}
          description={"Transaction Reversed Successfully"}
        />
      );
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />
      );
    },
  });
};
