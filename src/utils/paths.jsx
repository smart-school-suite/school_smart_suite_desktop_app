export const settingRoutes = [
  ,
  "/settings/general-settings",
  "/settings/display",
  "/settings/updates",
  "/settings/profile",
  "/settings/security",
  "/settings/help",
  "/settings/app-settings",
  "/settings/subscription",
  "/settings/school-branch",
  "/settings/school"
];


export const adminRoutes = [
  "/school-admins",
  "/departments",
  "/specialties",
  "/teachers",
];

export const academicRoutes = [
  "/time-table",
  "/courses",
  "/semesters",
  "/grades-configuration",
];

export const examRoutes = ["/exam", "/exam-candidate", "/exam-timetable", "/exam-results"];

export const resitRoutes = [
  "/resit-candidate",
  "/resit-exams",
  "/resit-timetable",
  "/student-resit",
];

export const StudentRoutes = [
  "/students",
  "/parents",
  "/student-batches",
  "/studentDropout",
];

export const electionRoutes = [
  "/election-overview",
  "/past-election",
  "/election-application",
  "/election-candidates",
  "/view-elections",
  "/pass-winners",
  "/election-results",
  "/election-roles",
];

export const eventRoutes = [
  "/events",
  "/event-tags",
  "/event-categories",
  "/schedule-event",
  "/expired-event",
  "/draft-event",
];

export const announcementRoutes = [
  "/announcement-overview",
  "/draft-annoucement",
  "/announcement-category",
  "/expired-annoucement",
  "/scheduled-annoucement",
  "/announcement",
];


export const dashboardRoutes = [
  "/",
  "/academic-analysis",
  "/operational-analysis",
];

export const additionalFeeRoutes = [
  "/additional-fees",
  "/additionalfee-transactions",
  "/additional-fee/student-billing",
  "/additional-fee/category",
];

export const schoolExpenseRoutes = [
  "/school-expense-category",
  "/school-expenses",
];

export const registrationFeeRoutes = [
  "/registration-fees",
  "/registrationfee-transactions",
];

export const tuitionFeeRoutes = [
  "/fee-payments",
  "/fee-payment-transactions",
  "/fee-payment-schedule",
];

export const resitFeeRoutes = [
    "/resit-payments",
    "/resitfee-transaction"
];

export const financialRoutes = [
  ...resitFeeRoutes,
  ...tuitionFeeRoutes,
  ...registrationFeeRoutes,
  ...schoolExpenseRoutes,
  ...additionalFeeRoutes,
];
export const schoolActivities = [
  ...announcementRoutes,
  ...electionRoutes,
  ...eventRoutes,
];
