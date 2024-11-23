import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
const KEY = "29e494f1837c47baa9e19c559";
const tagTypesarray = [
  "students",
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
      providesTags: ["students"],
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
      providesTags: ["courses"],
    }),
    fetchSchoolExpensesCategory: builder.query({
      query: () => "api/school-expenses-category/get-category-expenses",
      providesTags: ["courses"],
    }),
    fetchSchoolExpenses: builder.query({
      query: () => "api/school-expenses/my-expenses",
      providesTags: ["courses"],
    }),
    fetchSemesters: builder.query({
      query: () => "api/semester/semesters",
      providesTags: ["courses"],
    }),
    fetchStudentBatches: builder.query({
      query: () => "api/student-batches/student-batches",
      providesTags: ["courses"],
    }),
  }),
});

export const {
  useFetchStudentsQuery,
  useFetchTeachersQuery,
  useFetchDepartmentsQuery,
  useFetchParentsQuery,
  useFetchCoursesQuery,
  useFetchSpecialtiesQuery,
} = apiSlice;
