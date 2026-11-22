import Badge from "./Badge";

export default function BadgeRenderer({ value, context, showIcon }) {
  return <Badge status={value} context={context} showIcon={showIcon} />;
}
