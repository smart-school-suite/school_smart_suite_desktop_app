import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReinstateDropoutStudent } from "../../services/Student";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useBulkReinstateDropoutStudent = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkReinstateDropoutStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["studentDropout"] });

      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }
      toast.custom(
        <ToastSuccess
          title={"Student Marked As Dropdout"}
          description={"Student Marked As Dropout Successfully"}
        />
      );
    },
    onError: () => {
      toast.custom(
        <ToastDanger
          title={"Failed Mark As Dropout"}
          description={
            "Failed to Mark Student As Dropout Please Try Again Later"
          }
        />
      );
    },
  });
};
