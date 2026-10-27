import { Check as CheckIcon, Minus } from "lucide-react";

function Check({ checked, onChange, disabled, indeterminate = false, size = "1.25rem", ...props }) {
  // Use boolean flags explicitly
  const isChecked = !!checked;
  const isIndeterminate = !!indeterminate;
  const active = isChecked || isIndeterminate;

  return (
    <div className="d-inline-flex align-items-center justify-content-center position-relative">
      <input
        ref={(el) => {
          if (el) {
            el.indeterminate = isIndeterminate;
          }
        }}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="position-absolute w-100 h-100 opacity-0 m-0"
        style={{ cursor: disabled ? "not-allowed" : "pointer", zIndex: 2 }}
        {...props}
      />
      <div
        className={`d-flex align-items-center justify-content-center rounded border text-white ${
          active ? "bg-primary-500 border-primary-500" : "bg-white border-iron-300"
        }`}
        style={{ width: size, height: size, opacity: disabled ? 0.5 : 1 }}
      >
        {active &&
          (isIndeterminate ? (
            <Minus size="75%" strokeWidth={3} style={{ display: "block" }} />
          ) : (
            <CheckIcon size="75%" strokeWidth={3} style={{ display: "block" }} />
          ))}
      </div>
    </div>
  );
}

export default Check;