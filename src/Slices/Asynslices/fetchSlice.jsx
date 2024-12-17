import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
const KEY = "0ad263774d0b238f3b9f780fb";
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
];
const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/",
  prepareHeaders: (headers) => {
    headers.set("SCHOOL_BRANCH_KEY", KEY);
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
  tagTypes: tagTypesarray, // Example of tag types for cache management
  endpoints: (builder) => ({
    fetchStudents: builder.query({
      query: () => "api/student/get-students",
      providesTags: ["student"],
    }),
    fetchTeachers: builder.query({
      query: () => "api/teacher/get-all-teachers",
      providesTags: ["teachers"],
    }),
    fetchParents: builder.query({
      query: () => "api/parent/get-parents-no-relations",
      providesTags: ["parents"],
    }),
    fetchDepartments: builder.query({
      query: () => "api/department/my-departments",
      providesTags: ["departments"],
    }),
    fetchSpecialties: builder.query({
      query: () => "api/specialty/my-specialties",
      providesTags: ["specialties"],
    }),
    fetchCourses: builder.query({
      query: () => "api/course/my-courses",
      providesTags: ["courses"],
    }),
    fetchPaidFees: builder.query({
      query: () => "api/fee-payment/paid-fees",
      providesTags: ["courses"],
    }),
    fetchSchoolEvents: builder.query({
      query: () => "api/event/school-events",
      providesTags: ["courses"],
    }),
    fetchExams: builder.query({
       query: () => "api/exams/getexams",
       providesTags: ["Exams"]
    }),
    fetchStudentBatch: builder.query({
      query: () => "api/student-batches/student-batches",
      providesTags: ["studentBatch"]
    }),
    fetchExamTypes: builder.query({
      query: () => "api/exam-type/exam_types",
      providesTags: ["courses"],
    }),
    fetchExamGrades: builder.query({
      query: () => "api/grades/grades-for-exams",
      providesTags: ["courses"],
    }),
    fetchLetterGrades: builder.query({
      query: () => "api/letter-grade/get-letter-grades",
      providesTags: ["courses"],
    }),
    fetchEducationLevels: builder.query({
      query: () => "api/levels/education-levels",
      providesTags: ["courses"],
    }),
    fetchSchoolAdmins: builder.query({
      query: () => "api/school-admin/get-all-school-admins",
      providesTags: ["schooladmins"],
    }),
    fetchSchoolExpensesCategory: builder.query({
      query: () => "api/school-expenses-category/get-category-expenses",
      providesTags: ["courses"],
    }),
    fetchStudentResit: builder.query({
       query: () => "api/student-resit/student_resits",
       providesTags: ["student_resit"]
    }),
    fetchSchoolExpenses: builder.query({
      query: () => "api/school-expenses/my-expenses",
      providesTags: ["schoolexpenses"],
    }),
    fetchSemesters: builder.query({
      query: () => "api/semester/semesters",
      providesTags: ["courses"],
    }),
    fetchStudentBatches: builder.query({
      query: () => "api/student-batches/student-batches",
      providesTags: ["courses"],
    }),
    fetchSpecialtyTimetable:  builder.query({
      query: ({ level_id, specialty_id }) => {
         return `api/time-table/generate-timetable/${level_id}/${specialty_id}`
      },
      providesTags: ["timetable"]
    }),
    fetchStudentDetails: builder.query({
        query: ({ student_id }) => {
           return `api/student/student-details/${student_id} `
        }
    }),
    fetchSchoolAdminDetails: builder.query({
        query: ({ school_admin_id }) => {
           return `api/school-admin/school-admin/details/${school_admin_id}`
        }
    }),
    fetchTeacherDetails: builder.query({
       query: ({ teacher_id }) => {
             return `api/teacher/teacher-details/${teacher_id}`
       }
    }),
    fetchDepartmentDetails: builder.query({
      query: ({ department_id }) => {
         return `api/department/department-details/${department_id}`
      }
    }),
    fetchSpecialtyDetails: builder.query({
       query: ({ specialty_id }) => {
          return `api/specialty/specialty-details/${specialty_id}`
       }
    }),
    fetchCourseDetails: builder.query({
       query: ({ course_id }) => {
         return `api/course/course-details/${course_id}`
       }
    }),
    fetchParentDetails: builder.query({
       query: ({ parent_id }) => {
         return `api/parent/parent-details/${parent_id}`
       }
    }),
    fetchExamDetails: builder.query({
       query:({ exam_id }) => {
          return `api/exams/exam-details/${exam_id}`
       }
    }),
    fetchScoreDetails: builder.query({
       query: ({ mark_id }) => {
          return `api/marks/score-details/${mark_id}`
       }
    }),
    fetchTimetableDetails: builder.query({
       query: ({ entry_id }) => {
         return `api/time-table/timetable-details/${entry_id}`
       }
    }),
    fetchStudentResitDetails: builder.query({
      query: ({ resit_id }) => {
         return `api/student-resit/details/${resit_id}`
      }
    }),
    fetchExpensesDetails: builder.query({
      query: ({ expense_id }) => {
        return `api/school-expenses/expenses-details/${expense_id}`
      }
    }),
    fetchStudentScores: builder.query({
      query: () => "api/marks/scores-exam/student",
      providesTags: ["scores"]
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
  useFetchLetterGradesQuery
} = apiSlice;
