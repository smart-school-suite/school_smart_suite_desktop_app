import { Icon } from "@iconify/react";
import { resolveBadgeConfig } from "./badgeConfig";

export default function Badge({
  status,
  label,
  variant,
  icon,
  showIcon = true,
  className = "",
}) {
  const config = resolveBadgeConfig(status, { label, variant, icon });
  const badgeClassName = ["status-badge", config.className, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={badgeClassName}
      data-status={config.status || undefined}
      data-variant={config.variant}
      title={config.label}
    >
      {showIcon && config.icon && (
        <Icon icon={config.icon} className="status-badge__icon" />
      )}
      <span className="status-badge__label">{config.label}</span>
    </span>
  );
}
