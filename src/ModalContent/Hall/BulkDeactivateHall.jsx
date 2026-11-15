import BulkActionConfirm, { getSelected } from "../Common/BulkActionConfirm";
import { useBulkDeactivateHall } from "../../hooks/hall/useBulkDeactivateHall";
function BulkDeactivateHall({ handleClose, rowData, bulkData, resetAll }) {
  return (
    <BulkActionConfirm
      handleClose={handleClose}
      resetAll={resetAll ?? rowData?.resetAll}
      items={getSelected(rowData, bulkData)}
      useAction={useBulkDeactivateHall}
      buildPayload={(items) => ({
        hallIds: items.map((item) => ({ hall_id: item.id })),
      })}
      title="Deactivate Halls"
      description="The selected halls will be marked unavailable and will no longer be used for scheduling."
      confirmLabel="Yes, Deactivate All"
      errorTitle="Failed To Bulk Deactivate Halls"
    />
  );
}
export default BulkDeactivateHall;
