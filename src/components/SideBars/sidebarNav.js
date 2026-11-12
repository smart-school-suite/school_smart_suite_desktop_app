import {
  Activity,
  Award,
  BarChart2,
  BookOpen,
  BookOpenCheck,
  Boxes,
  Building2,
  Calendar,
  CalendarClock,
  CalendarDays,
  CircleDollarSign,
  DoorOpen,
  Eye,
  FileCheck2,
  FileSpreadsheet,
  GraduationCap,
  Megaphone,
  PlusCircle,
  Receipt,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  UserRoundCog,
  Users,
  UserX,
  Vote,
  Wallet,
} from "lucide-react";
import {
  academicRoutes,
  activationCodeRoutes,
  additionalFeeRoutes,
  adminRoutes,
  announcementRoutes,
  courseRoutes,
  electionRoutes,
  eventRoutes,
  examRoutes,
  financialRoutes,
  hallRoutes,
  promotionRoutes,
  registrationFeeRoutes,
  resitFeeRoutes,
  resitRoutes,
  schoolActivities,
  schoolExpenseRoutes,
  StudentRoutes,
  teacherRoutes,
  tuitionFeeRoutes,
} from "../../utils/paths";

/**
 * Main navigation, shared by the expanded and collapsed sidebars.
 *
 * - `path`   where the group or item navigates to.
 * - `routes` every pathname that should mark it active. Items without
 *            `routes` are active only on their own `path`.
 *
 * Add a section or item here and both sidebars pick it up.
 */
export const sideBarData = [
  {
    key: "administrator",
    title: "Administrator",
    icon: UserRoundCog,
    path: "/school-admins",
    routes: adminRoutes,
    menuItems: [
      { title: "School Admins", icon: ShieldCheck, path: "/school-admins" },
      { title: "Departments", icon: Building2, path: "/departments" },
      { title: "Specialties", icon: Boxes, path: "/specialties" },
      {
        title: "Teachers",
        icon: GraduationCap,
        path: "/teacher",
        routes: teacherRoutes,
      },
      { title: "Halls", icon: DoorOpen, path: "/hall", routes: hallRoutes },
    ],
  },
  {
    key: "academics",
    title: "Academics",
    icon: BookOpenCheck,
    path: "/grades-configuration",
    routes: academicRoutes,
    menuItems: [
      { title: "Grades Scale", icon: Award, path: "/grades-configuration" },
      { title: "Semesters", icon: Calendar, path: "/semesters" },
      { title: "Academic Year", icon: CalendarDays, path: "/academic-year" },
      {
        title: "Courses",
        icon: BookOpen,
        path: "/courses",
        routes: courseRoutes,
      },
      {
        title: "Promotion",
        icon: TrendingUp,
        path: "/promotion-runs",
        routes: promotionRoutes,
      },
      { title: "Timetable", icon: CalendarClock, path: "/time-table" },
    ],
  },
  {
    key: "exams",
    title: "Exams",
    icon: FileSpreadsheet,
    path: "/exam",
    routes: examRoutes,
    menuItems: [
      { title: "Exams", icon: FileCheck2, path: "/exam" },
      { title: "Candidates", icon: FileSpreadsheet, path: "/exam-candidate" },
      { title: "Invigilators", icon: Eye, path: "/exam-invigilator" },
      { title: "Results", icon: BarChart2, path: "/exam-result" },
      { title: "Exam Timetable", icon: CalendarClock, path:"/exam-timetable"}
    ],
  },
  {
    key: "resit",
    title: "Resits",
    icon: RotateCcw,
    path: "/resit-exams",
    routes: resitRoutes,
    menuItems: [
      { title: "Resit Exams", icon: FileCheck2, path: "/resit-exams" },
      { title: "Candidates", icon: FileSpreadsheet, path: "/resit-candidate" },
      { title: "Student Resits", icon: RotateCcw, path: "/student-resit" },
      { title: "Results", icon: BarChart2, path: "/resit-result" },
    ],
  },
  {
    key: "student",
    title: "Students",
    icon: Users,
    path: "/students",
    routes: StudentRoutes,
    menuItems: [
      { title: "Students", icon: Users, path: "/students" },
      { title: "Dropouts", icon: UserX, path: "/studentDropout" },
      { title: "Guardians", icon: Users, path: "/parents" },
      { title: "Batches", icon: Boxes, path: "/student-batches" },
    ],
  },
  {
    key: "schoolActivities",
    title: "School Activities",
    icon: Activity,
    path: "/all-announcement",
    routes: schoolActivities,
    menuItems: [
      {
        title: "Announcements",
        icon: Megaphone,
        path: "/all-announcement",
        routes: announcementRoutes,
      },
      {
        title: "Elections",
        icon: Vote,
        path: "/elections",
        routes: electionRoutes,
      },
      {
        title: "Events",
        icon: CalendarDays,
        path: "/events",
        routes: eventRoutes,
      },
    ],
  },
  {
    key: "finances",
    title: "Finances",
    icon: Wallet,
    path: "/school-expenses",
    routes: financialRoutes,
    menuItems: [
      {
        title: "School Expenses",
        icon: Receipt,
        path: "/school-expenses",
        routes: schoolExpenseRoutes,
      },
      {
        title: "Tuition Fees",
        icon: CircleDollarSign,
        path: "/fee-payments",
        routes: tuitionFeeRoutes,
      },
      {
        title: "Registration Fees",
        icon: UserPlus,
        path: "/registration-fees",
        routes: registrationFeeRoutes,
      },
      {
        title: "Resit Fees",
        icon: RotateCcw,
        path: "/resit-payments",
        routes: resitFeeRoutes,
      },
      {
        title: "Additional Fees",
        icon: PlusCircle,
        path: "/additional-fees",
        routes: additionalFeeRoutes,
      },
    ],
  },
  {
    key: "activationCode",
    title: "Account Activation",
    icon: UserPlus,
    path: "/activation-code",
    routes: activationCodeRoutes,
  },
];

// A route also covers its detail pages, e.g. "/elections" → "/elections/:id".
const matchesRoute = (route, pathname) => pathname === route || pathname.startsWith(`${route}/`);

export const isRouteActive = (entry, pathname) =>
  entry.routes
    ? entry.routes.some((route) => matchesRoute(route, pathname))
    : matchesRoute(entry.path, pathname);
