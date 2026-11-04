import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { saveJointCourseSlots } from "../../services/jointCourseTimetable";
import { JOINT_COURSE_TERM_KEY } from "./useGetJointCourseTerm";
import { JOINT_COURSE_TERMS_KEY } from "./useGetJointCourseTerms";

// PUT joint-course-timetable/{id}/slots
// A 422 carries errors.conflicts; the editor shows them inline, so no error toast here.
export const useSaveJointCourseSlots = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ semesterJointCourseId, slots }) =>
      saveJointCourseSlots(semesterJointCourseId, slots),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [JOINT_COURSE_TERM_KEY] });
      queryClient.invalidateQueries({ queryKey: [JOINT_COURSE_TERMS_KEY] });
      toast.custom(
        <ToastSuccess
          title={"Joint Course Times Saved"}
          description={response?.data?.message ?? "The joint course times were saved."}
        />,
      );
    },
  });
};
