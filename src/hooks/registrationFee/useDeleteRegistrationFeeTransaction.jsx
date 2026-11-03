import { deleteRegistrationFeeTransaction } from "../../services/registrationFee";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useDeleteRegistrationFeeTransaction = (
  handleClose,
  transactionId
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRegistrationFeeTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["registrationFeeTransactions"],
      });
      queryClient.removeQueries({
        queryKey: ["registrationFeeTransaction", transactionId],
      });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successful"}
          description={"Registration Fee Transaction Deleted Successfully"}
        />
      );
    },
  });
};
