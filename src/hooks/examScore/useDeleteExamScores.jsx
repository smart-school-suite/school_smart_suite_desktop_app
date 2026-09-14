import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import toast from "react-hot-toast";
import { deleteExamScores } from "../../services/examScore";

export const useDeleteExamScores = (handleClose, candidateId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExamScores,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examCandidates"] });
    queryClient.invalidateQueries({ queryKey: ["candidate-scores", candidateId]})  
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successful"}
          description={"Exam Scores Deleted Successfully"}
        />,
      );
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
