import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { copyGradeScale } from "../../services/gradeScale";

export const useCopyGradeScale = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ sourceCategoryId, targetCategoryId }) =>
      copyGradeScale(sourceCategoryId, targetCategoryId),
    onSuccess: (data) => {
      const categoryId = data?.data?.id ?? data?.id;
      toast.custom(
        <ToastSuccess
          title={"Copy Successfull"}
          description={"Grade Scale Copied Successfully"}
        />,
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["grade-scale-categories"] });
      if (categoryId) {
        queryClient.invalidateQueries({
          queryKey: ["grade-scale-category", categoryId],
        });
      }
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
