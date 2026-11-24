import { motion } from "framer-motion";
import { CircleCheck, Dot, GraduationCap, Plus, SearchX } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import {
  CreationSummary,
  dateSpan,
  FlowFooter,
  FlowNote,
  FlowSkeleton,
  FlowStep,
  isCompleteDate,
  matchesQuery,
  SafeRange,
  safeRangePoints,
  SuggestionChip,
} from "../../components/CreationFlow/CreationFlow";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import QueryErrorState from "../../components/errors/QueryErrorState";
import { DateRangeInput } from "../../components/FormComponents/InputComponents";
import SearchInput from "../../components/input/search";
import { Badge, BADGE_VARIANT } from "../../components/Renderer/badges";
import { useCreateSchoolAcademicYear } from "../../hooks/academicYear/useCreateSchoolAcademicYear";
import { useGetSchoolAcademicYearCreationOptions } from "../../hooks/academicYear/useGetSchoolAcademicYearCreationOptions";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useFormError } from "../../hooks/form/useFormError";

const STEPS = ["Year & specialty", "Dates"];

const SOURCE_LABEL = {
  other_classes: "Same as your other classes",
  last_year: "Based on last year",
  typical: "A typical school year",
};

const yearEntry = (specialty, yearId) =>
  specialty?.years.find((entry) => entry.system_academic_year_id === yearId) ?? null;

const matches = (specialty, query) =>
  matchesQuery([specialty.specialty_name, specialty.level_name, specialty.department_name, specialty.label], query);

function YearChoice({ year, selected, added, total, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(year.id)}
      aria-pressed={selected}
      className={`semester-choice d-flex flex-column align-items-start gap-1 text-start rounded-3 border p-2 ${
        selected ? "semester-choice--selected" : ""
      }`}
    >
      <span className="d-flex align-items-center justify-content-between gap-2 w-100">
        <span className="fw-medium">{year.name}</span>
        <Badge variant={year.current ? BADGE_VARIANT.SUCCESS : BADGE_VARIANT.PRIMARY} label={year.current ? "Current" : "Next"} showIcon={false} />
      </span>
      <span className="font-size-xs text-iron-500">
        {added} of {total} specialties added
      </span>
    </button>
  );
}

function SpecialtyCard({ specialty, entry, selected, onSelect }) {
  const taken = Boolean(entry?.created);
  const blocked = !taken && !entry?.allowed;
  const disabled = taken || blocked;
  const select = () => !disabled && onSelect(specialty.id);

  return (
    <motion.div
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
      aria-pressed={disabled ? undefined : selected}
      aria-disabled={disabled || undefined}
      whileHover={disabled || selected ? undefined : { scale: 1 }}
      whileTap={disabled || selected ? undefined : { scale: 0.99 }}
      onClick={select}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          select();
        }
      }}
      className={`card p-2 d-flex flex-column gap-2 ${
        selected ? "shadow-fern-100-lg border-fern-300" : "border-none border shadow-sm"
      } ${disabled ? "bg-iron-50" : selected ? "" : "pointer-cursor"}`}
      style={{ borderRadius: "0.85rem" }}
    >
      <div className="d-flex align-items-center justify-content-between gap-2">
        <div className="d-flex align-items-center gap-2 overflow-hidden">
          <div
            className={`d-grid place-items-center rounded-3 flex-shrink-0 ${disabled ? "bg-iron-100 text-iron-400" : "primary-background-50 color-primary"}`}
            style={{ height: "2.5rem", width: "2.5rem" }}
          >
            <GraduationCap size={16} />
          </div>
          <div className="d-flex flex-column overflow-hidden">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className={`fw-semibold ${disabled ? "text-iron-500" : ""}`}>{specialty.specialty_name}</span>
              {taken && <Badge variant={BADGE_VARIANT.SUCCESS} label="Added" showIcon={false} />}
            </div>
            <div className="d-flex align-items-center text-iron-400 font-size-xs overflow-hidden">
              <span className="text-nowrap">{specialty.level_name ?? "-"}</span>
              {specialty.department_name && (
                <>
                  <Dot size={14} className="flex-shrink-0" />
                  <span className="text-truncate" title={specialty.department_name}>{specialty.department_name}</span>
                </>
              )}
            </div>
          </div>
        </div>
        {selected && <CircleCheck size={16} className="green-color flex-shrink-0" />}
        
      </div>
      <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
      <div className="d-flex align-items-center justify-content-between gap-2 font-size-xs pt-2">
        <span className={taken ? "text-iron-500" : "fw-medium"}>
          {taken
            ? `Added · ${dateSpan(entry.existing.start_date, entry.existing.end_date)}`
            : blocked
              ? "No free dates left"
              : "Not added yet"}
        </span>
        <span className="text-iron-400">
          {specialty.students_count} {specialty.students_count === 1 ? "student" : "students"}
        </span>
      </div>
    </motion.div>
  );
}

function CreateAcademicYear({ handleClose }) {
  const dateRangeRef = useRef();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);
  const { data, isLoading, error, refetch } = useGetSchoolAcademicYearCreationOptions();
  const { mutate: createYear, isPending } = useCreateSchoolAcademicYear(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Couldn't create the academic year");

  const options = data?.data;
  const years = useMemo(() => options?.academic_years ?? [], [options]);
  const specialties = useMemo(() => options?.specialties ?? [], [options]);
  const visibleSpecialties = useMemo(
    () => specialties.filter((item) => matches(item, debouncedQuery)),
    [specialties, debouncedQuery],
  );

  const [step, setStep] = useState(1);
  const [pickedYearId, setYearId] = useState(null);
  const [specialtyId, setSpecialtyId] = useState(null);
  const [dates, setDates] = useState({ start_date: "", end_date: "" });
  const [datesKey, setDatesKey] = useState(0);

  const yearId = pickedYearId ?? (years.find((item) => item.current) ?? years[0])?.id ?? null;
  const year = years.find((item) => item.id === yearId) ?? null;
  const specialty = specialties.find((item) => item.id === specialtyId) ?? null;
  const entry = yearEntry(specialty, yearId);
  const suggestion = entry?.suggested ?? null;
  const safeRange = entry?.allowed ?? null;

  const validationSchema = useMemo(
    () =>
      dateRangeValidationSchema({
        minDate: safeRange?.start_date,
        maxDate: safeRange?.end_date,
        allowSameDay: false,
      }),
    [safeRange?.start_date, safeRange?.end_date],
  );

  const resetDates = (next = { start_date: "", end_date: "" }) => {
    setDates(next);
    setDatesKey((key) => key + 1);
  };

  const chooseYear = (id) => {
    clearFormError();
    setYearId(id);
    const current = yearEntry(specialty, id);
    if (current?.created || !current?.allowed) setSpecialtyId(null);
    resetDates();
  };

  const chooseSpecialty = (id) => {
    clearFormError();
    setSpecialtyId(id);
    resetDates();
  };

  const applySuggestion = () => {
    if (!suggestion) return;
    clearFormError();
    resetDates({ start_date: suggestion.start_date, end_date: suggestion.end_date });
  };

  const goTo = (path) => {
    handleClose?.();
    navigate(path);
  };

  const datesComplete = isCompleteDate(dates.start_date) && isCompleteDate(dates.end_date);
  const datesOk = datesComplete && validationSchema.isValidSync(dates);
  const ready = Boolean(year && specialty && entry && !entry.created && entry.allowed);
  const canCreate = ready && datesOk && !isPending;
  const canContinue = step === 1 ? ready : canCreate;

  const addedCount = (id) => specialties.filter((item) => yearEntry(item, id)?.created).length;

  const copies = useMemo(() => {
    if (!specialty || !yearId || !options?.auto_creation?.enabled) return [];
    return specialty.copy_targets.filter((target) => !target.existing_year_ids.includes(yearId));
  }, [specialty, yearId, options?.auto_creation?.enabled]);

  const startsInPast = datesComplete && options?.today && dates.start_date < options.today;

  const create = async () => {
    const [startOk, endOk] = await Promise.all([
      dateRangeRef.current?.preValidateStart(),
      dateRangeRef.current?.preValidateEnd(),
    ]);
    if (!ready || !startOk || !endOk) {
      setClientError("Almost there", "Check the highlighted dates.");
      return;
    }
    clearFormError();
    createYear(
      {
        specialty_id: specialty.id,
        system_academic_year_id: year.id,
        start_date: dates.start_date,
        end_date: dates.end_date,
      },
      { onError: handleServerError },
    );
  };

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

  if (isLoading) return <FlowSkeleton />;
  if (error) {
    return (
      <div className="p-3">
        <QueryErrorState error={error} fallbackTitle="Couldn't load academic year options" onRetry={refetch} />
      </div>
    );
  }

  return (
    <>
      <div className="drawer-content scrollbar-xs ps-2 pe-1 pt-3 pb-2 d-flex flex-column gap-4 font-size-sm">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} />

        {step === 1 && (
          <FlowStep number={1} total={STEPS.length} title={STEPS[0]} tip="Pick the year, then the specialty.">
            <div className="d-flex flex-column gap-3">
              <div className="semester-choices d-grid gap-2">
                {years.map((item) => (
                  <YearChoice
                    key={item.id}
                    year={item}
                    selected={item.id === yearId}
                    added={addedCount(item.id)}
                    total={specialties.length}
                    onSelect={chooseYear}
                  />
                ))}
              </div>

              {specialties.length ? (
                <>
                  <div className="d-flex align-items-center gap-2">
                    <div className="flex-grow-1">
                      <SearchInput placeholder="Search specialty, level or department..." value={query} onChange={setQuery} />
                    </div>
                  </div>
                  {visibleSpecialties.length ? (
                    visibleSpecialties.map((item) => (
                      <SpecialtyCard
                        key={item.id}
                        specialty={item}
                        entry={yearEntry(item, yearId)}
                        selected={item.id === specialtyId}
                        onSelect={chooseSpecialty}
                      />
                    ))
                  ) : (
                    <EmptyState
                      mascot="notFound"
                      title="No matching specialties"
                      description={`Nothing matches "${debouncedQuery}".`}
                      height="30dvh"
                      mascotHeight="6rem"
                      actions={<EmptyStateButton variant="secondary" icon={SearchX} onClick={() => setQuery("")}>Clear search</EmptyStateButton>}
                    />
                  )}
                  <button
                    type="button"
                    className="step-back-btn d-inline-flex align-items-center gap-1 align-self-start border-0 bg-transparent p-0 font-size-xs"
                    onClick={() => goTo("/specialties")}
                  >
                    <Plus size={13} strokeWidth={1.75} />
                    Can't find it? Create a specialty
                  </button>
                </>
              ) : (
                <EmptyState
                  mascot="empty"
                  title="No specialties yet"
                  description="Academic years belong to a specialty."
                  height="40dvh"
                  mascotHeight="7rem"
                  actions={<EmptyStateButton icon={Plus} onClick={() => goTo("/specialties")}>Create a specialty</EmptyStateButton>}
                />
              )}
            </div>
          </FlowStep>
        )}

        {step === 2 && ready && (
          <FlowStep number={2} total={STEPS.length} title="Dates" context={`${year.name} · ${specialty.label}`}>
            <div className="d-flex flex-column gap-2">
              <SuggestionChip
                suggestion={suggestion}
                source={SOURCE_LABEL[year.suggestion_source]}
                onApply={applySuggestion}
              />
              <DateRangeInput
                key={`${specialtyId}-${yearId}-${datesKey}`}
                ref={dateRangeRef}
                validationSchema={validationSchema}
                startValue={dates.start_date}
                endValue={dates.end_date}
                placeholderStart={suggestion?.start_date ?? safeRange.start_date}
                placeholderEnd={suggestion?.end_date ?? safeRange.end_date}
                onStartDateChange={(value) => setDates((current) => ({ ...current, start_date: value }))}
                onEndDateChange={(value) => setDates((current) => ({ ...current, end_date: value }))}
              />
              <SafeRange
                start={safeRange.start_date}
                end={safeRange.end_date}
                points={safeRangePoints(safeRange, `Any time in ${year.year_start} – ${year.year_end}`)}
              />
              {startsInPast && <FlowNote>Already started? That's fine.</FlowNote>}
            </div>
          </FlowStep>
        )}

        {step === 2 && ready && datesOk && (
          <CreationSummary
            title={year.name}
            subtitle={specialty.label}
            start={dates.start_date}
            end={dates.end_date}
            copies={copies}
            copyNouns={["level", "levels"]}
          />
        )}
      </div>

      <FlowFooter
        backLabel={step === 1 ? "Academic years" : STEPS[step - 2]}
        onBack={goBack}
        primaryLabel={step < STEPS.length ? "Next" : `Create ${year?.name ?? "academic year"}`}
        onPrimary={goNext}
        canContinue={canContinue}
        isPending={isPending}
      />
    </>
  );
}

export default CreateAcademicYear;
