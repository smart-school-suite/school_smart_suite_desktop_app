import BulkActionConfirm, { getSelected } from "../Common/BulkActionConfirm";
import { useBulkDeleteTuitionFees } from "../../hooks/FeePayment/useBulkDeleteTuitionFees";
function BulkDeleteTuitionFee({ handleClose, rowData, bulkData, resetAll }) {
  return (
    <BulkActionConfirm
      handleClose={handleClose}
      resetAll={resetAll ?? rowData?.resetAll}
      items={getSelected(rowData, bulkData)}
      useAction={useBulkDeleteTuitionFees}
      buildPayload={(items) => ({
        tuitionFeeIds: items.map((item) => ({ tuition_fee_id: item.id })),
      })}
      title="Delete Tuition Fees"
      description="This action cannot be undone. The selected tuition fee records will be permanently deleted."
      confirmLabel="Yes, Delete All"
      errorTitle="Failed To Bulk Delete Tuition Fees"
    />
  );
}
export default BulkDeleteTuitionFee;
