import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateEventCategory } from "../../services/eventCategory";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
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
