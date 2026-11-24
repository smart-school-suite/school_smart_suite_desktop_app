import { differenceInCalendarDays, format, isValid, parseISO } from "date-fns";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  CalendarRange,
  Check,
  ChevronLeft,
  CircleCheck,
  Copy,
  Dot,
  Info,
  Layers,
  Lightbulb,
  SearchX,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import EmptyState, {
  EmptyStateButton,
} from "../../components/errors/EmptyState";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import QueryErrorState from "../../components/errors/QueryErrorState";
import { DateRangeInput } from "../../components/FormComponents/InputComponents";
import SearchInput from "../../components/input/search";
import {
  Badge,
  BADGE_CONTEXT,
  BADGE_VARIANT,
} from "../../components/Renderer/badges";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useFormError } from "../../hooks/form/useFormError";
import { useCreateSchoolSemester } from "../../hooks/schoolSemester/useCreateSchoolSemester";
import { useGetSchoolSemesterCreationOptions } from "../../hooks/schoolSemester/useGetSchoolSemesterCreationOptions";
const STEPS = ["Level & semester", "Dates"];

const toDate = (value) => {
  const date = value ? parseISO(value) : null;
  return date && isValid(date) ? date : null;
};

const shortDate = (value) => {
  const date = toDate(value);
  return date ? format(date, "d MMM yyyy") : value;
};

const dateSpan = (start, end) => `${shortDate(start)} – ${shortDate(end)}`;

const isCompleteDate = (value) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value ?? "") && Boolean(toDate(value));

function Step({ number, title, context, tip, children }) {
  return (
    <section
      className="d-flex flex-column gap-2"
      aria-label={`Step ${number} of ${STEPS.length}: ${title}`}
    >
      <div className="d-flex flex-column">
        <span className="font-size-xs text-iron-400" aria-live="polite">
          Step {number} of {STEPS.length}
        </span>
        <span className="fw-semibold font-size-md">{title}</span>
        {context && (
          <span className="font-size-xs text-iron-500 text-truncate text-capitalize">
            {context}
          </span>
        )}
      </div>
      {tip && (
        <span className="d-flex align-items-center gap-1 text-iron-500 font-size-xs">
          <Lightbulb
            size={13}
            strokeWidth={1.75}
            className="text-old-lace-500 flex-shrink-0"
          />
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
        <span className="fw-medium text-capitalize text-truncate">
          {option.name}
        </span>
        {taken ? (
          <Check
            size={15}
            strokeWidth={2}
            className="text-fern-600 flex-shrink-0"
          />
        ) : recommended ? (
          <Badge
            variant={BADGE_VARIANT.PRIMARY}
            label="Next up"
            showIcon={false}
          />
        ) : null}
      </span>
      <span className="font-size-xs text-iron-500">
        {taken
          ? `Added · ${dateSpan(option.existing.start_date, option.existing.end_date)}`
          : "Available"}
      </span>
    </button>
  );
}

function SafeRange({ range, year }) {
  const start = range?.start_date ?? year.start_date;
  const end = range?.end_date ?? year.end_date;
  const points = [
    range?.after &&
      `Starts after ${range.after.name} ends (${shortDate(range.after.end_date)})`,
    range?.before &&
      `Ends before ${range.before.name} starts (${shortDate(range.before.start_date)})`,
    !range?.after && !range?.before && "Within the academic year",
  ].filter(Boolean);

  return (
    <div className="d-flex flex-column gap-1 rounded-3 bg-iron-50 px-3 py-2 mt-3 font-size-xs">
      <span className="d-flex align-items-center gap-1 text-iron-600">
        <ShieldCheck
          size={13}
          strokeWidth={1.75}
          className="text-fern-600 flex-shrink-0"
        />
        Safe dates{" "}
        <span className="fw-semibold text-iron-700">
          {dateSpan(start, end)}
        </span>
      </span>
      <ul className="m-0 ps-4 text-iron-500 d-flex flex-column gap-1">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

const matches = (year, query) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [year.specialty_name, year.level_name, year.academic_year, year.label]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(needle));
};

function LevelCard({ year, selected, semesterId, onSelect, onSelectSemester }) {
  const added = year.semesters.filter((option) => option.created).length;
  const total = year.semesters.length;
  const full = total > 0 && added >= total;

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      whileHover={selected ? undefined : { scale: 1.01 }}
      whileTap={selected ? undefined : { scale: 0.99 }}
      onClick={() => !selected && onSelect(year)}
      onKeyDown={(event) => {
        if (
          event.target === event.currentTarget &&
          (event.key === "Enter" || event.key === " ")
        ) {
          event.preventDefault();
          onSelect(year);
        }
      }}
      className={`card p-2 d-flex flex-column gap-2 ${selected ? "shadow-fern-100-lg border-fern-300" : "border-none border shadow-sm pointer-cursor"}`}
      style={{ borderRadius: "0.85rem" }}
    >
      <div className="d-flex align-items-center justify-content-between gap-2">
        <div className="d-flex align-items-center gap-2 overflow-hidden">
          <div
            className="d-grid place-items-center rounded-3 primary-background-50 color-primary flex-shrink-0"
            style={{ height: "2.5rem", width: "2.5rem" }}
          >
            <Layers size={16} />
          </div>
          <div className="d-flex flex-column overflow-hidden">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="fw-semibold">{year.level_name ?? "Level"}</span>
              <Badge
                status={year.status}
                context={BADGE_CONTEXT.ACADEMIC_PERIOD}
              />
            </div>
            <div className="d-flex align-items-center text-iron-400 font-size-xs overflow-hidden">
              <span className="text-truncate" title={year.specialty_name ?? ""}>
                {year.specialty_name ?? "-"}
              </span>
              <Dot size={14} className="flex-shrink-0" />
              <span className="text-nowrap">{year.academic_year ?? "-"}</span>
            </div>
          </div>
        </div>
        {selected && (
          <CircleCheck size={16} className="green-color flex-shrink-0" />
        )}
      </div>
      <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
      <div className="d-flex align-items-center justify-content-between gap-2 font-size-xs  pt-2">
        <span className="fw-medium">
          {dateSpan(year.start_date, year.end_date)}
        </span>
        <span className={full ? "text-fern-600" : "text-iron-400"}>
          {added} of {total} semesters added
        </span>
      </div>
      {selected && (
        <div
          className="d-flex flex-column gap-2"
          onClick={(event) => event.stopPropagation()}
        >
          <span className="d-flex align-items-center gap-1 text-iron-500 font-size-xs">
            <Lightbulb
              size={13}
              strokeWidth={1.75}
              className="text-old-lace-500 flex-shrink-0"
            />
            {year.recommended_semester_id
              ? "We picked the next one."
              : "All semesters are added."}
          </span>
          <div className="semester-choices d-grid gap-2">
            {year.semesters.map((option) => (
              <SemesterChoice
                key={option.id}
                option={option}
                selected={option.id === semesterId}
                recommended={option.id === year.recommended_semester_id}
                onSelect={onSelectSemester}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
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
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  const { data, isLoading, error, refetch } =
    useGetSchoolSemesterCreationOptions();
  const { mutate: createSchoolSemester, isPending } =
    useCreateSchoolSemester(handleClose);
  const {
    formError,
    errorBannerRef,
    setClientError,
    handleServerError,
    clearFormError,
  } = useFormError("Couldn't create the semester");

  const [step, setStep] = useState(1);
  const [yearId, setYearId] = useState(null);
  const [semesterId, setSemesterId] = useState(null);
  const [dates, setDates] = useState({ start_date: "", end_date: "" });
  const [datesKey, setDatesKey] = useState(0);

  const options = data?.data;
  const years = useMemo(() => options?.school_years ?? [], [options]);
  const visibleYears = useMemo(
    () => years.filter((item) => matches(item, debouncedQuery)),
    [years, debouncedQuery],
  );

  const createAcademicYear = () => {
    handleClose?.();
    navigate("/academic-year");
  };
  const year = years.find((item) => item.id === yearId) ?? null;
  const semester =
    year?.semesters.find((item) => item.id === semesterId) ?? null;
  const suggestion = semester?.suggested ?? null;
  const safeRange = semester?.allowed ?? null;

  const validationSchema = useMemo(
    () =>
      dateRangeValidationSchema({
        minDate: safeRange?.start_date ?? year?.start_date,
        maxDate: safeRange?.end_date ?? year?.end_date,
        allowSameDay: false,
      }),
    [
      safeRange?.start_date,
      safeRange?.end_date,
      year?.start_date,
      year?.end_date,
    ],
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
    resetDates({
      start_date: suggestion.start_date,
      end_date: suggestion.end_date,
    });
  };

  const datesComplete =
    isCompleteDate(dates.start_date) && isCompleteDate(dates.end_date);
  const datesOk = datesComplete && validationSchema.isValidSync(dates);
  const canCreate =
    Boolean(year && semester && !semester.created && datesOk) && !isPending;
  const canContinue =
    step === 1 ? Boolean(year && semester && !semester.created) : canCreate;

  const goBack = () => {
    clearFormError();
    if (step === 1) handleClose?.();
    else setStep(step - 1);
  };

  const goNext = () => {
    if (!canContinue) return;
    clearFormError();
    if (step < STEPS.length) setStep(step + 1);
    else create();
  };

  const copies = useMemo(() => {
    if (
      !year ||
      !semester ||
      !datesComplete ||
      !options?.auto_creation?.enabled
    )
      return [];
    return year.copy_targets.filter(
      (target) =>
        !target.existing_semester_ids.includes(semester.id) &&
        target.start_date <= dates.start_date &&
        target.end_date >= dates.end_date,
    );
  }, [year, semester, datesComplete, dates, options?.auto_creation?.enabled]);

  const startsInPast =
    datesComplete && options?.today && dates.start_date < options.today;
  const lengthInWeeks = datesComplete
    ? Math.max(
        1,
        Math.round(
          (differenceInCalendarDays(
            toDate(dates.end_date),
            toDate(dates.start_date),
          ) +
            1) /
            7,
        ),
      )
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
      {
        school_year_id: year.id,
        semester_id: semester.id,
        start_date: dates.start_date,
        end_date: dates.end_date,
      },
      { onError: handleServerError },
    );
  };

  if (isLoading) return <CreateSemesterSkeleton />;
  if (error) {
    return (
      <div className="p-3">
        <QueryErrorState
          error={error}
          fallbackTitle="Couldn't load semester options"
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <>
      <div className="drawer-content scrollbar-xs ps-2 pt-3 pb-2 d-flex flex-column gap-4 font-size-sm">
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
        />

        {step === 1 && (
          <Step
            number={1}
            title={STEPS[0]}
            tip="Levels come from your academic years."
          >
            {years.length ? (
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="flex-grow-1">
                    <SearchInput
                      placeholder="Search level, specialty or year..."
                      value={query}
                      onChange={setQuery}
                    />
                  </div>
                  <small className="text-iron-400 text-nowrap">
                    {visibleYears.length} of {years.length}
                  </small>
                </div>
                {visibleYears.length ? (
                  visibleYears.map((item) => (
                    <LevelCard
                      key={item.id}
                      year={item}
                      selected={item.id === yearId}
                      semesterId={semesterId}
                      onSelect={chooseYear}
                      onSelectSemester={chooseSemester}
                    />
                  ))
                ) : (
                  <EmptyState
                    mascot="notFound"
                    title="No matching levels"
                    description={`Nothing matches "${debouncedQuery}".`}
                    height="30dvh"
                    mascotHeight="6rem"
                    actions={
                      <EmptyStateButton
                        variant="secondary"
                        icon={SearchX}
                        onClick={() => setQuery("")}
                      >
                        Clear search
                      </EmptyStateButton>
                    }
                  />
                )}
                <button
                  type="button"
                  className="step-back-btn d-inline-flex align-items-center gap-1 align-self-start border-0 bg-transparent p-0 font-size-xs"
                  onClick={createAcademicYear}
                >
                  <CalendarPlus size={13} strokeWidth={1.75} />
                  Can't find it? Create an academic year
                </button>
              </div>
            ) : (
              <EmptyState
                mascot="empty"
                title="No academic years yet"
                description="Semesters belong to an academic year."
                height="40dvh"
                mascotHeight="7rem"
                actions={
                  <EmptyStateButton
                    icon={CalendarPlus}
                    onClick={createAcademicYear}
                  >
                    Create an academic year
                  </EmptyStateButton>
                }
              />
            )}
          </Step>
        )}

        {step === 2 && year && semester && (
          <Step
            number={2}
            title="Dates"
            context={`${semester.name} · ${year.label}`}
          >
            <div className="d-flex flex-column gap-2">
              {suggestion && (
                <button
                  type="button"
                  className="suggestion-chip d-inline-flex align-items-center gap-2 align-self-start border-0 rounded-pill px-3 py-1-5 bg-primary-50 text-primary-600"
                  onClick={applySuggestion}
                >
                  <Sparkles size={14} strokeWidth={1.75} />
                  <span>
                    Use suggested dates{" "}
                    <span className="fw-semibold">
                      {dateSpan(suggestion.start_date, suggestion.end_date)}
                    </span>
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
                onStartDateChange={(value) =>
                  setDates((current) => ({ ...current, start_date: value }))
                }
                onEndDateChange={(value) =>
                  setDates((current) => ({ ...current, end_date: value }))
                }
              />
              <SafeRange range={safeRange} year={year} />
              {startsInPast && (
                <span className="d-flex align-items-center gap-1 text-iron-500 font-size-xs">
                  <Info size={13} strokeWidth={1.75} />
                  Already started? That's fine.
                </span>
              )}
            </div>
          </Step>
        )}

        {step === 2 && year && semester && !semester.created && datesOk && (
          <div
            className="semester-summary d-flex gap-3 rounded-3 p-3 bg-primary-50"
            aria-live="polite"
          >
            <CalendarRange
              size={18}
              strokeWidth={1.75}
              className="text-primary-500 flex-shrink-0 mt-1"
            />
            <div className="d-flex flex-column gap-1 overflow-hidden">
              <span className="fw-semibold text-capitalize">
                {semester.name}
              </span>
              <span className="text-iron-600 text-truncate">{year.label}</span>
              <span className="text-iron-600">
                {dateSpan(dates.start_date, dates.end_date)} · {lengthInWeeks}{" "}
                {lengthInWeeks === 1 ? "week" : "weeks"}
              </span>
              {copies.length > 0 && (
                <span
                  className="d-flex align-items-center gap-1 text-primary-600 font-size-xs"
                  title={copies.map((target) => target.label).join(", ")}
                >
                  <Copy size={12} strokeWidth={1.75} />
                  Also added to {copies.length} other{" "}
                  {copies.length === 1 ? "class" : "classes"}.
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="drawer-footer border-top px-3 py-2 font-size-sm">
        <button
          type="button"
          className="step-back-btn d-inline-flex align-items-center gap-1 border-0 bg-transparent p-0 font-size-sm me-auto"
          onClick={goBack}
          disabled={isPending}
        >
          <ChevronLeft size={16} strokeWidth={1.75} />
          {step === 1 ? "Semesters" : STEPS[step - 2]}
        </button>
        <button
          type="button"
          className={`profile-primary-btn border-0 rounded-3 primary-background text-white font-size-sm px-3 d-inline-flex align-items-center gap-2 text-capitalize ${
            canContinue ? "" : "opacity-50"
          }`}
          onClick={goNext}
          disabled={!canContinue}
        >
          {isPending ? (
            <SingleSpinner />
          ) : step < STEPS.length ? (
            "Next"
          ) : (
            `Create ${semester?.name ?? "semester"}`
          )}
        </button>
      </div>
    </>
  );
}

export default CreateSemester;
