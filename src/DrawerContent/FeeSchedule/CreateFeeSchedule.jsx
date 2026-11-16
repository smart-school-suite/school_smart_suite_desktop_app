import { useMemo } from "react";
import { useGetFeeInstallment } from "../../hooks/feeInstallment/useGetFeeInstallment";
import { useCreateFeeScheduleSlots } from "../../hooks/feeSchedule/useCreateFeeScheduleSlot";
import { retryUnlessEmpty } from "../../utils/teacher/teacherFilters";
import FeeScheduleEditor, { FeeScheduleEditorSkeleton, rowForInstallment } from "./FeeScheduleEditor";
import { InstallmentsUnavailable } from "./FeeScheduleDrawerStates";

/**
 * Configures the payment schedule of an academic year that has none yet.
 * Starts with one blank row per active installment plan; "Split evenly"
 * fills in a sensible default to adjust.
 */
export default function CreateFeeSchedule({ handleClose, drawerData: schedule }) {
  const { data, isLoading, error } = useGetFeeInstallment({ retry: retryUnlessEmpty });
  const { mutate: createSchedule, isPending } = useCreateFeeScheduleSlots(handleClose);

  const installments = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);
  const initialRows = useMemo(() => installments.map(rowForInstallment), [installments]);

  if (isLoading) return <FeeScheduleEditorSkeleton />;
  if (error || installments.length === 0) {
    return (
      <div className="drawer-content p-2">
        <InstallmentsUnavailable error={error} />
      </div>
    );
  }

  return (
    <FeeScheduleEditor
      mode="create"
      schedule={schedule}
      installments={installments}
      initialRows={initialRows}
      isSaving={isPending}
      handleClose={handleClose}
      onSave={(slots, callbacks) =>
        createSchedule({ feeScheduleId: schedule.id, scheduleData: { slots } }, callbacks)
      }
    />
  );
}
