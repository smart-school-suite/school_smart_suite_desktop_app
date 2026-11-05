import { useDispatch } from "react-redux";
import {
  Section,
  TextButton,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { addSlot } from "../../../../Slices/jointCourse/jointCourseTimetableSlice";
import { SLOT_STATUS } from "../../../../utils/jointCourseTimetable/slotValidation";
import { dayLabel } from "../../../../utils/semesterTimetable/timeUtils";
import TimetableSlotCard from "./TimetableSlotCard";

/** All slots of one teaching day. Adding a slot here also raises that day's count. */
function DaySlotSection({
  courseId,
  teacherId,
  day,
  slots,
  checks,
  periodMinutes,
  recommendations,
  canAdd,
}) {
  const dispatch = useDispatch();
  const ready = slots.filter((slot) => checks[slot.id]?.status === SLOT_STATUS.READY).length;

  return (
    <Section
      className="jcs-daysection"
      label={dayLabel(day)}
      hint={`${slots.length} slot${slots.length === 1 ? "" : "s"} · ${ready} ready`}
      action={
        canAdd && (
          <TextButton icon="lucide:plus" onClick={() => dispatch(addSlot({ courseId, day }))}>
            Add slot
          </TextButton>
        )
      }
    >
      <div className="d-flex flex-column gap-2">
        {slots.map((slot, index) => (
          <TimetableSlotCard
            key={slot.id}
            courseId={courseId}
            teacherId={teacherId}
            slot={slot}
            number={index + 1}
            periodMinutes={periodMinutes}
            check={checks[slot.id]}
            recommendation={recommendations.bySlot[slot.id]}
            recommendations={recommendations}
            canRemove={slots.length > 1}
          />
        ))}
      </div>
    </Section>
  );
}

export default DaySlotSection;
