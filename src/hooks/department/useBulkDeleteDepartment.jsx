import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteDepartment } from "../../services/department";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteDepartment = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={
            "Department Deleted Successfully, This Action Cannot Be Undone"
          }
        />
      );
    },
  });
};
