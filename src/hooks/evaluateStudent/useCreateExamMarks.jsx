import { createExamMark } from "../../services/evaluateStudent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
import { resetExamScoreState } from "../../Slices/Asynslices/ExamScoreSlice";
import { useDispatch } from "react-redux";
export const useCreateExamMarks = (handleClose) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createExamMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examCandidates"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Marks Submitted"}
          description={"Marks Submitted Successfully"}
        />
      );
      dispatch(resetExamScoreState());
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
