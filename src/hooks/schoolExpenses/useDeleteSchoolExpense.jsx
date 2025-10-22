import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense } from "../../services/schoolExpenses";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteSchoolExpense = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolExpenses"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"School Expenses Deleted Successfully"}
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
