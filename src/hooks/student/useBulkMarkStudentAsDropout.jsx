import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkMarkStudentAsDropout } from "../../services/student";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkMarkStudentAsDropout = (resetAll, handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkMarkStudentAsDropout,
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
          title={"Dropout Successfully Completed"}
          description={"Students Successfully Droped out"}
        />
      );
    },
  });
};
