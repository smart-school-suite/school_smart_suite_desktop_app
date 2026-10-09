import React from "react";
import { Icon } from "@iconify/react";

const STATUS_CONFIG = {
  not_scheduled: {
    className: "bg-old-lace-50 text-old-lace-600",
    icon: "icon-park-solid:caution",
    label: "Not Schedued",
  },
  upcoming: {
    className: "primary-background-50 color-primary",
    icon: "material-symbols-light:upcoming",
    label: "Upcoming",
  },
  active: {
    className: "bg-fern-50 text-fern-700",
    icon: "carbon:in-progress",
    label: "Active",
  },
  finished: {
    className: "bg-iron-100 text-iron-800",
    icon: "icon-park-solid:check-one",
    label: "Finished",
  },
  default: {
    className: "primary-background-50 color-primary",
    icon: "icon-park-solid:check-one",
    label: "Undetermined",
  },
};

export default function ExamStatusRenderer({ value }) {
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