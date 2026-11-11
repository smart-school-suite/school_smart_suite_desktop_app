import { Icon } from "@iconify/react";
import { Dot, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { EmptyStateButton } from "../../components/errors/EmptyState";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import SearchInput from "../../components/input/search";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import TeacherSelectList from "../../components/Teacher/TeacherSelectList";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useFormError } from "../../hooks/form/useFormError";
import { useGetSpecialtyDetails } from "../../hooks/specialty/useGetSpecialtyDetail";
import { useGetTeachers } from "../../hooks/teacher/useGetTeachers";
import { useAssignTeachers } from "../../hooks/teacherSpecialty/useAssignTeachers";
import { useGetAssignableTeachers } from "../../hooks/teacherSpecialty/useGetAssignableTeacherSpecialtyId";
import { SpecialtyIcon } from "../../icons/Icons";
import { filterTeachers, isEmptyListError } from "../../utils/teacher/teacherFilters";


function SpecialtySummary({ specialtyId }) {
  const { data, isLoading, error } = useGetSpecialtyDetails(specialtyId);
  const specialty = data?.data;

  if (isLoading) return <RectangleSkeleton height="3.5rem" />;
  if (error) {
    return (
      <div className="d-flex flex-row align-items-center gap-2 font-size-sm text-iron-500">
        <Icon icon="lucide:circle-alert" width={16} height={16} />
        <span>Specialty details could not be loaded.</span>
      </div>
    );
  }

  const stats = [
    { icon: "ion:book-outline", label: "Courses", value: specialty?.total_courses },
    { icon: "streamline-flex:city-hall", label: "Halls", value: specialty?.total_halls },
    { icon: "solar:user-linear", label: "Teachers", value: specialty?.total_teachers },
    { icon: "ph:student-light", label: "Students", value: specialty?.total_students },
  ];

  return (
    <div className="d-flex flex-column gap-2 font-size-sm">
      <div className="d-flex flex-row align-items-center gap-2">
        <div
          style={{ width: "2.5rem", height: "2.5rem", display: "grid", placeItems: "center" }}
          className="bg-primary-50 rounded-2 text-primary-500 flex-shrink-0"
        >
          <SpecialtyIcon />
        </div>
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <div className="d-flex flex-row align-items-center gap-2">
            <span className="fw-semibold text-truncate">
              {specialty?.specialty_name ?? "Specialty"}
            </span>
            {specialty?.status && (
              <span className="pill-sm-success text-capitalize">{specialty.status}</span>
            )}
          </div>
          <div className="d-flex flex-row align-items-center text-iron-400 fw-light">
            <span>{specialty?.level?.name ?? "-"}</span>
            <Dot size={16} />
            <span className="text-truncate">
              {specialty?.department?.department_name ?? "-"}
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap align-items-center gap-3 font-size-xs text-iron-500">
        {stats.map((stat) => (
          <div key={stat.label} className="d-flex flex-row align-items-center gap-1">
            <Icon icon={stat.icon} width={14} height={14} />
            <span className="fw-semibold text-iron-700">{stat.value ?? 0}</span>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AssignTeacherSpecialty({ handleClose, drawerData }) {
  const specialtyId = drawerData?.specialtyId;
  const navigate = useNavigate();

  const {
    data: assignable,
    isLoading: isTeachersLoading,
    error: teachersError,
  } = useGetAssignableTeachers(specialtyId);
  const { mutate: assignTeacher, isPending: isAssigning } = useAssignTeachers(specialtyId);
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError(
    "Failed To Assign Teacher Specialty",
  );

  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  const teachers = useMemo(
    () => (Array.isArray(assignable?.data) ? assignable.data : []),
    [assignable],
  );
  const visibleTeachers = useMemo(
    () => filterTeachers(teachers, debouncedSearch),
    [teachers, debouncedSearch],
  );

  const noAssignableTeachers =
    !isTeachersLoading &&
    (teachersError ? isEmptyListError(teachersError) : teachers.length === 0);

  // Only when nothing is assignable do we need to know whether the school has
  // any teachers at all, to tell "create teachers first" apart from
  // "every eligible teacher is already assigned".
  const { data: allTeachers, isLoading: isAllTeachersLoading } = useGetTeachers({
    enabled: noAssignableTeachers,
  });
  const schoolHasNoTeachers =
    noAssignableTeachers && !isAllTeachersLoading && (allTeachers?.data?.length ?? 0) === 0;

  const visibleIds = visibleTeachers.map((teacher) => teacher.id);
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));

  const toggleTeacher = (teacher) =>
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(teacher.id)) next.delete(teacher.id);
      else next.add(teacher.id);
      return next;
    });

  const toggleAllVisible = () =>
    setSelectedIds((current) => {
      const next = new Set(current);
      visibleIds.forEach((id) => (allVisibleSelected ? next.delete(id) : next.add(id)));
      return next;
    });

  const handleAssignTeachers = () => {
    if (selectedIds.size === 0) return;
    clearFormError();
    assignTeacher(
      { specialty_id: specialtyId, teacher_ids: Array.from(selectedIds) },
      {
        onSuccess: () => setSelectedIds(new Set()),
        onError: handleServerError,
      },
    );
  };

  const goToTeachers = () => {
    handleClose?.();
    navigate("/teacher");
  };

  const empty = schoolHasNoTeachers
    ? {
        mascot: "sad",
        title: "No teachers created yet",
        description:
          "Your school has no teachers yet. Create teachers first, then come back to assign them to this specialty.",
        actions: (
          <EmptyStateButton icon={Plus} onClick={goToTeachers}>
            Go to Teachers
          </EmptyStateButton>
        ),
      }
    : {
        mascot: "empty",
        title: "No teachers available to assign",
        description:
          "Every teacher who teaches this specialty's level is already assigned to it.",
        hint: "Teachers only appear here when one of their teaching levels matches the specialty's level.",
      };

  const hasTeachers = !isTeachersLoading && teachers.length > 0;

  return (
    <>
      <div className="d-flex flex-column gap-3 pt-2 px-2 pb-2 flex-shrink-0">
        <SpecialtySummary specialtyId={specialtyId} />
        <SearchInput
          placeholder="Search by name, qualification or level"
          value={search}
          onChange={(value) => setSearch(value ?? "")}
          enableShortcut={false}
          disabled={!hasTeachers}
        />
        {hasTeachers && (
          <div className="d-flex flex-row align-items-center justify-content-between font-size-sm">
            <span className="text-iron-400 fw-light">
              Assignable teachers
              {debouncedSearch
                ? ` · ${visibleTeachers.length} of ${teachers.length}`
                : ` · ${teachers.length}`}
            </span>
            <button
              type="button"
              className="border-none bg-none color-primary font-size-sm"
              onClick={toggleAllVisible}
              disabled={visibleIds.length === 0}
            >
              {allVisibleSelected ? "Deselect all" : "Select all"}
            </button>
          </div>
        )}
      </div>

      <div className="drawer-content px-2 pb-3 d-flex flex-column">
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        <div className="flex-grow-1">
          <TeacherSelectList
            teachers={teachers}
            isLoading={isTeachersLoading || (noAssignableTeachers && isAllTeachersLoading)}
            error={teachersError}
            search={debouncedSearch}
            onClearSearch={() => setSearch("")}
            isSelected={(teacher) => selectedIds.has(teacher.id)}
            onSelect={toggleTeacher}
            empty={empty}
            noun="assignable teacher"
          />
        </div>
      </div>

      <div className="drawer-footer">
        <div className="d-flex flex-column w-100 font-size-sm">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
              Cancel
            </button>
            <div className="d-flex flex-row align-items-center gap-3">
              {selectedIds.size > 0 && (
                <span className="text-iron-500">
                  {selectedIds.size} selected
                </span>
              )}
              <button
                type="button"
                className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
                onClick={handleAssignTeachers}
                disabled={isAssigning || selectedIds.size === 0}
                style={{ opacity: selectedIds.size === 0 ? 0.6 : 1 }}
              >
                {isAssigning ? (
                  <SingleSpinner />
                ) : selectedIds.size > 1 ? (
                  `Assign ${selectedIds.size} Teachers`
                ) : (
                  "Assign Teacher"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
