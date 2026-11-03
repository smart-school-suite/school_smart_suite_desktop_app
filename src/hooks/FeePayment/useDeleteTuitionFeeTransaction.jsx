import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTuitionFeeTransaction } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteTuitionFeeTransaction = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTuitionFeeTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tuitionFeeTransactions"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Tuition Fee Transaction Deleted Successfully"}
        />
      );
    },
  });
};
