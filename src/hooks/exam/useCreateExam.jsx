import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExam } from "../../services/exam";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useDispatch } from "react-redux";
import { resetCreateExamState } from "../../Slices/exam/examSlice";
export const useCreateExam = (handleClose) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      queryClient.invalidateQueries({ queryKey: ["examCandidates"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Exam Created"}
          description={"Exam Created Successfully"}
        />,
      );
      dispatch(resetCreateExamState());
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
