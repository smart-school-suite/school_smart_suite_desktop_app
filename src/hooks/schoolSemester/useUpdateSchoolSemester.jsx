import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchoolSemester } from "../../services/schoolSemester";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateSchoolSemester = (handleClose, schoolSemesterId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ schoolSemesterId, updateData }) =>
      updateSchoolSemester(schoolSemesterId, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolSemesters"] });
      queryClient.removeQueries(["schoolSemester", schoolSemesterId]);

      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess
          title={"Semester Updated"}
          description={"School Semester Updated Successfully"}
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
