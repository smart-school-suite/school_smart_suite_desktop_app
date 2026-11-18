import { Icon } from "@iconify/react";
import { CalendarClock, ClipboardList, Dot, Layers, UserRoundCheck } from "lucide-react";
import { useMemo, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import SectionCard from "../../components/Election/SectionCard";
import StatTile from "../../components/Election/StatTile";
import StatusPill from "../../components/Election/StatusPill";
import EmptyState from "../../components/errors/EmptyState";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import LockedList from "../../components/UpdateRules/LockedList";
import LockedValue from "../../components/UpdateRules/LockedValue";
import ReadOnlyNotice from "../../components/UpdateRules/ReadOnlyNotice";
import RuleDateField from "../../components/UpdateRules/RuleDateField";
import { useFormError } from "../../hooks/form/useFormError";
import { useGetSchoolSemesterUpdateRules } from "../../hooks/schoolSemester/useGetSchoolSemesterUpdateRules";
import { useUpdateSchoolSemester } from "../../hooks/schoolSemester/useUpdateSchoolSemester";
import { formatScheduleDate } from "../../utils/feeSchedule/scheduleRules";
import { boundsFor, dateError } from "../../utils/updateRules/dateRules";

const STATUS = {
  upcoming: { label: "Upcoming", tone: "primary" },
  ongoing: { label: "Ongoing", tone: "success", pulse: true },
  ended: { label: "Ended", tone: "neutral" },
};

const FIELD_LABELS = {
  school_year_id: "Academic year",
  semester_id: "Semester",
  start_date: "Start date",
  end_date: "End date",
};

const DEPENDENTS = [
  { key: "exams", label: "Exams", icon: ClipboardList },
  {
    key: "timetables",
    label: "Timetable versions",
    icon: CalendarClock,
    hint: (counts) => (counts.timetable_published ? "Timetable published" : "Not published yet"),
  },
  { key: "joint_courses", label: "Joint courses", icon: Layers },
  { key: "teacher_availabilities", label: "Teacher availabilities", icon: UserRoundCheck },
];

/** What the semester is: name, status, academic year, specialty, level and dates. */
function SemesterSummary({ rules }) {
  const status = STATUS[rules.status] ?? STATUS.upcoming;
  const year = rules.academic_year ?? {};
  return (
    <div className="d-flex flex-column gap-2 font-size-sm">
      <div className="d-flex flex-row align-items-center gap-2">
        <div
          style={{ width: "2.5rem", height: "2.5rem", display: "grid", placeItems: "center" }}
          className="bg-primary-50 rounded-2 text-primary-500 flex-shrink-0"
        >
          <Icon icon="solar:calendar-linear" width={20} height={20} />
        </div>
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <div className="d-flex flex-row align-items-center gap-2">
            <span className="fw-semibold text-truncate">{rules.semester?.name ?? "Semester"}</span>
            <StatusPill tone={status.tone} pulse={status.pulse}>{status.label}</StatusPill>
          </div>
          <div className="d-flex flex-row align-items-center text-iron-400 fw-light" style={{ minWidth: 0 }}>
            <span className="text-truncate">{year.specialty ?? "-"}</span>
            <Dot size={16} className="flex-shrink-0" />
            <span className="text-nowrap">{year.level ?? "-"}</span>
            <Dot size={16} className="flex-shrink-0" />
            <span className="text-nowrap">{year.name ?? "-"}</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap align-items-center gap-3 font-size-xs text-iron-500">
        <div className="d-flex flex-row align-items-center gap-1">
          <Icon icon="solar:calendar-linear" width={14} height={14} />
          <span className="fw-semibold text-iron-700">
            {formatScheduleDate(rules.start_date)} – {formatScheduleDate(rules.end_date)}
          </span>
        </div>
        {year.start_date && (
          <span>
            Academic year {formatScheduleDate(year.start_date)} – {formatScheduleDate(year.end_date)}
          </span>
        )}
      </div>
    </div>
  );
}

function Dependents({ counts }) {
  const shown = DEPENDENTS.filter((item) => (counts?.[item.key] ?? 0) > 0);
  if (shown.length === 0) return null;
  return (
    <SectionCard title="Linked to this semester" description="These were set up for this semester.">
      <div className="row g-2">
        {shown.map((item) => (
          <div key={item.key} className="col-6">
            <StatTile icon={item.icon} label={item.label} value={counts[item.key]} hint={item.hint?.(counts)} tone="neutral" />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function UpdateSemesterForm({ rules, handleClose }) {
  const { fields } = rules;
  const [form, setForm] = useState({
    start_date: rules.start_date ?? "",
    end_date: rules.end_date ?? "",
    semester: rules.semester ?? null,
  });
  const { mutate: updateSemester, isPending } = useUpdateSchoolSemester(handleClose, rules.id);
  const { formError, errorBannerRef, handleServerError, setClientError, clearFormError } =
    useFormError("Failed To Update Semester");

  const semesterOptions = fields.semester_id.options ?? [];
  const semesterChanged = form.semester?.id !== rules.semester?.id;

  const startBounds = useMemo(
    () => boundsFor("start_date", fields.start_date, { start: form.start_date, end: form.end_date }),
    [fields.start_date, form.start_date, form.end_date],
  );
  const endBounds = useMemo(
    () => boundsFor("end_date", fields.end_date, { start: form.start_date, end: form.end_date }),
    [fields.end_date, form.start_date, form.end_date],
  );

  const changes = {
    ...(fields.start_date.editable && form.start_date !== rules.start_date ? { start_date: form.start_date } : {}),
    ...(fields.end_date.editable && form.end_date !== rules.end_date ? { end_date: form.end_date } : {}),
    ...(semesterChanged ? { semester_id: form.semester?.id } : {}),
  };
  const isDirty = Object.keys(changes).length > 0;

  const startError = changes.start_date !== undefined ? dateError("start date", form.start_date, startBounds) : null;
  const endError = changes.end_date !== undefined ? dateError("end date", form.end_date, endBounds) : null;
  const problems = [startError, endError].filter(Boolean);

  const set = (field, value) => {
    clearFormError();
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = () => {
    if (problems.length > 0) {
      setClientError("Some dates need attention", problems);
      return;
    }
    clearFormError();
    updateSemester({ schoolSemesterId: rules.id, updateData: changes }, { onError: handleServerError });
  };

  const canSave = isDirty && problems.length === 0 && !isPending;
  const anyEditable = fields.start_date.editable || fields.end_date.editable || fields.semester_id.editable;

  return (
    <>
      <div className="d-flex flex-column gap-3 pt-2 px-2 pb-2 flex-shrink-0">
        <SemesterSummary rules={rules} />
      </div>

      <div className="drawer-content px-2 pb-3 d-flex flex-column gap-3">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="mb-0" />

        {rules.read_only && <ReadOnlyNotice>This semester is read-only. Nothing on it can be changed.</ReadOnlyNotice>}

        {anyEditable && (
          <SectionCard title="What you can change" description="Only these fields can be changed right now." bodyClassName="p-3 d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-1">
              <label className="font-size-sm m-0">Semester</label>
              {fields.semester_id.editable ? (
                <CustomDropdown
                  data={semesterOptions}
                  displayKey={["name"]}
                  valueKey={["id"]}
                  onSelect={(value) => set("semester", value)}
                  placeholder="Select semester"
                  value={form.semester}
                  defaultValue={form.semester}
                  showFeedback={false}
                />
              ) : (
                <LockedValue value={rules.semester?.name ?? "-"} />
              )}
            </div>
            <RuleDateField
              id="semester-start"
              label="Start date"
              value={form.start_date}
              onChange={(value) => set("start_date", value)}
              bounds={startBounds}
              editable={fields.start_date.editable}
              lockedValue={formatScheduleDate(rules.start_date)}
            />
            <RuleDateField
              id="semester-end"
              label="End date"
              value={form.end_date}
              onChange={(value) => set("end_date", value)}
              bounds={endBounds}
              editable={fields.end_date.editable}
              lockedValue={formatScheduleDate(rules.end_date)}
            />
          </SectionCard>
        )}

        <LockedList
          fields={fields}
          labels={FIELD_LABELS}
          description="Protected because of the semester's status or the records set up for it."
        />
        <Dependents counts={rules.dependents} />
      </div>

      <div className="drawer-footer">
        <div className="d-flex flex-column w-100 font-size-sm">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between gap-3 p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
              {anyEditable ? "Cancel" : "Close"}
            </button>
            {anyEditable && (
              <div className="d-flex flex-row align-items-center gap-3" style={{ minWidth: 0 }}>
                <span
                  className={`text-truncate ${problems.length ? "text-red-600" : isDirty ? "text-fern-600" : "text-iron-500"}`}
                  title={problems[0]}
                >
                  {problems.length ? problems[0] : isDirty ? "Ready to save" : "No changes yet"}
                </span>
                <button
                  type="button"
                  className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 flex-shrink-0"
                  onClick={handleSave}
                  disabled={!canSave}
                  style={{ opacity: canSave ? 1 : 0.6 }}
                >
                  {isPending ? <SingleSpinner /> : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Edits a school semester within the API's rules: the drawer loads what can
 * change, why the rest can't, and the allowed date range, from
 * GET school-semester/{id}/update-rules.
 */
function UpdateSemester({ handleClose, drawerData }) {
  const { data, isLoading, error } = useGetSchoolSemesterUpdateRules(drawerData?.id);

  if (isLoading) {
    return (
      <div className="d-flex flex-column gap-3 p-2">
        <RectangleSkeleton height="3.5rem" />
        <RectangleSkeleton height="12rem" />
        <RectangleSkeleton height="7rem" />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="drawer-content p-2">
        <EmptyState
          mascot="error"
          height="100%"
          mascotHeight="7rem"
          title={error?.response?.data?.errors?.title ?? "This semester could not be loaded"}
          description={error?.response?.data?.errors?.description ?? "Check your connection and try again."}
        />
      </div>
    );
  }

  return <UpdateSemesterForm rules={data.data} handleClose={handleClose} />;
}

export default UpdateSemester;
