import BulkActionConfirm, { getSelected } from "../Common/BulkActionConfirm";
import { useBulkDeleteHall } from "../../hooks/hall/useBulkDeleteHall";
function BulkDeleteHall({ handleClose, rowData, bulkData, resetAll }) {
  return (
    <BulkActionConfirm
      handleClose={handleClose}
      resetAll={resetAll ?? rowData?.resetAll}
      items={getSelected(rowData, bulkData)}
      useAction={useBulkDeleteHall}
      buildPayload={(items) => ({
        hallIds: items.map((item) => ({ hall_id: item.id })),
      })}
      title="Delete Halls"
      description="This action cannot be undone. The selected halls will be permanently deleted."
      confirmLabel="Yes, Delete All"
      errorTitle="Failed To Bulk Delete Halls"
    />
  );
}
export default BulkDeleteHall;
