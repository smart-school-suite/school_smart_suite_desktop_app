import { RotateCcw } from "lucide-react";
import { useBulkPromotionRunAction } from "../../hooks/promotionRun/useBulkPromotionRunAction";
import PromotionRunBulkConfirm, { selectedPromotionRuns } from "./PromotionRunBulkConfirm";

function BulkRetryPromotionRuns({ handleClose, rowData, bulkData, resetAll }) {
  const runs = selectedPromotionRuns(rowData, bulkData);
  const { mutate, isPending } = useBulkPromotionRunAction("retry", handleClose, resetAll);

  return (
    <PromotionRunBulkConfirm
      runs={runs}
      action="retry"
      title="Retry Promotion Runs"
      icon={RotateCcw}
      description="Runs that failed, finished with issues or were cancelled are queued to run again now. Each student's promotion record is updated, not duplicated."
      confirmLabel="Retry"
      errorTitle="Failed To Retry Promotion Runs"
      mutate={mutate}
      isPending={isPending}
      handleClose={handleClose}
    />
  );
}
export default BulkRetryPromotionRuns;
