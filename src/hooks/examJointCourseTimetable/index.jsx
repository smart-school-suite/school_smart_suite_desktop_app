import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import {
  confirmExamJointCourseTime,
  generateExamJointCourseTimes,
  getExamJointCourseTerm,
  getExamJointCourseTerms,
  removeExamJointCourseTime,
  syncExamJointCourses,
} from "../../services/examJointCourseTimetable";

export const EXAM_JOINT_TERMS_KEY = "exam-joint-course-terms";
export const EXAM_JOINT_TERM_KEY = "exam-joint-course-term";

export const useGetExamJointCourseTerms = () =>
  useQuery({ queryKey: [EXAM_JOINT_TERMS_KEY], queryFn: getExamJointCourseTerms });

export const useGetExamJointCourseTerm = (term) =>
  useQuery({
    queryKey: [EXAM_JOINT_TERM_KEY, term?.school_year_id, term?.exam_type_id],
    queryFn: () => getExamJointCourseTerm(term.school_year_id, term.exam_type_id),
    enabled: Boolean(term?.school_year_id && term?.exam_type_id),
  });

const useRefreshJointCourses = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: [EXAM_JOINT_TERM_KEY] });
    queryClient.invalidateQueries({ queryKey: [EXAM_JOINT_TERMS_KEY] });
    // Exam scheduling data shows each course's joint exam time.
    queryClient.invalidateQueries({ queryKey: ["exam-scheduling-data"] });
  };
};

export const useGenerateExamJointCourseTimes = () =>
  useMutation({
    mutationFn: ({ examJointCourseId, payload }) => generateExamJointCourseTimes(examJointCourseId, payload),
  });

// Conflicts and expired proposals are shown in the drawer, so no error toast here.
export const useConfirmExamJointCourseTime = () => {
  const refresh = useRefreshJointCourses();
  return useMutation({
    mutationFn: ({ examJointCourseId, proposalId, optionId }) =>
      confirmExamJointCourseTime(examJointCourseId, proposalId, optionId),
    onSuccess: (response) => {
      refresh();
      toast.custom(<ToastSuccess title="Joint Exam Time Saved" description={response?.data?.message ?? "The joint exam time was saved."} />);
    },
  });
};

export const useRemoveExamJointCourseTime = () => {
  const refresh = useRefreshJointCourses();
  return useMutation({
    mutationFn: ({ examJointCourseId }) => removeExamJointCourseTime(examJointCourseId),
    onSuccess: (response) => {
      refresh();
      toast.custom(<ToastSuccess title="Joint Exam Time Removed" description={response?.data?.message ?? "The time was removed."} />);
    },
    onError: (error) =>
      toast.custom(
        <ToastDanger
          title={error?.response?.data?.errors?.title ?? "Could Not Remove Time"}
          description={error?.response?.data?.errors?.description ?? "Please try again."}
        />,
      ),
  });
};

// Links every given exam to its joint exams (exams created before joint exams existed).
export const useSyncExamJointCourses = () => {
  const refresh = useRefreshJointCourses();
  return useMutation({
    mutationFn: async (examIds) => {
      const results = await Promise.allSettled(examIds.map((id) => syncExamJointCourses(id)));
      return results.filter((result) => result.status === "fulfilled").length;
    },
    onSuccess: (count) => {
      refresh();
      toast.custom(<ToastSuccess title="Joint Exams Updated" description={`Checked ${count} exam(s) for courses shared with other specialties.`} />);
    },
  });
};
