import { ArrowDown, BookPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/Card/CourseCard";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import SearchInput from "../../components/input/search";
import SpecialtyNavigator from "../../components/SideBars/SpecialtyNavigator";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import AssignCourse from "../../DrawerContent/Course/AssignCourse";
import ManageCourseAssignment from "../../DrawerContent/Course/ManageCourseAssignment";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useGetCourseSpecialtyId } from "../../hooks/course/useGetCourseSpecialtyId";
import {
  countCourses,
  filterSemesterCourses,
  isCourseAssigned,
} from "../../utils/course/courseFilters";
import { isEmptyListError } from "../../utils/teacher/teacherFilters";

const MASCOT_HEIGHT = "7rem";

function CourseAction({ course, specialtyId }) {
  const assigned = isCourseAssigned(course);
  return (
    <DrawerTrigger
      title={assigned ? "Manage Assignment" : "Assign Teacher To Course"}
      placement="right"
      drawerChildren={assigned ? ManageCourseAssignment : AssignCourse}
      drawerData={{ ...course, specialtyId }}
    >
      <button type="button" className="teacher-card__details-btn">
        {assigned ? "Manage Assignment" : "Assign Teacher"}
      </button>
    </DrawerTrigger>
  );
}

function TeacherCourse() {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const {
    data: courses,
    isLoading,
    error,
  } = useGetCourseSpecialtyId(specialty);

  const semesters = useMemo(
    () => (Array.isArray(courses?.data) ? courses.data : []),
    [courses],
  );
  const visibleSemesters = useMemo(
    () => filterSemesterCourses(semesters, debouncedSearch),
    [semesters, debouncedSearch],
  );
  const total = countCourses(semesters);
  const visibleTotal = countCourses(visibleSemesters);
  const isEmpty = error ? isEmptyListError(error) : total === 0;

  const handleSpecialtyChange = (next) => {
    setSpecialty(next);
    setSearch("");
  };

  const renderContent = () => {
    if (!specialty) {
      return (
        <EmptyState
          mascot="empty"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="Ready to manage teacher course assignment?"
          description="Select a specialty on the left to see its courses and who teaches them."
        />
      );
    }

    if (isLoading) {
      return (
        <div className="d-flex flex-column gap-2">
          <RectangleSkeleton width="20%" height="1rem" />
          <div className="teacher-card-grid">
            {[...Array(6)].map((_, index) => (
              <RectangleSkeleton key={index} height="14rem" />
            ))}
          </div>
        </div>
      );
    }

    if (error && !isEmptyListError(error)) {
      return (
        <EmptyState
          mascot="error"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title={error?.response?.data?.errors?.title || "Unable to load courses"}
          description={
            error?.response?.data?.errors?.description ||
            "Something went wrong while loading the courses for this specialty."
          }
        />
      );
    }

    if (isEmpty) {
      return (
        <EmptyState
          mascot="sad"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="No courses for this specialty"
          description="Create courses for this specialty first, then come back to assign teachers to them."
          actions={
            <EmptyStateButton icon={BookPlus} onClick={() => navigate("/courses")}>
              Manage Courses
            </EmptyStateButton>
          }
        />
      );
    }

    if (visibleTotal === 0) {
      return (
        <EmptyState
          mascot="notFound"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="No matching courses"
          description={`No course matches "${debouncedSearch}". Try a title, code, type, teacher or "unassigned".`}
          actions={
            <EmptyStateButton variant="secondary" onClick={() => setSearch("")}>
              Clear search
            </EmptyStateButton>
          }
        />
      );
    }

    return (
      <div className="d-flex flex-column gap-3">
        {visibleSemesters.map((semester) => {
          const semesterCourses = semester?.courses ?? [];
          const assigned = semesterCourses.filter(isCourseAssigned).length;
          return (
            <section key={semester?.semester_id} className="d-flex flex-column gap-2">
              <div className="d-flex flex-row align-items-baseline gap-2">
                <span className="font-size-sm fw-semibold text-capitalize">
                  {semester?.semester_name ?? "Semester"}
                </span>
                <span className="font-size-xs text-iron-500">
                  {assigned} of {semesterCourses.length} assigned
                </span>
              </div>
              <div className="teacher-card-grid">
                {semesterCourses.map((course) => (
                  <CourseCard key={course?.course_id} course={course}>
                    <CourseAction course={course} specialtyId={specialty} />
                  </CourseCard>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  };

  return (
    <main className="d-flex flex-row gap-2 h-100 w-100" style={{ minHeight: 0 }}>
      <SpecialtyNavigator
        title="Teacher courses"
        description="Select a specialty to assign teachers to its courses."
        specialty={specialty}
        setSpecialty={handleSpecialtyChange}
      />
      <div className="d-flex flex-column gap-2 h-100" style={{ width: "75%", minHeight: 0 }}>
        <div className="d-flex flex-row align-items-center justify-content-between gap-2 flex-shrink-0">
          <div className="w-50">
            <SearchInput
              placeholder="Search by course, code, type or teacher"
              hotkey="Ctrl+K"
              value={search}
              onChange={(value) => setSearch(value ?? "")}
              disabled={!specialty || isLoading || isEmpty}
            />
          </div>
          <div className="d-flex flex-row align-items-center gap-2">
            {specialty && !isLoading && total > 0 && (
              <span className="font-size-xs text-iron-500 text-nowrap">
                {debouncedSearch
                  ? `${visibleTotal} of ${total} courses`
                  : `${total} course${total === 1 ? "" : "s"}`}
              </span>
            )}
            <button className="font-size-sm bg-white border-none border rounded-3 p-2 d-flex flex-row align-items-center gap-2">
              <span>Export</span>
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
        {/* the only scrolling region; fills the space under the toolbar */}
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

export default TeacherCourse;
