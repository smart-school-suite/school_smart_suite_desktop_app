import React from "react";
import { Icon } from "@iconify/react";

const STATUS_CONFIG = {
  used: {
    className: "bg-iron-100 text-iron-600",
    icon: "akar-icons:lock-on",
    label: "Used",
  },
  unused: {
    className: "bg-fern-100 text-fern-600",
    icon: "icon-park-solid:check-one",
    label: "Unused",
  },
  default: {
    className: "bg-iron-100 text-iron-600",
    icon: "icon-park-solid:check-one",
    label: "Undetermined",
  },
};

export default function ActivationCodeUsedStatusRenderer({ value }) {
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
