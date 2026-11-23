import { APP_STATUS, Badge, BADGE_VARIANT } from "@/components/Renderer/badges";

export default function SchoolBranchNameRenderer({ value, data }) {
  return (
    <span className="d-flex align-items-center gap-2 overflow-hidden">
      <span className="text-truncate">{value || "Unnamed branch"}</span>
      {data?.isCurrentBranch && (
        <Badge status={APP_STATUS.CURRENT} variant={BADGE_VARIANT.PRIMARY} label="This branch" showIcon={false} />
      )}
    </span>
  );
}
