import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExamGradeScale } from "../../services/exam";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useAddExamGradeScale = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ examId, gradeScaleCategoryId }) =>
      addExamGradeScale(examId, gradeScaleCategoryId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Grading Added"}
          description={"Exam Grading Added Successfully"}
        />
      );
    },
  });
};
