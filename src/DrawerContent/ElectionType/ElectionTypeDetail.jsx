import { Plus } from "lucide-react";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { EmptyStateButton } from "../../components/errors/EmptyState";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetElectionTypeDetails } from "../../hooks/electionType/useGetElectionTypeDetails";
import { formatElectionDate } from "../../utils/election/electionDisplay";
import CreateElectionRole from "../ElectionRole/CreateElectionRole";

function Item({ label, children }) {
  return (
    <div className="d-flex flex-column gap-1 py-2 border-bottom">
      <span className="text-iron-500 font-size-xs">{label}</span>
      <span className="font-size-sm">{children || "—"}</span>
    </div>
  );
}

/** Election type with its positions. drawerData: a type row. */
function ElectionTypeDetail({ drawerData }) {
  const { data, isLoading } = useGetElectionTypeDetails(drawerData?.id);
  const type = { ...drawerData, ...(data?.data ?? {}) };
  const positions = type?.positions ?? [];
  return (
    <div className="drawer-content px-2 pt-2 pb-4 d-flex flex-column gap-3">
      <div className="d-flex flex-column">
        <Item label="Election type">{type.election_title}</Item>
        <Item label="Description">{type.description}</Item>
        <Item label="Status"><span className="text-capitalize">{type.status}</span></Item>
        <Item label="Elections held">{type.elections_count ?? 0}</Item>
        <Item label="Created">{formatElectionDate(type.created_at)}</Item>
      </div>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold font-size-sm">Positions</span>
          <DrawerTrigger title="Create Position" drawerChildren={CreateElectionRole} drawerData={{ electionType: type }}>
            <EmptyStateButton variant="secondary" icon={Plus}>Add position</EmptyStateButton>
          </DrawerTrigger>
        </div>
        {isLoading ? (
          [...Array(3)].map((_, index) => <RectangleSkeleton key={index} height="2.75rem" />)
        ) : positions.length === 0 ? (
          <span className="text-iron-500 font-size-sm">No positions yet. Add the positions people can stand for.</span>
        ) : (
          positions.map((position) => {
            const years = position.office_term?.duration_academic_years ?? 1;
            return (
              <div key={position.id} className="d-flex flex-row align-items-center justify-content-between border rounded-3 px-2 py-2">
                <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                  <span className="fw-medium font-size-sm text-truncate">{position.name}</span>
                  <span className="text-iron-500 font-size-xs">
                    {position.seats ?? 1} seat(s) · {years} year{years > 1 ? "s" : ""}
                    {position.office_term?.allow_reelection ? " · re-election allowed" : ""}
                  </span>
                </div>
                {position.status !== "active" && <span className="pill-sm-warning">Inactive</span>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ElectionTypeDetail;
