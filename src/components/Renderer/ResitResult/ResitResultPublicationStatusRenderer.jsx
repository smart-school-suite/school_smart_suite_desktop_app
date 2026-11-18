import { Icon } from "@iconify/react";

export const RESIT_PUBLICATION_STATUS = {
  published: { className: "bg-fern-50 text-fern-700", icon: "akar-icons:circle-check-fill", label: "Published", tone: "success" },
  scheduled: { className: "primary-background-50 color-primary", icon: "iconamoon:clock-light", label: "Scheduled", tone: "primary" },
  ready_to_publish: { className: "bg-fern-50 text-fern-700", icon: "akar-icons:circle-check", label: "Ready", tone: "success" },
  pending_evaluation: { className: "bg-old-lace-50 text-old-lace-500", icon: "carbon:pending", label: "Pending", tone: "warning" },
  default: { className: "bg-iron-100 text-iron-600", icon: "fluent-mdl2:processing-cancel", label: "Undetermined", tone: "neutral" },
};

/** Publication status of a resit exam's results, like the exam results badge plus Published and Scheduled. */
function ResitResultPublicationStatusRenderer({ value }) {
  const config = RESIT_PUBLICATION_STATUS[value] || RESIT_PUBLICATION_STATUS.default;

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
      className={config.className}
    >
      <Icon icon={config.icon} className="pill-icon" />
      <span className="truncate">{config.label}</span>
    </span>
  );
}
export default ResitResultPublicationStatusRenderer;
