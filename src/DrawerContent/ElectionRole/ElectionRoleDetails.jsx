import { Fragment } from "react";
import OfficeHolderCard from "../../components/Election/OfficeHolderCard";
import EmptyState from "../../components/errors/EmptyState";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetElectionRoleDetails } from "../../hooks/electionRole/useGetElectionRoleDetails";
import { formatElectionDate, serverErrorCopy } from "../../utils/election/electionDisplay";

function Item({ label, children }) {
  return (
    <div className="d-flex flex-column gap-1 py-2 border-bottom">
      <span className="text-iron-500 font-size-xs">{label}</span>
      <span className="font-size-sm">{children ?? "—"}</span>
    </div>
  );
}

/** Position details, office term and current holders. drawerData: a position row. */
function ElectionRoleDetails({ drawerData }) {
  const { data, isLoading, error } = useGetElectionRoleDetails(drawerData?.id);
  const role = data?.data;
  const term = role?.office_term;

  if (isLoading) {
    return (
      <div className="drawer-content px-2 pt-3 d-flex flex-column gap-2">
        {[...Array(6)].map((_, index) => (
          <Fragment key={index}>
            <RectangleSkeleton height="0.8rem" width="25%" />
            <RectangleSkeleton height="1rem" width="70%" />
          </Fragment>
        ))}
      </div>
    );
  }
  if (error) {
    return (
      <div className="drawer-content px-2">
        <EmptyState mascot="error" height="100%" mascotHeight="6rem" {...serverErrorCopy(error, "Unable to load the position", "Something went wrong while loading this position.")} />
      </div>
    );
  }

  const holders = role?.current_office_holders ?? [];
  return (
    <div className="drawer-content px-2 pt-2 pb-4 d-flex flex-column gap-3">
      <div className="d-flex flex-column">
        <Item label="Position">{role?.name}</Item>
        <Item label="Election type">{role?.election_type?.election_title}</Item>
        <Item label="Seats">{role?.seats ?? 1}</Item>
        <Item label="Status"><span className="text-capitalize">{role?.status}</span></Item>
        <Item label="Tenure">
          {term
            ? `${term.duration_academic_years} academic year(s) · ${term.allow_reelection ? `re-election allowed, up to ${term.maximum_terms ?? "unlimited"} terms` : "no re-election"}`
            : "1 academic year · no re-election (default)"}
        </Item>
        <Item label="Description">{role?.description}</Item>
        <Item label="Created">{formatElectionDate(role?.created_at)}</Item>
      </div>
      <div className="d-flex flex-column gap-2">
        <span className="fw-semibold font-size-sm">Current holders</span>
        {holders.length === 0 ? (
          <span className="text-iron-500 font-size-sm">Nobody holds this position right now.</span>
        ) : (
          holders.map((holder) => (
            <OfficeHolderCard
              key={holder.id}
              readOnly
              holder={{
                ...holder,
                holder: holder.holderable,
                name: holder.holderable?.name ?? [holder.holderable?.first_name, holder.holderable?.last_name].filter(Boolean).join(" "),
                position: role,
                tenure_years: [],
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ElectionRoleDetails;
