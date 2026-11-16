import EmptyState from "../../components/errors/EmptyState";
import { isEmptyListError } from "../../utils/teacher/teacherFilters";

/** The installment plans could not be loaded, or none are active. */
export function InstallmentsUnavailable({ error }) {
  if (!error || isEmptyListError(error)) {
    return (
      <EmptyState
        mascot="sad"
        height="100%"
        mascotHeight="7rem"
        title="No installment plans available"
        description="A payment schedule is built from installment plans (1st, 2nd, 3rd…). None are active yet."
        hint="Installment plans are managed by your system administrator. Ask them to activate at least one, then come back."
      />
    );
  }

  return (
    <EmptyState
      mascot="error"
      height="100%"
      mascotHeight="7rem"
      title={error?.response?.data?.errors?.title ?? "Installment plans could not be loaded"}
      description={error?.response?.data?.errors?.description ?? "Check your connection and try again."}
    />
  );
}

/** The schedule's current installments could not be loaded. */
export function ScheduleUnavailable({ error }) {
  return (
    <EmptyState
      mascot="error"
      height="100%"
      mascotHeight="7rem"
      title={error?.response?.data?.errors?.title ?? "This schedule could not be loaded"}
      description={error?.response?.data?.errors?.description ?? "Check your connection and try again."}
    />
  );
}
