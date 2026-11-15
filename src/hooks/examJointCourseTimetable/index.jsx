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

/**
 * The hooks of a joint course timetable, for an API, its query keys and the
 * words its toasts use. The exam and resit joint course timetables share them.
 * `schedulingDataKey` is refreshed too: the timetable page shows each course's joint time.
 */
export function makeJointCourseHooks(api, { termsKey, termKey, schedulingDataKey }, { Noun = "Joint Exam", noun = "joint exam", owners = "exam(s)" } = {}) {
  const useRefresh = () => {
    const queryClient = useQueryClient();
    return () => {
      queryClient.invalidateQueries({ queryKey: [termKey] });
      queryClient.invalidateQueries({ queryKey: [termsKey] });
      queryClient.invalidateQueries({ queryKey: [schedulingDataKey] });
    };
  };

  return {
    useTerms: () => useQuery({ queryKey: [termsKey], queryFn: api.getTerms }),

    useTerm: (term) =>
      useQuery({
        queryKey: [termKey, term?.school_year_id, term?.exam_type_id],
        queryFn: () => api.getTerm(term.school_year_id, term.exam_type_id),
        enabled: Boolean(term?.school_year_id && term?.exam_type_id),
      }),

    useGenerate: () =>
      useMutation({
        mutationFn: ({ examJointCourseId, payload }) => api.generate(examJointCourseId, payload),
      }),

    // Conflicts and expired proposals are shown in the drawer, so no error toast here.
    useConfirm: () => {
      const refresh = useRefresh();
      return useMutation({
        mutationFn: ({ examJointCourseId, proposalId, optionId }) => api.confirm(examJointCourseId, proposalId, optionId),
        onSuccess: (response) => {
          refresh();
          toast.custom(<ToastSuccess title={`${Noun} Time Saved`} description={response?.data?.message ?? `The ${noun} time was saved.`} />);
        },
      });
    },

    useRemove: () => {
      const refresh = useRefresh();
      return useMutation({
        mutationFn: ({ examJointCourseId }) => api.remove(examJointCourseId),
        onSuccess: (response) => {
          refresh();
          toast.custom(<ToastSuccess title={`${Noun} Time Removed`} description={response?.data?.message ?? "The time was removed."} />);
        },
        onError: (error) =>
          toast.custom(
            <ToastDanger
              title={error?.response?.data?.errors?.title ?? "Could Not Remove Time"}
              description={error?.response?.data?.errors?.description ?? "Please try again."}
            />,
          ),
      });
    },

    // Links every given exam (or resit exam) to its joint courses.
    useSync: () => {
      const refresh = useRefresh();
      return useMutation({
        mutationFn: async (ids) => {
          const results = await Promise.allSettled(ids.map((id) => api.sync(id)));
          return results.filter((result) => result.status === "fulfilled").length;
        },
        onSuccess: (count) => {
          refresh();
          toast.custom(<ToastSuccess title={`${Noun}s Updated`} description={`Checked ${count} ${owners} for courses shared with other specialties.`} />);
        },
      });
    },
  };
}

export const examJointCourseHooks = makeJointCourseHooks(
  {
    getTerms: getExamJointCourseTerms,
    getTerm: getExamJointCourseTerm,
    generate: generateExamJointCourseTimes,
    confirm: confirmExamJointCourseTime,
    remove: removeExamJointCourseTime,
    sync: syncExamJointCourses,
  },
  { termsKey: EXAM_JOINT_TERMS_KEY, termKey: EXAM_JOINT_TERM_KEY, schedulingDataKey: "exam-scheduling-data" },
);

export const useGetExamJointCourseTerms = examJointCourseHooks.useTerms;
export const useGetExamJointCourseTerm = examJointCourseHooks.useTerm;
export const useGenerateExamJointCourseTimes = examJointCourseHooks.useGenerate;
export const useConfirmExamJointCourseTime = examJointCourseHooks.useConfirm;
export const useRemoveExamJointCourseTime = examJointCourseHooks.useRemove;
export const useSyncExamJointCourses = examJointCourseHooks.useSync;
