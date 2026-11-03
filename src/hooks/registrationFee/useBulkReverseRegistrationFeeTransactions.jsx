import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReverseRegistrationFeeTransaction } from "../../services/registrationFee";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useBulkReverseRegistrationFeeTransactions = (
  handleClose,
  resetAll
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkReverseRegistrationFeeTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["registrationFeeTransactions"],
      });
      queryClient.invalidateQueries({ queryKey: ["registrationFees"] });
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
  });
};
