import { bulkDeleteSchoolExpenses } from "../../services/schoolExpenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteSchoolExpenses = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteSchoolExpenses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolExpenses"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"School Expenses Delete Successfully"}
        />
      );
    },
  });
};
