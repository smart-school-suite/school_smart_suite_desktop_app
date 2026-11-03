import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateStudent } from "../../services/student";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeactivateStudent = (handleClose, studentId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (studentId) => deactivateStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["students", studentId] });

      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Deactivated"}
          description={"Student Account Successfully Deactivated"}
        />
      );
    },
  });
};
