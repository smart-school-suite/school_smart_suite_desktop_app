import { deleteCaExamScores } from "../../services/examScore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useDeleteCaExamScores = (handleClose, candidateId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCaExamScores,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examCandidates"] });
       queryClient.invalidateQueries({ queryKey: ["candidate-scores", candidateId]})   
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Deleted Successful"}
          description={"Ca Exam Deleted Successfully"}
        />,
      );
    },
  });
};
