import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteStudentResitTransactions } from "../../services/studentResit";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteResitTransactions = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteStudentResitTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resitTransactions"] });

      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successful"}
          description={"Resit Fee Transactions Deleted Successfully"}
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
