import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
        url: `course/delete-course/${course_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),
    deleteDepartment: builder.mutation({
      query: (department_id) => ({
        url: `department/delete-department/${department_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["department"], 
    }),
    deleteEvent: builder.mutation({
        query: (event_id) => ({
          url: `event/delete-event/${event_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["event"],
      }),
      deleteExam: builder.mutation({
        query: (examId) => ({
          url: `exams/delete-exams/${examId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["exam"],
      }),
      deletePaymentRecord: builder.mutation({
        query: (fee_id) => ({
          url: `fee-payment/delete-payment-record/${fee_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["PaymentRecord"], 
      }),
      deleteExamGrade: builder.mutation({
        query: (examId) => ({
          url: `grades/delete-grade/${examId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["examGrade"],
      }),
      deleteStudentExamScore: builder.mutation({
        query: (mark_id) => ({
          url: `marks/delete-student-mark/${mark_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["StudentExamScores"], 
      }),
      deleteParent: builder.mutation({
        query: (guardianId) => ({
          url: `parent/delete-parent/${guardianId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["parent"],
      }),
      deleteSchoolAdmin: builder.mutation({
        query: (school_admin_id) => ({
          url: `school-admin/delete-school-admin/${school_admin_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SchoolAdmin"], 
      }),
      deleteSchoolBranch: builder.mutation({
        query: (branch_id) => ({
          url: `school-branch/delete-branch/${branch_id} `,
          method: "DELETE",
        }),
        invalidatesTags: ["SchoolBranch"],
      }),
      deleteSchoolExpensesCategory: builder.mutation({
        query: (category_expense_id) => ({
          url: `school-expenses-category/delete-category/${category_expense_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SchoolExpensesCategory"], 
      }),
      deleteDeleteSchoolExpenses: builder.mutation({
        query: (expense_id) => ({
          url: `school-expenses/delete-expenses/${expense_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["SchoolExpenses"],
      }),
      deleteSchool: builder.mutation({
        query: (school_id) => ({
          url: `school/delete-school/${school_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["School"], 
      }),
      deleteSpecialty: builder.mutation({
        query: (specialty_id) => ({
          url: `specialty/delete-specialty/${specialty_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Specialty"],
      }),
      deleteStudentBatch: builder.mutation({
        query: (batch_id) => ({
          url: `student-batches/delete-batch/${batch_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["StudentBatch"], 
      }),
      deleteStudentResit: builder.mutation({
        query: (resit_id) => ({
          url: `student-resit/delete-resit/${resit_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["StudentResit"],
      }),
      deleteStudentTransferRequest: builder.mutation({
        query: (transfer_id) => ({
          url: `student-transfer/delete-transfer-request/${transfer_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["StudentTransferRequest"], 
      }),
      deleteStudent: builder.mutation({
        query: (student_id) => ({
          url: `student/delete-student/${student_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["StudentResit"],
      }),
      deleteTeacher: builder.mutation({
        query: (teacher_id) => ({
          url: `teacher/delete-teacher/${teacher_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Teacher"], 
      }),
      deleteTimeTable: builder.mutation({
        query: (timetable_id) => ({
          url: `time-table/delete-timetable/${timetable_id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["TimeTable"], 
      }),
      deleteAddtionalFee: builder.mutation({
         query: (additionalFeeId) => ({
           url:`additional-fees/deleteFee/${additionalFeeId}`,
           method:"DELETE"
         }),
         invalidatesTags: ["addtionalFees"]
      }),
      reverseTuitionFeeTransaction: builder.mutation({
         query: (transactionId) => ({
           url: `fee-payment/reverseTuitionFeeTransaction/${transactionId}`,
           method:"DELETE"
         }),
         invalidatesTags:["reversedTuitionFee"]
      }),
      deleteTuitionFeeTransaction: builder.mutation({
         query: (transactionId) => ({
            url:`fee-payment/deleteTransaction/${transactionId}`,
            method:"DELETE"
         }),
         invalidatesTags:["deleteTransaction"]
      }),
      reverseRegistrationFeeTransaction: builder.mutation({
         query: (transactionId) => ({
            url:`fee-payment/reverseRegistrationFeeTransaction/${transactionId}`,
            method:"DELETE"
         }),
         invalidatesTags:["tuitionfeeTransaction"]
      }),
      deleteAdditionalFeeTransaction: builder.mutation({
         query: (transactionId) => ({
           url:`additional-fees/deleteTransaction/${transactionId}`,
           method:"DELETE"
         })
      }),
      reverseAdditionalFeeTransaction: builder.mutation({
        query: (transactionId) => ({
            url:`additional-fees/reverseTransaction/${transactionId}`,
            method:"DELETE"
        })
      }),
      deleteResitFeeTransaction: builder.mutation({
         query: (transactionId) => ({
           url:`student-resit/deleteTransaction/${transactionId}`
         })
      }),
      reverseResitFeeTransaction: builder.mutation({
         query: (transactionId) => ({
           url:`student-resit/reverseTransaction/${transactionId}`
         })
      }),
      removeHeadOfSpecialty: builder.mutation({
        query: (hosId) => ({
          url: `specialty/remove-hos/${hosId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["hos"],
      }),
      removeHeadOfDepartment: builder.mutation({
         query: (hodId) => ({
           url: `department/delete-hod/${hodId}`,
           method: "DELETE",
         }),
         invalidatesTags: ["hod"],
      }),
      deleteSchoolSemester: builder.mutation({
         query: (schoolSemesterId) => ({
            url:`school-semesters/delete-school-semeter/${schoolSemesterId}`,
            method:"DELETE"
         })
      }),
      deleteExamTimetableEntry: builder.mutation({
         query: (timetableEntryId) => ({
            url:`exam-timetable/deleteTimetableEntry/${timetableEntryId}`,
            method:"DELETE"
         })
      }),
      deleteExamTimetable: builder.mutation({
         query: (examId) => ({
            url:`exam-timetable/deleteTimeTable/${examId}`,
            method:"DELETE"
         })
      }),
      deleteResitTimetable: builder.mutation({
         query: (examId) => ({
            url:`student-resit/deleteResitTimetable/${examId}`,
            method:'DELETE'
         })
      }),
      deleteStudentDropout: builder.mutation({
         query: (studentDropoutId) => ({
           url:`student/deleteStudentDropout/${studentDropoutId}`,
           method:"DELETE"
         })
      }),
      bulkDeleteSchoolAdmin: builder.mutation({
         query: (schoolAdminIds) => ({
            url: `school-admin/bulkDeleteSchoolAdmin/${schoolAdminIds}`,
             method:"DELETE"
         })
      })
  }),
});


export const {
  useDeleteCourseMutation,
  useDeleteDeleteSchoolExpensesMutation,
  useDeleteDepartmentMutation,
  useDeleteEventMutation,
  useDeleteExamGradeMutation,
  useDeleteExamMutation,
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
  useDeleteTimeTableMutation,
  useDeleteAddtionalFeeMutation,
  useReverseTuitionFeeTransactionMutation,
  useDeleteTuitionFeeTransactionMutation,
  useReverseRegistrationFeeTransactionMutation,
  useDeleteAdditionalFeeTransactionMutation,
  useDeleteResitFeeTransactionMutation,
  useReverseResitFeeTransactionMutation,
  useReverseAdditionalFeeTransactionMutation,
  useRemoveHeadOfSpecialtyMutation,
  useRemoveHeadOfDepartmentMutation,
  useDeleteSchoolSemesterMutation,
  useDeleteExamTimetableEntryMutation,
  useDeleteExamTimetableMutation,
  useDeleteResitTimetableMutation,
  useDeleteStudentDropoutMutation,
  useBulkDeleteSchoolAdminMutation
} = deleteSlice;