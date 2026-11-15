import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkActivateHall } from "../../services/hall";

export const useBulkActivateHall = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkActivateHall,
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
        <ToastSuccess title={"Halls Activated"} description={"Halls Activated Successfully"} />
      );
    },
  });
};
