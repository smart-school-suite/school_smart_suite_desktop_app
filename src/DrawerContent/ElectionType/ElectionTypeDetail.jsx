import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { formatDate } from "../../utils/functions";
function ElectionTypeDetail({ handleClose, drawerData }) {
  const { election_title, description, created_at, updated_at } = drawerData;
  return (
    <>
      <div className="drawer-content ps-2 pt-3 font-size-sm">
        <div className="d-flex flex-column gap-3">
          <div className="d-flex flex-column gap-1">
            <span className="fw-light">Election Type</span>
            <span className="fw-medium">{election_title || "N/A"}</span>
          </div>
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
          <div className="d-flex flex-column gap-1">
            <span className="fw-light">Description</span>
            <span className="fw-medium">{description || "N/A"}</span>
          </div>
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
          <div className="d-flex flex-column gap-1">
            <span className="fw-light">Created At</span>
            <span className="fw-medium">{formatDate(created_at) || "N/A"}</span>
          </div>
           <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
          <div className="d-flex flex-column gap-1">
            <span className="fw-light">Updated At</span>
            <span className="fw-medium">{formatDate(updated_at) || "N/A"}</span>
          </div>
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
            <button
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ElectionTypeDetail;
