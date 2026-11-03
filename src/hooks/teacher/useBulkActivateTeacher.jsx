import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateTeacher } from "../../services/teacher";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkActivateTeacher = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkActivateTeacher,
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
          title={"Activation Successfull"}
          description={"Teacher Accounts Activated Successfully"}
        />
      );
    },
  });
};
