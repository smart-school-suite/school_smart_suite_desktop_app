import {
  CourseRequestedSlotEditor,
  HallRequestedSlotEditor,
  InvigilatorRequestedSlotEditor,
  RequestedAssignmentEditor,
} from "./RequestEditors";
import JointCoursesPanel from "./JointCoursesPanel";
import { DailyLoadEditor, InvigilationEditor, OperationalPeriodEditor, SessionDurationEditor } from "./ScheduleEditors";

/**
 * Exam constraint key (from GET exam-timetable/constraints) -> its editor,
 * like semesterTimetableConstraintMap. Keys missing here are listed as "Soon".
 */
export const examTimetableConstraintMap = {
  operational_period: { component: OperationalPeriodEditor },
  session_duration: { component: SessionDurationEditor },
  student_daily_load_range: { component: DailyLoadEditor },
  candidates_per_invigilator: { component: InvigilationEditor },
  course_requested_slot: { component: CourseRequestedSlotEditor },
  requested_assignment: { component: RequestedAssignmentEditor },
  hall_requested_slot: { component: HallRequestedSlotEditor },
  invigilator_requested_slot: { component: InvigilatorRequestedSlotEditor },
  required_joint_course_periods: { component: JointCoursesPanel, readOnly: true },
};
