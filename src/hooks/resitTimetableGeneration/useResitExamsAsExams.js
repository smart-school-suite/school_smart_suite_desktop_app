import { useMemo } from "react";
import { normalizeResitExam } from "../../examTimetable/OwnerDropdown";
import { useGetAllResitExams } from "../resitExam/useGetResitExams";

/** Resit exams flattened like exams, as { data: [exam] }, for the exam pickers. */
export function useResitExamsAsExams() {
  const query = useGetAllResitExams();
  const data = useMemo(
    () => (query.data ? { ...query.data, data: (query.data.data ?? []).map(normalizeResitExam).filter(Boolean) } : query.data),
    [query.data],
  );
  return { ...query, data };
}
