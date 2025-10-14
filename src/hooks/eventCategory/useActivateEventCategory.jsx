import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
import { activateEventCategory } from "../../services/eventCategory";
export const useActivateEventCategory = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn:activateEventCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventCategories"] });
      queryClient.invalidateQueries({ queryKey: ["activeEventCategories"]});
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Activated Successfully"}
          description={"Event Category Activated Successfully"}
        />
      );
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />
      );
    }
  });
};
