import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExam } from "../../services/exam";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useDispatch } from "react-redux";
import { resetCreateExamState } from "../../Slices/exam/examSlice";
const createdDescription = (exam) => {
  const copies = exam?.auto_created_exams?.length ?? 0;
  const skipped = exam?.auto_creation_skipped ?? [];
  const parts = [];
  if (copies) {
    parts.push(`Also created for ${copies} other ${copies === 1 ? "specialty" : "specialties"} with the same semester dates.`);
  }
  if (skipped.length === 1) {
    parts.push(`Skipped ${skipped[0].specialty ?? "1 specialty"}: ${skipped[0].reason}.`);
  } else if (skipped.length > 1) {
    parts.push(`${skipped.length} specialties were skipped (no students, missing CA or already created).`);
  }
  const scale = exam?.grade_scale_attachment;
  if (scale?.status === "attached" && scale.grade_scale) {
    parts.push(`Grade scale ${scale.grade_scale} attached.`);
  } else if (scale?.status === "several") {
    parts.push("Several grade scales fit, so attach one by hand.");
  }
  return parts.length ? parts.join(" ") : "Exam created successfully.";
};

export const useCreateExam = (handleClose) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: createExam,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      queryClient.invalidateQueries({ queryKey: ["examCandidates"] });
      queryClient.invalidateQueries({ queryKey: ["exam-creation-options"] });

      if (handleClose) {
        handleClose();
      }

      toast.custom(
        <ToastSuccess
          title={"Exam Created"}
          description={createdDescription(response?.data)}
        />,
      );
      dispatch(resetCreateExamState());
    },
  });
};
