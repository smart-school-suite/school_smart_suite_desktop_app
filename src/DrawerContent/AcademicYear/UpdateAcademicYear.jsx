import { Icon } from "@iconify/react";
import { BookOpen, CalendarDays, ClipboardList, Dot, GraduationCap, ReceiptText, RotateCcw, Wallet } from "lucide-react";
import { useMemo, useState } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import SectionCard from "../../components/Election/SectionCard";
import StatTile from "../../components/Election/StatTile";
import StatusPill from "../../components/Election/StatusPill";
import EmptyState from "../../components/errors/EmptyState";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import LockedList from "../../components/UpdateRules/LockedList";
import LockedValue from "../../components/UpdateRules/LockedValue";
import ReadOnlyNotice from "../../components/UpdateRules/ReadOnlyNotice";
import RuleDateField from "../../components/UpdateRules/RuleDateField";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetSchoolAcademicYearUpdateRules } from "../../hooks/academicYear/useGetSchoolAcademicYearUpdateRules";
import { useUpdateSchoolAcademicYear } from "../../hooks/academicYear/useUpdateSchoolAcademicYear";
import { useFormError } from "../../hooks/form/useFormError";
import { FIELD_LABELS, systemYearLimits } from "../../utils/academicYear/updateRules";
import { boundsFor, dateError } from "../../utils/updateRules/dateRules";
import { formatScheduleDate } from "../../utils/feeSchedule/scheduleRules";

const STATUS = {
  upcoming: { label: "Upcoming", tone: "primary" },
  ongoing: { label: "Ongoing", tone: "success", pulse: true },
  ended: { label: "Ended", tone: "neutral" },
};

const DEPENDENTS = [
  { key: "students", label: "Students", icon: GraduationCap },
  { key: "tuition_fees", label: "Tuition records", icon: Wallet, hintKey: "paid_tuition_fees", hint: (n) => `${n} with payments` },
  { key: "semesters", label: "Semesters", icon: CalendarDays },
  { key: "exams", label: "Exams", icon: ClipboardList },
  { key: "resit_exams", label: "Resit exams", icon: RotateCcw },
  { key: "fee_installments", label: "Fee installments", icon: ReceiptText },
];

/** What the academic year is: school year, status, specialty, level and dates. */
function YearSummary({ rules }) {
  const status = STATUS[rules.status] ?? STATUS.upcoming;
  return (
    <div className="d-flex flex-column gap-2 font-size-sm">
      <div className="d-flex flex-row align-items-center gap-2">
        <div
          style={{ width: "2.5rem", height: "2.5rem", display: "grid", placeItems: "center" }}
          className="bg-primary-50 rounded-2 text-primary-500 flex-shrink-0"
        >
          <BookOpen size={18} />
        </div>
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <div className="d-flex flex-row align-items-center gap-2">
            <span className="fw-semibold text-truncate">{rules.system_academic_year?.name ?? "Academic year"}</span>
            <StatusPill tone={status.tone} pulse={status.pulse}>{status.label}</StatusPill>
          </div>
          <div className="d-flex flex-row align-items-center text-iron-400 fw-light">
            <span className="text-truncate">{rules.specialty?.name ?? "-"}</span>
            <Dot size={16} />
            <span>{rules.specialty?.level ?? "-"}</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center gap-1 font-size-xs text-iron-500">
        <Icon icon="solar:calendar-linear" width={14} height={14} />
        <span className="fw-semibold text-iron-700">
          {formatScheduleDate(rules.start_date)} – {formatScheduleDate(rules.end_date)}
        </span>
      </div>
    </div>
  );
}

function Dependents({ counts }) {
  const shown = DEPENDENTS.filter((item) => (counts?.[item.key] ?? 0) > 0);
  if (shown.length === 0) return null;
  return (
    <SectionCard title="Linked to this academic year" description="Dates must keep these inside the academic year.">
      <div className="row g-2">
        {shown.map((item) => (
          <div key={item.key} className="col-6">
            <StatTile
              icon={item.icon}
              label={item.label}
              value={counts[item.key]}
              hint={item.hintKey ? item.hint(counts[item.hintKey] ?? 0) : undefined}
              tone="neutral"
            />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function UpdateAcademicYearForm({ rules, handleClose }) {
  const { fields } = rules;
  const [form, setForm] = useState({
    start_date: rules.start_date ?? "",
    end_date: rules.end_date ?? "",
    system_academic_year: rules.system_academic_year ?? null,
  });
  const { mutate: updateYear, isPending } = useUpdateSchoolAcademicYear(handleClose, rules.id);
  const { formError, errorBannerRef, handleServerError, setClientError, clearFormError } =
    useFormError("Failed To Update Academic Year");

  const systemYearOptions = fields.system_academic_year_id.options ?? [];
  const selectedSystemYear =
    systemYearOptions.find((option) => option.id === form.system_academic_year?.id) ?? form.system_academic_year;
  const systemYearChanged = form.system_academic_year?.id !== rules.system_academic_year?.id;

  const startBounds = useMemo(
    () => boundsFor("start_date", fields.start_date, { replace: systemYearLimits(selectedSystemYear), start: form.start_date, end: form.end_date }),
    [fields.start_date, selectedSystemYear, form.start_date, form.end_date],
  );
  const endBounds = useMemo(
    () => boundsFor("end_date", fields.end_date, { replace: systemYearLimits(selectedSystemYear), start: form.start_date, end: form.end_date }),
    [fields.end_date, selectedSystemYear, form.start_date, form.end_date],
  );

  const changes = {
    ...(fields.start_date.editable && form.start_date !== rules.start_date ? { start_date: form.start_date } : {}),
    ...(fields.end_date.editable && form.end_date !== rules.end_date ? { end_date: form.end_date } : {}),
    ...(systemYearChanged ? { system_academic_year_id: form.system_academic_year?.id } : {}),
  };
  const isDirty = Object.keys(changes).length > 0;

  // A date is checked when it changes, or when a new school year moves its limits.
  const startError = fields.start_date.editable && (changes.start_date || systemYearChanged)
    ? dateError("start date", form.start_date, startBounds) : null;
  const endError = fields.end_date.editable && (changes.end_date || systemYearChanged)
    ? dateError("end date", form.end_date, endBounds) : null;
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
    updateYear({ updateData: changes, schoolAcademicYearId: rules.id }, { onError: handleServerError });
  };

  const canSave = isDirty && problems.length === 0 && !isPending;
  const anyEditable = fields.start_date.editable || fields.end_date.editable || fields.system_academic_year_id.editable;

  return (
    <>
      <div className="d-flex flex-column gap-3 pt-2 px-2 pb-2 flex-shrink-0">
        <YearSummary rules={rules} />
      </div>

      <div className="drawer-content px-2 pb-3 d-flex flex-column gap-3">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="mb-0" />

        {rules.read_only && <ReadOnlyNotice>This academic year is read-only. Nothing on it can be changed.</ReadOnlyNotice>}

        {anyEditable && (
          <SectionCard title="What you can change" description="Only these fields can be changed right now." bodyClassName="p-3 d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-1">
              <label className="font-size-sm m-0">
                School year
                {fields.system_academic_year_id.editable && systemYearChanged && selectedSystemYear && (
                  <span className="text-iron-400 font-size-xs">
                    {" "}· dates must fall within {selectedSystemYear.year_start}–{selectedSystemYear.year_end}
                  </span>
                )}
              </label>
              {fields.system_academic_year_id.editable ? (
                <CustomDropdown
                  data={systemYearOptions}
                  displayKey={["name"]}
                  valueKey={["id"]}
                  onSelect={(value) => set("system_academic_year", value)}
                  placeholder="Select school year"
                  value={form.system_academic_year}
                  defaultValue={form.system_academic_year}
                  showFeedback={false}
                />
              ) : (
                <LockedValue value={rules.system_academic_year?.name ?? "-"} />
              )}
            </div>
            <RuleDateField
              id="academic-year-start"
              label="Start date"
              value={form.start_date}
              onChange={(value) => set("start_date", value)}
              bounds={startBounds}
              editable={fields.start_date.editable}
              lockedValue={formatScheduleDate(rules.start_date)}
            />
            <RuleDateField
              id="academic-year-end"
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
          fields={rules.fields}
          labels={FIELD_LABELS}
          description="Protected because of the academic year's status or the records that depend on it."
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
 * Edits a school academic year within the API's rules: the drawer loads what
 * can change, why the rest can't, and the allowed date range, from
 * GET school-academic-year/{id}/update-rules.
 */
function UpdateAcademicYear({ handleClose, drawerData }) {
  const { data, isLoading, error } = useGetSchoolAcademicYearUpdateRules(drawerData?.id);

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
          title={error?.response?.data?.errors?.title ?? "This academic year could not be loaded"}
          description={error?.response?.data?.errors?.description ?? "Check your connection and try again."}
        />
      </div>
    );
  }

  return <UpdateAcademicYearForm rules={data.data} handleClose={handleClose} />;
}

export default UpdateAcademicYear;
