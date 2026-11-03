import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateStudent } from "../../services/student";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkActivateStudent = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkActivateStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Activation Successful"}
          description={"Student Activated Successfully"}
        />
      );
    },
  });
};
