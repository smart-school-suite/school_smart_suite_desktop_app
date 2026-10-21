import { Icon } from "@iconify/react";
const STATUS_CONFIG = {
  eligible: {
    className: "bg-fern-50 text-fern-700",
    icon: "iconoven:user-graduate",
    label: "Eligible",
  },
  ineligible: {
    className: "bg-fern-50 text-fern-700",
    icon: "iconmind:continue-loop-outline-thin",
    label: "Ineligible",
  },
  pending_review: {
    className: "primary-background-50 color-primary",
    icon: "carbon:pending",
    label: "Pending Review",
  },
  default: {
    className: "bg-iron-100 text-iron-600",
    icon: "fluent-mdl2:processing-cancel",
    label: "Undetermined",
  },
};
function GraduationRecordEligibilityStatusRenderer({ value }) {
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
export default GraduationRecordEligibilityStatusRenderer;
