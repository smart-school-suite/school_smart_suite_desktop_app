import React from "react";
import { Icon } from "@iconify/react";

const STATUS_CONFIG = {
  active: {
    className: "bg-fern-50 text-fern-700",
    icon: "icon-park-solid:check-one",
    label: "Active",
  },
 upcoming: {
    className: "primary-background-50 color-primary",
    icon: "ant-design:schedule-outlined",
    label: "Upcoming",
  },
  expired: {
    className: "bg-iron-100 text-iron-600",
    icon: "pajamas:expire",
    label: "Expired",
  },
  no_schedule: {
    className: "bg-old-lace-100 text-old-lace-600",
    icon: "pajamas:expire",
    label: "No Schedule",
  },
  default: {
    className: "bg-iron-100 text-iron-600",
    icon: "icon-park-solid:check-one",
    label: "Undetermined",
  },
};

export default function JointCourseStatusRenderer({ value }) {
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
