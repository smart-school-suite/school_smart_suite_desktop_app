import RequestedAssignment from "../ModalContent/SemesterTimetable/constraints/Assignment/RequestedAssignment";
import CourseDailyFrequency from "../ModalContent/SemesterTimetable/constraints/Course/CourseDailyFrequency";
import CourseRequestedSlot from "../ModalContent/SemesterTimetable/constraints/Course/CourseRequestedSlot";
import RequiredJointCourse from "../ModalContent/SemesterTimetable/constraints/Course/RequiredJointCourse";
import HallRequestedTimeSlot from "../ModalContent/SemesterTimetable/constraints/Hall/HallRequestedTimeSlot";
import BreakPeriod from "../ModalContent/SemesterTimetable/constraints/Schedule/BreakPeriod";
import OperationalPeriod from "../ModalContent/SemesterTimetable/constraints/Schedule/OperationalPeriod";
import PeriodDuration from "../ModalContent/SemesterTimetable/constraints/Schedule/PeriodDuration";
import RequestedFreePeriod from "../ModalContent/SemesterTimetable/constraints/Schedule/RequestedFreePeriod";
import ScheduleDailyFreePeriod from "../ModalContent/SemesterTimetable/constraints/Schedule/ScheduleDailyFreePeriod";
import ScheduleDailyPeriod from "../ModalContent/SemesterTimetable/constraints/Schedule/ScheduleDailyPeriod";
import TeacherDailyHour from "../ModalContent/SemesterTimetable/constraints/Teacher/TeacherDailyHour";
import TeacherRequestedTimeSlot from "../ModalContent/SemesterTimetable/constraints/Teacher/TeacherRequestedTimeSlot";
import TeacherWeeklyHour from "../ModalContent/SemesterTimetable/constraints/Teacher/TeacherWeeklyHour";


const scheduleConstraintMap = [
  {
    key: "break_period",
    modal: BreakPeriod,
  },
  {
    key: "operational_period",
    modal: OperationalPeriod,
  },
  {
    key: "schedule_period_duration_minutes",
    modal: PeriodDuration,
  },
  {
    key: "requested_free_period",
    modal: RequestedFreePeriod,
  },
  {
    key: "schedule_free_periods_per_day",
    modal: ScheduleDailyFreePeriod,
  },
  {
    key: "schedule_periods_per_day",
    modal: ScheduleDailyPeriod,
  },
];

const teacherConstraintMap = [
  {
    key: "teacher_weekly_hours",
    modal: TeacherWeeklyHour,
  },
  {
    key:"teacher_requested_time_windows",
    modal:TeacherRequestedTimeSlot
  },
  {
    key:"teacher_daily_hours",
    modal:TeacherDailyHour
  }
];

const hallConstraintMap = [
   {
      key:"hall_requested_time_windows",
      modal:HallRequestedTimeSlot
   }
]

const courseConstraintMap = [
     {
        key:"course_daily_frequency",
        modal:CourseDailyFrequency
     },
     {
        key:"course_requested_time_slots",
        modal:CourseRequestedSlot
     },
     {
        key:"required_joint_course_period",
        modal:RequiredJointCourse
     }
]

const assignmentConstraintMap = [
    {
        key:"requested_assignments",
        modal:RequestedAssignment
    }
]

export const constraintMap = [
 ...scheduleConstraintMap,
 ...teacherConstraintMap,
 ...hallConstraintMap,
 ...courseConstraintMap,
 ...assignmentConstraintMap
];
