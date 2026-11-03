import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdditionalFeeTransaction } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteAdditionalFeeTransaction = (
  handleClose,
  transactionId
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdditionalFeeTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["additionalFeeTransactions"],
      }),
        queryClient.removeQueries({
          queryKey: ["additionalFeetransaction", transactionId],
        });

        if(handleClose){
          handleClose();
        }

        toast.custom(
          <ToastSuccess 
             title={"Delete Successfull"}
             description={"Additional Fees Deleted Successfully"}
          />
        )
    },
  });
};
