import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../../services/schoolExpenses";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateSchoolExpense = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolExpenses"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Expense Created"}
          description={"School Expense Created Successfully"}
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
