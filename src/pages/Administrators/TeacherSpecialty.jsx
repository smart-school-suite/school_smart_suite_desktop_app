import { Icon } from "@iconify/react";
import { ArrowDown, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import TeacherCard from "../../components/Card/TeacherCard";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import SearchInput from "../../components/input/search";
import SpecialtyNavigator from "../../components/SideBars/SpecialtyNavigator";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import AssignTeacherSpecialty from "../../DrawerContent/TeacherSpecialty/AssignTeacherSpecialty";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useGetTeacherBySpecialty } from "../../hooks/teacher/useGetTeacherBySpecialty";
import { filterTeachers, isEmptyListError } from "../../utils/teacher/teacherFilters";

const MASCOT_HEIGHT = "7rem";

function AssignTeacherTrigger({ specialtyId, children }) {
  return (
    <DrawerTrigger
      title="Manage Assignment"
      placement="right"
      drawerChildren={AssignTeacherSpecialty}
      drawerData={{ specialtyId }}
    >
      {children}
    </DrawerTrigger>
  );
}

function TeacherSpecialty() {
  const [specialty, setSpecialty] = useState(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const {
    data: teachers,
    isLoading: isTeacherLoading,
    error: teacherError,
  } = useGetTeacherBySpecialty(specialty);

  const allTeachers = useMemo(
    () => (Array.isArray(teachers?.data) ? teachers.data : []),
    [teachers],
  );
  const visibleTeachers = useMemo(
    () => filterTeachers(allTeachers, debouncedSearch),
    [allTeachers, debouncedSearch],
  );

  const handleSpecialtyChange = (next) => {
    setSpecialty(next);
    setSearch("");
  };

  const hasEmptyList =
    !teacherError ? allTeachers.length === 0 : isEmptyListError(teacherError);

  const renderContent = () => {
    if (!specialty) {
      return (
        <EmptyState
          mascot="empty"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="Ready to manage teacher specialty assignment?"
          description="Select a specialty on the left to see and assign its teachers."
        />
      );
    }

    if (isTeacherLoading) {
      return (
        <div className="teacher-card-grid">
          {[...Array(6)].map((_, index) => (
            <RectangleSkeleton key={index} height="13rem" />
          ))}
        </div>
      );
    }

    if (teacherError && !isEmptyListError(teacherError)) {
      return (
        <EmptyState
          mascot="error"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title={teacherError?.response?.data?.errors?.title || "Unable to load teachers"}
          description={
            teacherError?.response?.data?.errors?.description ||
            "Something went wrong while loading the teachers for this specialty."
          }
        />
      );
    }

    if (hasEmptyList) {
      return (
        <EmptyState
          mascot="sad"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="No teachers assigned"
          description="This specialty has no teachers yet. Assign teachers so they can be scheduled for its courses."
          actions={
            <AssignTeacherTrigger specialtyId={specialty}>
              <EmptyStateButton icon={Plus}>Assign Teacher</EmptyStateButton>
            </AssignTeacherTrigger>
          }
        />
      );
    }

    if (visibleTeachers.length === 0) {
      return (
        <EmptyState
          mascot="notFound"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="No matching teachers"
          description={`No assigned teacher matches "${debouncedSearch}". Try a name, username, qualification or level.`}
          actions={
            <EmptyStateButton variant="secondary" onClick={() => setSearch("")}>
              Clear search
            </EmptyStateButton>
          }
        />
      );
    }

    return (
      <div className="teacher-card-grid">
        {visibleTeachers.map((teacher) => (
          <TeacherCard key={teacher?.id} teacher={teacher}>
            <div className="teacher-card__divider" />
            <div className="d-flex flex-row align-items-center justify-content-around font-size-xs text-iron-500">
              <div className="d-flex flex-row align-items-center gap-1">
                <Icon icon="ion:book-outline" width={14} height={14} />
                <span>
                  <span className="fw-semibold text-iron-700">
                    {teacher?.num_assigned_courses ?? 0}
                  </span>{" "}
                  Courses
                </span>
              </div>
              <div className="d-flex flex-row align-items-center gap-1">
                <Icon icon="material-symbols:grid-on-outline" width={14} height={14} />
                <span>
                  <span className="fw-semibold text-iron-700">
                    {teacher?.num_assigned_specialties ?? 0}
                  </span>{" "}
                  Specialties
                </span>
              </div>
            </div>
          </TeacherCard>
        ))}
      </div>
    );
  };

  return (
    <main className="d-flex flex-row gap-2 h-100 w-100" style={{ minHeight: 0 }}>
      <SpecialtyNavigator
        title="Teacher specialties"
        description="Select a specialty to manage the teachers assigned to it."
        specialty={specialty}
        setSpecialty={handleSpecialtyChange}
      />
      <div className="d-flex flex-column gap-2 h-100" style={{ width: "75%", minHeight: 0 }}>
        <div className="d-flex flex-row align-items-center justify-content-between gap-2 flex-shrink-0">
          <div className="d-flex flex-row align-items-center gap-2 w-50">
            <SearchInput
              placeholder="Search by name, qualification or level"
              hotkey="Ctrl+K"
              value={search}
              onChange={(value) => setSearch(value ?? "")}
              disabled={!specialty || hasEmptyList}
            />
          </div>
          <div className="d-flex flex-row align-items-center gap-2">
            {specialty && !isTeacherLoading && allTeachers.length > 0 && (
              <span className="font-size-xs text-iron-500 text-nowrap">
                {debouncedSearch
                  ? `${visibleTeachers.length} of ${allTeachers.length} teachers`
                  : `${allTeachers.length} teacher${allTeachers.length === 1 ? "" : "s"}`}
              </span>
            )}
            <button className="font-size-sm bg-white border-none border rounded-3 p-2 d-flex flex-row align-items-center gap-2">
              <span>Export</span>
              <ArrowDown size={16} />
            </button>
            {specialty && (
              <AssignTeacherTrigger specialtyId={specialty}>
                <button
                  className="border-none border rounded-3 font-size-sm px-2 primary-background text-white text-capitalize"
                  style={{ padding: "0.38rem" }}
                >
                  <span>Assign Teacher</span>
                </button>
              </AssignTeacherTrigger>
            )}
          </div>
        </div>
        {/* flex-grow + min-height: 0 makes this the only scrolling region and
            lets it fill exactly the space left under the toolbar */}
        <div
          className="flex-grow-1 scroll-bar-sm over-flow-y-auto over-flow-x-hidden pe-1 pb-2"
          style={{ minHeight: 0 }}
        >
          {renderContent()}
        </div>
      </div>
    </main>
  );
}

export default TeacherSpecialty;
