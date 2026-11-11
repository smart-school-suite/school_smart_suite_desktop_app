import { useMemo } from "react";
import TeacherCard from "../Card/TeacherCard";
import TeacherStats from "../Card/TeacherStats";
import EmptyState, { EmptyStateButton } from "../errors/EmptyState";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { filterTeachers, isEmptyListError } from "../../utils/teacher/teacherFilters";

const MASCOT_HEIGHT = "6rem";

/**
 * Grid of selectable TeacherCards that renders every list state:
 * loading, error, empty (incl. 404 empty lists), no search match, content.
 *
 *   <TeacherSelectList
 *     teachers={data?.data} isLoading={...} error={...}
 *     search={debouncedSearch} onClearSearch={() => setSearch("")}
 *     isSelected={(t) => selected.has(t.id)} onSelect={toggle}
 *     empty={{ title: "No teachers", description: "...", actions: <...> }}
 *   />
 */
export default function TeacherSelectList({
  teachers,
  isLoading = false,
  error,
  search = "",
  onClearSearch,
  isSelected = () => false,
  onSelect,
  badgeFor,
  renderFooter = (teacher) => <TeacherStats teacher={teacher} />,
  empty,
  noun = "teacher",
}) {
  const list = useMemo(() => (Array.isArray(teachers) ? teachers : []), [teachers]);
  const visible = useMemo(() => filterTeachers(list, search), [list, search]);

  if (isLoading) {
    return (
      <div className="teacher-card-grid">
        {[...Array(6)].map((_, index) => (
          <RectangleSkeleton key={index} height="13rem" />
        ))}
      </div>
    );
  }

  if (error && !isEmptyListError(error)) {
    return (
      <EmptyState
        mascot="error"
        height="100%"
        mascotHeight={MASCOT_HEIGHT}
        title={error?.response?.data?.errors?.title || "Unable to load teachers"}
        description={
          error?.response?.data?.errors?.description ||
          "Something went wrong while loading the teachers."
        }
      />
    );
  }

  if (list.length === 0) {
    return (
      <EmptyState
        mascot={empty?.mascot ?? "sad"}
        height="100%"
        mascotHeight={MASCOT_HEIGHT}
        title={empty?.title ?? "No teachers available"}
        description={empty?.description}
        hint={empty?.hint}
        actions={empty?.actions}
      />
    );
  }

  if (visible.length === 0) {
    return (
      <EmptyState
        mascot="notFound"
        height="100%"
        mascotHeight={MASCOT_HEIGHT}
        title="No matching teachers"
        description={`No ${noun} matches "${search}". Try a name, username, qualification or level.`}
        actions={
          onClearSearch && (
            <EmptyStateButton variant="secondary" onClick={onClearSearch}>
              Clear search
            </EmptyStateButton>
          )
        }
      />
    );
  }

  return (
    <div className="teacher-card-grid">
      {visible.map((teacher) => (
        <TeacherCard
          key={teacher.id}
          teacher={teacher}
          selected={isSelected(teacher)}
          onSelect={onSelect}
          badge={badgeFor?.(teacher)}
        >
          {renderFooter?.(teacher)}
        </TeacherCard>
      ))}
    </div>
  );
}
