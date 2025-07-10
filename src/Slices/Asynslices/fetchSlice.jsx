import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
const tagTypesarray = [
  "student",
  "teachers",
  "schooladmin",
  "parents",
  "departments",
  "specialties",
  "courses",
  "scores",
  "exams",
  'paidFees',
  'schoolEvents',
  'schoolExams',
  'studentBatch',
  'examTypes',
  'examGrades',
  'letterGrades',
  'educationLevels',
  'schoolAdmins',
  'studentResits',
  'schoolExpenses',
  'semesters',
  'specialtyTimeTable',
  'studentDetails',
  'expensesCategory',
  'schoolAdminDetails',
  'teacherDetails',
  'departmentDetails',
  'specialtyDetails',
  'courseDetails',
  'parentDetails',
  'examDetails',
  'scoreDetails',
  'timeTableDetails',
  'studentResitDetails',
  'expensesDetails',
  'studentScores',
  'country',
  'subscriptionRates',
  'associateExamGrades',
  'associateExamTimeTableCourses',
  'instructorAvialabilities',
  'specialtyCourses',
  'accessedCourses',
  'specialtyAccessedExams',
  'financialStats'
];
const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    const state = getState();
    const apiKey = state.auth?.apiKey;
    const token = state.auth?.token;
    if (apiKey) {
      headers.set("API-KEY", apiKey);
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  },
  credentials: "include",
});

const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    toast.error(result.error.message || "An error occurred");
    console.error(result.error);
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: tagTypesarray,
  endpoints: (builder) => ({
    fetchStudents: builder.query({
      query: () => "student/students",
      providesTags: ["student"],
    }),
    fetchTeachers: builder.query({
      query: () => "teacher/teachers",
      providesTags: ["teachers"],
    }),
    fetchParents: builder.query({
      query: () => "parent/get-parents",
      providesTags: ["parents"],
    }),
    fetchDepartments: builder.query({
      query: () => "department",
      providesTags: ["departments"],
    }),
    fetchSpecialties: builder.query({
      query: () => "specialty",
      providesTags: ["specialties"],
    }),
    fetchCourses: builder.query({
      query: () => "course/courses",
      providesTags: ["courses"],
    }),
    fetchPaidFees: builder.query({
      query: () => "fee-payment/paid-fees",
      providesTags: ["paidFees"],
    }),
    fetchSchoolEvents: builder.query({
      query: () => "event/school-events",
      providesTags: ["schoolEvents"],
    }),
    fetchExams: builder.query({
      query: () => "exam",
      providesTags: ["schoolExams"],
    }),
    fetchStudentBatch: builder.query({
      query: () => "student-batches/student-batches",
      providesTags: ["studentBatch"],
    }),
    fetchExamTypes: builder.query({
      query: () => "exam-type/exam_types",
      providesTags: ["examTypes"],
    }),
    fetchExamGrades: builder.query({
      query: () => "grades/grades-for-exams",
      providesTags: ["examGrades"],
    }),
    fetchLetterGrades: builder.query({
      query: () => "letter-grade/get-letter-grades",
      providesTags: ["letterGrades"],
    }),
    fetchEducationLevels: builder.query({
      query: () => "level",
      providesTags: ["educationLevels"],
    }),
    fetchSchoolAdmins: builder.query({
      query: () => "school-admin",
      providesTags: ["schoolAdmins"],
    }),
    fetchSchoolExpensesCategory: builder.query({
      query: () => "school-expenses-category/get-category-expenses",
      providesTags: ["expensesCategory"],
    }),
    fetchStudentResit: builder.query({
      query: () => "student-resit/student_resits",
      providesTags: ["studentResits"],
    }),
    fetchSchoolExpenses: builder.query({
      query: () => "school-expenses/my-expenses",
      providesTags: ["schoolExpenses"],
    }),
    fetchSemesters: builder.query({
      query: () => "semester/semesters",
      providesTags: ["semesters"],
    }),
    fetchSpecialtyTimetable: builder.query({
      query: ({ level_id, specialty_id }) => {
        return `time-table/generate-timetable/${level_id}/${specialty_id}`;
      },
      providesTags: ["specialtyTimeTable"],
    }),
    fetchStudentDetails: builder.query({
      query: ({ student_id }) => {
        return `student/student-details/${student_id} `;
      },
      providesTags: ["studentDetails"],
    }),
    fetchSchoolAdminDetails: builder.query({
      query: ({ school_admin_id }) => {
        return `school-admin/school-admin/details/${school_admin_id}`;
      },
      providesTags: ["schoolAdminDetails"],
    }),
    fetchTeacherDetails: builder.query({
      query: ({ teacher_id }) => {
        return `teacher/teacher-details/${teacher_id}`;
      },
      providesTags: ["teacherDetails"],
    }),
    fetchDepartmentDetails: builder.query({
      query: ({ department_id }) => {
        return `department/department-details/${department_id}`;
      },
      providesTags: ["departmentDetails"],
    }),
    fetchSpecialtyDetails: builder.query({
      query: ({ specialty_id }) => {
        return `specialty/specialty-details/${specialty_id}`;
      },
      providesTags: ["specialtyDetails"],
    }),
    fetchCourseDetails: builder.query({
      query: ({ course_id }) => {
        return `course/course-details/${course_id}`;
      },
      providesTags: ["courseDetails"],
    }),
    fetchParentDetails: builder.query({
      query: ({ parent_id }) => {
        return `parent/parent-details/${parent_id}`;
      },
      providesTags: ["parentDetails"],
    }),
    fetchExamDetails: builder.query({
      query: ({ exam_id }) => {
        return `exams/exam-details/${exam_id}`;
      },
      providesTags: ["examDetails"],
    }),
    fetchScoreDetails: builder.query({
      query: ({ mark_id }) => {
        return `marks/score-details/${mark_id}`;
      },
      providesTags: ["scoreDetails"],
    }),
    fetchTimetableDetails: builder.query({
      query: ({ entry_id }) => {
        return `time-table/timetable-details/${entry_id}`;
      },
      providesTags: ["timeTableDetails"],
    }),
    fetchStudentResitDetails: builder.query({
      query: ({ resit_id }) => {
        return `student-resit/details/${resit_id}`;
      },
      providesTags: ["studentResitDetails"],
    }),
    fetchExpensesDetails: builder.query({
      query: ({ expense_id }) => {
        return `school-expenses/expenses-details/${expense_id}`;
      },
      providesTags: ["expensesDetails"],
    }),
    fetchStudentScores: builder.query({
      query: () => "marks/scores-exam/student",
      providesTags: ["studentScores"],
    }),
    fetchCountrys: builder.query({
      query: () => "country",
      providesTags: ["country"],
    }),
    fetchPricingRates: builder.query({
      query: () => "subscription-rate/rates",
      providesTags: ["subscriptionRates"],
    }),
    fetchAssociateExamGrades: builder.query({
      query: ({ exam_id }) => {
        return `exams/letter-grades/${exam_id}`;
      },
      providesTags: ["associateExamGrades"],
    }),
    fetchExamAssociateTimetableCourses: builder.query({
      query: ({ exam_id }) => {
        return `exam-timetable/course-data/${exam_id}`;
      },
      providesTags: ["associateExamTimeTableCourses"],
    }),
    fetchInstructorAvailability: builder.query({
      query: ({ semester_id, specialty_id }) => {
        return `time-table/instructor-availability/${semester_id}/${specialty_id}`;
      },
      providesTags: ["instructorAvialabilities"],
    }),
    fetchSpecailtyCourses: builder.query({
      query: ({ specialty_id, semester_id }) => {
        return `course/my-courses/${specialty_id}/${semester_id}`;
      },
      providesTags: ["specialtyCourses"],
    }),
    fetchAccessedCourses: builder.query({
      query: ({ examId }) => {
        return `marks/accessed-courses/${examId}`;
      },
      providesTags: ["accessedCourses"],
    }),
    fetchSpecialtyAccessedExams: builder.query({
      query: ({ student_id }) => {
        return `exams/accessed_exams/${student_id}`;
      },
      providesTags: ["specialtyAccessedExams"],
    }),
    fetchEventDetails: builder.query({
       query: ({ event_id }) => {
          return `event/school-event/details/${event_id}`
       }
    }),
    fetchFeeDebtors: builder.query({
       query: () => "fee-payment/indebted-students",
       providesTags:["feedebtors"] 
    }),
    fetchFinancialStats: builder.query({
       query: ({ year }) => `financial-stats/${year}`,
       providesTags:['financialStats']
    }),
    fetchOperationalStats: builder.query({
       query: ({ year }) => `operational-stats/${year} `,
       providesTags:['operationalStats']
    }),
    fetchAcademicStats: builder.query({
       query: ({ year }) => `academic-stats/${year}`,
       providesTags:['academicStats']
    }),
    fetchPermissions: builder.query({
       query: () => "permissions/get-permissions",
       providesTags:["permissions"]
    }),
    fetchRoles: builder.query({
       query: () => "roles/get-roles",
       providesTags:["roles"]
    }),
    fetchPermissionsBySchoolAdmin: builder.query({
       query: ({ schoolAdminId }) => {
         return `permissions/get-schooladmin/permissions/${schoolAdminId}`
       }
    }),
    fetchSchoolSemesters: builder.query({
       query: () => "school-semester",
       providesTags:["schoolSemesters"]
    }),
    fetchAccessedStudents: builder.query({
       query: () => "accessed-student/getAccessedStudent",
       providesTags:["accessedStudents"]
    }),
    fetchTuitionFee: builder.query({ 
        query: () => "fee-payment/getTuitionFees",
        providesTags:['tuitionFees']
    }),
    fetchRegistrationFees: builder.query({
       query:() => "fee-payment/getRegistrationFees",
       providesTags:["registrationFees"]
    }),
    fetchAdditionalFees: builder.query({
       query: () => "additional-fees/getAll",
       providesTags:["additionalFees"]
    }),
    fetchAddtionalFeesTransactions: builder.query({
       query: () => "additional-fees/getTransactions",
       providesTags:["additionalFeesTransactions"]
    }),
    fecthTuitionFeesTransactions: builder.query({
       query: () => "fee-payment/getTransactions",
       providesTags:['tuitionFeesTransactions']
    }),
    fetchTransactionDetail: builder.query({
       query: ({transactionId}) =>  `fee-payment/getTuitionFeeTransactionDetails/${transactionId}`,
       providesTags:["transactionDetials"]
    }),
    fetchRegistrationFeeTransactions: builder.query({
       query: () => "fee-payment/getRegistrationFeeTransactions",
       providesTags:["registrationFeeTransactions"]
    }),
    fetchAdditionalFeesTransactionDetails: builder.query({
       query: ({ transactionId }) => `additional-fees/getTransactionDetails/${transactionId}`,
       providesTags:["addtionalFeesTransationDetails"]
    }),
    fetchResitFeeTransactions: builder.query({
       query: () => "student-resit/getTransactions",
       providesTags:"resitFeeTransactions"
    }),
    fetchResitFeeTransactionDetials: builder.query({
       query:({ transactionId }) => `student-resit/transactionDetails/${transactionId}`,
       providesTags:["resitFeeTransactionsDetails"]
    }),
    fetchElections: builder.query({
      query: () => "elections/get-elections",
      providesTags:["schoolElections"]
    }),
    fetchElectionApplications: builder.query({
       query: () => "election-application/getAllApplications",
       providesTags:["electionApplications"]
    }),
    fetchElectionRoles: builder.query({
       query: () => "election-roles/getAllRoles",
       providesTags:["electionRoles"]
    }),
    fetchHeadOfDepartment: builder.query({
      query: () => "hod",
      providesTags: ["headOfDepartment"]
    }),
    fetchHeadOfSpecialty: builder.query({
      query: () => "hos",
      providesTags: ["headOfSpecialty"]
    }),
    fetchHeadOfSpecialtyDetails: builder.query({
       query: ({ hosId}) => `specialty/getHosDetails/${hosId}`,
       providesTags: ["headOfSpecialtyDetails"]
    }),
    fetchHeadOfDepartmentDetails: builder.query({
       query: ({ hodId }) => `department/getHodDetails/${hodId}`,
       providesTags: ["headOfDepartmentDetails"]
    }),
    fetchSemesterDetail: builder.query({
       query: ({semesterId}) => `school-semesters/schoolSemesterDetails/${semesterId}`,
       providesTags:["schoolSemesterDetails"]
    }),
    fetchInstructorAvailabilityBySemester: builder.query({
       query: ({semester_id, specialty_id}) => `time-table/instructor-availability/${semester_id}/${specialty_id}`,
       providesTags:["instructorAvailability"]
    }),
    fetchSchoolSemesterDetaisl: builder.query({
       query: ({schoolSemesterId}) => `school-semesters/schoolSemesterDetails/${schoolSemesterId}`,
       providesTags:["schoolSemesterDetails"]
    }),
    fetchGradesByExam: builder.query({
       query: ({examId }) => `grades/getGradesByExam/${examId}`,
       providesTags:["gradesByExam"]
    }),
    fetchExamConfigData: builder.query({
       query: ({examId}) => `grades/getExamConfigData/${examId}`,
       providesTags:['examGradesConfig']
    }),
    fetchCoursesBySchoolSemester: builder.query({
       query: ({ semesterId, specialtyId }) => `course/getCoursesBySchoolSemester/${semesterId}/${specialtyId}`,
       providesTags:["coursesBySchoolSemester"]
    }),
    fetchGradesCategory: builder.query({
       query: () =>  "grades-category/getGradeCategories",
       providesTags:["gradesCategory"]
    }),
    fetchSchoolGradesConfig: builder.query({
      query: () => "school-grades/school-grade-config",
      providesTags:["schoolGradesConfig"]
    }),
    fetchStudentResults: builder.query({
      query: () => "exam-results/student-results",
      providesTags: ["studentResults"]
    }),
    fetchExamByTypeResit: builder.query({
       query: () => "exams/getAllResitExams",
       providesTags:["resitExams"]
    }),
    fetchResitCourseByExam: builder.query({
        query: (examId) => `student-resit/getResitCoursesByExam/${examId}`,
        providesTags:["resitCourses"]
    }),
    fetchResitCandidates: builder.query({
        query: () => "student-resit/accessedResitStudents",
        providesTags: ["resitCandidates"]
    }),
    fetchDropoutStudentList: builder.query({
       query: () => "student/getAllStudentDropout",
       providesTags:["dropoutStudents"]
    }),
    fetchStudentDropoutDetails: builder.query({
       query: (studentDropoutId) => `student/getStudentDropoutDetails/${studentDropoutId}`,
       providesTags:["studentDropoutDetails"]
    }),
    fetchGraduationDatesByBatch: builder.query({
       query: (batchId) => `student-batches/getStudentGraduationDatesByBatch/${batchId}`
    }),
    fetchAnnouncementStats: builder.query({
      query: ({year}) => `announcement/stat/${year}`,
      providesTags:["announcementStats"]
    }),
    fetchAnnouncementByStatus: builder.query({
       query: ({ status }) => `announcement/${status}`,
       providesTags:['announcementStatus']
    }),
    fetchAnnouncementCategory: builder.query({
       query: () => "announcement-category",
       providesTags:["announcementCategory"]
    })
  }),
});

export const {
  useFetchStudentsQuery,
  useFetchTeachersQuery,
  useFetchDepartmentsQuery,
  useFetchParentsQuery,
  useFetchCoursesQuery,
  useFetchSpecialtiesQuery,
  useFetchStudentBatchQuery,
  useFetchSchoolAdminsQuery,
  useFetchSchoolExpensesQuery,
  useFetchExamsQuery,
  useFetchStudentResitQuery,
  useFetchSpecialtyTimetableQuery,
  useFetchStudentScoresQuery,
  useFetchStudentDetailsQuery,
  useFetchSchoolAdminDetailsQuery,
  useFetchTeacherDetailsQuery,
  useFetchDepartmentDetailsQuery,
  useFetchSpecialtyDetailsQuery,
  useFetchCourseDetailsQuery,
  useFetchParentDetailsQuery,
  useFetchExamDetailsQuery,
  useFetchScoreDetailsQuery,
  useFetchTimetableDetailsQuery,
  useFetchStudentResitDetailsQuery,
  useFetchExpensesDetailsQuery,
  useFetchLetterGradesQuery,
  useFetchCountrysQuery,
  useFetchPricingRatesQuery,
  useFetchEducationLevelsQuery,
  useFetchSemestersQuery,
  useFetchExamTypesQuery,
  useFetchAssociateExamGradesQuery,
  useFetchExamAssociateTimetableCoursesQuery,
  useFetchSchoolExpensesCategoryQuery,
  useFetchInstructorAvailabilityQuery,
  useFetchSpecailtyCoursesQuery,
  useFetchAccessedCoursesQuery,
  useFetchSpecialtyAccessedExamsQuery,
  useFetchSchoolEventsQuery,
  useFetchEventDetailsQuery,
  useFetchFeeDebtorsQuery,
  useFetchPaidFeesQuery,
  useFetchFinancialStatsQuery,
  useFetchPermissionsQuery,
  useFetchRolesQuery,
  useFetchPermissionsBySchoolAdminQuery,
  useFetchSchoolSemestersQuery,
  useFetchAccessedStudentsQuery,
  useFetchTuitionFeeQuery,
  useFetchRegistrationFeesQuery,
  useFetchAdditionalFeesQuery,
  useFetchAddtionalFeesTransactionsQuery,
  useFecthTuitionFeesTransactionsQuery,
  useFetchTransactionDetailQuery,
  useFetchRegistrationFeeTransactionsQuery,
  useFetchAdditionalFeesTransactionDetailsQuery,
  useFetchResitFeeTransactionsQuery,
  useFetchResitFeeTransactionDetialsQuery,
  useFetchElectionsQuery,
  useFetchElectionApplicationsQuery,
  useFetchElectionRolesQuery,
  useFetchHeadOfDepartmentQuery,
  useFetchHeadOfSpecialtyQuery,
  useFetchHeadOfSpecialtyDetailsQuery,
  useFetchHeadOfDepartmentDetailsQuery,
  useFetchSemesterDetailQuery,
  useFetchInstructorAvailabilityBySemesterQuery,
  useFetchSchoolSemesterDetaislQuery,
  useFetchGradesByExamQuery,
  useFetchExamConfigDataQuery,
  useFetchCoursesBySchoolSemesterQuery,
  useFetchGradesCategoryQuery,
  useFetchSchoolGradesConfigQuery,
  useFetchStudentResultsQuery,
  useFetchExamByTypeResitQuery,
  useFetchResitCourseByExamQuery,
  useFetchResitCandidatesQuery,
  useFetchDropoutStudentListQuery,
  useFetchStudentDropoutDetailsQuery,
  useFetchGraduationDatesByBatchQuery,
  useFetchOperationalStatsQuery,
  useFetchAcademicStatsQuery,
  useFetchAnnouncementStatsQuery,
  useFetchAnnouncementByStatusQuery,
  useFetchAnnouncementCategoryQuery
} = apiSlice;
