import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { updateEventCategory } from "../../services/eventCategory";
export const useUpdateEventCategory = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId, updateData }) =>
      updateEventCategory(categoryId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["eventCategories"] });
      queryClient.invalidateQueries({ queryKey: ["activeEventCategories"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Event Category Updated Successfully"}
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
