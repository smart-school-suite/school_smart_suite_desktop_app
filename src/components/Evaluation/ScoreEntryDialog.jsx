import { Fragment } from "react";
import NumberFlow from "@number-flow/react";
import { CircleX, Dot, SearchX, X } from "lucide-react";
import { ProgressBar } from "react-bootstrap";
import { RESIT_LABEL, RESULT, RESULT_LABEL } from "@/constants";
import { SingleSpinner } from "../Spinners/Spinners";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import VerticalDashedLine from "../DashedLine/VerticalDashedLine";
import HorizontalDashedLine from "../DashedLine/HorizonetalDashedLine";
import SearchInput from "../input/search";
import EmptyState, { EmptyStateButton } from "../errors/EmptyState";
import FormErrorBanner from "../errors/FormErrorBanner";
import QueryErrorState from "../errors/QueryErrorState";
import { isEnteredScore, toNumber } from "../../utils/evaluation/scoreEntry";

const resultTone = (result) =>
  result === RESULT.PASSED
    ? "text-fern-500"
    : result === RESULT.FAILED
      ? "text-red-500"
      : "text-muted";

const formatNumber = (value) => {
  const number = toNumber(value, NaN);
  return Number.isFinite(number) ? number : "—";
};

const pillStyle = {
  minHeight: "1.2rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.65rem",
  whiteSpace: "nowrap",
};

const inputStyle = (invalid) => ({
  width: 110,
  fontFamily: "inherit",
  fontSize: 18,
  fontWeight: 600,
  fontVariantNumeric: "tabular-nums",
  padding: "7px 9px",
  borderRadius: 8,
  border: `1.5px solid ${invalid ? "var(--red-500)" : "rgba(8,48,73,0.16)"}`,
  outline: "none",
  textAlign: "center",
});

function SummaryRow({ label, children, className = "fw-bold" }) {
  return (
    <div className="d-flex flex-row justify-content-between align-items-center w-100">
      <span className="text-muted font-size-sm">{label}</span>
      <span className={`font-size-sm ${className}`}>{children}</span>
    </div>
  );
}

function GradeDetails({ course }) {
  const graded = course?.grade && course.grade !== "N/A";
  if (!graded) {
    return (
      <span className="text-muted">
        This score is outside the exam's grade scale, so it has no grade.
      </span>
    );
  }
  return (
    <div className="d-flex flex-row align-items-center justify-content-between">
      {[
        ["Performance", <span key="p">{course?.performance ?? "—"}</span>],
        ["Grade", <span key="g" className={resultTone(course?.result)}>{course?.grade ?? "—"}</span>],
        [
          "Grade Point",
          <span key="gp" className="fw-semibold tabular-numbers">
            <NumberFlow value={toNumber(course?.gradePoints)} />
          </span>,
        ],
        ["Result", <span key="r" className={resultTone(course?.result)}>{RESULT_LABEL[course?.result] ?? "—"}</span>],
        ["Resit Result", <span key="rr">{RESIT_LABEL[course?.resitResult] ?? "—"}</span>],
      ].map(([label, value]) => (
        <div key={label} className="d-flex flex-column gap-2 align-items-center">
          <small className="text-uppercase text-muted">{label}</small>
          {value}
        </div>
      ))}
    </div>
  );
}

function CourseScoreCard({ course, showCa, caMaxScore, inputMax, totalMax, error, disabled, onChange, onBlur }) {
  const caScore = toNumber(course?.caScore);
  const finalScore = caScore + toNumber(course?.score);
  const inputId = `score-${course?.key}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="card border rounded-4 px-3 py-3 font-size-sm d-flex flex-column gap-3 shadow-sm">
      <div className="d-flex flex-row justify-content-between gap-2">
        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
          <span className="fw-semibold text-truncate" title={course?.course_title ?? ""}>
            {course?.course_title ?? "Untitled course"}
          </span>
          <span className="text-muted">{course?.course_code ?? "—"}</span>
        </div>
        <span className="text-muted text-nowrap">{formatNumber(course?.course_credit ?? 0)} credit</span>
      </div>

      {showCa && (
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex flex-row align-items-center gap-2">
            <span style={{ width: 10, height: 10 }} className="primary-background-200 rounded-circle" />
            <span>CA Score</span>
          </div>
          <div className="d-flex flex-row align-items-center gap-1 fw-semibold tabular-numbers">
            <span>{caScore}</span>
            <span>/</span>
            <span>{caMaxScore}</span>
          </div>
        </div>
      )}

      <div className="d-flex flex-row align-items-start justify-content-between gap-2">
        <label htmlFor={inputId} className="d-flex flex-row align-items-center gap-2 mt-2">
          <span style={{ width: 10, height: 10 }} className="primary-background-400 rounded-circle" />
          <span>{showCa ? "Exam Score" : "Score"}</span>
        </label>
        <div className="d-flex flex-column align-items-end gap-1">
          <div className="d-flex flex-row align-items-center gap-2">
            <input
              id={inputId}
              type="number"
              inputMode="decimal"
              step="0.01"
              min={0}
              max={inputMax || undefined}
              placeholder="—"
              value={course?.score ?? ""}
              disabled={disabled}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              onChange={(event) => onChange(event.target.value)}
              onBlur={onBlur}
              // a scroll over a focused number field would change the score
              onWheel={(event) => event.currentTarget.blur()}
              className="form-control"
              style={inputStyle(Boolean(error))}
            />
            <span className="text-muted font-size-md tabular-numbers">/ {inputMax}</span>
          </div>
          {error && (
            <small id={errorId} role="alert" className="text-red-500">
              {error}
            </small>
          )}
        </div>
      </div>

      {showCa && (
        <>
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="fw-semibold">Final Score</span>
            <div className="d-flex flex-row align-items-baseline gap-1">
              <span className="font-size-lg fw-bold tabular-numbers">
                <NumberFlow value={Number.isFinite(finalScore) ? finalScore : 0} />
              </span>
              <span>/</span>
              <span className="font-size-sm text-muted tabular-numbers">{totalMax}</span>
            </div>
          </div>
        </>
      )}

      <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
      {isEnteredScore(course?.score) && !error ? (
        <GradeDetails course={course} />
      ) : (
        <span className="text-muted">Not yet evaluated</span>
      )}
    </div>
  );
}

/**
 * The CA, exam and resit score dialogs (add and update). It renders every
 * state: loading, failed to load (with retry), nothing to evaluate, no grade
 * scale, no search results, and the score cards with inline validation.
 *
 * Data, saving and the slice stay in the ModalContent component; pass
 * `entry` from useScoreEntry and `form` from useFormError.
 */
export default function ScoreEntryDialog({
  title,
  rowData,
  isLoading,
  error,
  onRetry,
  isRetrying,
  scores,
  hasGradeScale,
  summary,
  maxGpa,
  showCa = false,
  caMaxScore = 0,
  inputMax,
  totalMax,
  onScoreChange,
  entry,
  form,
  onSave,
  isSaving,
  canSave = true,
  saveLabel = "Save Scores",
  onClose,
  emptyTitle = "No courses to evaluate",
  emptyDescription = "There are no courses for this candidate yet.",
}) {
  const list = Array.isArray(scores) ? scores : [];
  const ready = !isLoading && !error;
  const blocked = !ready || list.length === 0 || !hasGradeScale;
  const maxGpaText = toNumber(maxGpa, NaN);
  const resultStatus = ready && entry.errorCount === 0 ? summary?.examStatus : "NA";
  const saveDisabled = isSaving || blocked || !canSave;

  const renderBody = () => {
    if (isLoading) {
      return (
        <div className="d-flex flex-column gap-2 flex-grow-1 overflow-y-auto pe-1 scroll-bar-sm" style={{ minHeight: 0 }}>
          {[...Array(4)].map((_, index) => (
            <RectangleSkeleton key={index} height="20dvh" width="100%" />
          ))}
        </div>
      );
    }
    if (error) {
      return (
        <QueryErrorState
          error={error}
          fallbackTitle="Couldn't load this candidate's courses"
          onRetry={onRetry}
          isRetrying={isRetrying}
          onClose={onClose}
        />
      );
    }
    if (list.length === 0) {
      return (
        <EmptyState
          mascot="sad"
          title={emptyTitle}
          description={emptyDescription}
          height="100%"
          mascotHeight="7rem"
          actions={<EmptyStateButton variant="secondary" icon={X} onClick={onClose}>Close</EmptyStateButton>}
        />
      );
    }
    if (!hasGradeScale) {
      return (
        <EmptyState
          mascot="error"
          title="The grade scale can't be used"
          description="This exam's grade scale has no valid score ranges, so scores can't be graded. Check the exam's grade scale, then try again."
          height="100%"
          mascotHeight="7rem"
          actions={<EmptyStateButton variant="secondary" icon={X} onClick={onClose}>Close</EmptyStateButton>}
        />
      );
    }
    return (
      <>
        <div className="d-flex flex-row align-items-center gap-2 pe-2 flex-shrink-0">
          <div className="flex-grow-1" style={{ height: 40 }}>
            <SearchInput
              placeholder="Search course title or code..."
              hotkey="Ctrl+U"
              value={entry.query}
              onChange={entry.setQuery}
              disabled={list.length === 0}
            />
          </div>
          <small className="text-muted text-nowrap">
            {entry.visible.length} of {list.length} courses
          </small>
        </div>
        {entry.visible.length === 0 ? (
          <EmptyState
            mascot="notFound"
            title="No matching courses"
            description={`No course title or code matches "${entry.query}".`}
            height="100%"
            mascotHeight="6rem"
            actions={<EmptyStateButton variant="secondary" icon={SearchX} onClick={() => entry.setQuery("")}>Clear search</EmptyStateButton>}
          />
        ) : (
          <div
            className="d-flex flex-column gap-2 flex-grow-1 overflow-y-auto pe-1 scroll-bar-sm"
            style={{ minHeight: 0, paddingBottom: "2rem" }}
          >
            {entry.visible.map((course, index) => (
              <Fragment key={course?.key ?? index}>
                <CourseScoreCard
                  course={course}
                  showCa={showCa}
                  caMaxScore={caMaxScore}
                  inputMax={inputMax}
                  totalMax={totalMax}
                  error={entry.errorFor(course)}
                  disabled={isSaving}
                  onChange={(value) => {
                    entry.markTouched(course);
                    form.clearFormError();
                    onScoreChange(course, value);
                  }}
                  onBlur={() => entry.markTouched(course)}
                />
              </Fragment>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div style={{ height: "84dvh" }} className="d-flex flex-column">
      <div
        className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center flex-shrink-0"
        style={{ height: "6dvh", background: "#f9f9f9" }}
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="font-size-sm fw-semibold">{title}</span>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close"
            className="border-0 bg-transparent p-0"
            style={{ width: "2rem", height: "2rem", display: "grid", placeItems: "center", cursor: "pointer" }}
          >
            <CircleX size={16} />
          </button>
        </div>
      </div>

      <div className="d-flex flex-row align-items-stretch w-100 overflow-hidden" style={{ flex: 1, minHeight: 0 }}>
        <div className="d-flex flex-column gap-4 p-2 h-100 overflow-y-auto" style={{ width: "30%", flexShrink: 0 }}>
          <div className="d-flex flex-column gap-2 w-100">
            <div className="d-flex flex-row align-items-center gap-2">
              <div style={{ width: "2.5rem", height: "2.5rem", flexShrink: 0 }} className="rounded-circle overflow-hidden">
                <img src="./images/user.png" alt="" className="object-fit-cover w-100 h-100" />
              </div>
              <div className="d-flex flex-column overflow-hidden">
                <span className="fw-semibold font-size-sm text-truncate">{rowData?.student_name ?? "—"}</span>
                <div className="d-flex flex-row align-items-center gap-1 text-muted text-capitalize text-truncate" style={{ fontSize: "0.85rem" }}>
                  <small>{rowData?.level_name ?? "—"}</small>
                  <Dot />
                  <small>{rowData?.specialty_name ?? "—"}</small>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center gap-2 flex-wrap">
              {[rowData?.exam_name, rowData?.academic_year].filter(Boolean).map((label) => (
                <small key={label} style={pillStyle} className="rounded-pill px-2 primary-background-100 color-primary text-capitalize">
                  {label}
                </small>
              ))}
            </div>
          </div>

          <div className="d-flex flex-column gap-1">
            <div className="d-flex flex-row justify-content-between align-items-center">
              <small style={{ fontSize: "0.7rem" }} className="text-muted">
                {ready ? entry.entered : 0} / {ready ? entry.total : 0} Courses Evaluated
              </small>
              <small style={{ fontSize: "0.7rem" }} className="fw-semibold">
                {(ready ? entry.completion : 0).toFixed(0)} % complete
              </small>
            </div>
            <ProgressBar
              now={ready ? entry.completion : 0}
              style={{ height: "0.2rem", backgroundColor: "#e9ecef", borderRadius: "10px" }}
              className="ev-custom-progress"
            />
          </div>

          <div className="mt-auto w-100 pt-2 border-top d-flex flex-column gap-2">
            <div className="d-flex flex-row justify-content-between align-items-center w-100">
              <span className="text-muted font-size-sm">GPA</span>
              <div className="d-flex flex-row align-items-baseline">
                <span className="fw-bold font-size-md tabular-numbers">
                  <NumberFlow value={toNumber(summary?.gpa)} format={{ maximumFractionDigits: 2 }} />
                </span>
                <span>/</span>
                <span className="text-muted font-size-sm">
                  {Number.isFinite(maxGpaText) ? maxGpaText.toFixed(2) : "—"}
                </span>
              </div>
            </div>
            <SummaryRow label="Courses Passed"><NumberFlow value={toNumber(summary?.coursesPassed)} /></SummaryRow>
            <SummaryRow label="Courses Failed"><NumberFlow value={toNumber(summary?.coursesFailed)} /></SummaryRow>
            <SummaryRow label="Resits"><NumberFlow value={toNumber(summary?.resits)} /></SummaryRow>
            {/* no result while a score is missing or invalid */}
            <SummaryRow label="Result" className={`fw-semibold ${resultTone(resultStatus)}`}>
              {RESULT_LABEL[resultStatus] ?? "N/A"}
            </SummaryRow>
          </div>
        </div>

        <VerticalDashedLine dashed={false} color="#ccc" thickness={0.4} height="100%" />

        <div className="d-flex flex-column gap-2 h-100 p-2 overflow-hidden" style={{ width: "70%" }}>
          {renderBody()}
        </div>
      </div>

      <FormErrorBanner ref={form.errorBannerRef} error={form.formError} onDismiss={form.clearFormError} className="mx-2 mb-2" />
      <div className="border-top p-2 flex-shrink-0" style={{ height: "6dvh" }}>
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100 h-100">
          {ready && entry.errorCount > 0 && entry.entered > 0 && (
            <small className="text-muted me-auto">
              {entry.errorCount} {entry.errorCount === 1 ? "course needs" : "courses need"} a valid score
            </small>
          )}
          <button
            type="button"
            className="border-0 px-3 py-2 border rounded-3 font-size-sm bg-none"
            disabled={isSaving}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`border-0 px-3 py-2 border rounded-3 font-size-sm primary-background text-white ${saveDisabled && !isSaving ? "opacity-50" : ""}`}
            disabled={saveDisabled}
            onClick={onSave}
          >
            {isSaving ? <SingleSpinner /> : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
