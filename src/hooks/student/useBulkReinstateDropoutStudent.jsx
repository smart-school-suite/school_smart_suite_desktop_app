import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReinstateDropoutStudent } from "../../services/student";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

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
  });
};
