import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExamMark } from "../../services/evaluateStudent";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
import { resetUpdateState } from "../../Slices/examEvaluation/examEvaluationSlice";
import { useDispatch } from "react-redux";
export const useUpdateExamMarks = (handleClose, candidateId) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: updateExamMark,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examCandidates"] });
      queryClient.invalidateQueries({ queryKey: ["examResults"] });
      queryClient.invalidateQueries({
        queryKey: ["exam-update-helper", candidateId],
      });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Exam Scores Updated Successfully"}
        />,
      );

      if (resetUpdateState) {
        dispatch(resetUpdateState());
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
