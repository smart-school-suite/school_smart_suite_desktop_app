import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheckBig,
  CircleDashed,
  Clock,
  ExternalLink,
  Layers,
  LoaderCircle,
  Lock,
  RotateCcw,
  ShieldCheck,
  ShieldQuestion,
  Sparkles,
  TriangleAlert,
  User,
  Wrench,
} from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useApplySemesterTimetableSolutions } from "../../../hooks/semesterTimetable/useApplySolutionSemesterTimetable";
import { useGetSemesterTimetableSolutions } from "../../../hooks/semesterTimetable/useGetSemesterTimetableSolutions";
import { setTimetableVersion } from "../../../Slices/SemesterTimetable/semesterTimetableSlice";
import "../../../styles/timetableResolution.css";
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
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: EASE } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15, ease: EASE } },
};
const collapse = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: { height: { duration: 0.28, ease: EASE }, opacity: { duration: 0.2, delay: 0.05 } },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { height: { duration: 0.22, ease: EASE }, opacity: { duration: 0.12 } },
  },
};

const AFFECTED_ICONS = { course: BookOpen, teacher: User, hall: Building2 };

/**
 * Drawer: review the problems of a semester timetable version, pick one
 * solution per problem and apply them. Applying creates and generates a new
 * version (POST .../solutions/apply { solution_ids }); this version stays.
 */
function SemesterTimetableError({ handleClose }) {
  const version = useSelector(
    (state) => state.semesterTimetable.timetableVersion,
  );
  const versionId = version?.id;
  const { data, isLoading, isFetching, error, refetch } =
    useGetSemesterTimetableSolutions(versionId);
  const insight = data?.data;
  const days = useMemo(() => insight?.days ?? [], [insight]);
  const problems = useMemo(() => allProblems(days), [days]);
  const setupProblems = insight?.setup_problems ?? [];

  const [selection, setSelection] = useState({});
  const [dayFilter, setDayFilter] = useState("all");
  const [view, setView] = useState("review"); // review | confirm | result
  const [expanded, setExpanded] = useState({});

  const apply = useApplySemesterTimetableSolutions();

  // Keep selections valid when solutions are refetched.
  useEffect(() => {
    setSelection((current) => pruneSelection(current, problems));
  }, [problems]);

  // Open the first problem (or every problem when there are only a few).
  useEffect(() => {
    if (!problems.length) return;
    setExpanded((current) => {
      if (Object.keys(current).length) return current;
      const open = problems.length <= 2 ? problems : problems.slice(0, 1);
      return Object.fromEntries(open.map((problem) => [problem.id, true]));
    });
  }, [problems]);

  const selectedCount = problems.filter((p) => selection[p.id]).length;
  const solvableCount = problems.filter((p) =>
    (p.options ?? []).some(canApplyOption),
  ).length;

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
        const claimed = claimedIssueIds(next, problems, problem.id);
        const option = recommendedOption(problem);
        if (option && !overlapsClaimed(option, claimed)) {
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
      <div className="tr">
        <EmptyState
          icon={CalendarDays}
          title="No version selected"
          description="Pick a timetable version to see its problems and solutions."
        />
      </div>
    );
  }

  if (isLoading) return <LoadingState />;

  if (error) {
    const { title, description } = apiError(error);
    return (
      <div className="tr">
        <EmptyState icon={CircleAlert} tone="danger" title={title} description={description}>
          <button className="tr-btn tr-btn--secondary" onClick={() => refetch()}>
            <RotateCcw size={14} /> Try again
          </button>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="tr">
      <AnimatePresence mode="wait" initial={false}>
        {view === "review" && (
          <motion.div key="review" className="tr-view" {...fade}>
            <div className="tr-scroll">
              <SummaryHeader
                insight={insight}
                problems={problems}
                isFetching={isFetching}
              />
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
                      setExpanded(
                        Object.fromEntries(problems.map((p) => [p.id, open])),
                      )
                    }
                  />
                  <div className="tr-days">
                    {days
                      .filter((day) => dayFilter === "all" || day.day === dayFilter)
                      .map((day) => (
                        <DaySection
                          key={day.day}
                          day={day}
                          problems={problems}
                          selection={selection}
                          expanded={expanded}
                          onToggle={(id) =>
                            setExpanded((c) => ({ ...c, [id]: !c[id] }))
                          }
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
                  description={
                    insight?.summary?.message ??
                    "Every rule and request was respected."
                  }
                />
              )}
            </div>
            <ActionBar
              selectedCount={selectedCount}
              total={problems.length}
              onClear={() => setSelection({})}
              onCancel={handleClose}
              onContinue={() => setView("confirm")}
              hidden={problems.length === 0}
            />
          </motion.div>
        )}

        {view === "confirm" && (
          <motion.div key="confirm" className="tr-view" {...fade}>
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
          <motion.div key="result" className="tr-view" {...fade}>
            <ResultView result={apply.data.data} onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SemesterTimetableError;

/* -------------------------------------------------------------------------- */
/* Summary                                                                    */
/* -------------------------------------------------------------------------- */

function SummaryHeader({ insight, problems, isFetching }) {
  const summary = insight?.summary ?? {};
  const blocking = summary.blocking_count ?? 0;
  const warnings = summary.warning_count ?? 0;
  const daysAffected = summary.days_affected ?? [];
  const tone = blocking > 0 ? "danger" : warnings > 0 ? "warn" : "success";
  const Icon = tone === "danger" ? TriangleAlert : tone === "warn" ? CircleAlert : CircleCheckBig;

  return (
    <header className="tr-summary">
      <div className="tr-summary__top">
        <span className={`tr-summary__icon tr-tone--${tone}`}>
          <Icon size={18} strokeWidth={2} />
        </span>
        <div className="tr-summary__text">
          <div className="tr-eyebrow">
            {insight?.version?.label ?? "Timetable version"}
            {isFetching && <LoaderCircle size={12} className="tr-spin" />}
          </div>
          <h2 className="tr-summary__title">{summary.headline}</h2>
          {summary.message && <p className="tr-summary__message">{summary.message}</p>}
        </div>
      </div>
      <div className="tr-stats">
        <Stat label="Blocking" value={blocking} tone={blocking ? "danger" : "muted"} />
        <Stat label="Warnings" value={warnings} tone={warnings ? "warn" : "muted"} />
        <Stat label="Problems" value={problems.length} tone="muted" />
        <Stat label="Days affected" value={daysAffected.length} tone="muted" hint={daysAffected.join(", ")} />
      </div>
    </header>
  );
}

function Stat({ label, value, tone, hint }) {
  return (
    <div className="tr-stat" title={hint || undefined}>
      <span className={`tr-stat__value tr-ink--${tone}`}>
        <NumberFlow value={value} />
      </span>
      <span className="tr-stat__label">{label}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Setup problems (version status "failed")                                   */
/* -------------------------------------------------------------------------- */

function SetupProblems({ problems, onNavigate }) {
  const navigate = useNavigate();
  return (
    <section className="tr-section">
      <div className="tr-section__head">
        <span className="tr-section__title">Setup problems</span>
        <span className="tr-count">{problems.length}</span>
      </div>
      <p className="tr-section__hint">
        These must be fixed in your school setup before a timetable can be generated.
      </p>
      <div className="tr-stack">
        {problems.map((problem) => (
          <div key={problem.id} className="tr-card tr-setup">
            <span className="tr-setup__icon">
              <Wrench size={14} />
            </span>
            <div className="tr-setup__body">
              <span className="tr-setup__title">{problem.title}</span>
              {problem.reasons?.map((reason) => (
                <p key={reason} className="tr-muted">{reason}</p>
              ))}
            </div>
            {problem.fix_in && (
              <button
                className="tr-btn tr-btn--secondary tr-btn--sm"
                onClick={() => {
                  onNavigate?.();
                  navigate(problem.fix_in);
                }}
              >
                Fix <ExternalLink size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Toolbar: day filter + bulk actions                                         */
/* -------------------------------------------------------------------------- */

function Toolbar({ days, dayFilter, onDayFilter, canRecommend, onRecommend, allExpanded, onToggleAll }) {
  const total = days.reduce((sum, d) => sum + (d.problem_count ?? d.problems?.length ?? 0), 0);
  const tabs = [{ day: "all", day_label: "All days", problem_count: total }, ...days];
  return (
    <div className="tr-toolbar">
      <div className="tr-segment" role="tablist" aria-label="Filter by day">
        {tabs.map((tab) => {
          const active = dayFilter === tab.day;
          return (
            <button
              key={tab.day}
              role="tab"
              aria-selected={active}
              className={`tr-segment__item ${active ? "is-active" : ""}`}
              onClick={() => onDayFilter(tab.day)}
            >
              {active && (
                <motion.span
                  layoutId="tr-segment-pill"
                  className="tr-segment__pill"
                  transition={{ duration: 0.25, ease: EASE }}
                />
              )}
              <span className="tr-segment__label">{tab.day_label}</span>
              <span className="tr-segment__count">{tab.problem_count ?? tab.problems?.length}</span>
            </button>
          );
        })}
      </div>
      <div className="tr-toolbar__actions">
        <button className="tr-btn tr-btn--ghost tr-btn--sm" onClick={() => onToggleAll(!allExpanded)}>
          {allExpanded ? "Collapse all" : "Expand all"}
        </button>
        <button
          className="tr-btn tr-btn--ghost tr-btn--sm tr-btn--accent"
          disabled={!canRecommend}
          onClick={onRecommend}
          title="Select the recommended solution for every problem without a selection"
        >
          <Sparkles size={13} /> Use recommended
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Day → problems                                                             */
/* -------------------------------------------------------------------------- */

function DaySection({ day, problems, selection, expanded, onToggle, onSelect }) {
  const resolved = day.problems.filter((p) => selection[p.id]).length;
  return (
    <section className="tr-day">
      <div className="tr-day__head">
        <span className="tr-day__label">{day.day_label}</span>
        <span className="tr-day__meta">
          {day.issue_count} {day.issue_count === 1 ? "issue" : "issues"}
          <span className="tr-dot-sep" />
          {resolved}/{day.problems.length} with a solution
        </span>
      </div>
      <div className="tr-stack">
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
    </section>
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

  return (
    <article className={`tr-card tr-problem ${open ? "is-open" : ""} ${selected ? "is-resolved" : ""}`}>
      <button className="tr-problem__head" onClick={onToggle} aria-expanded={open}>
        <span className={`tr-status tr-status--${selected ? "resolved" : severity}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={selected ? "ok" : "open"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="tr-status__glyph"
            >
              {selected ? <Check size={12} strokeWidth={3} /> : connected ? <Layers size={12} /> : <CircleAlert size={12} />}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="tr-problem__text">
          <span className="tr-problem__title">{problem.title}</span>
          <span className="tr-problem__desc">
            {selected ? (
              <>
                <span className="tr-ink--success">Solution selected:</span> {selected.title}
              </>
            ) : (
              problem.description
            )}
          </span>
        </span>
        <span className="tr-problem__side">
          <SeverityBadge severity={severity} />
          <span className="tr-faint">
            {problem.options.length} {problem.options.length === 1 ? "option" : "options"}
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="tr-chevron">
            <ChevronDown size={16} />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="body" {...collapse} className="tr-collapse">
            <div className="tr-problem__body">
              {connected && (
                <div className="tr-callout">
                  <Layers size={14} />
                  <span>
                    These {problem.issues.length} problems share an underlying cause. Resolving them together usually takes fewer changes.
                  </span>
                </div>
              )}

              <div className="tr-subhead">What went wrong</div>
              <div className="tr-issues">
                {problem.issues.map((issue, index) => (
                  <IssueRow key={issue.id} issue={issue} index={connected ? index + 1 : null} />
                ))}
              </div>

              <div className="tr-subhead">
                Choose a solution
                {selected && <span className="tr-subhead__hint">Click the selected option again to clear it</span>}
              </div>
              {problem.options.length === 0 ? (
                <div className="tr-callout tr-callout--muted">
                  <ShieldQuestion size={14} />
                  <span>No automatic solution was found. Adjust the related constraints manually, then generate again.</span>
                </div>
              ) : (
                <div className="tr-options" role="radiogroup" aria-label={`Solutions for ${problem.title}`}>
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
    </article>
  );
}

function SeverityBadge({ severity }) {
  return severity === "blocking" ? (
    <span className="tr-badge tr-badge--danger">Blocking</span>
  ) : (
    <span className="tr-badge tr-badge--warn">Warning</span>
  );
}

function IssueRow({ issue, index }) {
  return (
    <div className="tr-issue">
      <div className="tr-issue__head">
        {index && <span className="tr-issue__index">{index}</span>}
        <span className="tr-issue__title">{issue.title}</span>
        {!issue.can_be_changed && (
          <span className="tr-badge tr-badge--muted" title="This constraint is locked. Only what is around it can change.">
            <Lock size={10} /> Locked
          </span>
        )}
      </div>
      <div className="tr-meta">
        {issue.time && (
          <span className="tr-chip">
            <Clock size={11} /> {issue.day_label} · {issue.time}
          </span>
        )}
        {issue.affected?.map((item) => {
          const Icon = AFFECTED_ICONS[item.type] ?? CircleDashed;
          return (
            <span key={`${item.type}-${item.id}`} className="tr-chip">
              <Icon size={11} /> {item.name}
            </span>
          );
        })}
      </div>
      {issue.reasons?.length > 0 && (
        <ul className="tr-reasons">
          {issue.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Options                                                                    */
/* -------------------------------------------------------------------------- */

function OptionCard({ option, selected, conflict, onSelect }) {
  const [showSteps, setShowSteps] = useState(false);
  const applicable = canApplyOption(option);
  const disabled = !applicable || conflict;

  const handleKey = (event) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
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
      onKeyDown={handleKey}
      onClick={() => !disabled && onSelect()}
      className={`tr-option ${selected ? "is-selected" : ""} ${disabled ? "is-disabled" : ""}`}
    >
      <div className="tr-option__main">
        <span className="tr-radio" aria-hidden>
          <motion.span
            className="tr-radio__dot"
            initial={false}
            animate={{ scale: selected ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </span>
        <div className="tr-option__text">
          <div className="tr-option__title-row">
            <span className="tr-option__title">{option.title}</span>
            {option.recommended && applicable && (
              <span className="tr-badge tr-badge--accent">
                <Sparkles size={10} /> Recommended
              </span>
            )}
          </div>
          {option.summary && option.summary !== option.title && (
            <p className="tr-option__summary">{option.summary}</p>
          )}
          <div className="tr-meta">
            <span className={`tr-chip ${option.fixes?.all ? "tr-chip--success" : ""}`}>
              <Check size={11} /> {option.fixes?.label}
            </span>
            {option.effort && (
              <span className={`tr-chip tr-effort tr-effort--${option.effort.level}`}>
                <EffortBars level={option.effort.level} /> {option.effort.label}
              </span>
            )}
            <VerifiedChip checked={option.checked} />
          </div>
        </div>
      </div>

      {!applicable && (
        <div className="tr-callout tr-callout--warn tr-option__note">
          <Wrench size={13} />
          <div>
            <span className="fw-medium">Needs manual changes — can't be applied automatically.</span>
            {option.apply?.manual_steps?.map((step) => (
              <div key={step.step} className="tr-muted">
                Step {step.step}: {step.reason}
              </div>
            ))}
          </div>
        </div>
      )}
      {applicable && conflict && (
        <div className="tr-callout tr-callout--muted tr-option__note">
          <CircleAlert size={13} />
          <span>Overlaps a solution you chose for another problem.</span>
        </div>
      )}

      {option.steps?.length > 0 && (
        <>
          <button
            className="tr-steps-toggle"
            onClick={(event) => {
              event.stopPropagation();
              setShowSteps((value) => !value);
            }}
            onKeyDown={(event) => event.stopPropagation()}
            aria-expanded={showSteps}
          >
            <motion.span animate={{ rotate: showSteps ? 90 : 0 }} transition={{ duration: 0.18 }} className="d-inline-flex">
              <ArrowRight size={12} />
            </motion.span>
            {showSteps ? "Hide" : "Show"} {option.steps.length} {option.steps.length === 1 ? "change" : "changes"}
          </button>
          <AnimatePresence initial={false}>
            {showSteps && (
              <motion.div key="steps" {...collapse} className="tr-collapse" onClick={(e) => e.stopPropagation()}>
                <StepList steps={option.steps} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

function EffortBars({ level }) {
  const filled = { small: 1, medium: 2, large: 3 }[level] ?? 1;
  return (
    <span className="tr-bars" aria-hidden>
      {[1, 2, 3].map((bar) => (
        <span key={bar} className={bar <= filled ? "is-on" : ""} />
      ))}
    </span>
  );
}

function VerifiedChip({ checked }) {
  if (checked === true)
    return (
      <span className="tr-chip tr-chip--success" title="This solution was re-checked against the timetable rules">
        <ShieldCheck size={11} /> Verified
      </span>
    );
  if (checked === false)
    return (
      <span className="tr-chip" title="This solution could not be fully re-checked in advance">
        <ShieldQuestion size={11} /> Not verified
      </span>
    );
  return null;
}

function StepList({ steps }) {
  return (
    <ol className="tr-steps">
      {steps.map((step) => (
        <li key={step.id ?? step.number} className="tr-step">
          <span className="tr-step__num">{step.number}</span>
          <div className="tr-step__body">
            <div className="tr-step__text">
              <span className={`tr-action tr-action--${step.action}`}>{step.action_label}</span>
              {step.text}
            </div>
            {step.changes?.length > 0 && (
              <div className="tr-changes">
                {step.changes.map((change) => (
                  <div key={change.field} className="tr-change">
                    <span className="tr-change__label">{change.label}</span>
                    <span className="tr-change__from">{change.from ?? "—"}</span>
                    <ArrowRight size={11} className="tr-faint" />
                    <span className="tr-change__to">{change.to ?? "—"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* -------------------------------------------------------------------------- */
/* Sticky action bar                                                          */
/* -------------------------------------------------------------------------- */

function ActionBar({ selectedCount, total, onClear, onCancel, onContinue, hidden }) {
  if (hidden) {
    return (
      <footer className="tr-actionbar">
        <span />
        <button className="tr-btn tr-btn--secondary" onClick={onCancel}>Close</button>
      </footer>
    );
  }
  const progress = total ? (selectedCount / total) * 100 : 0;
  return (
    <footer className="tr-actionbar">
      <div className="tr-actionbar__progress">
        <div className="tr-progress">
          <motion.span
            className="tr-progress__bar"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: EASE }}
          />
        </div>
        <span className="tr-actionbar__label">
          <span className="fw-semibold">
            <NumberFlow value={selectedCount} />
          </span>{" "}
          of {total} {total === 1 ? "problem" : "problems"} have a solution
          {selectedCount > 0 && (
            <button className="tr-link" onClick={onClear}>Clear</button>
          )}
        </span>
      </div>
      <div className="tr-actionbar__buttons">
        <button className="tr-btn tr-btn--ghost" onClick={onCancel}>Cancel</button>
        <button className="tr-btn tr-btn--primary" disabled={selectedCount === 0} onClick={onContinue}>
          Review {selectedCount > 0 ? selectedCount : ""} {selectedCount === 1 ? "solution" : "solutions"}
          <ArrowRight size={14} />
        </button>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Confirm                                                                    */
/* -------------------------------------------------------------------------- */

function ConfirmView({ version, problems, selection, apply, onBack, onApply }) {
  const chosen = problems
    .map((problem) => ({ problem, option: findOption(problem, selection[problem.id]) }))
    .filter((entry) => entry.option);
  const skipped = problems.length - chosen.length;
  const changeCount = chosen.reduce((sum, { option }) => sum + (option.steps?.length ?? 0), 0);
  const error = apply.isError ? apiError(apply.error) : null;

  return (
    <>
      <div className="tr-scroll">
        <header className="tr-summary">
          <button className="tr-back" onClick={onBack} disabled={apply.isPending}>
            <ArrowLeft size={14} /> Back to problems
          </button>
          <h2 className="tr-summary__title">Apply {chosen.length} {chosen.length === 1 ? "solution" : "solutions"}</h2>
          <p className="tr-summary__message">
            A new version will be created from <span className="fw-medium">{version?.label ?? "this version"}</span> with{" "}
            {changeCount} {changeCount === 1 ? "change" : "changes"} and generated straight away. This version stays as it is, so you can always come back to it.
          </p>
        </header>

        {skipped > 0 && (
          <div className="tr-callout tr-callout--warn tr-mx">
            <CircleAlert size={14} />
            <span>
              {skipped} {skipped === 1 ? "problem has" : "problems have"} no solution selected and may still appear in the new version.
            </span>
          </div>
        )}

        <AnimatePresence>
          {error && (
            <motion.div {...fade} className="tr-callout tr-callout--danger tr-mx" role="alert">
              <CircleAlert size={14} />
              <div>
                <div className="fw-medium">{error.title}</div>
                <div>{error.description}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="tr-stack tr-mx">
          {chosen.map(({ problem, option }) => (
            <div key={problem.id} className="tr-card tr-confirm">
              <div className="tr-confirm__head">
                <span className="tr-eyebrow">{problem.day_label}</span>
                <span className="tr-confirm__problem">{problem.title}</span>
              </div>
              <div className="tr-confirm__option">
                <Check size={14} className="tr-ink--success" />
                <span className="fw-medium">{option.title}</span>
                {option.recommended && <span className="tr-badge tr-badge--accent">Recommended</span>}
              </div>
              <StepList steps={option.steps ?? []} />
            </div>
          ))}
        </div>
      </div>
      <footer className="tr-actionbar">
        <span className="tr-actionbar__label tr-muted">You can review and activate the new version once it is generated.</span>
        <div className="tr-actionbar__buttons">
          <button className="tr-btn tr-btn--ghost" onClick={onBack} disabled={apply.isPending}>Back</button>
          <button className="tr-btn tr-btn--primary" onClick={onApply} disabled={apply.isPending || chosen.length === 0}>
            {apply.isPending ? (
              <>
                <LoaderCircle size={14} className="tr-spin" /> Applying…
              </>
            ) : (
              <>Apply and generate</>
            )}
          </button>
        </div>
      </footer>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Result                                                                     */
/* -------------------------------------------------------------------------- */

function ResultView({ result, onClose }) {
  const dispatch = useDispatch();
  const changes = result?.changes ?? [];
  const failed = changes.filter((change) => !change.applied);

  const openNewVersion = () => {
    if (result?.new_version) dispatch(setTimetableVersion(result.new_version));
    onClose();
  };

  return (
    <>
      <div className="tr-scroll">
        <div className="tr-result">
          <motion.span
            className="tr-result__icon"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.05 }}
          >
            <Check size={22} strokeWidth={2.5} />
          </motion.span>
          <h2 className="tr-summary__title">Solutions applied</h2>
          <p className="tr-summary__message">{result?.message}</p>
          <div className="tr-versions">
            <VersionPill version={result?.source_version} caption="Unchanged" />
            <ArrowRight size={14} className="tr-faint" />
            <VersionPill version={result?.new_version} caption="Generating" active />
          </div>
        </div>

        {changes.length > 0 && (
          <section className="tr-section">
            <div className="tr-section__head">
              <span className="tr-section__title">Changes made</span>
              <span className="tr-count">{changes.length}</span>
            </div>
            <ul className="tr-changelog">
              {changes.map((change, index) => (
                <Fragment key={`${change.solution_id}-${change.step}-${index}`}>
                  <li className={change.applied ? "" : "is-failed"}>
                    <span className="tr-changelog__icon">
                      {change.applied ? <Check size={12} /> : <CircleAlert size={12} />}
                    </span>
                    <div>
                      <div>{change.text}</div>
                      {change.reason && <div className="tr-muted">{change.reason}</div>}
                    </div>
                  </li>
                </Fragment>
              ))}
            </ul>
            {failed.length > 0 && (
              <p className="tr-section__hint">{failed.length} step(s) were not applied and need a manual change.</p>
            )}
          </section>
        )}
      </div>
      <footer className="tr-actionbar">
        <span />
        <div className="tr-actionbar__buttons">
          <button className="tr-btn tr-btn--ghost" onClick={onClose}>Stay on this version</button>
          <button className="tr-btn tr-btn--primary" onClick={openNewVersion} disabled={!result?.new_version}>
            Open {result?.new_version?.label ?? "new version"} <ArrowRight size={14} />
          </button>
        </div>
      </footer>
    </>
  );
}

function VersionPill({ version, caption, active }) {
  return (
    <div className={`tr-version ${active ? "is-active" : ""}`}>
      <span className="tr-version__label">{version?.label ?? "—"}</span>
      <span className="tr-version__caption">
        {active && <LoaderCircle size={10} className="tr-spin" />} {caption}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* States                                                                     */
/* -------------------------------------------------------------------------- */

function EmptyState({ icon: Icon, title, description, tone = "muted", children }) {
  return (
    <div className="tr-empty">
      <span className={`tr-empty__icon tr-tone--${tone}`}>
        <Icon size={20} />
      </span>
      <span className="tr-empty__title">{title}</span>
      {description && <p className="tr-muted">{description}</p>}
      {children}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="tr">
      <div className="tr-scroll">
        <div className="tr-summary">
          <RectangleSkeleton width="30%" height="0.6rem" />
          <div style={{ height: 8 }} />
          <RectangleSkeleton width="65%" height="1rem" />
          <div style={{ height: 6 }} />
          <RectangleSkeleton width="90%" height="0.6rem" />
          <div className="tr-stats" style={{ marginTop: 16 }}>
            {[...Array(4)].map((_, i) => (
              <RectangleSkeleton key={i} width="100%" height="3rem" />
            ))}
          </div>
        </div>
        <div className="tr-stack tr-mx">
          {[...Array(3)].map((_, i) => (
            <RectangleSkeleton key={i} width="100%" height="4.5rem" />
          ))}
        </div>
      </div>
    </div>
  );
}
