import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  EmptyState,
  IconButton,
  Section,
  Stats,
  TextButton,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import ToastSuccess from "../../../../../components/Toast/ToastSuccess";
import { removeRequestedFreePeriodSlot } from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  dayLabel,
  formatDuration,
  minutesBetween,
  sortDays,
  toMinutes,
} from "../../../../../utils/semesterTimetable/timeUtils";

function ReviewStep({ handleClose, previousStep, goToStep }) {
  const dispatch = useDispatch();
  const rF = useSelector(
    (state) => state.semesterTimetable.soft_constraints.requested_free_periods,
  );
  const days = sortDays(rF.days);
  const slotsFor = (day) =>
    [...(rF.slots.find((item) => item.day === day)?.slots ?? [])].sort(
      (a, b) =>
        (toMinutes(a.start_time?.value) ?? 0) -
        (toMinutes(b.start_time?.value) ?? 0),
    );
  const allSlots = rF.slots.flatMap((item) => item.slots ?? []);
  const totalMinutes = allSlots.reduce(
    (sum, slot) =>
      sum + (minutesBetween(slot.start_time?.value, slot.end_time?.value) ?? 0),
    0,
  );

  const save = () => {
    handleClose();
    toast.custom(
      <ToastSuccess
        title={"Configuration Successful"}
        description={"Configuration has been successfully completed."}
      />,
    );
  };

  return (
    <WizardStep
      title="Review requested free periods"
      description="These are the times the generator will try to keep free for students."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={save}
          nextLabel="Save free periods"
          nextIcon="lucide:check"
        />
      }
    >
      <Section label="Summary">
        <Stats
          items={[
            { label: "Days", value: days.length },
            { label: "Free periods", value: allSlots.length },
            { label: "Time kept free", value: formatDuration(totalMinutes) },
          ]}
        />
      </Section>

      <Section
        label="By day"
        action={
          <TextButton
            icon="lucide:pencil"
            onClick={() => goToStep("CONFIGURE_FREE_PERIOD")}
          >
            Edit times
          </TextButton>
        }
      >
        {days.length === 0 ? (
          <EmptyState
            title="Nothing to review"
            text="No days with free periods have been selected."
          />
        ) : (
          <ul className="cw-daylist">
            {days.map((day) => {
              const slots = slotsFor(day);
              return (
                <li
                  key={day}
                  className={`cw-dayrow align-items-start ${slots.length ? "" : "is-muted"}`}
                >
                  <span className="cw-dayrow__day pt-1">{dayLabel(day)}</span>
                  <span className="cw-dayrow__value d-flex flex-column gap-1 py-1">
                    {slots.length ? (
                      slots.map((slot) => (
                        <span
                          key={slot.id}
                          className="d-flex align-items-center justify-content-between gap-2"
                        >
                          <TimeSpan
                            start={slot.start_time?.value}
                            end={slot.end_time?.value}
                          />
                          <IconButton
                            icon="lucide:x"
                            label="Remove free period"
                            tone="danger"
                            onClick={() =>
                              dispatch(
                                removeRequestedFreePeriodSlot({
                                  day,
                                  slotId: slot.id,
                                }),
                              )
                            }
                          />
                        </span>
                      ))
                    ) : (
                      <span>No free periods set</span>
                    )}
                  </span>
                  <span className="cw-dayrow__meta pt-1">
                    {slots.length ? (
                      <Badge tone="accent">
                        {slots.length} {slots.length === 1 ? "period" : "periods"}
                      </Badge>
                    ) : (
                      <Badge tone="muted">Empty</Badge>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Section>
    </WizardStep>
  );
}

export default ReviewStep;
