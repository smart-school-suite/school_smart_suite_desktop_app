import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

const KEY = "0ad263774d0b238f3b9f780fb";

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

export const updateSlice = createApi({
  reducerPath: "updateApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["student", "teachers", "schooladmin"], 
  endpoints: (builder) => ({
    updateCourse: builder.mutation({
      query: ({ course_id, updatedData }) => ({
        url: `api/course/update-course/${course_id}`,
        method: "PUT",
        body: updatedData, 
      }),
      invalidatesTags: ["course"], 
    }),
    updateTeacher: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `api/teacher/update-teacher/${id}`,
        method: "PUT",
        body: updatedData, 
      }),
      invalidatesTags: ["teachers"], 
    }),
    updateTeacher: builder.mutation({
        query: ({ id, updatedData }) => ({
          url: `api/teacher/update-teacher/${id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["teachers"], 
      }),
      updateDepartment: builder.mutation({
        query: ({ department_id, updatedData }) => ({
          url: `api/department/update-department/${department_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["department"], 
      }),
      updateEvent: builder.mutation({
        query: ({ event_id, updatedData }) => ({
          url: `api/event/update-event/${event_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["events"], 
      }),
      updateTimeTable: builder.mutation({
        query: ({ examtimetable_id, updatedData }) => ({
          url: `api/exam-timetable/update-exam-time-table/${examtimetable_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["timeTable"], 
      }),
      updateGrades: builder.mutation({
        query: ({ grade_id, updatedData }) => ({
          url: `api/grades/update-grade/${grade_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["grade"], 
      }),
      updateExam: builder.mutation({
        query: ({ exam_id, updatedData }) => ({
          url: `api/exams/update-exam/${exam_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["exams"], 
      }),
      updateStudentScores: builder.mutation({
        query: ({ mark_id, updatedData }) => ({
          url: `api/marks/update-student-mark/${mark_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["studentScores"], 
      }),
      updateParent: builder.mutation({
        query: ({ parent_id, updatedData }) => ({
          url: `api/parent/update-parent/${parent_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["parents"], 
      }),
      updateSchoolAdmin: builder.mutation({
        query: ({ school_admin_id, updatedData }) => ({
          url: `api/school-admin/update-school-admin/${school_admin_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["schoolAdmin"], 
      }),
      updateSchoolBranch: builder.mutation({
        query: ({ branch_id, updatedData }) => ({
          url: `api/school-branch/update-branch/${branch_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["schoolBranch"], 
      }),
      updateSchoolExpenses: builder.mutation({
        query: ({ category_expense_id, updatedData }) => ({
          url: `api/school-expenses-category/update-category/${category_expense_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["schoolCategoryExpenses"], 
      }),
      updateSchoolExpenses: builder.mutation({
        query: ({ expense_id, updatedData }) => ({
          url: `api/school-expenses/update-expenses/${expense_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["schoolExpenses"], 
      }),
      updateSchool: builder.mutation({
        query: ({ school_id, updatedData }) => ({
          url: `api/school/update_school/${school_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["school"], 
      }),
      updateSpecialty: builder.mutation({
        query: ({ specialty_id, updatedData }) => ({
          url: `api/specialty/update-specialty/${specialty_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["specialty"], 
      }),
      updateStudentResitPayment: builder.mutation({
        query: ({ resit_id, updatedData }) => ({
          url: `api/student-resit/pay-for-resit/${resit_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["resitPayment"], 
      }),
      updateSchool: builder.mutation({
        query: ({ batch_id, updatedData }) => ({
          url: `api/student-batches/update-batch/${batch_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["studentBatches"], 
      }),
      updateStudentResitExamStatus: builder.mutation({
        query: ({ resit_id, updatedData }) => ({
          url: `api/student-resit/update-resit-status/${resit_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["resitExamStatus"], 
      }),
      updateStudent: builder.mutation({
        query: ({ student_id, updatedData }) => ({
          url: `api/student/update-student/${student_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["student"], 
      }),
      updateTeacher: builder.mutation({
        query: ({ resit_id, updatedData }) => ({
          url: `api/teacher/update-teacher/${resit_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["teacher"], 
      }),
      updateTimeTable: builder.mutation({
        query: ({ timetable_id, updatedData }) => ({
          url: `api/time-table/update-timetable/${timetable_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["timetable"], 
      }),
  }),
});


export const {
  useUpdateCourseMutation,
  useUpdateDepartmentMutation,
  useUpdateEventMutation,
  useUpdateExamMutation,
  useUpdateGradesMutation,
  useUpdateParentMutation,
  useUpdateSchoolAdminMutation,
  useUpdateSchoolBranchMutation,
  useUpdateSchoolExpensesMutation,
  useUpdateSchoolMutation,
  useUpdateSpecialtyMutation,
  useUpdateStudentMutation,
  useUpdateStudentResitExamStatusMutation,
  useUpdateStudentResitPaymentMutation,
  useUpdateStudentScoresMutation,
  useUpdateTeacherMutation,
  useUpdateTimeTableMutation
} = updateSlice;