import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdditionalFeeTransaction } from "../../services/additionalFee";

export const useDeleteAdditionalFeeTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdditionalFeeTransaction,
    onSuccess: (data, deletedTransactionId) => {
      queryClient.invalidateQueries({
        queryKey: ["additionalFeeTransactions"],
      }),
        queryClient.removeQueries({
          queryKey: ["additionalFeetransaction", deletedTransactionId],
        });
    },
  });
};
