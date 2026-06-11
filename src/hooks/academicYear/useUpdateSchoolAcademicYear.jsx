import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateSchoolAcademicYear } from "../../services/academicYear";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateSchoolAcademicYear = (
  handleClose,
  schoolAcademicYearId,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ updateData, schoolAcademicYearId }) =>
      updateSchoolAcademicYear(updateData, schoolAcademicYearId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-academic-years"] });
      queryClient.removeQueries({ queryKey: ["school-academic-year", schoolAcademicYearId] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Update Successfull"}
          description={"School Academic Year Successfully Updated"}
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
