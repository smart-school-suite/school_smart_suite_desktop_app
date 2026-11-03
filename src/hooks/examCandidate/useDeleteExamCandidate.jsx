import { deleteExamCandidates } from "../../services/examCandidate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteExamCandidate = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExamCandidates,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["examCandidates"] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Exam Candidate Deleted Successfully"}
        />
      );
    },
  });
};
