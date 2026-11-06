import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { confirmJointCourseSlots } from "../../services/jointCourseTimetable";
import { JOINT_COURSE_TERM_KEY } from "./useGetJointCourseTerm";
import { JOINT_COURSE_TERMS_KEY } from "./useGetJointCourseTerms";

// Conflicts and expired proposals are shown in the drawer, so no error toast here.
export const useConfirmJointCourseSlots = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ semesterJointCourseId, proposalId, optionIds }) =>
      confirmJointCourseSlots(semesterJointCourseId, proposalId, optionIds),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [JOINT_COURSE_TERM_KEY] });
      queryClient.invalidateQueries({ queryKey: [JOINT_COURSE_TERMS_KEY] });
      toast.custom(
        <ToastSuccess
          title={"Joint Course Slots Saved"}
          description={response?.data?.message ?? "The joint course slots were saved."}
        />,
      );
    },
  });
};
