import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeacher } from "../../services/teacher";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateTeacher = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ teacherId, updateData }) =>
      updateTeacher(teacherId, updateData),
    onSuccess: (deletedTeacherId) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.removeQueries({ queryKey: ["teacher", deletedTeacherId] });
      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"Teacher Updated Successfully"}
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
