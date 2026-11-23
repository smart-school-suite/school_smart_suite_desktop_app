import { PenLine } from "lucide-react";
import { useSelector } from "react-redux";

export function useSettingsTone() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return {
    darkMode,
    card: darkMode ? "dark-bg profile-card--dark" : "white-bg",
    row: darkMode ? "hover-bg-iron-900" : "hover-bg-iron-50",
    iconWrap: darkMode ? "bg-iron-900 text-iron-300" : "bg-iron-100 text-iron-600",
  };
}

export function SettingsRow({ icon: Icon, label, value, emptyText, plain, onClick, readOnly = false }) {
  const tone = useSettingsTone();
  const content = (
    <>
      <span className={`profile-row__icon d-grid place-items-center rounded-circle flex-shrink-0 ${tone.iconWrap}`}>
        <Icon size={16} strokeWidth={1.75} />
      </span>
      <span className="d-flex flex-column flex-grow-1 overflow-hidden gap-1">
        <span className="text-iron-500 font-size-xs lh-none">{label}</span>
        <span
          className={`text-truncate lh-tight ${value ? `fw-medium ${plain ? "" : "text-capitalize"}` : readOnly ? "text-iron-400" : "text-primary-600"}`}
        >
          {value || emptyText}
        </span>
      </span>
    </>
  );

  if (readOnly) {
    return <div className="profile-row d-flex align-items-center gap-3 w-100 px-3 rounded-3">{content}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`profile-row d-flex align-items-center gap-3 w-100 px-3 border-0 bg-transparent text-start rounded-3 ${tone.row}`}
    >
      {content}
      <PenLine size={15} strokeWidth={1.75} className="text-iron-400 flex-shrink-0" aria-hidden="true" />
      <span className="visually-hidden">Edit {label.toLowerCase()}</span>
    </button>
  );
}

export function SettingsSection({ title, action, tone: sectionTone = "default", padded = false, children }) {
  const tone = useSettingsTone();
  return (
    <section className="d-flex flex-column gap-2">
      <div className="d-flex align-items-end justify-content-between gap-2 px-1">
        <span
          className={`font-size-xs fw-semibold text-uppercase tracking-wider ${sectionTone === "danger" ? "text-red-600" : "text-iron-500"}`}
        >
          {title}
        </span>
        {action}
      </div>
      <div
        className={`profile-card border rounded-4 d-flex flex-column ${padded ? "p-3" : "p-1"} ${
          sectionTone === "danger" ? "settings-card--danger" : ""
        } ${tone.card}`}
      >
        {children}
      </div>
    </section>
  );
}
