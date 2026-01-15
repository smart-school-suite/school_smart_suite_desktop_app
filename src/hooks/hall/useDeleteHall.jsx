import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHall } from "../../services/hall";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

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
