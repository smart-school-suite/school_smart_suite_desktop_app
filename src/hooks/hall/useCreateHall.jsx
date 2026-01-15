import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHall } from "../../services/hall";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

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
