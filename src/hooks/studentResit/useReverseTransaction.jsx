import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reverseTransaction } from "../../services/studentResit";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useReverseTransaction = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reverseTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resitTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["studentResits"] });

      if (handleClose) {
        handleClose();
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
