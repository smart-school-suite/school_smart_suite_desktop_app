import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/layout";
import Dashboard from "../pages/Dashboard";
import Schooladmin from "../pages/Schooladmin";
import Exams from "../pages/Exams";
import Students from "../pages/Students";
import Examresits from "../pages/Examsresit";
import Scores from "../pages/Scores";
import Timetable from "../pages/Timetable";
import Schoolexpenses from "../pages/Schoolexpenses";
import Transferredstudents from "../pages/Transferredstudents";
import Transferrequest from "../pages/Transferrequest";
import Events from "../pages/Events";
import Messages from "../pages/Messages";
import Annoucements from "../pages/Annoucements";
import Emails from "../pages/Emails";
import Customersupport from "../pages/Customersupport";
import Departments from "../pages/Departments";
import Specialties from "../pages/Specialties";
import Teachers from "../pages/Teachers";
import Courses from "../pages/Courses";
import Account from "../pages/settings/Account";
import Display from "../pages/settings/Display";
import Generalsettings from "../pages/settings/Generalsettings";
import New from "../pages/settings/New";
import Profile from "../pages/settings/Profile";
import Security from "../pages/settings/Security";
import Help from "../pages/settings/Help";
function Links() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                   <Route path="/settings/account" element={<Account />}></Route>
                   <Route path="/settings/general-settings" element={<Generalsettings />}></Route>
                   <Route path="/settings/display" element={<Display />}></Route>
                   <Route path="/settings/updates" element={<New />}></Route>
                   <Route path="/settings/profile" element={<Profile />}></Route>
                   <Route path="/settings/security" element={<Security />}></Route>
                   <Route path="/settings/help" element={<Help />}></Route>
                    <Route path="/customer-support" element={<Customersupport />}></Route>
                    <Route index element={<Dashboard />} />
                    <Route path="/school-admins" element={<Schooladmin />}></Route>
                    <Route path="/exams" element={<Exams />}></Route>
                    <Route path="/students" element={<Students />}></Route>
                    <Route path="/exam-resits" element={<Examresits />}></Route>
                    <Route path="/scores" element={<Scores />}></Route>
                    <Route path="/time-table" element={<Timetable />}></Route>
                    <Route path="/school-expenses" element={<Schoolexpenses />}></Route>
                    <Route path="/transfer-request" element={<Transferrequest />}></Route>
                    <Route path="/transferred-students" element={<Transferredstudents />}></Route>
                    <Route path="/events" element={<Events />}></Route>
                    <Route path="/emails" element={<Emails />}></Route>
                    <Route path="/annoucements" element={<Annoucements />}></Route>
                    <Route path="/messages" element={<Messages />}></Route>
                    <Route path="/departments" element={<Departments />}></Route>
                    <Route path="/specialties" element={<Specialties />}></Route>
                    <Route path="/teachers" element={<Teachers />}></Route>
                    <Route path="/courses" element={<Courses />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Links;