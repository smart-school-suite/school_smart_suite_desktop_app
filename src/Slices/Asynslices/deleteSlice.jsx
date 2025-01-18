import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/",
  prepareHeaders: (headers) => {
    const schoolBranchId = localStorage.getItem('schoolBranchId');
    if (schoolBranchId) {
      headers.set("SCHOOL_BRANCH_KEY", schoolBranchId);
    }
    return headers;
  },
  credentials: "include",
});

// Error handling for delete operations
const baseQueryWithErrorHandling = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    toast.error(result.error.message || "An error occurred");
  }

  return result;
};

export const deleteSlice = createApi({
  reducerPath: "deleteApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["student", "teachers", "schooladmin"],
  endpoints: (builder) => ({
    deleteCourse: builder.mutation({
      query: (course_id) => ({
        url: `api/course/delete-course/${course_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
    }),
    deleteDepartment: builder.mutation({
      query: (department_id) => ({
        url: `api/department/delete-department/${department_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["department"], 
    }),
    deleteEvent: builder.mutation({
        query: (event_id) => ({
          url: `api/event/delete-event/${event_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["event"],
      }),
      deleteExamTimeTable: builder.mutation({
        query: (examtimetable_id) => ({
          url: `api/exam-timetable/delete/exam-time-table/${examtimetable_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ExamTimeTable"], 
      }),
      deleteExam: builder.mutation({
        query: (exam_id) => ({
          url: `api/exams/delete-exams/${exam_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["exam"],
      }),
      deletePaymentRecord: builder.mutation({
        query: (fee_id) => ({
          url: `api/fee-payment/delete-payment-record/${fee_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["PaymentRecord"], 
      }),
      deleteExamGrade: builder.mutation({
        query: (grade_id) => ({
          url: `api/grades/delete-grade/${grade_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["examGrade"],
      }),
      deleteStudentExamScore: builder.mutation({
        query: (mark_id) => ({
          url: `api/marks/delete-student-mark/${mark_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["StudentExamScores"], 
      }),
      deleteParent: builder.mutation({
        query: (parent_id) => ({
          url: `api/parent/delete-parent/${parent_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["parent"],
      }),
      deleteSchoolAdmin: builder.mutation({
        query: (school_admin_id) => ({
          url: `api/school-admin/delete-school-admin/${school_admin_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SchoolAdmin"], 
      }),
      deleteSchoolBranch: builder.mutation({
        query: (branch_id) => ({
          url: `api/school-branch/delete-branch/${branch_id} `,
          method: "DELETE",
        }),
        invalidatesTags: ["SchoolBranch"],
      }),
      deleteSchoolExpensesCategory: builder.mutation({
        query: (category_expense_id) => ({
          url: `api/school-expenses-category/delete-category/${category_expense_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SchoolExpensesCategory"], 
      }),
      deleteDeleteSchoolExpenses: builder.mutation({
        query: (expense_id) => ({
          url: `api/school-expenses/delete-expenses/${expense_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SchoolExpenses"],
      }),
      deleteSchool: builder.mutation({
        query: (school_id) => ({
          url: `api/school/delete-school/${school_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["School"], 
      }),
      deleteSpecialty: builder.mutation({
        query: (specialty_id) => ({
          url: `api/specialty/delete-specialty/${specialty_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Specialty"],
      }),
      deleteStudentBatch: builder.mutation({
        query: (batch_id) => ({
          url: `api/student-batches/delete-batch/${batch_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["StudentBatch"], 
      }),
      deleteStudentResit: builder.mutation({
        query: (resit_id) => ({
          url: `api/student-resit/delete-resit/${resit_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["StudentResit"],
      }),
      deleteStudentTransferRequest: builder.mutation({
        query: (transfer_id) => ({
          url: `api/student-transfer/delete-transfer-request/${transfer_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["StudentTransferRequest"], 
      }),
      deleteStudent: builder.mutation({
        query: (student_id) => ({
          url: `api/student/delete-student/${student_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["StudentResit"],
      }),
      deleteTeacher: builder.mutation({
        query: (teacher_id) => ({
          url: `api/teacher/delete-teacher/${teacher_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Teacher"], 
      }),
      deleteTimeTable: builder.mutation({
        query: (timetable_id) => ({
          url: `api/time-table/delete-timetable/${timetable_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TimeTable"], 
      }),
  }),
});


export const {
  useDeleteCourseMutation,
  useDeleteDeleteSchoolExpensesMutation,
  useDeleteDepartmentMutation,
  useDeleteEventMutation,
  useDeleteExamGradeMutation,
  useDeleteExamMutation,
  useDeleteExamTimeTableMutation,
  useDeleteParentMutation,
  useDeletePaymentRecordMutation,
  useDeleteSchoolAdminMutation,
  useDeleteSchoolBranchMutation,
  useDeleteSchoolExpensesCategoryMutation,
  useDeleteSchoolMutation,
  useDeleteSpecialtyMutation,
  useDeleteStudentBatchMutation,
  useDeleteStudentExamScoreMutation,
  useDeleteStudentMutation,
  useDeleteStudentResitMutation,
  useDeleteStudentTransferRequestMutation,
  useDeleteTeacherMutation,
  useDeleteTimeTableMutation
} = deleteSlice;