import Badge from "./Badge";
import { normalizeStatus } from "./badgeConfig";

const resolveCellStatus = (value, statusMap) => {
  if (!statusMap) return value;
  const mappedStatus = statusMap[String(value)] ?? statusMap[normalizeStatus(value)];
  return mappedStatus ?? value;
};

export default function BadgeRenderer({
  value,
  statusMap,
  labels,
  variants,
  showIcon,
}) {
  const status = resolveCellStatus(value, statusMap);
  const statusKey = normalizeStatus(status);

  return (
    <Badge
      status={status}
      label={labels?.[statusKey]}
      variant={variants?.[statusKey]}
      showIcon={showIcon}
    />
  );
}
