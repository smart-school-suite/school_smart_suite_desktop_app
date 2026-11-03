import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReverseTransaction } from "../../services/studentResit";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useBulkReverserResitTransactions = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkReverseTransaction,
    onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: ["resit-transactions"] });

      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Transaction Successfull"}
          description={"Transaction Reversed Successfully"}
        />
      );
    },
  });
};
