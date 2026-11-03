import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHall } from "../../services/hall";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useCreateHall = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createHall,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Creation Successfull"}
          description={"Hall Created Successfully"}
        />
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["hall"] });
    },
  });
};
