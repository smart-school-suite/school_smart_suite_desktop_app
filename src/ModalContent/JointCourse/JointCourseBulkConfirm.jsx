import ChipRow from "../../components/Card/ChipRow";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import { useFormError } from "../../hooks/form/useFormError";

/**
 * The selected joint courses, whichever way the bulk modal was opened: the
 * toolbar's dropdown passes rowData.selectedCourses, the toast's icon button
 * (ModalButton) passes bulkData.
 */
export const selectedJointCourses = (rowData, bulkData) =>
  rowData?.selectedCourses ?? (Array.isArray(bulkData) ? bulkData : bulkData?.selectedCourses) ?? [];

const courseLabel = (course) =>
  [course?.course_code, course?.course_title].filter(Boolean).join(" · ") || "Untitled course";

/**
 * Confirmation for a bulk joint course action: what will happen, to which
 * courses, and the server's error if it fails.
 */
export default function JointCourseBulkConfirm({
  courses,
  title,
  icon,
  description,
  note,
  confirmLabel,
  tone,
  errorTitle,
  mutate,
  isPending,
  handleClose,
}) {
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError(errorTitle);
  const count = courses.length;

  const handleConfirm = () => {
    clearFormError();
    mutate(
      { courseIds: courses.map((course) => ({ course_id: course.id })) },
      { onError: handleServerError },
    );
  };

  return (
    <ConfirmDialog
      title={title}
      icon={icon}
      description={description}
      confirmLabel={confirmLabel}
      tone={tone}
      onConfirm={handleConfirm}
      onCancel={handleClose}
      isPending={isPending}
      confirmDisabled={count === 0}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      <div className="d-flex flex-column gap-2">
        <span className="font-size-xs text-iron-500">
          {count} joint {count === 1 ? "course" : "courses"} selected
        </span>
        <ChipRow
          items={courses.map((course) => ({ key: course.id, label: courseLabel(course) }))}
          label="Selected joint courses"
        />
        {note && <span className="font-size-xs text-iron-500">{note}</span>}
      </div>
    </ConfirmDialog>
  );
}
