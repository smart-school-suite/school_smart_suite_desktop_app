import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateStudent } from "../../services/Student";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
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
    onError: () => {
      toast.custom(
        <ToastDanger
          title={"Activation Failed"}
          description={
            "Failed to activate student due to an error please check internet connection and try again"
          }
        />
      );
    },
  });
};
