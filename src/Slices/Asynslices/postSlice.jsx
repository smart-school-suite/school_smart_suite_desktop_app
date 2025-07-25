import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";

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

export const postSlice = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["student", "teachers", "schooladmin"],
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (newCourse) => ({
        url: "course/create-course",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["course"],
    }),
    addDepartment: builder.mutation({
      query: (newDeparment) => ({
        url: "department",
        method: "POST",
        body: newDeparment,
      }),
      invalidatesTags: ["department"],
    }),
    addEvent: builder.mutation({
      query: (newEvent) => ({
        url: "event/create-event",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["event"],
    }),
    addExam: builder.mutation({
      query: (newExam) => ({
        url: "exams/create-exam",
        method: "POST",
        body: newExam,
      }),
      invalidatesTags: ["exams"],
    }),
    payTuitionFee: builder.mutation({
      query: (newPayFees) => ({
        url: "fee-payment/pay-fees",
        method: "POST",
        body: newPayFees,
      }),
      invalidatesTags: ["feepayment"],
    }),
    addGrade: builder.mutation({
      query: (newGrade) => ({
        url: "grades/create-grade",
        method: "POST",
        body: newGrade,
      }),
      invalidatesTags: ["grade"],
    }),
    addStudentScore: builder.mutation({
      query: (newStudentScore) => ({
        url: "marks/add-student-mark",
        method: "POST",
        body: newStudentScore,
      }),
      invalidatesTags: ["score"],
    }),
    addParent: builder.mutation({
      query: (newParent) => ({
        url: "parent/create-parent",
        method: "POST",
        body: newParent,
      }),
      invalidatesTags: ["parent"],
    }),
    addSchoolAdmin: builder.mutation({
      query: (newSchoolAdmin) => ({
        url: "school-admin/create-school-admin",
        method: "POST",
        body: newSchoolAdmin,
      }),
      invalidatesTags: ["schoolAdmin"],
    }),
    addSchoolBranch: builder.mutation({
      query: (newSchoolBranch) => ({
        url: "school-branch/register",
        method: "POST",
        body: newSchoolBranch,
      }),
      invalidatesTags: ["schoolBranch"],
    }),
    addExpensesCategory: builder.mutation({
      query: (newExpensesCategory) => ({
        url: "school-expenses-category/create-category",
        method: "POST",
        body: newExpensesCategory,
      }),
      invalidatesTags: ["expensesCategory"],
    }),
    addSchoolExpenses: builder.mutation({
      query: (newSchoolExpenses) => ({
        url: "school-expenses/create-expenses",
        method: "POST",
        body: newSchoolExpenses,
      }),
      invalidatesTags: ["schoolExpenses"],
    }),
    addSchool: builder.mutation({
      query: (newSchool) => ({
        url: "school/register",
        method: "POST",
        body: newSchool,
      }),
      invalidatesTags: ["school"],
    }),
    addSpecialty: builder.mutation({
      query: (newSpecialty) => ({
        url: "specialty",
        method: "POST",
        body: newSpecialty,
      }),
      invalidatesTags: ["specialty"],
    }),
    addStudentBatch: builder.mutation({
      query: (newStudentBatch) => ({
        url: "student-batches/create-batch",
        method: "POST",
        body: newStudentBatch,
      }),
      invalidatesTags: ["studentBatch"],
    }),
    addResitTimetable: builder.mutation({
      query: (newResitTimetable) => ({
        url: "student-resit/resit-timetable",
        method: "POST",
        body: newResitTimetable,
      }),
      invalidatesTags: ["resitTimeTable"],
    }),
    promoteStudent: builder.mutation({
      query: (newStudentPromotion) => ({
        url: "student/promote-student",
        method: "POST",
        body: newStudentPromotion,
      }),
      invalidatesTags: ["studentPromotion"],
    }),
    createTimetable: builder.mutation({
      query: ({ scheduleEntries, semesterId }) => ({
        url: `time-table/createTimetable/${semesterId}`,
        method: "POST",
        body: scheduleEntries,
      }),
      invalidatesTags: ["specialtyTimeTable"],
    }),
    createTimetableByAvialability: builder.mutation({
        query: ({ scheduleEntries, semesterId }) => ({
          url: `time-table/createTimetableByAvailability/${semesterId}`,
          method:"POST",
          body:scheduleEntries 
        }),
        invalidatesTags:["createTimetableByAvialability"]
    }),
    addTeacher: builder.mutation({
      query: (newTeacher) => ({
        url: "teacher/create-teacher",
        method: "POST",
        body: newTeacher,
      }),
      invalidatesTags: ["teacher"],
    }),
    addStudent: builder.mutation({
      query: (newStudent) => ({
        url: "student/create-student",
        method: "POST",
        body: newStudent,
      }),
      invalidatesTags: ["student"],
    }),
    addExamTimetable: builder.mutation({
      query: ({ entries, examId }) => ({
        url: `exam-timetable/create-timetable/${examId}`,
        method: "POST",
        body: entries,
      }),
      invalidatesTags: ["examtimetable"],
    }),
    assignPermission: builder.mutation({
      query: ({ schoolAdminId, permissions }) => ({
        url: `permissions/grant-schoolAdmin-permissions/${schoolAdminId}`,
        method: "POST",
        body: { permissions },
      }),
      invalidatesTags: ["permissions"],
    }),
    assignRole: builder.mutation({
      query: ({ schoolAdminId, roles }) => ({
        url: `roles/assign-role/${schoolAdminId}`,
        method: "POST",
        body: { roles },
      }),
    }),
    revokePermissions: builder.mutation({
      query: ({ schoolAdminId, permissions }) => ({
        url: `permissions/revoke-schoolAdmin-permissions/${schoolAdminId}`,
        method: "POST",
        body: { permissions },
      }),
    }),
    payAdditionalFees: builder.mutation({
      query: (additionalFees) => ({
        url: "additional-fees/payFee",
        method: "POST",
        body: additionalFees,
      }),
    }),
    payRegistrationFees: builder.mutation({
      query: (registrationFees) => ({
        url: "fee-payment/payRegistrationFee",
        method: "POST",
        body: registrationFees,
      }),
    }),
    payResitFee: builder.mutation({
      query: (resitFee) => ({
        url: "student-resit/pay-for-resit",
        method: "POST",
        body: resitFee,
      }),
    }),
    createElection: builder.mutation({
      query: (election) => ({
        url: "elections/create-election",
        method: "POST",
        body: election,
      }),
    }),
    createElectionRole: builder.mutation({
      query: (electionRole) => ({
        url: "election-roles/create-role",
        method: "POST",
        body: electionRole,
      }),
    }),
    deactiveSchoolAdminAccount: builder.mutation({
      query: ({ schoolAdminId }) => ({
        url: `school-admin/deactivateAccount/${schoolAdminId}`,
        method: "POST",
        body: {},
      }),
    }),
    activateSchoolAdminAccount: builder.mutation({
      query: ({ schoolAdminId }) => ({
        url: `school-admin/activateAccount/${schoolAdminId}`,
        method: "POST",
        body: {},
      }),
    }),
    assignHod: builder.mutation({
      query: (headOfDepartment) => ({
        url: "department/assign-hod",
        method: "POST",
        body: headOfDepartment,
      }),
    }),
    assignHos: builder.mutation({
      query: (headOfSpecialty) => ({
        url: "specialty/assign-hos",
        method: "POST",
        body: headOfSpecialty,
      }),
    }),
    addTeacherSpecialtyPreference: builder.mutation({
      query: ({ specialtyPreference, teacherId }) => ({
        url: `teacher/add-specailty-preference/${teacherId}`,
        method: "POST",
        body: { specailties_preference: specialtyPreference },
      }),
    }),
    deactivateDepartment: builder.mutation({
      query: ({ departmentId }) => ({
        url: `department/deactivateDepartment/${departmentId}`,
        method: "POST",
        body: {},
      }),
    }),
    activateDepartment: builder.mutation({
      query: ({ departmentId }) => ({
        url: `department/activateDepartment/${departmentId}`,
        method: "POST",
        body: {},
      }),
    }),
    deactivateSpecialty: builder.mutation({
      query: ({ specialtyId }) => ({
        url: `specialty/deactivateSpecialty/${specialtyId}`,
        method: "POST",
        body: {},
      }),
    }),
    activateSpecialty: builder.mutation({
      query: ({ specialtyId }) => ({
        url: `specialty/activateSpecialty/${specialtyId}`,
        method: "POST",
        body: {},
      }),
    }),
    activateTeacher: builder.mutation({
       query: ({ teacherId }) => ({
           url:`teacher/deactivateAccount/${teacherId}`,
           method:"POST",
           body:{}
       })
    }),
    deactivateTeacher: builder.mutation({
       query: ({ teacherId }) => ({
         url:`teacher/deactivateAccount/${teacherId}`,
         method:"POST",
         body:{}
       })
    }),
    activateCourse: builder.mutation({
       query: ({ courseId }) => ({
          url:`course/activateCourse/${courseId}`,
          method:"POST",
          body:{}
       })
    }),
    deactivateCourse: builder.mutation({
       query: ({ courseId }) => ({
          url:`course/deactivateCourse/${courseId}`,
          method:"POST",
          body:{}
       })
    }),
    createSchoolSemester: builder.mutation({
       query: (schoolSemester) => ({ 
          url:"school-semesters/create-school-semester",
          method:"POST",
          body:schoolSemester
       }),
       invalidatesTags: ["createSchoolSemester"],
    }),
    addExamGrading: builder.mutation({
       query: ({examId, gradesConfigId}) => ({
         url:`exams/addExamGrading/${examId}/${gradesConfigId}`,
         method:"POST",
         body:{}
       })
    }),
    configureByOtherGrade: builder.mutation({
       query: ({ configId, targetConfigId }) => ({
         url:`grades/createGradeByOtherConfig/${configId}/${targetConfigId}`,
         method:"POST",
         body:{}
       }),
       invalidatesTags: ["configureByOtherGrades"],
    }),
    createResitTimetable: builder.mutation({
       query: ({examId, entries}) => ({
          url:`student-resit/createResitTimetable/${examId}`,
          method:"POST",
          body:entries
       })
    }),
    activateStudentAccount: builder.mutation({
       query: (studentId) => ({
         url:`student/activateAccount/${studentId}`,
         method:'POST',
         body:{}
       })
    }),
    deactivateStudentAccount: builder.mutation({
       query: (studentId) => ({
          url:`student/deactivateAccount/${studentId}`,
          method:'POST',
          body:{}
       })
    }),
    markStudentAsDropOut: builder.mutation({
       query: ({studentId, formData}) => ({
          url:`student/markStudentAsDropout/${studentId}`,
          method:'POST',
          body:formData
       })
    }),
    reinstateDropoutStudent: builder.mutation({
       query: (studentDropoutId) => ({
          url:`student/reinstateDropoutStudent/${studentDropoutId}`,
          method:"POST",
          body:{}
       })
    }),
    deactivateStudentBatch: builder.mutation({
       query: (batchId) => ({
          url:`student-batches/deactivateStudentBatch/${batchId}`,
          method:"POST",
          boyd:{}
       })
    }),
    activateStudentBatch: builder.mutation({
       query: (batchId) => ({
          url:`student-batches/activateStudentBatch/${batchId}`,
          method:"POST",
          body:{}
       })
    }),
    assignGraduationDatesByBatch: builder.mutation({
       query: (graduationDates) => ({
           url:`student-batches/assignGraduationDatesByBatch`,
           method:"POST",
           body:graduationDates
       })
    }),
    bulkDeactivateSchoolAdmin: builder.mutation({
       query: (schoolAdminIds) =>  ({
          url:`school-admin/bulkDeactivateSchoolAdmin/${schoolAdminIds} `,
          method:"POST",
          body:{}
       })
    }),
    bulkActivateSchoolAdmin: builder.mutation({
        query: (schoolAdminIds) => ({
           url:`school-admin/bulkActivateSchoolAdmin/${schoolAdminIds}`,
           method:'POST',
           body:{}
        })
    }),
    createAnnouncementCategory: builder.mutation({
       query: (newCategory) => ({
          url:"announcement-category",
          method:"POST",
          body:newCategory
       })
    })
  }),
});

export const {
  useAddCourseMutation,
  useAddDepartmentMutation,
  useAddEventMutation,
  useAddExamMutation,
  useAddExpensesCategoryMutation,
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
  usePromoteStudentMutation,
  useAddStudentMutation,
  useAddExamTimetableMutation,
  useAssignPermissionMutation,
  useAssignRoleMutation,
  useRevokePermissionsMutation,
  usePayAdditionalFeesMutation,
  usePayRegistrationFeesMutation,
  usePayTuitionFeeMutation,
  usePayResitFeeMutation,
  useCreateElectionMutation,
  useCreateElectionRoleMutation,
  useDeactiveSchoolAdminAccountMutation,
  useActivateSchoolAdminAccountMutation,
  useAssignHodMutation,
  useAssignHosMutation,
  useAddTeacherSpecialtyPreferenceMutation,
  useDeactivateDepartmentMutation,
  useActivateDepartmentMutation,
  useActivateSpecialtyMutation,
  useDeactivateSpecialtyMutation,
  useActivateTeacherMutation,
  useDeactivateTeacherMutation,
  useActivateCourseMutation,
  useDeactivateCourseMutation,
  useCreateSchoolSemesterMutation,
  useCreateTimetableByAvialabilityMutation,
  useCreateTimetableMutation,
  useAddExamGradingMutation,
  useConfigureByOtherGradeMutation,
  useCreateResitTimetableMutation,
  useActivateStudentAccountMutation,
  useDeactivateStudentAccountMutation,
  useMarkStudentAsDropOutMutation,
  useReinstateDropoutStudentMutation,
  useActivateStudentBatchMutation,
  useDeactivateStudentBatchMutation,
  useAssignGraduationDatesByBatchMutation,
  useBulkActivateSchoolAdminMutation,
  useBulkDeactivateSchoolAdminMutation,
  useCreateAnnouncementCategoryMutation
} = postSlice;
