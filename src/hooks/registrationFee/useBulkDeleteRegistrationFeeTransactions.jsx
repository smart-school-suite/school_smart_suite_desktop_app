import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteRegistrationFeeTransactions } from "../../services/registrationFee";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteRegistrationFeeTransactions = (
  handleClose,
  resetAll
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteRegistrationFeeTransactions,
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
          title={"Delete Successfull"}
          description={"Registration Fee Deleted Successfully"}
        />
      );
    },
  });
};
