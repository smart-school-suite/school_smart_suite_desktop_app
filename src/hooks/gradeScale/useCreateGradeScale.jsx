import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { createGradeScale } from "../../services/gradeScale";

export const useCreateGradeScale = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGradeScale,
    onSuccess: (data) => {
      const categoryId = data?.data?.id ?? data?.id;
      toast.custom(
        <ToastSuccess
          title={"Creation Successfull"}
          description={"Grade Scale Created Successfully"}
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
  });
};
