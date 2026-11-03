import CourseRequestedSlotWizzard from "../../../DrawerContent/SemesterTimetable/Constraints/Course/CourseRequestedSlot/CourseRequestedSlotWizzard";
import RequiredJointCourse from "../../../DrawerContent/SemesterTimetable/Constraints/Course/JointCourse/RequiredJointCourse";
import RequestedFreePeriodWizzard from "../../../DrawerContent/SemesterTimetable/Constraints/FreePeriod/RequestedFreePeriod/RequestedFreePeriodWizzard";
import HallRequestedSlotWizzard from "../../../DrawerContent/SemesterTimetable/Constraints/Hall/HallRequestedSlot/HallRequestedSlotWizzard";
import BreakPeriodWizzard from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/BreakPeriod/BreakPeriodWizzard";
import OperationalPeriodWizzard from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/OperationalPeriod/OperationalPeriodWizzard";
import PeriodDurationWizzard from "../../../DrawerContent/SemesterTimetable/Constraints/Schedule/PeriodDuration/PeriodDurationWizzard";
import RequestedAssignmentWizzard from "../../../DrawerContent/SemesterTimetable/Constraints/RequestedAssignment/RequestedAssignmentWizzard";
import TeacherRequestedSlotWizzard from "../../../DrawerContent/SemesterTimetable/Constraints/Teacher/TeacherRequestedSlot/TeacherRequestedSlotWizzard";

/**
 * Constraint key (from the API) -> editor used to configure it.
 *
 * `editor` is "drawer" or "modal". Set `ready: false` while a wizard's steps
 * are still being built: the sidebar lists the constraint as "Soon" and does
 * not open it. Keys missing from this map are listed the same way.
 */
export const semesterTimetableConstraintMap = {
  schedule_period_duration_minutes: {
    component: PeriodDurationWizzard,
    editor: "drawer",
  },
  break_period: {
    component: BreakPeriodWizzard,
    editor: "drawer",
  },
  operational_period: {
    component: OperationalPeriodWizzard,
    editor: "drawer",
  },
  requested_free_period: {
    component: RequestedFreePeriodWizzard,
    editor: "drawer",
  },
  teacher_requested_time_windows: {
    component: TeacherRequestedSlotWizzard,
    editor: "drawer",
  },
  hall_requested_time_windows: {
    component: HallRequestedSlotWizzard,
    editor: "drawer",
  },
  required_joint_course_periods: {
    ready: false,
    component: RequiredJointCourse,
    editor: "drawer",
  },
  course_requested_time_slots: {
    component: CourseRequestedSlotWizzard,
    editor: "drawer",
  },
  requested_assignments: {
    component: RequestedAssignmentWizzard,
    editor: "drawer",
  },
};
