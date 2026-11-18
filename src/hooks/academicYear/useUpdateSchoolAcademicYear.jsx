import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchoolAcademicYear } from "../../services/academicYear";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

// Errors are shown in the form's error banner (pass onError to mutate).
export const useUpdateSchoolAcademicYear = (handleClose, schoolAcademicYearId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ updateData, schoolAcademicYearId }) =>
      updateSchoolAcademicYear(updateData, schoolAcademicYearId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["school-academic-years"] });
      queryClient.removeQueries({ queryKey: ["school-academic-year", schoolAcademicYearId] });
      queryClient.removeQueries({ queryKey: ["school-academic-year-update-rules", schoolAcademicYearId] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Academic Year Updated"}
          description={"The academic year was updated successfully."}
        />,
      );
    },
  });
};
