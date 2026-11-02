import RectangleSkeleton from "../../../../../components/SkeletonPageLoader/RectangularSkeleton";
import {
  EmptyState,
  OptionTile,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { useGetSemesterTimetablePeriods } from "../../../../../hooks/semesterTimetable/useSemesterTimetablePeriodDuration";

/**
 * Period lengths offered by the API, rendered as radio tiles.
 * `compact` renders a denser row for per-day pickers.
 */
function PeriodOptions({ value, onSelect, compact = false }) {
  const { data: periods, isLoading, error } = useGetSemesterTimetablePeriods();

  if (isLoading) {
    return (
      <div className={`cw-options ${compact ? "cw-options--compact" : ""}`}>
        {[...Array(4)].map((_, index) => (
          <RectangleSkeleton
            key={index}
            width="100%"
            height={compact ? "2.5rem" : "4.25rem"}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon="lucide:circle-alert"
        title={
          error?.response?.data?.errors?.title ?? "Could not load period lengths"
        }
        text={
          error?.response?.data?.errors?.description ??
          "Check your connection and reopen this drawer."
        }
      />
    );
  }

  return (
    <div
      className={`cw-options ${compact ? "cw-options--compact" : ""}`}
      role="radiogroup"
    >
      {(periods?.data ?? []).map((period) => (
        <OptionTile
          key={period.id}
          selected={value === period.minutes}
          onClick={() => onSelect(period.minutes)}
          title={`${period.minutes} min`}
          meta={compact ? null : period.name}
        />
      ))}
    </div>
  );
}

export default PeriodOptions;
