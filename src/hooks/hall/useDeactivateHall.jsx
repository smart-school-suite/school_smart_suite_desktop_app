import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateHall } from "../../services/hall";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useDeactivateHall = (handleClose, hallId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hallId) => deactivateHall(hallId),
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Deactivated"}
          description={"Hall Deactivated Successfully"}
        />
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["activeHalls"] });
      queryClient.invalidateQueries({ queryKey: ["halls"] });
      queryClient.invalidateQueries({ queryKey: ["hall", hallId] });
    },
  });
};
