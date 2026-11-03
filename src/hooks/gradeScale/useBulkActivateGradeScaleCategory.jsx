import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkActivateGradeScale } from "../../services/gradeScale";

export const useBulkActivateGradeScaleCategory = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkActivateGradeScale,
    onSuccess: () => {
      toast.custom(
        <ToastSuccess
          title={"Activation Succesfull"}
          description={"Grade Scale Category Activated Successfully"}
        />,
      );
      if (handleClose) {
        handleClose();
      }
      queryClient.invalidateQueries({ queryKey: ["grade-scale-categories"] });
    },
  });
};
