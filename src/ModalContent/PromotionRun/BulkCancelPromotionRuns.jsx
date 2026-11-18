import { Ban } from "lucide-react";
import { useBulkPromotionRunAction } from "../../hooks/promotionRun/useBulkPromotionRunAction";
import PromotionRunBulkConfirm, { selectedPromotionRuns } from "./PromotionRunBulkConfirm";

function BulkCancelPromotionRuns({ handleClose, rowData, bulkData, resetAll }) {
  const runs = selectedPromotionRuns(rowData, bulkData);
  const { mutate, isPending } = useBulkPromotionRunAction("cancel", handleClose, resetAll);

  return (
    <PromotionRunBulkConfirm
      runs={runs}
      action="cancel"
      title="Cancel Promotion Runs"
      icon={Ban}
      tone="danger"
      description="Scheduled runs will not start, and runs in progress stop before their next students. Students already evaluated keep their records. You can trigger or retry a cancelled run later."
      confirmLabel="Cancel"
      errorTitle="Failed To Cancel Promotion Runs"
      mutate={mutate}
      isPending={isPending}
      handleClose={handleClose}
    />
  );
}
export default BulkCancelPromotionRuns;
