import { updateExpense } from "../../services/schoolExpenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateExpense = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ expenseId, updateData }) =>
      updateExpense(expenseId, updateData),
    onSuccess: (expenseId) => {
      queryClient.invalidateQueries({ queryKey: ["schoolExpenses"] });
      queryClient.removeQueries({ queryKey: ["schoolExpense", expenseId] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"School Expenses Updated Successfully"}
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
