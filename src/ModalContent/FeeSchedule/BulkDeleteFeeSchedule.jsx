import BulkActionConfirm, { getSelected } from "../Common/BulkActionConfirm";
import { useBulkDeleteFeeSchedule } from "../../hooks/feeSchedule/useBulkDeleteFeeSchedule";
function BulkDeleteFeeSchedule({ handleClose, rowData, bulkData, resetAll }) {
  return (
    <BulkActionConfirm
      handleClose={handleClose}
      resetAll={resetAll ?? rowData?.resetAll}
      items={getSelected(rowData, bulkData)}
      useAction={useBulkDeleteFeeSchedule}
      buildPayload={(items) => ({
        feeScheduleIds: items.map((item) => ({ fee_schedule_id: item.id })),
      })}
      title="Delete Fee Schedules"
      description="This action cannot be undone. The selected fee schedules and their installment slots will be permanently deleted."
      confirmLabel="Yes, Delete All"
      errorTitle="Failed To Bulk Delete Fee Schedules"
    />
  );
}
export default BulkDeleteFeeSchedule;
