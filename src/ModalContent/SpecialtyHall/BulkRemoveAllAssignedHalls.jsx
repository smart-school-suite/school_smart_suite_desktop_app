import BulkActionConfirm, { getSelected } from "../Common/BulkActionConfirm";
import { useBulkRemoveAllAssignedHalls } from "../../hooks/specialtyHall/useBulkRemoveAllAssignedHalls";
function BulkRemoveAllAssignedHalls({ handleClose, rowData, bulkData, resetAll }) {
  return (
    <BulkActionConfirm
      handleClose={handleClose}
      resetAll={resetAll ?? rowData?.resetAll}
      items={getSelected(rowData, bulkData)}
      useAction={useBulkRemoveAllAssignedHalls}
      buildPayload={(items) => ({
        specialtyIds: items.map((item) => ({ specialty_id: item.id })),
      })}
      title="Remove Assigned Halls"
      description="Every hall assigned to the selected specialties will be unassigned. Specialties without halls are skipped."
      confirmLabel="Yes, Remove All"
      errorTitle="Failed To Remove Assigned Halls"
    />
  );
}
export default BulkRemoveAllAssignedHalls;
