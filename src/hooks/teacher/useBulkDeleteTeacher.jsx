import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteTeacher } from "../../services/teacher";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteTeacher = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Teacher Deleted Successfully"}
        />
      );
    },
  });
};
