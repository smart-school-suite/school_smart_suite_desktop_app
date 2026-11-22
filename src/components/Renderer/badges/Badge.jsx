import { Icon } from "@iconify/react";
import { resolveBadgeConfig } from "./resolveBadgeConfig";

export default function Badge({
  status,
  context,
  label,
  variant,
  icon,
  pulse,
  showIcon = true,
  title,
  className = "",
  children,
}) {
  const config = resolveBadgeConfig(status, { context, label, variant, icon, pulse });
  const content = children ?? config.label;
  const badgeClassName = ["status-badge", config.className, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={badgeClassName}
      data-status={config.status || undefined}
      data-variant={config.variant}
      title={title ?? (typeof content === "string" ? content : undefined)}
    >
      {config.pulse && <span className="status-badge__pulse" aria-hidden="true" />}
      {showIcon && !config.pulse && config.icon && (
        <Icon icon={config.icon} className="status-badge__icon" />
      )}
      <span className="status-badge__label">{content}</span>
    </span>
  );
}
