import { useMemo } from "react";
import { useGetFeeInstallment } from "../../hooks/feeInstallment/useGetFeeInstallment";
import { useGetFeeScheduleSlots } from "../../hooks/feeSchedule/useGetFeeScheduleSlots";
import { useUpdateFeeScheduleSlots } from "../../hooks/feeSchedule/updateFeeScheduleSlot";
import { retryUnlessEmpty } from "../../utils/teacher/teacherFilters";
import FeeScheduleEditor, { FeeScheduleEditorSkeleton, rowForInstallment } from "./FeeScheduleEditor";
import { InstallmentsUnavailable, ScheduleUnavailable } from "./FeeScheduleDrawerStates";

/**
 * Edits a configured payment schedule. The whole schedule is saved at once:
 * changed installments are updated, added ones created and removed ones
 * deleted. Student balances are derived, so they follow immediately.
 */
export default function UpdateFeeSchedule({ handleClose, drawerData: schedule }) {
  const installmentsQuery = useGetFeeInstallment({ retry: retryUnlessEmpty });
  const slotsQuery = useGetFeeScheduleSlots(schedule?.id);
  const { mutate: updateSchedule, isPending } = useUpdateFeeScheduleSlots(handleClose);

  const installments = useMemo(
    () => (Array.isArray(installmentsQuery.data?.data) ? installmentsQuery.data.data : []),
    [installmentsQuery.data],
  );
  const initialRows = useMemo(() => {
    const slots = Array.isArray(slotsQuery.data?.data) ? slotsQuery.data.data : [];
    if (slots.length === 0) return installments.map(rowForInstallment);
    return slots.map((slot) => ({
      ...rowForInstallment(slot.installment ?? { id: slot.installment_id, name: "Installment", count: 0 }),
      slot_id: slot.id,
      due_date: String(slot.due_date ?? "").slice(0, 10),
      fee_percentage: String(slot.fee_percentage ?? slot.percentage ?? ""),
    }));
  }, [slotsQuery.data, installments]);

  if (installmentsQuery.isLoading || slotsQuery.isLoading) return <FeeScheduleEditorSkeleton />;
  if (slotsQuery.error) {
    return (
      <div className="drawer-content p-2">
        <ScheduleUnavailable error={slotsQuery.error} />
      </div>
    );
  }
  if (installmentsQuery.error || installments.length === 0) {
    return (
      <div className="drawer-content p-2">
        <InstallmentsUnavailable error={installmentsQuery.error} />
      </div>
    );
  }

  return (
    <FeeScheduleEditor
      mode="update"
      schedule={schedule}
      installments={installments}
      initialRows={initialRows}
      isSaving={isPending}
      handleClose={handleClose}
      onSave={(slots, callbacks) =>
        updateSchedule({ feeScheduleId: schedule.id, updateData: { slots } }, callbacks)
      }
    />
  );
}
