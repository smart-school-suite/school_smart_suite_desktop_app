import { Icon } from "@iconify/react";
import { daysOfWeek } from "../../../data/data";
import { dayLabel, dayShortLabel, formatDuration, formatTime, minutesBetween } from "../../../utils/semesterTimetable/timeUtils";

/* -------------------------------------------------------------------------- */
/* Layout                                                                     */
/* -------------------------------------------------------------------------- */

/** One wizard step: scrollable body with an intro, plus a pinned footer. */
export function WizardStep({ title, description, children, footer }) {
  return (
    <div className="cw-step">
      <div className="cw-body scroll-bar-sm px-2 pt-2" style={{ paddingBottom:"20rem"}}>
        {(title || description) && (
          <div className="cw-intro">
            {title && <span className="font-size-sm fw-semibold">{title}</span>}
            {description && <p className="cw-intro__text">{description}</p>}
          </div>
        )}
        {children}
      </div>
      {footer && <footer className="cw-footer">{footer}</footer>}
    </div>
  );
}

/**
 * Standard footer. Pass `onBack` to show Back, and `onNext` to show the
 * primary action. `hint` explains why the primary action is disabled.
 */
export function WizardFooter({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
  nextIcon = "lucide:arrow-right",
  hint,
}) {
  return (
    <>
      <div className="cw-footer__start p-2">
        {onBack && (
          <button type="button" className="cw-btn cw-btn--ghost" onClick={onBack}>
            <Icon icon="lucide:arrow-left" width={16} height={16} />
            <span>Back</span>
          </button>
        )}
      </div>
      <div className="cw-footer__end p-2">
        {hint && nextDisabled && <span className="cw-footer__hint">{hint}</span>}
        {onNext && (
          <button
            type="button"
            className="cw-btn cw-btn--primary"
            onClick={onNext}
            disabled={nextDisabled}
          >
            <span>{nextLabel}</span>
            {nextIcon && <Icon icon={nextIcon} width={16} height={16} />}
          </button>
        )}
      </div>
    </>
  );
}

export function Section({ label, hint, action, children, className = "" }) {
  return (
    <section className={`cw-section ${className}`}>
      {(label || action) && (
        <div className="cw-section__head">
          <div className="d-flex flex-column">
            {label && <span className="fw-medium">{label}</span>}
            {hint && <span className="cw-section__hint">{hint}</span>}
          </div>
          {action && <div className="cw-section__action">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export function Panel({ children, className = "", tone }) {
  return (
    <div className={`cw-panel ${tone ? `cw-panel--${tone}` : ""} ${className}`}>
      {children}
    </div>
  );
}

export function Note({ icon = "lucide:info", children }) {
  return (
    <div className="cw-note">
      <Icon icon={icon} width={16} height={16} className="cw-note__icon" />
      <div className="cw-note__body">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Introduction building blocks                                               */
/* -------------------------------------------------------------------------- */

/** Short explanatory bullets with a neutral marker. */
export function PointList({ items }) {
  return (
    <ul className="cw-points">
      {items.map((item, index) => (
        <li key={index}>
          {typeof item === "string" ? (
            item
          ) : (
            <>
              <span className="cw-points__title">{item.title}</span>
              {item.text && <span className="cw-points__text">{item.text}</span>}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Numbered outline of what the wizard will ask for. */
export function Outline({ items }) {
  return (
    <ol className="cw-outline">
      {items.map((item, index) => (
        <li key={index} className="cw-outline__item">
          <span className="cw-outline__num">{index + 1}</span>
          <div>
            <span className="cw-outline__title">{item.title}</span>
            <span className="cw-outline__text">{item.text}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Side-by-side sample day. `rows` is [{ time, label, highlight }].
 */
export function SampleDay({ caption, rows }) {
  return (
    <div className="cw-sample">
      <span className="cw-sample__caption">{caption}</span>
      <ul className="cw-sample__list">
        {rows.map((row) => (
          <li
            key={row.time}
            className={`cw-sample__row ${row.highlight ? "is-highlight" : ""}`}
          >
            <span className="cw-sample__time">{row.time}</span>
            <span>{row.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Data display                                                               */
/* -------------------------------------------------------------------------- */

/** Grid of compact metrics. `items` is [{ label, value, unit }]. */
export function Stats({ items }) {
  return (
    <dl className="cw-stats" style={{ "--cw-stat-cols": items.length }}>
      {items.map((item) => (
        <div key={item.label} className="cw-stat">
          <dt className="cw-stat__label">{item.label}</dt>
          <dd className="cw-stat__value">
            {item.value}
            {item.unit && <span className="cw-stat__unit">{item.unit}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** "8:00 AM – 5:00 PM" with an optional duration. */
export function TimeSpan({ start, end, showDuration = true, emptyLabel = "Not set" }) {
  const minutes = minutesBetween(start, end);
  if (!start && !end) {
    return <span className="cw-timespan is-empty">{emptyLabel}</span>;
  }
  return (
    <span className="cw-timespan">
      <span>{formatTime(start)}</span>
      <span className="cw-timespan__dash" aria-hidden="true">–</span>
      <span>{formatTime(end)}</span>
      {showDuration && (
        <span className="cw-timespan__duration">{formatDuration(minutes)}</span>
      )}
    </span>
  );
}

export function Badge({ tone = "neutral", children }) {
  return <span className={`cw-badge cw-badge--${tone}`}>{children}</span>;
}

/** A row in a weekly list: day name, value, optional badge and actions. */
export function DayRow({ day, children, badge, actions, muted = false }) {
  return (
    <li className={`cw-dayrow ${muted ? "is-muted" : ""}`}>
      <span className="cw-dayrow__day">{dayLabel(day)}</span>
      <span className="cw-dayrow__value">{children}</span>
      <span className="cw-dayrow__meta">
        {badge}
        {actions}
      </span>
    </li>
  );
}

export function DayList({ children }) {
  return <ul className="cw-daylist">{children}</ul>;
}

export function EmptyState({ icon = "lucide:calendar-x-2", title, text, action }) {
  return (
    <div className="cw-empty">
      <span className="cw-empty__icon">
        <Icon icon={icon} width={20} height={20} />
      </span>
      <span className="cw-empty__title">{title}</span>
      {text && <p className="cw-empty__text">{text}</p>}
      {action}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Inputs                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Week toggle grid. Every day of the week is shown in calendar order so the
 * layout never shifts; days outside `available` are disabled.
 */
export function DayPicker({
  selected = [],
  onToggle,
  available,
  disabledReason = "Not an operating day",
  lockedDays = {},
}) {
  const allowed = available
    ? available.map((day) => String(day).toLowerCase())
    : null;
  return (
    <div className="cw-days" role="group">
      {daysOfWeek.map((day) => {
        const isSelected = selected.includes(day.value);
        const lockReason = lockedDays[day.value];
        const isAvailable = (!allowed || allowed.includes(day.value)) && !lockReason;
        return (
          <button
            key={day.value}
            type="button"
            className={`cw-day ${isSelected ? "is-selected" : ""}`}
            aria-pressed={isSelected}
            disabled={!isAvailable && !isSelected}
            title={
              lockReason ?? (!isAvailable && !isSelected ? disabledReason : day.label)
            }
            onClick={() => onToggle(day.value, isSelected)}
          >
            <span className="cw-day__short">{dayShortLabel(day.value)}</span>
            <span className="cw-day__check" aria-hidden="true">
              <Icon icon="lucide:check" width={12} height={12} />
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Radio-style card used for "what happens next" decisions. */
export function ChoiceCard({ title, text, icon, onClick, emphasis = false }) {
  return (
    <button
      type="button"
      className={`cw-choice ${emphasis ? "is-emphasis" : ""}`}
      onClick={onClick}
    >
      {icon && (
        <span className="cw-choice__icon">
          <Icon icon={icon} width={18} height={18} />
        </span>
      )}
      <span className="cw-choice__body">
        <span className="cw-choice__title">{title}</span>
        <span className="cw-choice__text">{text}</span>
      </span>
      <Icon icon="lucide:chevron-right" width={18} height={18} className="cw-choice__chev" />
    </button>
  );
}

/** Selectable option tile (e.g. period lengths). */
export function OptionTile({ selected, onClick, title, meta }) {
  return (
    <button
      type="button"
      className={`cw-option ${selected ? "is-selected" : ""}`}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span className="cw-option__title">{title}</span>
      {meta && <span className="cw-option__meta">{meta}</span>}
      <span className="cw-option__radio" aria-hidden="true" />
    </button>
  );
}

/** Small segmented control. `options` is [{ value, label }]. */
export function Segmented({ value, options, onChange, label }) {
  return (
    <div className="cw-seg" role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          className={`cw-seg__btn ${value === option.value ? "is-active" : ""}`}
          onClick={() => value !== option.value && onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function IconButton({ icon, label, onClick, tone }) {
  return (
    <button
      type="button"
      className={`cw-icon-btn cw-icon-btn--sm ${tone ? `cw-icon-btn--${tone}` : ""}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <Icon icon={icon} width={16} height={16} />
    </button>
  );
}

export function TextButton({ icon, children, onClick, tone }) {
  return (
    <button
      type="button"
      className={`cw-text-btn ${tone ? `cw-text-btn--${tone}` : ""}`}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} width={15} height={15} />}
      <span>{children}</span>
    </button>
  );
}

/** Frame around the shared TimeRangeInput so it matches the wizard. */
export function TimeField({ children }) {
  return <div className="cw-timefield">{children}</div>;
}
