import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkDeleteHall } from "../../services/hall";

export const useBulkDeleteHall = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeleteHall,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["halls"] });
      queryClient.invalidateQueries({ queryKey: ["activeHalls"] });
      queryClient.invalidateQueries({ queryKey: ["hall"] });
      if (handleClose) {
        handleClose();
      }
      if (resetAll) {
        resetAll();
      }
      toast.custom(
        <ToastSuccess title={"Delete Successfull"} description={"Halls Deleted Successfully, This Action Cannot Be Undone"} />
      );
    },
  });
};
