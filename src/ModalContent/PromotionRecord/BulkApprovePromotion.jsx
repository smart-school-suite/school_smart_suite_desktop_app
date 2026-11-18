import { LayerArrowUp } from "lucide-react";
import PromotionRecordBulkConfirm from "./PromotionRecordBulkConfirm";

function BulkApprovePromotion(props) {
  return (
    <PromotionRecordBulkConfirm
      {...props}
      action="promote"
      title="Approve Promotions"
      icon={LayerArrowUp}
      description="Each student moves to the same specialty at the next level and is billed for it. This decision is final."
      confirmLabel="Promote"
      errorTitle="Failed To Approve Promotions"
    />
  );
}
export default BulkApprovePromotion;
