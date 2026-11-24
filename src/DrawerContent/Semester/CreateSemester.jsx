import { differenceInCalendarDays, format, isValid, parseISO } from "date-fns";
import { CalendarRange, Check, Copy, Info, Lightbulb, Sparkles } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import QueryErrorState from "../../components/errors/QueryErrorState";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { DateRangeInput } from "../../components/FormComponents/InputComponents";
import { Badge, BADGE_VARIANT } from "../../components/Renderer/badges";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useFormError } from "../../hooks/form/useFormError";
import { useCreateSchoolSemester } from "../../hooks/schoolSemester/useCreateSchoolSemester";
import { useGetSchoolSemesterCreationOptions } from "../../hooks/schoolSemester/useGetSchoolSemesterCreationOptions";

const STATUS_LABEL = { ongoing: "Ongoing", upcoming: "Upcoming", ended: "Ended" };

const toDate = (value) => {
  const date = value ? parseISO(value) : null;
  return date && isValid(date) ? date : null;
};

const shortDate = (value) => {
  const date = toDate(value);
  return date ? format(date, "d MMM yyyy") : value;
};

const dateSpan = (start, end) => `${shortDate(start)} – ${shortDate(end)}`;

const isCompleteDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value ?? "") && Boolean(toDate(value));

function Step({ number, title, tip, disabled, children }) {
  return (
    <section className={`create-step d-flex flex-column gap-2 ${disabled ? "create-step--disabled" : ""}`} aria-disabled={disabled}>
      <div className="d-flex align-items-center gap-2">
        <span className="create-step__number d-grid place-items-center rounded-circle font-size-xs fw-semibold">{number}</span>
        <span className="fw-semibold">{title}</span>
      </div>
      {tip && (
        <span className="d-flex align-items-center gap-1 text-iron-500 font-size-xs">
          <Lightbulb size={13} strokeWidth={1.75} className="text-old-lace-500 flex-shrink-0" />
          {tip}
        </span>
      )}
      <div>{children}</div>
    </section>
  );
}

function SemesterChoice({ option, selected, recommended, onSelect }) {
  const taken = option.created;
  return (
    <button
      type="button"
      disabled={taken}
      onClick={() => onSelect(option.id)}
      aria-pressed={selected}
      className={`semester-choice d-flex flex-column align-items-start gap-1 text-start rounded-3 border p-2 ${
        selected ? "semester-choice--selected" : ""
      } ${taken ? "semester-choice--taken" : ""}`}
    >
      <span className="d-flex align-items-center justify-content-between gap-2 w-100">
        <span className="fw-medium text-capitalize text-truncate">{option.name}</span>
        {taken ? (
          <Check size={15} strokeWidth={2} className="text-fern-600 flex-shrink-0" />
        ) : recommended ? (
          <Badge variant={BADGE_VARIANT.PRIMARY} label="Next up" showIcon={false} />
        ) : null}
      </span>
      <span className="font-size-xs text-iron-500">
        {taken ? `Added · ${dateSpan(option.existing.start_date, option.existing.end_date)}` : "Available"}
      </span>
    </button>
  );
}

function CreateSemesterSkeleton() {
  return (
    <div className="d-flex flex-column gap-4 p-3">
      {[0, 1, 2].map((index) => (
        <div className="d-flex flex-column gap-2" key={index}>
          <RectangleSkeleton width="40%" height="1rem" />
          <RectangleSkeleton width="100%" height="3rem" />
        </div>
      ))}
    </div>
  );
}

function CreateSemester({ handleClose }) {
  const dateRangeRef = useRef();
  const { data, isLoading, error, refetch } = useGetSchoolSemesterCreationOptions();
  const { mutate: createSchoolSemester, isPending } = useCreateSchoolSemester(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Couldn't create the semester");

  const [yearId, setYearId] = useState(null);
  const [semesterId, setSemesterId] = useState(null);
  const [dates, setDates] = useState({ start_date: "", end_date: "" });
  const [datesKey, setDatesKey] = useState(0);

  const options = data?.data;
  const years = useMemo(
    () =>
      (options?.school_years ?? []).map((year) => ({
        ...year,
        meta: [year.academic_year, STATUS_LABEL[year.status]].filter(Boolean).join(" · "),
      })),
    [options],
  );
  const year = years.find((item) => item.id === yearId) ?? null;
  const semester = year?.semesters.find((item) => item.id === semesterId) ?? null;
  const suggestion = semester?.suggested ?? null;

  const validationSchema = useMemo(
    () =>
      dateRangeValidationSchema({
        minDate: year?.start_date,
        maxDate: year?.end_date,
        allowSameDay: false,
      }),
    [year?.start_date, year?.end_date],
  );

  const resetDates = (next = { start_date: "", end_date: "" }) => {
    setDates(next);
    setDatesKey((key) => key + 1);
  };

  const chooseYear = (selected) => {
    clearFormError();
    const next = years.find((item) => item.id === selected?.id) ?? null;
    setYearId(next?.id ?? null);
    setSemesterId(next?.recommended_semester_id ?? null);
    resetDates();
  };

  const chooseSemester = (id) => {
    clearFormError();
    setSemesterId(id);
    resetDates();
  };

  const applySuggestion = () => {
    if (!suggestion) return;
    clearFormError();
    resetDates({ start_date: suggestion.start_date, end_date: suggestion.end_date });
  };

  const datesComplete = isCompleteDate(dates.start_date) && isCompleteDate(dates.end_date);
  const datesOk = datesComplete && validationSchema.isValidSync(dates);
  const canCreate = Boolean(year && semester && !semester.created && datesOk) && !isPending;

  const copies = useMemo(() => {
    if (!year || !semester || !datesComplete || !options?.auto_creation?.enabled) return [];
    return year.copy_targets.filter(
      (target) =>
        !target.existing_semester_ids.includes(semester.id) &&
        target.start_date <= dates.start_date &&
        target.end_date >= dates.end_date,
    );
  }, [year, semester, datesComplete, dates, options?.auto_creation?.enabled]);

  const startsInPast = datesComplete && options?.today && dates.start_date < options.today;
  const lengthInWeeks = datesComplete
    ? Math.max(1, Math.round((differenceInCalendarDays(toDate(dates.end_date), toDate(dates.start_date)) + 1) / 7))
    : null;

  const create = async () => {
    const [startOk, endOk] = await Promise.all([
      dateRangeRef.current?.preValidateStart(),
      dateRangeRef.current?.preValidateEnd(),
    ]);
    if (!year || !semester || !startOk || !endOk) {
      setClientError("Almost there", "Check the highlighted dates.");
      return;
    }
    clearFormError();
    createSchoolSemester(
      { school_year_id: year.id, semester_id: semester.id, start_date: dates.start_date, end_date: dates.end_date },
      { onError: handleServerError },
    );
  };

  if (isLoading) return <CreateSemesterSkeleton />;
  if (error) {
    return (
      <div className="p-3">
        <QueryErrorState error={error} fallbackTitle="Couldn't load semester options" onRetry={refetch} />
      </div>
    );
  }

  return (
    <>
      <div className="drawer-content scrollbar-xs px-3 pt-3 pb-2 d-flex flex-column gap-4 font-size-sm">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} />

        <Step number={1} title="Class" tip="Current years are listed first.">
          {years.length ? (
            <CustomDropdown
              data={years}
              displayKey={["label", "meta"]}
              valueKey={["id"]}
              placeholder="Pick a class"
              onSelect={chooseYear}
              value={year}
              showFeedback={false}
              dropdownWidth="27rem"
            />
          ) : (
            <span className="d-flex align-items-center gap-2 text-iron-500">
              <Info size={14} strokeWidth={1.75} />
              Add an academic year first.
            </span>
          )}
        </Step>

        <Step
          number={2}
          title="Semester"
          tip={year ? (year.recommended_semester_id ? "We picked the next one." : "All semesters are added.") : null}
          disabled={!year}
        >
          {year ? (
            <div className="semester-choices d-grid gap-2">
              {year.semesters.map((option) => (
                <SemesterChoice
                  key={option.id}
                  option={option}
                  selected={option.id === semesterId}
                  recommended={option.id === year.recommended_semester_id}
                  onSelect={chooseSemester}
                />
              ))}
            </div>
          ) : (
            <span className="text-iron-400">Pick a class first.</span>
          )}
        </Step>

        <Step
          number={3}
          title="Dates"
          tip={year ? `Between ${dateSpan(year.start_date, year.end_date)}.` : null}
          disabled={!semester || semester.created}
        >
          {semester && !semester.created ? (
            <div className="d-flex flex-column gap-2">
              {suggestion && (
                <button
                  type="button"
                  className="suggestion-chip d-inline-flex align-items-center gap-2 align-self-start border-0 rounded-pill px-3 py-1-5 bg-primary-50 text-primary-600"
                  onClick={applySuggestion}
                >
                  <Sparkles size={14} strokeWidth={1.75} />
                  <span>
                    Use suggested dates <span className="fw-semibold">{dateSpan(suggestion.start_date, suggestion.end_date)}</span>
                  </span>
                </button>
              )}
              <DateRangeInput
                key={`${semesterId}-${datesKey}`}
                ref={dateRangeRef}
                validationSchema={validationSchema}
                startValue={dates.start_date}
                endValue={dates.end_date}
                placeholderStart={suggestion?.start_date ?? year.start_date}
                placeholderEnd={suggestion?.end_date ?? year.end_date}
                onStartDateChange={(value) => setDates((current) => ({ ...current, start_date: value }))}
                onEndDateChange={(value) => setDates((current) => ({ ...current, end_date: value }))}
              />
              {startsInPast && (
                <span className="d-flex align-items-center gap-1 text-iron-500 font-size-xs">
                  <Info size={13} strokeWidth={1.75} />
                  Already started? That's fine.
                </span>
              )}
            </div>
          ) : (
            <span className="text-iron-400">Pick a semester first.</span>
          )}
        </Step>

        {year && semester && !semester.created && datesOk && (
          <div className="semester-summary d-flex gap-3 rounded-3 p-3 bg-primary-50" aria-live="polite">
            <CalendarRange size={18} strokeWidth={1.75} className="text-primary-500 flex-shrink-0 mt-1" />
            <div className="d-flex flex-column gap-1 overflow-hidden">
              <span className="fw-semibold text-capitalize">{semester.name}</span>
              <span className="text-iron-600 text-truncate">{year.label}</span>
              <span className="text-iron-600">
                {dateSpan(dates.start_date, dates.end_date)} · {lengthInWeeks} {lengthInWeeks === 1 ? "week" : "weeks"}
              </span>
              {copies.length > 0 && (
                <span className="d-flex align-items-center gap-1 text-primary-600 font-size-xs" title={copies.map((target) => target.label).join(", ")}>
                  <Copy size={12} strokeWidth={1.75} />
                  Also added to {copies.length} other {copies.length === 1 ? "class" : "classes"}.
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="drawer-footer border-top px-3 py-2 font-size-sm">
        <button type="button" className="btn btn-light font-size-sm px-3 me-auto" onClick={handleClose} disabled={isPending}>
          Cancel
        </button>
        <button
          type="button"
          className={`profile-primary-btn border-0 rounded-3 primary-background text-white font-size-sm px-3 d-inline-flex align-items-center gap-2 text-capitalize ${
            canCreate ? "" : "opacity-50"
          }`}
          onClick={create}
          disabled={!canCreate}
        >
          {isPending ? <SingleSpinner /> : semester && !semester.created ? `Create ${semester.name}` : "Create semester"}
        </button>
      </div>
    </>
  );
}

export default CreateSemester;
