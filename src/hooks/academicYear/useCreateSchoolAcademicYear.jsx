import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchoolAcademicYear } from "../../services/academicYear";
export const useCreateSchoolAcademicYear = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchoolAcademicYear,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-academic-years"] });
      toast.custom(
        <ToastSuccess
          title={"Academic Year Created"}
          description={"School Academic Year Created Successfully"}
        />,
      );

      if (handleClose) {
        handleClose();
      }
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
