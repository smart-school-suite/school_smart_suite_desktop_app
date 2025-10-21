import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateTeacher } from "../../services/teacher";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useDeactivateTeacher = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teacherId) => deactivateTeacher(teacherId),
    onSuccess: (deactivatedTeacherId) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.removeQueries({
        queryKey: ["teacher", deactivatedTeacherId],
      });
      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Deactivation Successfull"}
          description={"Teacher Account Deactivated Successfully"}
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
