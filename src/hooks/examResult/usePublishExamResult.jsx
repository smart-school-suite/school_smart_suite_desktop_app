import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { publishExamResult } from "../../services/examResults";
export const usePublishExamResult = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: publishExamResult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["result-exam"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Result Published"}
          description={"Exam Result Published Created Successfully"}
        />,
      );
    },
  });
};