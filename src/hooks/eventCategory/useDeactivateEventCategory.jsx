import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateEventCategory } from "../../services/eventCategory";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeactivateEventCategory = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateEventCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventCategories"] });
      queryClient.invalidateQueries({ queryKey: ["activeEventCategories"]});
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Deactivation Successfull"}
          description={"Event Category Deactivated Successfully"}
        />
      );
    },
  });
};
