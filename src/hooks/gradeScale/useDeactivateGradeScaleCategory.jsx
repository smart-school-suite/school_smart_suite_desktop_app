import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { deactivateGradeScaleCategory } from "../../services/gradeScale";

export const useDeactivateGradeScaleCategory = (handleClose, categoryId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId) => deactivateGradeScaleCategory(categoryId),
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Deactivation Succesfull"}
          description={"Grade Scale Category Deactivated Successfully"}
        />,
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["grade-scale-categories"] });
      queryClient.invalidateQueries({
        queryKey: ["grade-scale-category-details", hallId],
      });
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />,
      );
    },
  });
};
