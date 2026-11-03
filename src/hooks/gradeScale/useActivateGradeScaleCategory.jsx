import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { activateGradeScaleCategory } from "../../services/gradeScale";

export const useActivateGradeScaleCategory = (handleClose, categoryId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryId) => activateGradeScaleCategory(categoryId),
    onSuccess: (data) => {
      const categoryId = data?.data?.id ?? data?.id;
      toast.custom(
        <ToastSuccess
          title={"Activated"}
          description={"Grade Scale Category Activated Successfully"}
        />,
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["grade-scale-categories"] });
      queryClient.invalidateQueries({
        queryKey: ["grade-scale-categories-active"],
      });
    },
  });
};
