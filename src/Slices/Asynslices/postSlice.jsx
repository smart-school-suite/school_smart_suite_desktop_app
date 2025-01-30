import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/",
  prepareHeaders: (headers) => {
    const schoolBranchId = localStorage.getItem('SCHOOL_BRANCH_KEY');
    const token = localStorage.getItem("auth_token");
    if (schoolBranchId) {
      headers.set("SCHOOL_BRANCH_KEY", schoolBranchId);
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

export const postSlice = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["student", "teachers", "schooladmin"],
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (newCourse) => ({
        url: "api/course/create-course",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["course"], 
    }), 
    addDepartment: builder.mutation({
      query: (newDeparment) => ({
        url: "api/department/create-department",
        method: "POST",
        body: newDeparment,
      }),
      invalidatesTags: ["department"], 
    }),
    addEvent: builder.mutation({
      query: (newEvent) => ({
        url: "api/event/create-event",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["event"], 
    }),
    addTimetable: builder.mutation({
      query: (newTimetable) => ({
        url: "api/exam-timetable/create-timetable",
        method: "POST",
        body: newTimetable,
      }),
      invalidatesTags: ["timetable"], 
    }),
    addExam: builder.mutation({
      query: (newExam) => ({
        url: "api/exams/create-exam",
        method: "POST",
        body: newExam,
      }),
      invalidatesTags: ["exams"], 
    }),
    addFeePaymentTransaction: builder.mutation({
      query: (newPayFees) => ({
        url: "api/fee-payment/pay-fees",
        method: "POST",
        body: newPayFees,
      }),
      invalidatesTags: ["feepayment"], 
    }),
    addGrade: builder.mutation({
      query: (newGrade) => ({
        url: "api/grades/create-grade",
        method: "POST",
        body: newGrade,
      }),
      invalidatesTags: ["grade"], 
    }),
    addStudentScore: builder.mutation({
      query: (newStudentScore) => ({
        url: "api/marks/add-student-mark",
        method: "POST",
        body: newStudentScore,
      }),
      invalidatesTags: ["score"], 
    }),
    addParent: builder.mutation({
      query: (newParent) => ({
        url: "api/parent/create-parent",
        method: "POST",
        body: newParent,
      }),
      invalidatesTags: ["parent"], 
    }),
    addSchoolAdmin: builder.mutation({
      query: (newSchoolAdmin) => ({
        url: "api/school-admin/create-school-admin",
        method: "POST",
        body: newSchoolAdmin,
      }),
      invalidatesTags: ["schoolAdmin"], 
    }),
    addSchoolBranch: builder.mutation({
      query: (newSchoolBranch) => ({
        url: "api/school-branch/register",
        method: "POST",
        body: newSchoolBranch,
      }),
      invalidatesTags: ["schoolBranch"], 
    }),
    addExpensesCategory: builder.mutation({
      query: (newExpensesCategory) => ({
        url: "api/school-expenses-category/create-category",
        method: "POST",
        body: newExpensesCategory,
      }),
      invalidatesTags: ["expensesCategory"], 
    }),
    addSchoolExpenses: builder.mutation({
      query: (newSchoolExpenses) => ({
        url: "api/school-expenses/create-expenses",
        method: "POST",
        body: newSchoolExpenses,
      }),
      invalidatesTags: ["schoolExpenses"], 
    }),
    addSchool: builder.mutation({
      query: (newSchool) => ({
        url: "api/school/register",
        method: "POST",
        body: newSchool,
      }),
      invalidatesTags: ["school"], 
    }),
    addSpecialty: builder.mutation({
      query: (newSpecialty) => ({
        url: "api/specialty/create-specialty",
        method: "POST",
        body: newSpecialty,
      }),
      invalidatesTags: ["specialty"], 
    }),
    addStudentBatch: builder.mutation({
      query: (newStudentBatch) => ({
        url: "api/student-batches/create-batch",
        method: "POST",
        body: newStudentBatch,
      }),
      invalidatesTags: ["studentBatch"], 
    }),
    addResitTimetable: builder.mutation({
      query: (newResitTimetable) => ({
        url: "api/student-resit/resit-timetable",
        method: "POST",
        body: newResitTimetable,
      }),
      invalidatesTags: ["resitTimeTable"], 
    }),
    promoteStudent: builder.mutation({
      query: (newStudentPromotion) => ({
        url: "api/student/promote-student",
        method: "POST",
        body: newStudentPromotion,
      }),
      invalidatesTags: ["studentPromotion"], 
    }),
    addTimeTable: builder.mutation({
      query: (newTimeTable) => ({
        url: "api/time-table/create-timetable",
        method: "POST",
        body: newTimeTable,
      }),
      invalidatesTags: ["specialtyTimeTable"], 
    }),
    addTeacher: builder.mutation({
      query: (newTeacher) => ({
        url: "api/teacher/create-teacher",
        method: "POST",
        body: newTeacher,
      }),
      invalidatesTags: ["teacher"], 
    }),
    addStudent: builder.mutation({
        query: (newStudent) => ({
            url:"api/student/create-student",
            method:"POST",
            body:newStudent
        }),
        invalidatesTags: ["student"],   
    }),
    addExamTimetable: builder.mutation({
       query: (newExamTimetable) => ({
           url:"api/exam-timetable/create-timetable",
           method:"POST",
           body:newExamTimetable         
       }),
       invalidatesTags: ['examtimetable']
    })
  }),
});

export const {
  useAddCourseMutation,
  useAddDepartmentMutation,
  useAddEventMutation,
  useAddExamMutation,
  useAddExpensesCategoryMutation,
  useAddFeePaymentTransactionMutation,
  useAddGradeMutation,
  useAddParentMutation,
  useAddResitTimetableMutation,
  useAddSchoolAdminMutation,
  useAddSchoolBranchMutation,
  useAddSchoolExpensesMutation,
  useAddSchoolMutation,
  useAddSpecialtyMutation,
  useAddStudentBatchMutation,
  useAddStudentScoreMutation,
  useAddTeacherMutation,
  useAddTimeTableMutation,
  usePromoteStudentMutation,
  useAddStudentMutation,
  useAddExamTimetableMutation
} = postSlice;