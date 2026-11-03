import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEventCategory } from "../../services/eventCategory";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateEventCategory = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEventCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventCategories"] });
      queryClient.invalidateQueries({ queryKey: ["activeEventCategories"]});

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Event Category Created"}
          description={"Event Created Successfully"}
        />
      );
    },
  });
};
