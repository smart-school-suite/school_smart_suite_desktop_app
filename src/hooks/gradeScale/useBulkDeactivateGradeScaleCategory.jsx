import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
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
