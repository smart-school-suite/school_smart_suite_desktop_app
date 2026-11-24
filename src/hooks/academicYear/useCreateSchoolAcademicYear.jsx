import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchoolAcademicYear } from "../../services/academicYear";
export const useCreateSchoolAcademicYear = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchoolAcademicYear,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["school-academic-years"] });
      queryClient.invalidateQueries({ queryKey: ["schoolAcademicYearCreationOptions"] });
      queryClient.invalidateQueries({ queryKey: ["schoolSemesterCreationOptions"] });
      const copies = response?.data?.auto_created_academic_years?.length ?? 0;
      toast.custom(
        <ToastSuccess
          title={"Academic Year Created"}
          description={copies ? `Also added to ${copies} other ${copies === 1 ? "level" : "levels"}.` : "It's ready to use."}
        />,
      );

      if (handleClose) {
        handleClose();
      }
    },
  });
};
