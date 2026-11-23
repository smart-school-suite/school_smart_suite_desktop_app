import { AtSign, Check, CircleAlert, Circle, Loader2, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useCheckSchoolAdminUsername } from "../../hooks/schoolAdmin/useCheckSchoolAdminUsername";
import { checkUsernameFormat, normalizeUsername } from "../../utils/profile/usernameRules";

const RULE_TONE = {
  idle: { Icon: Circle, className: "text-iron-400" },
  checking: { Icon: Loader2, className: "text-primary-500", iconClassName: "animate-spin" },
  passed: { Icon: Check, className: "text-fern-600" },
  failed: { Icon: X, className: "text-red-600" },
  unknown: { Icon: CircleAlert, className: "text-old-lace-600" },
};

function useUsernameAvailability(username, formatValid, currentUsername) {
  const debounced = useDebounce(username, 400);
  const isCurrent = username === normalizeUsername(currentUsername);
  const settled = debounced === username;
  const { data, isFetching, isError } = useCheckSchoolAdminUsername(debounced, {
    enabled: formatValid && !isCurrent && settled,
  });

  if (!username || !formatValid) return { state: "idle", label: "Not used by another account" };
  if (isCurrent) return { state: "passed", label: "This is your current username" };
  if (!settled || isFetching) return { state: "checking", label: "Checking availability…" };
  if (isError) return { state: "unknown", label: "Couldn't check availability; it will be checked when you save" };

  const available = data?.data?.checks?.find((check) => check.key === "available")?.passed;
  if (available === undefined) return { state: "checking", label: "Checking availability…" };
  return available
    ? { state: "passed", label: `@${username} is available` }
    : { state: "failed", label: `@${username} is already taken` };
}

export default function UsernameInput({ value, currentUsername, onChange, onValidationChange }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { username, checks, valid: formatValid } = useMemo(() => checkUsernameFormat(value), [value]);
  const availability = useUsernameAvailability(username, formatValid, currentUsername);

  const isValid = formatValid && ["passed", "unknown"].includes(availability.state);
  const isPending = formatValid && availability.state === "checking";
  const fieldState = !username
    ? "idle"
    : !formatValid || availability.state === "failed"
      ? "failed"
      : isPending
        ? "checking"
        : "passed";

  useEffect(() => {
    onValidationChange?.(isValid, isPending);
  }, [isValid, isPending, onValidationChange]);

  const rows = [
    ...checks.map((check) => ({
      key: check.key,
      label: check.label,
      state: !username ? "idle" : check.passed ? "passed" : "failed",
    })),
    { key: "available", ...availability },
  ];

  const status = RULE_TONE[fieldState];
  const borderClass =
    fieldState === "failed" ? "is-invalid" : fieldState === "passed" ? "is-valid" : "";

  return (
    <div className="d-flex flex-column gap-2">
      <div className="position-relative">
        <AtSign
          size={14}
          strokeWidth={1.75}
          className="position-absolute top-50 translate-middle-y text-iron-400"
          style={{ left: "0.75rem" }}
          aria-hidden="true"
        />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value.toLowerCase())}
          placeholder="your.username"
          autoComplete="off"
          spellCheck={false}
          maxLength={40}
          aria-describedby="username-rules"
          aria-invalid={fieldState === "failed"}
          className={`form-control font-size-sm p-2 username-input ${borderClass} ${darkMode ? "dark-mode-input" : ""}`}
        />
        {fieldState !== "idle" && (
          <status.Icon
            size={16}
            strokeWidth={2}
            className={`position-absolute top-50 translate-middle-y ${status.className} ${status.iconClassName ?? ""}`}
            style={{ right: "0.75rem" }}
            aria-hidden="true"
          />
        )}
      </div>
      <ul id="username-rules" className="list-unstyled m-0 d-flex flex-column gap-1 font-size-xs" aria-live="polite">
        {rows.map((row) => {
          const tone = RULE_TONE[row.state];
          return (
            <li key={row.key} className={`d-flex align-items-center gap-2 ${tone.className}`}>
              <tone.Icon size={13} strokeWidth={2.25} className={`flex-shrink-0 ${tone.iconClassName ?? ""}`} aria-hidden="true" />
              <span className={row.state === "idle" ? "text-iron-500" : ""}>{row.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
