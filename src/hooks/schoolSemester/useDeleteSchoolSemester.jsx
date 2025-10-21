import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSchoolSemester } from "../../services/schoolSemester";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useDeleteSchoolSemester = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSchoolSemester,
    onSuccess: (schoolSemesterId) => {
      queryClient.invalidateQueries({ queryKey: ["schoolSemesters"] });
      queryClient.removeQueries({
        queryKey: ["schoolSemester", schoolSemesterId],
      });
      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Delete Successfull"}
          description={"School Semester Deleted Successfully"}
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
