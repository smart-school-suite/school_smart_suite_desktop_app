import {
  BADGE_VARIANT,
  BADGE_VARIANT_STYLES,
  STATUS_BADGE_CONFIG,
  UNKNOWN_STATUS_LABEL,
  formatStatusLabel,
  normalizeStatus,
} from "./badgeConfig";
import { BADGE_CONTEXT_CONFIG } from "./badgeContexts";

const mapRawStatus = (status, statusMap) => {
  if (!statusMap || status === undefined || status === null) return status;
  return statusMap[String(status)] ?? statusMap[normalizeStatus(status)] ?? status;
};

export function resolveBadgeConfig(status, overrides = {}) {
  const contextConfig = BADGE_CONTEXT_CONFIG[overrides.context] ?? {};
  const statusKey = normalizeStatus(mapRawStatus(status, contextConfig.statusMap));
  const statusConfig = {
    ...STATUS_BADGE_CONFIG[statusKey],
    ...contextConfig.statuses?.[statusKey],
  };
  const variant = overrides.variant ?? statusConfig.variant ?? BADGE_VARIANT.NEUTRAL;
  const variantStyle =
    BADGE_VARIANT_STYLES[variant] ?? BADGE_VARIANT_STYLES[BADGE_VARIANT.NEUTRAL];
  const fallbackIcon = statusKey ? variantStyle.icon : undefined;

  return {
    status: statusKey,
    variant,
    className: variantStyle.className,
    icon: overrides.icon ?? statusConfig.icon ?? fallbackIcon,
    pulse: overrides.pulse ?? statusConfig.pulse ?? false,
    label:
      overrides.label ??
      statusConfig.label ??
      (formatStatusLabel(statusKey) || UNKNOWN_STATUS_LABEL),
  };
}

export const getBadgeLabel = (status, context) =>
  resolveBadgeConfig(status, { context }).label;

export const getBadgeVariant = (status, context) =>
  resolveBadgeConfig(status, { context }).variant;
