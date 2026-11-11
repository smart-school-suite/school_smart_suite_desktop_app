import { ArrowRightLeft, UserMinus, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { CourseTeacher } from "../../components/Card/CourseCard";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import SearchInput from "../../components/input/search";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import TeacherSelectList from "../../components/Teacher/TeacherSelectList";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useFormError } from "../../hooks/form/useFormError";
import { useGetTeacherBySpecialty } from "../../hooks/teacher/useGetTeacherBySpecialty";
import { useSpecialtyTeachersEmptyState } from "../../hooks/teacher/useSpecialtyTeachersEmptyState";
import { useChangeTeacherCourse } from "../../hooks/teacherCourse/useChangeTeacherCourse";
import { useRemoveAssignedTeacherCourse } from "../../hooks/teacherCourse/useRemoveTeacherAssignedCourse";
import CourseSummary from "./CourseSummary";

const ACTIONS = [
  {
    id: "update",
    icon: ArrowRightLeft,
    title: "Change Teacher",
    description: "Give this course to another teacher in the specialty.",
  },
  {
    id: "remove",
    icon: UserMinus,
    title: "Remove Assignment",
    description: "Leave this course without a teacher for now.",
  },
];

function Footer({ children }) {
  return (
    <div className="drawer-footer font-size-sm">
      <div className="d-flex flex-column w-100">
        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
        <div className="d-flex flex-row align-items-center justify-content-between gap-2 p-2">
          {children}
        </div>
      </div>
    </div>
  );
}

function ManageCourseAssignment({ handleClose, drawerData }) {
  const [action, setAction] = useState(null);

  return (
    <>
      <div className="d-flex flex-column gap-3 pt-2 px-2 pb-2 flex-shrink-0 font-size-sm">
        <CourseSummary course={drawerData} />
        <div className="d-flex flex-column gap-1">
          <span className="teacher-card__label">Current teacher</span>
          <CourseTeacher course={drawerData} />
        </div>
        <div className="d-flex flex-column gap-1">
          <span className="teacher-card__label">Choose action</span>
          <div className="d-flex flex-row gap-2" role="radiogroup" aria-label="Choose action">
            {ACTIONS.map((item) => {
              const Icon = item.icon;
              const active = action === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setAction(item.id)}
                  className={`teacher-card teacher-card--selectable text-start flex-grow-1 gap-1 ${
                    active ? "teacher-card--selected" : ""
                  }`}
                  style={{ flexBasis: 0, height: "auto" }}
                >
                  <span className="d-flex flex-row align-items-center gap-2 fw-semibold">
                    <Icon size={16} className={active ? "text-primary-500" : "text-iron-500"} />
                    {item.title}
                  </span>
                  <span className="font-size-xs text-iron-500">{item.description}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {action === "update" ? (
        <ChangeTeacher drawerData={drawerData} handleClose={handleClose} />
      ) : action === "remove" ? (
        <RemoveAssignment
          drawerData={drawerData}
          handleClose={handleClose}
          onBack={() => setAction(null)}
        />
      ) : (
        <>
          <div className="drawer-content px-2" />
          <Footer>
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
              Cancel
            </button>
            <span className="text-iron-400">Choose an action to continue</span>
          </Footer>
        </>
      )}
    </>
  );
}
export default ManageCourseAssignment;

function ChangeTeacher({ drawerData, handleClose }) {
  const navigate = useNavigate();
  const specialtyId = drawerData?.specialtyId;
  const currentTeacher = drawerData?.teachers?.[0];
  const { data, isLoading, error } = useGetTeacherBySpecialty(specialtyId);
  const { mutate: changeTeacher, isPending } = useChangeTeacherCourse(specialtyId, handleClose);
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Failed To Change Teacher");

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  const allTeachers = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);
  // The current teacher is shown above; only the others can take the course.
  const candidates = useMemo(
    () => allTeachers.filter((teacher) => teacher.id !== currentTeacher?.id),
    [allTeachers, currentTeacher],
  );
  const { empty: specialtyEmpty, isCheckingSchool } = useSpecialtyTeachersEmptyState({
    teachers: allTeachers,
    isLoading,
    error,
    handleClose,
  });
  // The specialty has teachers, but the current one is the only one.
  const onlyCurrentTeacher = !isLoading && allTeachers.length > 0 && candidates.length === 0;
  const empty = onlyCurrentTeacher
    ? {
        mascot: "empty",
        title: "No other teachers in this specialty",
        description: `${currentTeacher?.name ?? "The current teacher"} is the only teacher in this specialty. Assign more teachers to the specialty to hand this course over.`,
        actions: (
          <EmptyStateButton
            icon={UserPlus}
            onClick={() => {
              handleClose?.();
              navigate("/teacher-specialty");
            }}
          >
            Assign Teachers To Specialty
          </EmptyStateButton>
        ),
      }
    : specialtyEmpty;

  const handleChange = () => {
    if (!selected) return;
    clearFormError();
    changeTeacher(
      {
        course_id: drawerData?.course_id,
        new_teacher_id: selected.id,
        old_teacher_id: currentTeacher?.id,
      },
      { onError: handleServerError },
    );
  };

  return (
    <>
      {candidates.length > 0 && (
        <div className="d-flex flex-column gap-2 px-2 pb-2 flex-shrink-0 font-size-sm">
          <SearchInput
            placeholder="Search by name, qualification or level"
            value={search}
            onChange={(value) => setSearch(value ?? "")}
            enableShortcut={false}
          />
          <span className="text-iron-400 fw-light">Other teachers · {candidates.length}</span>
        </div>
      )}
      <div className="drawer-content px-2 pb-3 d-flex flex-column">
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        <div className="flex-grow-1">
          <TeacherSelectList
            teachers={candidates}
            isLoading={isLoading || isCheckingSchool}
            error={error}
            search={debouncedSearch}
            onClearSearch={() => setSearch("")}
            isSelected={(teacher) => selected?.id === teacher.id}
            onSelect={(teacher) =>
              setSelected((current) => (current?.id === teacher.id ? null : teacher))
            }
            empty={empty}
            noun="other teacher in this specialty"
          />
        </div>
      </div>
      <Footer>
        <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
          Cancel
        </button>
        <button
          type="button"
          className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 text-truncate"
          style={{ maxWidth: "60%", opacity: selected ? 1 : 0.6 }}
          onClick={handleChange}
          disabled={isPending || !selected}
        >
          {isPending ? <SingleSpinner /> : selected ? `Change to ${selected.name}` : "Change Teacher"}
        </button>
      </Footer>
    </>
  );
}

function RemoveAssignment({ drawerData, handleClose, onBack }) {
  const currentTeacher = drawerData?.teachers?.[0];
  const { mutate: removeAssignedCourse, isPending } = useRemoveAssignedTeacherCourse(
    drawerData?.specialtyId,
    handleClose,
  );
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Failed To Remove Assignment");

  const handleRemove = () => {
    clearFormError();
    removeAssignedCourse(
      {
        teacher_id: currentTeacher?.id,
        courseIds: [{ course_id: drawerData?.course_id }],
      },
      { onError: handleServerError },
    );
  };

  return (
    <>
      <div className="drawer-content px-2 pb-3 d-flex flex-column">
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        {currentTeacher ? (
          <div className="d-flex flex-column gap-2 rounded-3 bg-iron-50 p-3 font-size-sm">
            <span className="fw-semibold">Remove {currentTeacher.name} from this course?</span>
            <span className="text-iron-500">
              The course will show as <span className="fw-medium">Unassigned</span> until you
              assign another teacher. {currentTeacher.name} stays in the specialty and keeps
              their other courses.
            </span>
          </div>
        ) : (
          <EmptyState
            mascot="notFound"
            height="100%"
            mascotHeight="6rem"
            title="No teacher to remove"
            description="This course has no assigned teacher."
          />
        )}
      </div>
      <Footer>
        <button
          type="button"
          className="border-none bg-none"
          onClick={onBack}
          disabled={isPending}
        >
          Back
        </button>
        <button
          type="button"
          className="border-none rounded-3 bg-danger text-white font-size-sm px-3 py-2"
          onClick={handleRemove}
          disabled={isPending || !currentTeacher}
        >
          {isPending ? <SingleSpinner /> : "Remove Assignment"}
        </button>
      </Footer>
    </>
  );
}
