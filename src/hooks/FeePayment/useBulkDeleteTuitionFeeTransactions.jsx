import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTuitionFeeTransaction } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteTuitionFeeTransactions = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTuitionFeeTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tuitionFeesTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["feesPaid"] });

      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Tuition Fee Transaction Deleted Successfully"}
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
