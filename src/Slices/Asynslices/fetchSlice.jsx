import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
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
  baseUrl: "http://127.0.0.1:8000/api/api/v1/",
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
      query: () => "student/get-students",
      providesTags: ["student"],
    }),
    fetchTeachers: builder.query({
      query: () => "teacher/getallInstructors",
      providesTags: ["teachers"],
    }),
    fetchParents: builder.query({
      query: () => "parent/get-parents",
      providesTags: ["parents"],
    }),
    fetchDepartments: builder.query({
      query: () => "department/my-departments",
      providesTags: ["departments"],
    }),
    fetchSpecialties: builder.query({
      query: () => "specialty/my-specialties",
      providesTags: ["specialties"],
    }),
    fetchCourses: builder.query({
      query: () => "course/my-courses",
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
      query: () => "exams/getexams",
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
      query: () => "levels/education-levels",
      providesTags: ["educationLevels"],
    }),
    fetchSchoolAdmins: builder.query({
      query: () => "school-admin/get-all-school-admins",
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
      query: () => "country/countries",
      providesTags: ["country"],
    }),
    fetchPricingRates: builder.query({
      query: () => "subcription/rates",
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
      query: ({ exam_id, student_id }) => {
        return `marks/accessed-courses/${exam_id}/${student_id}`;
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
       query: () => "stats/get/financial-stats",
       providesTags:['financialStats']
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
  useFetchPermissionsBySchoolAdminQuery
} = apiSlice;
