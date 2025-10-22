import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateStudent } from "../../services/Student";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useActivateStudent = (studentId, handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => activateStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student", studentId] });

      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Activated"}
          description={"Student Account Activated Successfully"}
        />
      );
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
