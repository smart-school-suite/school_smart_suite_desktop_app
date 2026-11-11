import { Plus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EmptyStateButton } from "../../components/errors/EmptyState";
import { isEmptyListError } from "../../utils/teacher/teacherFilters";
import { useGetTeachers } from "./useGetTeachers";

/**
 * Empty state for "teachers of a specialty" lists (course assignment drawers).
 * Only when the list is empty does it check whether the school has any
 * teachers at all, so the message can point to the right fix:
 * create teachers, or assign teachers to the specialty first.
 *
 * Returns { empty, isCheckingSchool } for TeacherSelectList.
 */
export function useSpecialtyTeachersEmptyState({ teachers, isLoading, error, handleClose }) {
  const navigate = useNavigate();
  const listEmpty =
    !isLoading && (error ? isEmptyListError(error) : (teachers?.length ?? 0) === 0);

  const { data: allTeachers, isLoading: isAllLoading } = useGetTeachers({
    enabled: listEmpty,
  });
  const isCheckingSchool = listEmpty && isAllLoading;
  const schoolHasNoTeachers = listEmpty && !isAllLoading && (allTeachers?.data?.length ?? 0) === 0;

  const go = (path) => {
    handleClose?.();
    navigate(path);
  };

  const empty = schoolHasNoTeachers
    ? {
        mascot: "sad",
        title: "No teachers created yet",
        description:
          "Your school has no teachers yet. Create teachers, assign them to this specialty, then assign them to its courses.",
        actions: (
          <EmptyStateButton icon={Plus} onClick={() => go("/teacher")}>
            Go to Teachers
          </EmptyStateButton>
        ),
      }
    : {
        mascot: "sad",
        title: "No teachers in this specialty",
        description:
          "Only teachers assigned to this specialty can teach its courses. Assign teachers to the specialty first.",
        actions: (
          <EmptyStateButton icon={UserPlus} onClick={() => go("/teacher-specialty")}>
            Assign Teachers To Specialty
          </EmptyStateButton>
        ),
      };

  return { empty, isCheckingSchool };
}
