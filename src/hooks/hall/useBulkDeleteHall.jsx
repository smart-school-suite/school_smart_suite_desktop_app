import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteHall } from "../../services/hall";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteHall = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteHall,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["halls"] });
      queryClient.invalidateQueries({ queryKey: ["activeHalls"] });
      if (handleClose) {
        handleClose();
      }
      if (resetAll) {
        resetAll();
      }
      toast.custom(
        <ToastSuccess
          title={"Delete Successful"}
          description={"Halls Deleted Successfully"}
        />
      );
    },
  });
};
