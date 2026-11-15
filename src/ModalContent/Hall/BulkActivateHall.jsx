import BulkActionConfirm, { getSelected } from "../Common/BulkActionConfirm";
import { useBulkActivateHall } from "../../hooks/hall/useBulkActivateHall";
function BulkActivateHall({ handleClose, rowData, bulkData, resetAll }) {
  return (
    <BulkActionConfirm
      handleClose={handleClose}
      resetAll={resetAll ?? rowData?.resetAll}
      items={getSelected(rowData, bulkData)}
      useAction={useBulkActivateHall}
      buildPayload={(items) => ({
        hallIds: items.map((item) => ({ hall_id: item.id })),
      })}
      title="Activate Halls"
      description="The selected halls will be marked available and can be used for timetables and exams."
      confirmLabel="Yes, Activate All"
      errorTitle="Failed To Bulk Activate Halls"
    />
  );
}
export default BulkActivateHall;
