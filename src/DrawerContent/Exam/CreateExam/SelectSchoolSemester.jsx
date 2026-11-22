import { Badge, BADGE_CONTEXT, APP_STATUS } from "@/components/Renderer/badges";
import { motion } from "framer-motion";
import { ArrowRight, CalendarPlus, CalendarRange, CircleAlert, CircleCheck, CircleDashed, Dot, ScanSearch, SearchX, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import EmptyState, { EmptyStateButton } from "../../../components/errors/EmptyState";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import QueryErrorState from "../../../components/errors/QueryErrorState";
import SearchInput from "../../../components/input/search";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useDebounce } from "../../../hooks/common/useDebounce";
import { useGetExamCreationOptions } from "../../../hooks/exam/useGetExamCreationOptions";
import { resetCreateExamState, setCreateExamValue } from "../../../Slices/exam/examSlice";
import {
  describeOptionsError,
  filterSemesters,
  ISSUE_ACTIONS,
  suggestedExamType,
  USAGE_LABEL,
} from "../../../utils/exam/examCreation";
import { formatScheduleDate } from "../../../utils/feeSchedule/scheduleRules";

const GROUPS = [
  { key: "recommended", title: "Recommended", hint: "The next semester of each academic year that still needs exams." },
  { key: "available", title: "Other semesters", hint: "You can create exams here too." },
  { key: "unavailable", title: "Not available", hint: "These can't take a new exam; each says why." },
];

const groupOf = (semester) => (semester.recommended ? "recommended" : semester.available ? "available" : "unavailable");

/** One exam type of the semester: created or still to create. */
function ExamTypeChip({ type }) {
  const Icon = type.created ? CircleCheck : CircleDashed;
  return (
    <span
      className={`d-inline-flex align-items-center gap-1 rounded-pill px-2 font-size-xs ${
        type.created ? "bg-fern-50 text-fern-600" : type.recommended ? "bg-primary-50 text-primary-600" : "bg-iron-100 text-iron-700"
      }`}
      style={{ height: "1.4rem" }}
      title={type.created ? `${type.name} already exists` : type.reasons?.[0] ?? `${type.name} can be created`}
    >
      <Icon size={12} />
      <span className="text-nowrap">{type.name}</span>
      <span className="opacity-75">· {type.created ? "created" : "not created"}</span>
    </span>
  );
}

/** A button for an issue's action code, or nothing when it has none. */
export function IssueAction({ action, onAction }) {
  const target = ISSUE_ACTIONS[action];
  if (!target) return null;
  return (
    <button
      type="button"
      className="border-none bg-none p-0 d-inline-flex align-items-center gap-1 fw-semibold text-primary-600 font-size-xs"
      onClick={(event) => {
        event.stopPropagation();
        onAction(target.path);
      }}
    >
      {target.label} <ArrowRight size={12} />
    </button>
  );
}

/** Why something can't be used: what was found, then what to do next. */
export function IssueNote({ issue, onAction }) {
  if (!issue) return null;
  return (
    <div className="bg-old-lace-50 rounded-3 p-2 d-flex flex-row gap-2 font-size-xs">
      <CircleAlert size={14} className="flex-shrink-0 text-old-lace-700 mt-1" />
      <div className="d-flex flex-column gap-1">
        <span className="fw-semibold text-old-lace-700">{issue.title}</span>
        <span className="text-iron-700">{issue.message}</span>
        <span className="text-iron-700">
          <span className="fw-medium">Next step:</span> {issue.next_step}
        </span>
        <IssueAction action={issue.action} onAction={onAction} />
      </div>
    </div>
  );
}

function SemesterCard({ semester, selected, onSelect, onAction }) {
  const year = semester.academic_year ?? {};
  const disabled = !semester.available;
  const select = () => !disabled && onSelect(semester);

  return (
    <motion.div
      // An unavailable card is not a control: it holds its own action button.
      role={disabled ? undefined : "button"}
      tabIndex={disabled ? undefined : 0}
      aria-pressed={disabled ? undefined : selected}
      data-unavailable={disabled || undefined}
      whileHover={disabled ? undefined : { scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={select}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          select();
        }
      }}
      className={`card p-2 d-flex flex-column gap-2 ${disabled ? "" : "pointer-cursor"} ${
        selected ? "shadow-fern-100-lg border-fern-300" : "border-none border shadow-sm"
      }`}
      style={{ borderRadius: "0.85rem" }}
    >
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <div className="d-flex flex-row align-items-center gap-2" style={{ minWidth: 0 }}>
          <div
            className="d-flex align-items-center justify-content-center rounded-3 primary-background-50 color-primary flex-shrink-0"
            style={{ height: "2.5rem", width: "2.5rem" }}
          >
            <CalendarRange size={16} />
          </div>
          <div className="d-flex flex-column" style={{ minWidth: 0 }}>
            <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
              <span className="fw-semibold">{semester.name}</span>
              <Badge status={semester.status ?? APP_STATUS.UPCOMING} context={BADGE_CONTEXT.ACADEMIC_PERIOD} />
              {semester.recommended && (
                <Badge variant="primary">
                  <span className="d-inline-flex align-items-center gap-1">
                    <Sparkles size={11} /> Recommended
                  </span>
                </Badge>
              )}
            </div>
            <div className="d-flex flex-row align-items-center text-iron-400 font-size-xs" style={{ minWidth: 0 }}>
              <span className="text-truncate" title={year.specialty ?? ""}>{year.specialty ?? "-"}</span>
              <Dot size={14} className="flex-shrink-0" />
              <span className="text-nowrap">{year.level ?? "-"}</span>
              <Dot size={14} className="flex-shrink-0" />
              <span className="text-nowrap">{year.name ?? "-"}</span>
            </div>
          </div>
        </div>
        {selected && <CircleCheck size={16} className="green-color flex-shrink-0" />}
      </div>

      <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
      <div className="d-flex flex-row align-items-center justify-content-between gap-2 font-size-xs">
        <span className="fw-medium">
          {formatScheduleDate(semester.start_date)} – {formatScheduleDate(semester.end_date)}
        </span>
        <span className="text-iron-400">{USAGE_LABEL[semester.usage]}</span>
      </div>
      {semester.exam_types?.length > 0 && (
        <div className="d-flex flex-row flex-wrap gap-1">
          {semester.exam_types.map((type) => (
            <ExamTypeChip key={type.id} type={type} />
          ))}
        </div>
      )}
      {semester.recommended && semester.recommendation ? (
        <span className="font-size-xs text-primary-600">{semester.recommendation}</span>
      ) : disabled ? (
        <IssueNote issue={semester.issue} onAction={onAction} />
      ) : null}
    </motion.div>
  );
}

/** What the options found across the school, with the next step for each problem. */
function WhatWeFound({ summary, onAction }) {
  if (!summary?.headline) return null;
  const findings = Array.isArray(summary.findings) ? summary.findings : [];
  return (
    <div className="bg-primary-50 rounded-3 p-2 d-flex flex-row gap-2 font-size-xs">
      <ScanSearch size={15} className="flex-shrink-0 text-primary-600 mt-1" />
      <div className="d-flex flex-column gap-2" style={{ minWidth: 0 }}>
        <span className="fw-semibold text-primary-600 font-size-sm">{summary.headline}</span>
        {findings.map((finding) => (
          <div key={finding.code} className="d-flex flex-column gap-1">
            <span className="text-iron-700">{finding.text}</span>
            <span className="text-iron-500">{finding.next_step}</span>
            <IssueAction action={finding.action} onAction={onAction} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SelectSchoolSemester({ handleClose, nextStep, fullStep, currentStep }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const moduleState = useSelector((state) => state.exam.createExam);
  const { data, isLoading, error, refetch, isFetching } = useGetExamCreationOptions();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);
  const [stepError, setStepError] = useState(null);

  const semesters = Array.isArray(data?.data?.semesters) ? data.data.semesters : [];
  const summary = data?.data?.summary;
  const visible = useMemo(() => filterSemesters(semesters, debouncedQuery), [semesters, debouncedQuery]);
  const selectedId = moduleState?.schoolSemester?.id;

  const close = () => {
    dispatch(resetCreateExamState());
    handleClose();
  };
  const goTo = (path) => {
    close();
    navigate(path);
  };
  const goToSemesters = () => goTo("/semesters");

  const handleSelect = (semester) => {
    setStepError(null);
    dispatch(setCreateExamValue({ value: semester, field: "schoolSemester" }));
    // Start the next step on the recommended exam type.
    dispatch(setCreateExamValue({ value: suggestedExamType(semester), field: "examType" }));
  };

  const handleNext = () => {
    const current = semesters.find((semester) => semester.id === selectedId);
    if (!current?.available) {
      setStepError({
        title: "No semester selected.",
        messages: ["Pick the semester the exam is for to continue."],
      });
      return;
    }
    // Keep the freshest copy of the selected semester.
    dispatch(setCreateExamValue({ value: current, field: "schoolSemester" }));
    nextStep();
  };

  const renderList = () => {
    if (isLoading) {
      return [...Array(4)].map((_, index) => <RectangleSkeleton key={index} height="9rem" width="100%" />);
    }
    if (error) {
      const known = describeOptionsError(error);
      return (
        <QueryErrorState
          error={error}
          fallbackTitle="Couldn't load the semesters"
          title={known?.title}
          description={known?.description}
          onRetry={refetch}
          isRetrying={isFetching}
          height="60dvh"
        />
      );
    }
    if (semesters.length === 0) {
      return (
        <EmptyState
          mascot="sad"
          title="No school semesters yet"
          description={
            summary?.findings?.[0]
              ? `${summary.findings[0].text} ${summary.findings[0].next_step}`
              : "Exams are created for a school semester, which also sets the academic year. Create the semesters of your academic years first."
          }
          height="60dvh"
          mascotHeight="7rem"
          actions={
            summary?.findings?.[0]?.action === "create_academic_year" ? (
              <EmptyStateButton icon={CalendarPlus} onClick={() => goTo("/academic-year")}>Create an academic year</EmptyStateButton>
            ) : (
              <EmptyStateButton icon={CalendarPlus} onClick={goToSemesters}>Create semesters</EmptyStateButton>
            )
          }
        />
      );
    }
    if (visible.length === 0) {
      return (
        <EmptyState
          mascot="notFound"
          title="No matching semesters"
          description={`Nothing matches "${debouncedQuery}".`}
          height="40dvh"
          mascotHeight="6rem"
          actions={<EmptyStateButton variant="secondary" icon={SearchX} onClick={() => setQuery("")}>Clear search</EmptyStateButton>}
        />
      );
    }
    return GROUPS.map((group) => {
      const items = visible.filter((semester) => groupOf(semester) === group.key);
      if (items.length === 0) return null;
      return (
        <div key={group.key} className="d-flex flex-column gap-2">
          <div className="d-flex flex-column">
            <span className="fw-medium">
              {group.title} <span className="text-iron-400 fw-normal">({items.length})</span>
            </span>
            <span className="font-size-xs text-iron-400">{group.hint}</span>
          </div>
          {items.map((semester) => (
            <SemesterCard key={semester.id} semester={semester} selected={semester.id === selectedId} onSelect={handleSelect} onAction={goTo} />
          ))}
        </div>
      );
    });
  };

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 font-size-sm">
        <span className="fw-medium">Create Exam</span>
        <button
          className="bg-none border-none border rounded-circle"
          aria-label="Close drawer"
          onClick={close}
          style={{ width: "2rem", height: "2rem", display: "grid", placeItems: "center", cursor: "pointer" }}
        >
          <X size={16} />
        </button>
      </div>
      <div className="drawer-content px-2 font-size-sm pt-2 pb-5">
        <FormErrorBanner error={stepError} onDismiss={() => setStepError(null)} />
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-row align-items-start justify-content-between gap-2">
            <div className="d-flex flex-column">
              <span className="fw-semibold">Which semester is the exam for?</span>
              <span className="font-size-xs text-iron-400">
                The exam takes the semester's academic year and must fall within its dates.
              </span>
            </div>
            <span className="text-end fw-medium text-capitalize text-nowrap">{`step ${currentStep} of ${fullStep}`}</span>
          </div>
          {!isLoading && !error && semesters.length > 0 && <WhatWeFound summary={summary} onAction={goTo} />}
          <div className="d-flex flex-row align-items-center gap-2">
            <div className="flex-grow-1">
              <SearchInput
                placeholder="Search semester, specialty, level or year..."
                value={query}
                onChange={setQuery}
                disabled={isLoading || !!error || semesters.length === 0}
              />
            </div>
            {!isLoading && !error && semesters.length > 0 && (
              <small className="text-iron-400 text-nowrap">
                {visible.length} of {semesters.length}
              </small>
            )}
          </div>
          {renderList()}
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-end p-2">
            <button
              type="button"
              className={`primary-background text-white border-none px-3 py-2 rounded-3 ${!selectedId ? "opacity-50" : ""}`}
              onClick={handleNext}
              disabled={isLoading || !!error || !selectedId}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectSchoolSemester;
