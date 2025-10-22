import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkMarkStudentAsDropout } from "../../services/Student";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
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
