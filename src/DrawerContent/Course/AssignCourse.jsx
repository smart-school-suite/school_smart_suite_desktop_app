import { useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import SearchInput from "../../components/input/search";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import TeacherSelectList from "../../components/Teacher/TeacherSelectList";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useFormError } from "../../hooks/form/useFormError";
import { useGetTeacherBySpecialty } from "../../hooks/teacher/useGetTeacherBySpecialty";
import { useAssignTeacherCourse } from "../../hooks/teacherCourse/useAssignTeacherCourse";
import CourseSummary from "./CourseSummary";
import { useSpecialtyTeachersEmptyState } from "../../hooks/teacher/useSpecialtyTeachersEmptyState";

function AssignCourse({ handleClose, drawerData }) {
  const specialtyId = drawerData?.specialtyId;
  const { data, isLoading, error } = useGetTeacherBySpecialty(specialtyId);
  const { mutate: assignTeacherCourse, isPending } = useAssignTeacherCourse(
    specialtyId,
    handleClose,
  );
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Failed To Assign Course");

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);

  const teachers = Array.isArray(data?.data) ? data.data : [];
  const { empty, isCheckingSchool } = useSpecialtyTeachersEmptyState({
    teachers,
    isLoading,
    error,
    handleClose,
  });

  const handleSubmit = () => {
    if (!selected) return;
    clearFormError();
    assignTeacherCourse(
      {
        teacher_id: selected.id,
        courseIds: [{ course_id: drawerData?.course_id }],
      },
      { onError: handleServerError },
    );
  };

  const hasTeachers = !isLoading && teachers.length > 0;

  return (
    <>
      <div className="d-flex flex-column gap-3 pt-2 px-2 pb-2 flex-shrink-0">
        <CourseSummary course={drawerData} />
        <SearchInput
          placeholder="Search by name, qualification or level"
          value={search}
          onChange={(value) => setSearch(value ?? "")}
          enableShortcut={false}
          disabled={!hasTeachers}
        />
        {hasTeachers && (
          <span className="font-size-sm text-iron-400 fw-light">
            Teachers in this specialty · {teachers.length}
          </span>
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
            isLoading={isLoading || isCheckingSchool}
            error={error}
            search={debouncedSearch}
            onClearSearch={() => setSearch("")}
            isSelected={(teacher) => selected?.id === teacher.id}
            onSelect={(teacher) =>
              setSelected((current) => (current?.id === teacher.id ? null : teacher))
            }
            empty={empty}
            noun="teacher in this specialty"
          />
        </div>
      </div>

      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between gap-2 p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
              Cancel
            </button>
            <button
              type="button"
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 text-truncate"
              style={{ maxWidth: "60%", opacity: selected ? 1 : 0.6 }}
              onClick={handleSubmit}
              disabled={isPending || !selected}
            >
              {isPending ? <SingleSpinner /> : selected ? `Assign ${selected.name}` : "Assign Teacher"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssignCourse;
