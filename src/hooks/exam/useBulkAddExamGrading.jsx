import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkAddExamGradingConfigs } from "../../services/exam";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkAddExamGradingConfigs = (handleClose, resetAll) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bulkAddExamGradingConfigs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      if (handleClose) {
        handleClose();
      }

      if (resetAll) {
        resetAll();
      }

      toast.custom(
        <ToastSuccess
          title={"Exam Grading Added"}
          description={"Exam Grading Added Successfully"}
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
