import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchoolSemester } from "../../services/schoolSemester";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
const createdDescription = (semester) => {
  const copies = semester?.auto_created_semesters?.length ?? 0;
  if (!copies) return "It's ready to use.";
  return `Also added to ${copies} other ${copies === 1 ? "class" : "classes"}.`;
};

export const useCreateSchoolSemester = (handleClose) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSchoolSemester,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["schoolSemesters"] });
      queryClient.invalidateQueries({ queryKey: ["schoolSemesterCreationOptions"] });
      queryClient.invalidateQueries({ queryKey: ["examCandidates"] });
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      queryClient.invalidateQueries({ queryKey: ["feeSchedules"] });
      if (handleClose) {
        handleClose();
      }
      toast.custom(
        <ToastSuccess title="Semester created" description={createdDescription(response?.data)} />
      );
    },
  });
};
