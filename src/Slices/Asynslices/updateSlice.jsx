import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/api/v1/",
  prepareHeaders: (headers, {getState}) => {
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

export const updateSlice = createApi({
  reducerPath: "updateApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["student", "teachers", "schooladmin"], 
  endpoints: (builder) => ({
    updateCourse: builder.mutation({
      query: ({ course_id, updatedData }) => ({
        url: `course/update-course/${course_id}`,
        method: "PUT",
        body: updatedData, 
      }),
      invalidatesTags: ["course"], 
    }),
    updateTeacher: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `teacher/update-teacher/${id}`,
        method: "PUT",
        body: updatedData, 
      }),
      invalidatesTags: ["teachers"], 
    }),
    updateTeacher: builder.mutation({
        query: ({ id, updatedData }) => ({
          url: `teacher/update-teacher/${id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["teachers"], 
      }),
      updateDepartment: builder.mutation({
        query: ({ department_id, updatedData }) => ({
          url: `department/update-department/${department_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["department"], 
      }),
      updateEvent: builder.mutation({
        query: ({ event_id, updatedData }) => ({
          url: `event/update-event/${event_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["events"], 
      }),
      updateTimeTable: builder.mutation({
        query: ({ examtimetable_id, updatedData }) => ({
          url: `exam-timetable/update-exam-time-table/${examtimetable_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["timeTable"], 
      }),
      updateGrades: builder.mutation({
        query: ({ grade_id, updatedData }) => ({
          url: `grades/update-grade/${grade_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["grade"], 
      }),
      updateExam: builder.mutation({
        query: ({ exam_id, updatedData }) => ({
          url: `exams/update-exam/${exam_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["exams"], 
      }),
      updateStudentScores: builder.mutation({
        query: ({ mark_id, updatedData }) => ({
          url: `marks/update-student-mark/${mark_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["studentScores"], 
      }),
      updateParent: builder.mutation({
        query: ({ parent_id, updatedData }) => ({
          url: `parent/update-parent/${parent_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["parents"], 
      }),
      updateSchoolAdmin: builder.mutation({
        query: ({ school_admin_id, updatedData }) => ({
          url: `school-admin/update-school-admin/${school_admin_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["schoolAdmin"], 
      }),
      updateSchoolBranch: builder.mutation({
        query: ({ branch_id, updatedData }) => ({
          url: `school-branch/update-branch/${branch_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["schoolBranch"], 
      }),
      updateSchoolExpenses: builder.mutation({
        query: ({ category_expense_id, updatedData }) => ({
          url: `school-expenses-category/update-category/${category_expense_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["schoolCategoryExpenses"], 
      }),
      updateSchoolExpenses: builder.mutation({
        query: ({ expense_id, updatedData }) => ({
          url: `school-expenses/update-expenses/${expense_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["schoolExpenses"], 
      }),
      updateSchool: builder.mutation({
        query: ({ school_id, updatedData }) => ({
          url: `school/update_school/${school_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["school"], 
      }),
      updateSpecialty: builder.mutation({
        query: ({ specialty_id, updatedData }) => ({
          url: `specialty/update-specialty/${specialty_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["specialty"], 
      }),
      updateStudentResitPayment: builder.mutation({
        query: ({ resit_id, updatedData }) => ({
          url: `student-resit/pay-for-resit/${resit_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["resitPayment"], 
      }),
      updateSchool: builder.mutation({
        query: ({ batch_id, updatedData }) => ({
          url: `student-batches/update-batch/${batch_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["studentBatches"], 
      }),
      updateStudentResitExamStatus: builder.mutation({
        query: ({ resit_id, updatedData }) => ({
          url: `student-resit/update-resit-status/${resit_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["resitExamStatus"], 
      }),
      updateStudent: builder.mutation({
        query: ({ student_id, updatedData }) => ({
          url: `student/update-student/${student_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["student"], 
      }),
      updateTeacher: builder.mutation({
        query: ({ resit_id, updatedData }) => ({
          url: `teacher/update-teacher/${resit_id}`,
          method: "PUT",
          body: updatedData, 
        }),
        invalidatesTags: ["teacher"], 
      }),
      updateTimeTable: builder.mutation({
        query: ({ timetable_id, updatedData }) => ({
          url: `time-table/update-timetable/${timetable_id}`,
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