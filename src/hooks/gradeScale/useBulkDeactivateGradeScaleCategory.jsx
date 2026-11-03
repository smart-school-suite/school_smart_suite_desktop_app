import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { bulkDeactivateGradeScale } from "../../services/gradeScale";
export const useBulkDeactivateGradeScaleCategory = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkDeactivateGradeScale,
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
    },
  });
};
