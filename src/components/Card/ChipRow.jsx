import Popover from "../Popover/Popover";

// Chips shown before the rest collapse into a "+N" chip, so cards keep the
// same height however many items they hold.
export const MAX_CHIPS = 3;

// Accepts strings, or { key, label, style } for chips with their own colours
// (e.g. course types).
const normalise = (item) =>
  typeof item === "string" ? { key: item, label: item } : { key: item.key ?? item.label, ...item };

function Chip({ item, variant, full = false }) {
  return (
    <span
      className={`teacher-card__chip teacher-card__chip--${variant} ${full ? "teacher-card__chip--full" : ""}`}
      style={item.style}
      title={full ? undefined : item.label}
    >
      {item.label}
    </span>
  );
}

/**
 * One line of chips; extra items open in a popover from a "+N" chip.
 *
 *   <ChipRow items={["PhD", "MSc"]} variant="primary" label="Qualifications" />
 */
export default function ChipRow({ items, variant = "neutral", label, max = MAX_CHIPS }) {
  const all = items.map(normalise);
  const visible = all.slice(0, max);
  const hidden = all.slice(max);
  return (
    <div className="teacher-card__chips">
      {visible.map((item) => (
        <Chip key={item.key} item={item} variant={variant} />
      ))}
      {hidden.length > 0 && (
        <Popover
          trigger={`+${hidden.length}`}
          triggerClassName="teacher-card__chip teacher-card__chip--more"
          ariaLabel={`Show all ${all.length} ${label.toLowerCase()}`}
        >
          <div className="d-flex flex-column gap-2">
            <span className="teacher-card__label">
              {label} · {all.length}
            </span>
            <div className="d-flex flex-row flex-wrap gap-1">
              {all.map((item) => (
                <Chip key={item.key} item={item} variant={variant} full />
              ))}
            </div>
          </div>
        </Popover>
      )}
    </div>
  );
}
