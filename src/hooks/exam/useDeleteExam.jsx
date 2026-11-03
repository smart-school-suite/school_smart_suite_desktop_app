import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteExam } from "../../services/exam";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useDeleteExam = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Exam Deleted"}
          description={"Exam Deleted Successfully"}
        />
      );
    },
  });
};
