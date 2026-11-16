import { Icon } from "@iconify/react";

const STATUS_CONFIG = {
  true: {
    className: "bg-fern-50 text-fern-700",
    icon: "icon-park-solid:check-one",
    label: "Evaluated",
  },
  false: {
    className: "primary-background-50 color-primary",
    icon: "icon-park-solid:caution",
    label: "Not Evaluated",
  },
  default: {
    className: "bg-iron-100 text-iron-600",
    icon: "icon-park-solid:check-one",
    label: "Undetermined",
  },
};

function GradeSubmittedStatus({ value }) {
  const config = STATUS_CONFIG[value] || STATUS_CONFIG.default;
  return (
    <span
      style={{
        maxWidth: "10rem",
        height: "1.2rem",
        fontSize: "0.65rem",
        paddingInline: "0.4rem",
        borderRadius: "0.2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.4rem",
      }}
      className={`${config.className}`}
    >
      <Icon icon={config.icon} className="pill-icon" />
      <span className="truncate">{config.label}</span>
    </span>
  );
}
export default GradeSubmittedStatus;
