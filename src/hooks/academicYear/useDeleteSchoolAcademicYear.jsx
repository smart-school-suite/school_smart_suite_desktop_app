import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
import { deleteSchoolAcademicYear } from "../../services/academicYear";

export const useDeleteSchoolAcademicYear = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSchoolAcademicYear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-academic-years"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Delete Successful"}
          description={"School Academic Year Deleted Successfully"}
        />,
      );
    },
    onError: (error) => {
      toast.custom(
        <ToastDanger
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />,
      );
    },
  });
};
