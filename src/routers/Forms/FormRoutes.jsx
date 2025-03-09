import React from "react";
import { Route } from "react-router-dom";
const CreateStudent = React.lazy(() => import("../../pages/forms/Createstudent"));
const CreateParent = React.lazy(() => import("../../pages/forms/Createparent"));
const CreateTimetable = React.lazy(() => import("../../pages/forms/Createtimetable"));
const CreateTeacher = React.lazy(() => import("../../pages/forms/Createteacher"));
const CreateExamTimetable = React.lazy(() => import("../../pages/forms/CreateExamTimeTable"));
const CreateStudentScores = React.lazy(() => import("../../pages/forms/Createstudentscores"));
const CreateSchoolAdmin  = React.lazy(() => import("../../pages/forms/Createschooladmin"));

const FormRoutes = [
  <Route  key="createStudent" path="/create-student" element={<CreateStudent />} />,
  <Route  key="createParent" path="/create-parent" element={<CreateParent />}/>,
  <Route key="createTimtetable" path="/create-timetable/:semester_id/:specailty_id" element={<CreateTimetable />}/>,
  <Route key="createTeacher" path="/create-teacher" element={<CreateTeacher />}/>,
  <Route key="createExamtimetable"  path="/create-examtimtable/:semester_id/:exam_id" element={<CreateExamTimetable />}/>,
  <Route  key="createStudentScores" path="/create-scores/:exam_id/:student_id" element={<CreateStudentScores />}/>,
  <Route  key="createSchoolAdmin" path="/create-school-admin" element={<CreateSchoolAdmin />}/>
];
export default FormRoutes;


