import { RotateCcw } from "lucide-react";
import PromotionRecordBulkConfirm from "./PromotionRecordBulkConfirm";

function BulkApproveRepeat(props) {
  return (
    <PromotionRecordBulkConfirm
      {...props}
      action="repeat"
      title="Approve Repeats"
      icon={RotateCcw}
      description="Each student stays in their current specialty and level for another year. This decision is final."
      confirmLabel="Repeat"
      errorTitle="Failed To Approve Repeats"
    />
  );
}
export default BulkApproveRepeat;
