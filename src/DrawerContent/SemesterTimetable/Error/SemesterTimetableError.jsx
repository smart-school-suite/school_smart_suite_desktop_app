import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheckBig,
  Clock,
  ExternalLink,
  Layers,
  Lock,
  ShieldCheck,
  ShieldQuestion,
  Sparkles,
  TriangleAlert,
  User,
  Wrench,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useApplySemesterTimetableSolutions } from "../../../hooks/semesterTimetable/useApplySolutionSemesterTimetable";
import { useGetSemesterTimetableSolutions } from "../../../hooks/semesterTimetable/useGetSemesterTimetableSolutions";
import { setTimetableVersion } from "../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  allProblems,
  apiError,
  canApplyOption,
  claimedIssueIds,
  findOption,
  overlapsClaimed,
  problemSeverity,
  pruneSelection,
  recommendedOption,
  toApplyPayload,
} from "./resolutionModel";

const EASE = [0.32, 0.72, 0, 1];
const fade = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};
const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1, transition: { duration: 0.24, ease: EASE } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.18, ease: EASE } },
};
const viewStyle = { display: "flex", flexDirection: "column", flex: 1, minHeight: 0 };
const iconBox = (size) => ({ width: size, height: size, flexShrink: 0 });

const AFFECTED_ICONS = { course: BookOpen, teacher: User, invigilator: User, hall: Building2 };
// Bootstrap's .border sets the colour with !important, so toned borders are
// drawn inline from the palette variables instead.
const TONE = {
  danger: "bg-red-50 text-red-700",
  warn: "bg-old-lace-50 text-old-lace-700",
  success: "bg-fern-50 text-fern-700",
  info: "bg-primary-50 text-primary-700",
  muted: "bg-iron-50 text-iron-600",
};
const TONE_BORDER = {
  danger: "--red-100",
  warn: "--old-lace-200",
  success: "--fern-200",
  info: "--primary-color-200",
  muted: "--iron-200",
};
const toneBorder = (tone, extra) => ({ border: `1px solid var(${TONE_BORDER[tone]})`, ...extra });
const EFFORT_TONE = { small: "text-fern-600", medium: "text-old-lace-600", large: "text-red-700" };

/**
 * Drawer: review the problems of a semester timetable version, pick one
 * solution per problem and apply them. Applying creates and generates a new
 * version (POST .../solutions/apply { solution_ids }); this version stays.
 */
function SemesterTimetableError({ handleClose }) {
  const dispatch = useDispatch();
  const version = useSelector((state) => state.semesterTimetable.timetableVersion);
  const query = useGetSemesterTimetableSolutions(version?.id);
  const apply = useApplySemesterTimetableSolutions();
  return (
    <TimetableResolution
      version={version}
      query={query}
      apply={apply}
      onOpenVersion={(newVersion) => dispatch(setTimetableVersion(newVersion))}
      handleClose={handleClose}
    />
  );
}

export default SemesterTimetableError;

/**
 * The drawer itself, shared by the semester and exam timetables. `query` is
 * the solutions query of the version, `apply` the apply-solutions mutation,
 * and `normalize` turns another timetable's response into the semester shape
 * ({ summary, days[{ day, day_label, problems[] }], setup_problems[] }).
 */
export function TimetableResolution({ version, query, apply, onOpenVersion, handleClose, normalize }) {
  const versionId = version?.id;
  const { data, isLoading, isFetching, error, refetch } = query;
  const insight = useMemo(() => (normalize ? normalize(data?.data) : data?.data), [data, normalize]);
  const days = useMemo(() => insight?.days ?? [], [insight]);
  const problems = useMemo(() => allProblems(days), [days]);
  const setupProblems = insight?.setup_problems ?? [];

  const [selection, setSelection] = useState({});
  const [dayFilter, setDayFilter] = useState("all");
  const [view, setView] = useState("review"); // review | confirm | result
  const [expanded, setExpanded] = useState({});

  // Keep selections valid when solutions are refetched.
  useEffect(() => {
    setSelection((current) => pruneSelection(current, problems));
  }, [problems]);

  // Open the first problem (or both when there are only two).
  useEffect(() => {
    if (!problems.length) return;
    setExpanded((current) => {
      if (Object.keys(current).length) return current;
      const open = problems.length <= 2 ? problems : problems.slice(0, 1);
      return Object.fromEntries(open.map((problem) => [problem.id, true]));
    });
  }, [problems]);

  const selectedCount = problems.filter((p) => selection[p.id]).length;
  const solvableCount = problems.filter((p) => (p.options ?? []).some(canApplyOption)).length;

  const selectOption = (problem, option) => {
    apply.reset();
    setSelection((current) => {
      if (current[problem.id] === option.id) {
        const { [problem.id]: _removed, ...rest } = current;
        return rest;
      }
      return { ...current, [problem.id]: option.id };
    });
  };

  const selectRecommended = () => {
    apply.reset();
    setSelection((current) => {
      const next = { ...current };
      problems.forEach((problem) => {
        if (next[problem.id]) return;
        const option = recommendedOption(problem);
        if (option && !overlapsClaimed(option, claimedIssueIds(next, problems, problem.id))) {
          next[problem.id] = option.id;
        }
      });
      return next;
    });
  };

  const submit = () => {
    const solutionIds = toApplyPayload(selection, problems);
    if (!solutionIds.length || !versionId) return;
    apply.mutate({ versionId, solutionIds }, { onSuccess: () => setView("result") });
  };

  if (!versionId) {
    return (
      <EmptyState
        icon={CircleAlert}
        title="No version selected"
        description="Pick a timetable version to see its problems and solutions."
      />
    );
  }
  if (isLoading) return <LoadingState />;
  if (error) {
    const { title, description } = apiError(error);
    return (
      <EmptyState icon={CircleAlert} tone="danger" title={title} description={description}>
        <button className="border rounded-3 bg-white font-size-sm px-3 py-1" onClick={() => refetch()}>
          Try again
        </button>
      </EmptyState>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {view === "review" && (
        <motion.div key="review" style={viewStyle} {...fade}>
          <div className="drawer-content font-size-sm">
            <SummaryHeader insight={insight} problemCount={problems.length} isFetching={isFetching} />
            {setupProblems.length > 0 && (
              <SetupProblems problems={setupProblems} onNavigate={handleClose} />
            )}
            {problems.length > 0 && (
              <>
                <Toolbar
                  days={days}
                  dayFilter={dayFilter}
                  onDayFilter={setDayFilter}
                  canRecommend={selectedCount < solvableCount}
                  onRecommend={selectRecommended}
                  allExpanded={problems.every((p) => expanded[p.id])}
                  onToggleAll={(open) =>
                    setExpanded(Object.fromEntries(problems.map((p) => [p.id, open])))
                  }
                />
                <div className="d-flex flex-column gap-3 px-3 pb-3">
                  {days
                    .filter((day) => dayFilter === "all" || day.day === dayFilter)
                    .map((day) => (
                      <DaySection
                        key={day.day}
                        day={day}
                        problems={problems}
                        selection={selection}
                        expanded={expanded}
                        onToggle={(id) => setExpanded((c) => ({ ...c, [id]: !c[id] }))}
                        onSelect={selectOption}
                      />
                    ))}
                </div>
              </>
            )}
            {problems.length === 0 && setupProblems.length === 0 && (
              <EmptyState
                icon={CircleCheckBig}
                tone="success"
                title="Nothing to fix"
                description={insight?.summary?.message ?? "Every rule and request was respected."}
              />
            )}
          </div>
          <ActionBar
            selectedCount={selectedCount}
            total={problems.length}
            onClear={() => setSelection({})}
            onCancel={handleClose}
            onContinue={() => setView("confirm")}
          />
        </motion.div>
      )}

      {view === "confirm" && (
        <motion.div key="confirm" style={viewStyle} {...fade}>
          <ConfirmView
            version={insight?.version ?? version}
            problems={problems}
            selection={selection}
            apply={apply}
            onBack={() => {
              apply.reset();
              setView("review");
            }}
            onApply={submit}
          />
        </motion.div>
      )}

      {view === "result" && apply.data && (
        <motion.div key="result" style={viewStyle} {...fade}>
          <ResultView result={apply.data.data} onClose={handleClose} onOpenVersion={onOpenVersion} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function Pill({ tone = "muted", icon: Icon, children, title }) {
  return (
    <span
      title={title}
      className={`d-inline-flex align-items-center gap-1 rounded-pill px-2 font-size-xs text-nowrap ${TONE[tone]}`}
      style={toneBorder(tone)}
    >
      {Icon && <Icon size={10} />}
      {children}
    </span>
  );
}

function Callout({ tone = "info", icon: Icon, children }) {
  return (
    <div className={`d-flex align-items-start gap-2 rounded-3 px-2 py-1 font-size-xs ${TONE[tone]}`} style={toneBorder(tone)}>
      <Icon size={13} className="flex-shrink-0 mt-1" />
      <div>{children}</div>
    </div>
  );
}

function Footer({ children }) {
  return (
    <div className="drawer-footer font-size-sm">
      <div className="d-flex flex-column w-100">
        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
        <div className="d-flex flex-row align-items-center justify-content-between gap-2 px-3 py-2">
          {children}
        </div>
      </div>
    </div>
  );
}

const primaryBtn =
  "d-inline-flex align-items-center gap-1 border-none rounded-3 primary-background text-white font-size-sm px-3 py-1";
const plainBtn = "border-none bg-none font-size-sm text-iron-600";

/* ------------------------------------------------------------------ */
/* Summary                                                             */
/* ------------------------------------------------------------------ */

function SummaryHeader({ insight, problemCount, isFetching }) {
  const summary = insight?.summary ?? {};
  const blocking = summary.blocking_count ?? 0;
  const warnings = summary.warning_count ?? 0;
  const daysAffected = summary.days_affected ?? [];
  const tone = blocking ? "danger" : warnings ? "warn" : "success";
  const Icon = blocking ? TriangleAlert : warnings ? CircleAlert : CircleCheckBig;
  const stats = [
    { label: "Blocking", value: blocking, className: blocking ? "text-red-700" : "" },
    { label: "Warnings", value: warnings, className: warnings ? "text-old-lace-700" : "" },
    { label: "Problems", value: problemCount },
    { label: "Days", value: daysAffected.length, title: daysAffected.join(", ") },
  ];

  return (
    <div className="d-flex flex-column gap-2 px-3 py-3 border-bottom">
      <div className="d-flex align-items-start gap-2">
        <span
          className={`d-inline-flex align-items-center justify-content-center rounded-3 ${TONE[tone]}`}
          style={toneBorder(tone, iconBox("2rem"))}
        >
          <Icon size={16} />
        </span>
        <div className="d-flex flex-column flex-grow-1">
          <span className="font-size-xs text-iron-500 d-flex align-items-center gap-2">
            {insight?.version?.label ?? "Timetable version"}
            {isFetching && <span className="spinner-border text-iron-400" style={iconBox("0.6rem")} />}
          </span>
          <span className="fw-semibold">{summary.headline}</span>
          {summary.message && <span className="text-iron-600 font-size-xs">{summary.message}</span>}
        </div>
      </div>
      <div className="d-flex border rounded-3 bg-iron-50">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            title={stat.title || undefined}
            className={`d-flex flex-column flex-fill px-2 py-1 ${index ? "border-start" : ""}`}
          >
            <span className={`fw-semibold tabular-nums ${stat.className ?? ""}`}>
              <NumberFlow value={stat.value} />
            </span>
            <span className="font-size-xs text-iron-500">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Setup problems (version status "failed")                            */
/* ------------------------------------------------------------------ */

function SetupProblems({ problems, onNavigate }) {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column gap-2 px-3 py-2">
      <div className="d-flex flex-column">
        <span className="fw-semibold">Setup problems ({problems.length})</span>
        <span className="font-size-xs text-iron-500">
          Fix these in your school setup before a timetable can be generated.
        </span>
      </div>
      {problems.map((problem) => (
        <div key={problem.id} className="d-flex align-items-start gap-2 border rounded-3 bg-white p-2">
          <Wrench size={14} className="text-red-700 flex-shrink-0 mt-1" />
          <div className="d-flex flex-column flex-grow-1">
            <span className="fw-medium">{problem.title}</span>
            {problem.reasons?.map((reason) => (
              <span key={reason} className="font-size-xs text-iron-600">{reason}</span>
            ))}
          </div>
          {problem.fix_in && (
            <button
              className="d-inline-flex align-items-center gap-1 border rounded-3 bg-white font-size-xs px-2 py-1"
              onClick={() => {
                onNavigate?.();
                navigate(problem.fix_in);
              }}
            >
              Fix <ExternalLink size={11} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Toolbar: day filter + bulk actions                                  */
/* ------------------------------------------------------------------ */

function Toolbar({ days, dayFilter, onDayFilter, canRecommend, onRecommend, allExpanded, onToggleAll }) {
  const total = days.reduce((sum, d) => sum + (d.problems?.length ?? 0), 0);
  const tabs = [{ day: "all", day_label: "All", count: total }, ...days.map((d) => ({ ...d, count: d.problems?.length ?? 0 }))];

  return (
    <div className="sticky-top bg-white border-bottom d-flex align-items-center justify-content-between gap-2 px-3 py-2 mb-2">
      <div className="d-flex gap-1 bg-iron-100 rounded-3 p-1 over-flow-x-auto" role="tablist">
        {tabs.map((tab) => {
          const active = dayFilter === tab.day;
          return (
            <button
              key={tab.day}
              role="tab"
              aria-selected={active}
              onClick={() => onDayFilter(tab.day)}
              className={`position-relative border-none bg-none rounded-2 px-2 font-size-xs text-nowrap ${active ? "fw-medium" : "text-iron-600"}`}
            >
              {active && (
                <motion.span
                  layoutId="tr-day-pill"
                  className="position-absolute top-0 start-0 w-100 h-100 bg-white rounded-2 shadow-sm"
                  transition={{ duration: 0.22, ease: EASE }}
                />
              )}
              <span className="position-relative">
                {tab.day_label} <span className="text-iron-400">{tab.count}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="d-flex align-items-center gap-2 font-size-xs">
        <button className="border-none bg-none text-iron-600" onClick={() => onToggleAll(!allExpanded)}>
          {allExpanded ? "Collapse all" : "Expand all"}
        </button>
        <button
          className={`d-inline-flex align-items-center gap-1 border-none bg-none color-primary ${canRecommend ? "" : "opacity-50"}`}
          disabled={!canRecommend}
          onClick={onRecommend}
          title="Select the recommended solution for every problem without a selection"
        >
          <Sparkles size={12} /> Use recommended
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Day → problems                                                      */
/* ------------------------------------------------------------------ */

function DaySection({ day, problems, selection, expanded, onToggle, onSelect }) {
  const resolved = day.problems.filter((p) => selection[p.id]).length;
  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex align-items-baseline justify-content-between">
        <span className="fw-semibold">{day.day_label}</span>
        <span className="font-size-xs text-iron-500">
          {day.issue_count} {day.issue_count === 1 ? "issue" : "issues"} · {resolved}/{day.problems.length} solved
        </span>
      </div>
      {day.problems.map((problem) => (
        <ProblemCard
          key={problem.id}
          problem={problem}
          allProblems={problems}
          selection={selection}
          open={!!expanded[problem.id]}
          onToggle={() => onToggle(problem.id)}
          onSelect={(option) => onSelect(problem, option)}
        />
      ))}
    </div>
  );
}

function ProblemCard({ problem, allProblems, selection, open, onToggle, onSelect }) {
  const severity = problemSeverity(problem);
  const selected = findOption(problem, selection[problem.id]);
  const connected = problem.issues.length > 1;
  const claimed = useMemo(
    () => claimedIssueIds(selection, allProblems, problem.id),
    [selection, allProblems, problem.id],
  );
  const statusTone = selected ? "bg-fern-500 text-white" : TONE[severity === "blocking" ? "danger" : "warn"];

  return (
    <div className={`card rounded-3 transition-all duration-200 ${selected ? "border-fern-300" : ""} ${open ? "shadow-sm" : ""}`}>
      <button
        className="d-flex align-items-start gap-2 w-100 border-none bg-none text-start p-2"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span
          className={`d-inline-flex align-items-center justify-content-center rounded-2 transition-all duration-200 ${statusTone}`}
          style={iconBox("1.375rem")}
        >
          {selected ? <Check size={12} strokeWidth={3} /> : connected ? <Layers size={12} /> : <CircleAlert size={12} />}
        </span>
        <span className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <span className="fw-medium">{problem.title}</span>
          <span className="font-size-xs text-iron-600 text-truncate">
            {selected ? (
              <>
                <span className="text-fern-700">Selected:</span> {selected.title}
              </>
            ) : (
              problem.description
            )}
          </span>
        </span>
        <span className="d-flex align-items-center gap-2 flex-shrink-0">
          <Pill tone={severity === "blocking" ? "danger" : "warn"}>
            {severity === "blocking" ? "Blocking" : "Warning"}
          </Pill>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="d-inline-flex text-iron-400">
            <ChevronDown size={15} />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" {...collapse} className="overflow-hidden">
            <div className="d-flex flex-column gap-2 border-top px-2 pb-2 pt-2">
              {connected && (
                <Callout icon={Layers}>
                  These {problem.issues.length} problems share a cause, so fixing them together takes fewer changes.
                </Callout>
              )}

              <div className="border rounded-3 bg-iron-50">
                {problem.issues.map((issue, index) => (
                  <IssueRow key={issue.id} issue={issue} index={connected ? index + 1 : null} first={index === 0} />
                ))}
              </div>

              <span className="font-size-xs text-iron-500 fw-medium">
                Choose a solution ({problem.options.length})
              </span>
              {problem.options.length === 0 ? (
                <Callout tone="muted" icon={ShieldQuestion}>
                  No automatic solution was found. Adjust the related constraints manually, then generate again.
                </Callout>
              ) : (
                <div className="d-flex flex-column gap-2" role="radiogroup" aria-label={`Solutions for ${problem.title}`}>
                  {problem.options.map((option) => (
                    <OptionCard
                      key={option.id}
                      option={option}
                      selected={selected?.id === option.id}
                      conflict={selected?.id !== option.id && overlapsClaimed(option, claimed)}
                      onSelect={() => onSelect(option)}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IssueRow({ issue, index, first }) {
  return (
    <div className={`d-flex flex-column gap-1 px-2 py-2 ${first ? "" : "border-top"}`}>
      <div className="d-flex align-items-center gap-2">
        {index && <span className="font-size-xs text-iron-500 fw-semibold">{index}.</span>}
        <span className="fw-medium">{issue.title}</span>
        {!issue.can_be_changed && (
          <Pill icon={Lock} title="This constraint is locked. Only what is around it can change.">Locked</Pill>
        )}
      </div>
      <div className="d-flex flex-wrap gap-1">
        {issue.time && (
          <Pill icon={Clock}>
            {issue.day_label} · {issue.time}
          </Pill>
        )}
        {issue.affected?.map((item) => (
          <Pill key={`${item.type}-${item.id}`} icon={AFFECTED_ICONS[item.type]}>
            {item.name}
          </Pill>
        ))}
      </div>
      {issue.reasons?.length > 0 && (
        <ul className="mb-0 ps-3 font-size-xs text-iron-600">
          {issue.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Options                                                             */
/* ------------------------------------------------------------------ */

function OptionCard({ option, selected, conflict, onSelect }) {
  const [showSteps, setShowSteps] = useState(false);
  const applicable = canApplyOption(option);
  const disabled = !applicable || conflict;

  const onKeyDown = (event) => {
    if (!disabled && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={onKeyDown}
      onClick={() => !disabled && onSelect()}
      className={`rounded-3 p-2 transition-all duration-200 ${
        selected ? "bg-primary-50" : disabled ? "bg-iron-50 cursor-not-allowed" : "bg-white cursor-pointer hover-bg-iron-50"
      }`}
      style={{ border: `1px solid var(${selected ? "--primary-color-400" : "--iron-200"})` }}
    >
      <div className={`d-flex align-items-start gap-2 ${disabled ? "opacity-60" : ""}`}>
        <input
          type="radio"
          className="form-check-input mt-1 flex-shrink-0 pe-none"
          checked={selected}
          disabled={disabled}
          readOnly
          tabIndex={-1}
        />
        <div className="d-flex flex-column gap-1 flex-grow-1">
          <div className="d-flex align-items-center flex-wrap gap-2">
            <span className="fw-medium">{option.title}</span>
            {option.recommended && applicable && (
              <Pill tone="info" icon={Sparkles}>Recommended</Pill>
            )}
          </div>
          {option.summary && option.summary !== option.title && (
            <span className="font-size-xs text-iron-600">{option.summary}</span>
          )}
          <div className="d-flex flex-wrap align-items-center gap-1">
            <Pill tone={option.fixes?.all ? "success" : "muted"} icon={Check}>{option.fixes?.label}</Pill>
            {option.effort && (
              <span className={`font-size-xs d-inline-flex align-items-center gap-1 px-1 ${EFFORT_TONE[option.effort.level] ?? ""}`}>
                <EffortBars level={option.effort.level} /> {option.effort.label}
              </span>
            )}
            {option.checked === true && (
              <Pill tone="success" icon={ShieldCheck} title="Re-checked against the timetable rules">Verified</Pill>
            )}
            {option.checked === false && (
              <Pill icon={ShieldQuestion} title="Could not be fully re-checked in advance">Not verified</Pill>
            )}
            {option.steps?.length > 0 && (
              <button
                className="ms-auto d-inline-flex align-items-center gap-1 border-none bg-none font-size-xs text-iron-600"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowSteps((value) => !value);
                }}
                onKeyDown={(event) => event.stopPropagation()}
                aria-expanded={showSteps}
              >
                {showSteps ? "Hide" : "Show"} {option.steps.length} {option.steps.length === 1 ? "change" : "changes"}
                <motion.span animate={{ rotate: showSteps ? 180 : 0 }} transition={{ duration: 0.18 }} className="d-inline-flex">
                  <ChevronDown size={12} />
                </motion.span>
              </button>
            )}
          </div>
        </div>
      </div>

      {!applicable && (
        <div className="mt-2">
          <Callout tone="warn" icon={Wrench}>
            <span className="fw-medium">Needs manual changes, so it can't be applied automatically.</span>
            {option.apply?.manual_steps?.map((step) => (
              <div key={step.step}>Step {step.step}: {step.reason}</div>
            ))}
          </Callout>
        </div>
      )}
      {applicable && conflict && (
        <div className="mt-2">
          <Callout tone="muted" icon={CircleAlert}>Overlaps a solution you chose for another problem.</Callout>
        </div>
      )}

      <AnimatePresence initial={false}>
        {showSteps && (
          <motion.div key="steps" {...collapse} className="overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="pt-2">
              <StepList steps={option.steps} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EffortBars({ level }) {
  const filled = { small: 1, medium: 2, large: 3 }[level] ?? 1;
  return (
    <span className="d-inline-flex align-items-end" style={{ height: 9, gap: 1.5 }} aria-hidden>
      {[4, 6.5, 9].map((height, i) => (
        <span
          key={height}
          className={`rounded-1 ${i < filled ? "" : "opacity-30"}`}
          style={{ width: 2.5, height, background: "currentColor" }}
        />
      ))}
    </span>
  );
}

function StepList({ steps }) {
  return (
    <div className="d-flex flex-column border rounded-3 bg-white">
      {steps.map((step, index) => (
        <div key={step.id ?? step.number} className={`d-flex gap-2 px-2 py-1 ${index ? "border-top" : ""}`}>
          <span className="font-size-xs text-iron-500 fw-semibold mt-1">{step.number}.</span>
          <div className="d-flex flex-column flex-grow-1">
            <span>
              <span className="font-size-xs fw-semibold text-uppercase text-primary-700 me-1">{step.action_label}</span>
              {step.text}
            </span>
            {step.changes?.map((change) => (
              <span key={change.field} className="d-flex align-items-center gap-1 font-size-xs tabular-nums">
                <span className="text-iron-500">{change.label}:</span>
                <span className="text-iron-400 text-decoration-line-through">{change.from ?? "—"}</span>
                <ArrowRight size={10} className="text-iron-400" />
                <span className="fw-medium">{change.to ?? "—"}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky action bar                                                   */
/* ------------------------------------------------------------------ */

function ActionBar({ selectedCount, total, onClear, onCancel, onContinue }) {
  if (!total) {
    return (
      <Footer>
        <span />
        <button className={plainBtn} onClick={onCancel}>Close</button>
      </Footer>
    );
  }
  return (
    <Footer>
      <div className="d-flex flex-column gap-1" style={{ width: "45%" }}>
        <div className="progress" style={{ height: 4 }}>
          <div className="progress-bar bg-fern-500" style={{ width: `${(selectedCount / total) * 100}%` }} />
        </div>
        <span className="font-size-xs text-iron-600">
          <span className="fw-semibold"><NumberFlow value={selectedCount} /></span> of {total}{" "}
          {total === 1 ? "problem" : "problems"} solved
          {selectedCount > 0 && (
            <button className="border-none bg-none text-iron-500 text-decoration-underline ms-2 p-0" onClick={onClear}>
              Clear
            </button>
          )}
        </span>
      </div>
      <div className="d-flex align-items-center gap-3">
        <button className={plainBtn} onClick={onCancel}>Cancel</button>
        <button className={`${primaryBtn} ${selectedCount ? "" : "opacity-50"}`} disabled={!selectedCount} onClick={onContinue}>
          Review {selectedCount || ""} {selectedCount === 1 ? "solution" : "solutions"} <ArrowRight size={13} />
        </button>
      </div>
    </Footer>
  );
}

/* ------------------------------------------------------------------ */
/* Confirm                                                             */
/* ------------------------------------------------------------------ */

function ConfirmView({ version, problems, selection, apply, onBack, onApply }) {
  const chosen = problems
    .map((problem) => ({ problem, option: findOption(problem, selection[problem.id]) }))
    .filter((entry) => entry.option);
  const skipped = problems.length - chosen.length;
  const changeCount = chosen.reduce((sum, { option }) => sum + (option.steps?.length ?? 0), 0);
  const error = apply.isError ? apiError(apply.error) : null;

  return (
    <>
      <div className="drawer-content font-size-sm">
        <div className="d-flex flex-column gap-1 px-3 py-3 border-bottom">
          <button
            className="d-inline-flex align-items-center gap-1 border-none bg-none font-size-xs text-iron-600 p-0 align-self-start"
            onClick={onBack}
            disabled={apply.isPending}
          >
            <ArrowLeft size={12} /> Back to problems
          </button>
          <span className="fw-semibold">
            Apply {chosen.length} {chosen.length === 1 ? "solution" : "solutions"}
          </span>
          <span className="font-size-xs text-iron-600">
            A new version is created from <span className="fw-medium">{version?.label ?? "this version"}</span> with{" "}
            {changeCount} {changeCount === 1 ? "change" : "changes"} and generated straight away. This version stays as it is.
          </span>
        </div>

        <div className="d-flex flex-column gap-2 px-3 py-2">
          {skipped > 0 && (
            <Callout tone="warn" icon={CircleAlert}>
              {skipped} {skipped === 1 ? "problem has" : "problems have"} no solution selected and may still appear in the new version.
            </Callout>
          )}
          <AnimatePresence>
            {error && (
              <motion.div {...fade} role="alert">
                <Callout tone="danger" icon={CircleAlert}>
                  <div className="fw-medium">{error.title}</div>
                  <div>{error.description}</div>
                </Callout>
              </motion.div>
            )}
          </AnimatePresence>

          {chosen.map(({ problem, option }) => (
            <div key={problem.id} className="card rounded-3 p-2 d-flex flex-column gap-2">
              <div className="d-flex flex-column">
                <span className="font-size-xs text-iron-500">{problem.day_label}</span>
                <span className="fw-medium">{problem.title}</span>
              </div>
              <div className={`d-flex align-items-center gap-2 rounded-3 px-2 py-1 ${TONE.success}`} style={toneBorder("success")}>
                <Check size={13} />
                <span className="fw-medium">{option.title}</span>
              </div>
              <StepList steps={option.steps ?? []} />
            </div>
          ))}
        </div>
      </div>
      <Footer>
        <span className="font-size-xs text-iron-500">You can activate the new version once it is generated.</span>
        <div className="d-flex align-items-center gap-3">
          <button className={plainBtn} onClick={onBack} disabled={apply.isPending}>Back</button>
          <button className={primaryBtn} onClick={onApply} disabled={apply.isPending || !chosen.length}>
            {apply.isPending ? (
              <>
                <span className="spinner-border spinner-border-sm" style={iconBox("0.8rem")} /> Applying…
              </>
            ) : (
              "Apply and generate"
            )}
          </button>
        </div>
      </Footer>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Result                                                              */
/* ------------------------------------------------------------------ */

function ResultView({ result, onClose, onOpenVersion }) {
  const changes = result?.changes ?? [];
  const failed = changes.filter((change) => !change.applied).length;

  const openNewVersion = () => {
    if (result?.new_version) onOpenVersion?.(result.new_version);
    onClose();
  };

  return (
    <>
      <div className="drawer-content font-size-sm">
        <div className="d-flex flex-column align-items-center text-center gap-1 px-3 py-4 border-bottom">
          <motion.span
            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-fern-500 text-white mb-1"
            style={iconBox("2.5rem")}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
          >
            <Check size={20} strokeWidth={2.5} />
          </motion.span>
          <span className="fw-semibold">Solutions applied</span>
          <span className="font-size-xs text-iron-600">{result?.message}</span>
          <div className="d-flex align-items-center gap-2 mt-2">
            <VersionPill version={result?.source_version} caption="Unchanged" />
            <ArrowRight size={13} className="text-iron-400" />
            <VersionPill version={result?.new_version} caption="Generating" active />
          </div>
        </div>

        {changes.length > 0 && (
          <div className="d-flex flex-column gap-2 px-3 py-2">
            <span className="fw-semibold">Changes made ({changes.length})</span>
            <div className="border rounded-3 bg-white">
              {changes.map((change, index) => (
                <div
                  key={`${change.solution_id}-${change.step}-${index}`}
                  className={`d-flex align-items-start gap-2 px-2 py-1 ${index ? "border-top" : ""}`}
                >
                  {change.applied ? (
                    <Check size={13} className="text-fern-600 flex-shrink-0 mt-1" />
                  ) : (
                    <CircleAlert size={13} className="text-old-lace-600 flex-shrink-0 mt-1" />
                  )}
                  <div className="d-flex flex-column">
                    <span>{change.text}</span>
                    {change.reason && <span className="font-size-xs text-iron-500">{change.reason}</span>}
                  </div>
                </div>
              ))}
            </div>
            {failed > 0 && (
              <span className="font-size-xs text-old-lace-700">{failed} step(s) were not applied and need a manual change.</span>
            )}
          </div>
        )}
      </div>
      <Footer>
        <button className={plainBtn} onClick={onClose}>Stay on this version</button>
        <button className={primaryBtn} onClick={openNewVersion} disabled={!result?.new_version}>
          Open {result?.new_version?.label ?? "new version"} <ArrowRight size={13} />
        </button>
      </Footer>
    </>
  );
}

function VersionPill({ version, caption, active }) {
  return (
    <div
      className={`d-flex flex-column align-items-start rounded-3 px-2 py-1 ${TONE[active ? "info" : "muted"]}`}
      style={toneBorder(active ? "info" : "muted")}
    >
      <span className="fw-medium text-iron-900">{version?.label ?? "—"}</span>
      <span className="font-size-xs d-inline-flex align-items-center gap-1">
        {active && <span className="spinner-border" style={iconBox("0.55rem")} />}
        {caption}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* States                                                              */
/* ------------------------------------------------------------------ */

function EmptyState({ icon: Icon, title, description, tone = "muted", children }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center gap-1 flex-grow-1 px-3 py-5 font-size-sm">
      <span
        className={`d-inline-flex align-items-center justify-content-center rounded-3 mb-1 ${TONE[tone]}`}
        style={toneBorder(tone, iconBox("2.5rem"))}
      >
        <Icon size={18} />
      </span>
      <span className="fw-semibold">{title}</span>
      {description && <span className="font-size-xs text-iron-600 mb-2">{description}</span>}
      {children}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="drawer-content d-flex flex-column gap-2 px-3 py-3">
      <RectangleSkeleton width="40%" height="0.6rem" />
      <RectangleSkeleton width="70%" height="0.9rem" />
      <RectangleSkeleton width="100%" height="2.5rem" />
      {[...Array(3)].map((_, i) => (
        <RectangleSkeleton key={i} width="100%" height="3.5rem" />
      ))}
    </div>
  );
}
