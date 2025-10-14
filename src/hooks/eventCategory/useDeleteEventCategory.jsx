import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { deleteEventCategory } from "../../services/eventCategory";
export const useDeleteEventCategory = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEventCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventCategories"] });
      queryClient.invalidateQueries({ queryKey: ["activeEventCategories"]});
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Event Category Deleted Successfully"}
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
