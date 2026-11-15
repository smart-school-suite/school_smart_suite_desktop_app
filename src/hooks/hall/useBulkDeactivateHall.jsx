import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkDeactivateHall } from "../../services/hall";

export const useBulkDeactivateHall = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeactivateHall,
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
        <ToastSuccess title={"Halls Deactivated"} description={"Halls Deactivated Successfully"} />
      );
    },
  });
};
