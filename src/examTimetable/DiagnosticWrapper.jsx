import { useDispatch, useSelector } from "react-redux";
import { TimetableResolution } from "../DrawerContent/SemesterTimetable/Error/SemesterTimetableError";
import { useApplyExamTimetableSolutions } from "../hooks/examTimetableGeneration/mutations";
import { useGetExamTimetableSolutions } from "../hooks/examTimetableGeneration/queries";
import { setExamTimetableVersion } from "../Slices/ExamTimetable/examTimetableSlice";

// The exam API groups problems by date ("general" when not tied to one);
// the shared drawer reads days, so dates are presented as its days.
const withDayLabel = (item) => ({
  ...item,
  day: item.date ?? "general",
  day_label: item.date_label ?? "Whole exam period",
});

export const normalizeExamSolutions = (insight) =>
  insight && {
    ...insight,
    summary: { ...insight.summary, days_affected: insight.summary?.dates_affected ?? [] },
    days: (insight.dates ?? []).map((date) => ({
      ...withDayLabel(date),
      problems: (date.problems ?? []).map((problem) => ({
        ...withDayLabel(problem),
        issues: (problem.issues ?? []).map(withDayLabel),
      })),
    })),
  };

/**
 * Drawer: problems of an exam timetable version and their solutions. Picking
 * solutions and applying them generates a new version; this one stays.
 */
function DiagnosticWrapper({ handleClose }) {
  const dispatch = useDispatch();
  const version = useSelector((state) => state.examTimetable.timetableVersion);
  const query = useGetExamTimetableSolutions(version?.id);
  const apply = useApplyExamTimetableSolutions();

  return (
    <TimetableResolution
      version={version}
      query={query}
      apply={apply}
      normalize={normalizeExamSolutions}
      onOpenVersion={(newVersion) => dispatch(setExamTimetableVersion(newVersion))}
      handleClose={handleClose}
    />
  );
}
export default DiagnosticWrapper;
