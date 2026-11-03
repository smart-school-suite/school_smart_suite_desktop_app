import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHall } from "../../services/hall";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useDeleteHall = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteHall,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Hall Deleted Successfully"}
        />
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["halls"] });
      queryClient.invalidateQueries({ queryKey: ["activeHalls"] });
    },
  });
};
