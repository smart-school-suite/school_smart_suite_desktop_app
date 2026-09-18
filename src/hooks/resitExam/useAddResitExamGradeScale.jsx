import { addResitExamGradeScale } from "../../services/resitExam";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useAddResitExamGradeScale = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({resitExamId, gradeScaleCategoryId}) =>
      addResitExamGradeScale(resitExamId, gradeScaleCategoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resitExams"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Grade Scale Added"}
          description={"Resit Exam Grade Scale Added Successfully"}
        />,
      );
    },
    onError: () => {
      toast.custom(
        <ToastDanger
          title={"Failed to add Grading"}
          description={
            "Failed to add exam grading due to an error please try again later"
          }
        />,
      );
    },
  });
};
