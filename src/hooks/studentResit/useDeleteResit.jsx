import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResit } from "../../services/studentResit";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteStudentResit = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteResit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentResits"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"Student Resit Deleted Successfully"}
        />
      );
    },
  });
};
