import { differenceInCalendarDays, format, isValid, parseISO } from "date-fns";
import { CalendarRange, ChevronLeft, Copy, Info, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../Spinners/Spinners";

export const toDate = (value) => {
  const date = value ? parseISO(value) : null;
  return date && isValid(date) ? date : null;
};

export const shortDate = (value) => {
  const date = toDate(value);
  return date ? format(date, "d MMM yyyy") : value;
};

export const dateSpan = (start, end) => `${shortDate(start)} – ${shortDate(end)}`;

export const isCompleteDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value ?? "") && Boolean(toDate(value));

export const weeksBetween = (start, end) =>
  Math.max(1, Math.round((differenceInCalendarDays(toDate(end), toDate(start)) + 1) / 7));

export const matchesQuery = (values, query) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return values.filter(Boolean).some((value) => String(value).toLowerCase().includes(needle));
};

export function FlowStep({ number, total, title, context, tip, children }) {
  return (
    <section className="d-flex flex-column gap-2" aria-label={`Step ${number} of ${total}: ${title}`}>
      <div className="d-flex flex-column">
        <span className="font-size-xs text-iron-400" aria-live="polite">
          Step {number} of {total}
        </span>
        <span className="fw-semibold font-size-md">{title}</span>
        {context && <span className="font-size-xs text-iron-500 text-truncate text-capitalize">{context}</span>}
      </div>
      {tip && <FlowTip>{tip}</FlowTip>}
      <div>{children}</div>
    </section>
  );
}

export function FlowTip({ children }) {
  return (
    <span className="d-flex align-items-center gap-1 text-iron-500 font-size-xs">
      <Lightbulb size={13} strokeWidth={1.75} className="text-old-lace-500 flex-shrink-0" />
      {children}
    </span>
  );
}

export function FlowNote({ children }) {
  return (
    <span className="d-flex align-items-center gap-1 text-iron-500 font-size-xs">
      <Info size={13} strokeWidth={1.75} />
      {children}
    </span>
  );
}

export function SuggestionChip({ suggestion, source, onApply }) {
  if (!suggestion) return null;
  return (
    <div className="d-flex flex-column gap-1 align-self-start">
      <button
        type="button"
        className="suggestion-chip d-inline-flex align-items-center gap-2 border-0 rounded-pill px-3 py-1-5 bg-primary-50 text-primary-600"
        onClick={onApply}
      >
        <Sparkles size={14} strokeWidth={1.75} />
        <span>
          Use suggested dates <span className="fw-semibold">{dateSpan(suggestion.start_date, suggestion.end_date)}</span>
        </span>
      </button>
      {source && <span className="font-size-xs text-iron-400 ps-3">{source}</span>}
    </div>
  );
}

export function SafeRange({ start, end, points }) {
  return (
    <div className="d-flex flex-column gap-1 rounded-3 bg-iron-50 px-3 py-2 mt-3 font-size-xs">
      <span className="d-flex align-items-center gap-1 text-iron-600">
        <ShieldCheck size={13} strokeWidth={1.75} className="text-fern-600 flex-shrink-0" />
        Safe dates <span className="fw-semibold text-iron-700">{dateSpan(start, end)}</span>
      </span>
      {points.length > 0 && (
        <ul className="m-0 ps-4 text-iron-500 d-flex flex-column gap-1">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const safeRangePoints = (range, fallback) =>
  [
    range?.after && `Starts after ${range.after.name} ends (${shortDate(range.after.end_date)})`,
    range?.before && `Ends before ${range.before.name} starts (${shortDate(range.before.start_date)})`,
    !range?.after && !range?.before && fallback,
  ].filter(Boolean);

export function CreationSummary({ title, subtitle, start, end, copies = [], copyNouns = ["class", "classes"] }) {
  const weeks = weeksBetween(start, end);
  return (
    <div className="semester-summary d-flex gap-3 rounded-3 p-3 bg-primary-50" aria-live="polite">
      <CalendarRange size={18} strokeWidth={1.75} className="text-primary-500 flex-shrink-0 mt-1" />
      <div className="d-flex flex-column gap-1 overflow-hidden">
        <span className="fw-semibold text-capitalize">{title}</span>
        {subtitle && <span className="text-iron-600 text-truncate">{subtitle}</span>}
        <span className="text-iron-600">
          {dateSpan(start, end)} · {weeks} {weeks === 1 ? "week" : "weeks"}
        </span>
        {copies.length > 0 && (
          <span className="d-flex align-items-center gap-1 text-primary-600 font-size-xs" title={copies.map((target) => target.label).join(", ")}>
            <Copy size={12} strokeWidth={1.75} />
            Also added to {copies.length} other {copyNouns[copies.length === 1 ? 0 : 1]}.
          </span>
        )}
      </div>
    </div>
  );
}

export function FlowFooter({ backLabel, onBack, primaryLabel, onPrimary, canContinue, isPending }) {
  return (
    <div className="drawer-footer border-top px-3 py-2 font-size-sm">
      <button
        type="button"
        className="step-back-btn d-inline-flex align-items-center gap-1 border-0 bg-transparent p-0 font-size-sm me-auto"
        onClick={onBack}
        disabled={isPending}
      >
        <ChevronLeft size={16} strokeWidth={1.75} />
        {backLabel}
      </button>
      <button
        type="button"
        className={`profile-primary-btn border-0 rounded-3 primary-background text-white font-size-sm px-3 d-inline-flex align-items-center gap-2 text-capitalize ${
          canContinue ? "" : "opacity-50"
        }`}
        onClick={onPrimary}
        disabled={!canContinue}
      >
        {isPending ? <SingleSpinner /> : primaryLabel}
      </button>
    </div>
  );
}

export function FlowSkeleton() {
  return (
    <div className="d-flex flex-column gap-4 p-2">
      {[0, 1, 2].map((index) => (
        <div className="d-flex flex-column gap-2" key={index}>
          <RectangleSkeleton width="40%" height="1rem" />
          <RectangleSkeleton width="100%" height="3rem" />
        </div>
      ))}
    </div>
  );
}
