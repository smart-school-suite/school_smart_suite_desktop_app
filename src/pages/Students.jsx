import Navbar from "../components/Navbar";
import { useFetchStudentsQuery, useFetchStudentDetailsQuery } from "../Slices/Asynslices/fetchSlice";
import {  useState } from "react";
import { convertToReadableDate, timeSince } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Greenbutton from "../components/Buttons";
import Table from "../components/Tables";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown from "./actionButton";
import { StudentnavBarOptions } from "../componentConfigurations/navBarConfig";
import { Icon } from "@iconify/react";
function Students() {
  const actions = [
    {
     modalTitle: "Update Student",
     actionTitle: "Update",
     modalContent: Update,
    },
    {
      modalTitle:"Student Details",
      actionTitle:"Details",
      modalContent:Details
    },
    {
     modalTitle: "Delete Student",
     actionTitle: "Delete",
     modalContent: Delete,
    },
    {
     modalTitle: "Student Performance",
     actionTitle: "Peformance",
     modalContent: StudentPerformance,
    },
    {
     modalTitle: "Dismiss Student",
     actionTitle: "Dimiss",
     modalContent: Dismiss,
    },
    {
     modalTitle: "Sanction Student",
     actionTitle: "Sanction",
     modalContent: Sanction,
    },
    {
     modalTitle:"Suspend Student",
     actionTitle:"Suspend",
     modalContent:SuspendStudent,
    },
    {
     modalTitle:"Deactivate Student",
     actionTitle:"Deactivate",
     modalContent:Deactivate
    },
    {
     modalTitle: "Assign",
     actionTitle: "Assign",
     modalContent: Assign,
    }
 ]
  const cellStyle = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: "100%",
    zIndex: "-1",
  }

  const [colDefs, setColDefs] = useState([
    {
      field:"id", hide:true
    },
    {
       field: "student_name", 
       headerName:"Student Name",
      filter: true, 
      floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "level_name", 
      headerName:"Level",
      filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "specailty_name",
      headerName:"Specialty", 
      filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "guardian_name", 
      headerName:"Guardian Name",
      filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "phone_one",
      headerName:"First Reachable Number",
       filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "gender", 
      headerName:"Gender",
      filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
     { field: "student_batch",
      headerName:"Student Batch",
       filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
     { field: "Actions", 
      cellRenderer:DropdownComponent,
     },
  ]);
  const { data: students, error, isLoading } = useFetchStudentsQuery();

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar
        options={StudentnavBarOptions}
      />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Students</p>
            <h1 className="fw-bold my-0">{students.students.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <Greenbutton
              lable="create student"
              bg="green-bg"
              route="/create-student"
            />
          </div>
        </div>
      </div>
        <Table
          colDefs={colDefs}
          rowData={students.students}
        />
    </>
  );
}
export default Students;


function Update(){
  return(
    <>
      <div className="card w-100 border-none">
       <div className="my-1">
         <p className="my-0">Specialty</p>
         <input type="text" className="form-control" placeholder="Software Engineering" />
       </div>
       <div className="my-1">
         <span className="my-0">Department</span>
         <input
           type="text"
           className="form-control"
           placeholder="Department of Engineering"
         />
       </div>
       <div className="my-1">
         <span className="my-0">Level</span>
         <input
           type="text"
           className="form-control"
           placeholder="Level 400"
         />
       </div>
       <div className="my-1">
         <span className="my-0">Guardian One</span>
         <input
           type="text"
           className="form-control"
           placeholder="Select Parent"
         />
       </div>
       <div className="my-1">
         <span className="my-0">Guardian Two</span>
         <input
           type="text"
           className="form-control"
           placeholder="Select Parent"
         />
       </div>
       <div className="my-1">
         <span className="my-0">Student Batch</span>
         <input
           type="text"
           className="form-control"
           placeholder="Batch of great Archievement"
         />
       </div>
     </div>
     <div className="w-100 border-top position-relative mt-4 py-2">
       <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
          <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
            Update
          </button>
       </div>
     </div>
    </>
  )
}

function Delete({ row_id }){
  return(
    <>
      <div className="w-100">
       <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
       <p className="my-3" style={{ fontSize:"0.85rem" }}>
        <span>{row_id}</span>
         This action cannot be undone. This will Permanently delete This account and remove this account data from our servers
       </p>
       <div className="mt-4">
         <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm">
               Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white">
               Continue
            </button>
         </div>
       </div>
     </div>
    </>
  )
}

function Deactivate(){
  return(
    <>
   <div className="w-100">
       <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
       <p className="my-3" style={{ fontSize:"0.85rem" }}>
         This action cannot be undone. This will Permanently delete This account and remove this account data from our servers
       </p>
       <div className="mt-4">
         <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm">
               Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white">
               Continue
            </button>
         </div>
       </div>
     </div>
    </>
  )
}

function StudentPerformance(){
  return(
    <>
    </>
  )
}

function Dismiss(){
  return(
    <>
    <div className="w-100">
      <p className="my-0 font-size-sm gainsboro-color">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo cum, incidunt omnis id assumenda culpa a 
        perspiciatis temporibus
      </p>
      <div className="my-2">
        <span>Reason For Dismissale</span>
        <textarea className="form-control"
         placeholder="Enter Reason For Dismisale"
        ></textarea>
      </div>
      <div className="my-2">
        <span>Attach Any Document</span>
        <input type="file" className="form-control"/>
      </div>
      <div className="mt-4">
         <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm">
               Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white">
               Continue
            </button>
         </div>
       </div>
    </div>
    </>
  )
}

function Sanction(){
  return(
    <>
        <div className="w-100">
      <p className="my-0 font-size-sm gainsboro-color">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo cum, incidunt omnis id assumenda culpa a 
        perspiciatis temporibus
      </p>
      <div className="my-2">
        <span>Reason For Sanction</span>
        <textarea className="form-control"
         placeholder="Enter Reason For Dismisale"
        ></textarea>
      </div>
      <div className="my-2">
        <span></span>
        <input type="check" className="form-control"/>
      </div>
      <div className="my-2">
        <span>Attach Any Document</span>
        <input type="text" className="form-control"/>
      </div>
      <div className="mt-4">
         <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm">
               Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white">
               Continue
            </button>
         </div>
       </div>
    </div>
    </>
  )
}

function SuspendStudent(){
  return(
    <>
    </>
  )
}

function Details({ row_id }){
  const { data: student_details, error, isLoading } = useFetchStudentDetailsQuery({
      student_id:row_id
  })

  if (isLoading) {
    return <Pageloaderspinner />;
  }
   return(
    <>
          <div className="w-100">
        <div>
          <div className="card border-none pb-4 shadow-sm rounded-3 profile-section white-bg d-flex flex-column">
            <div className="top-section rounded-top-4 px-4">
              <div className="d-flex flex-row profile-picture-group z-5 justify-content-between align-items-center">
                <div className="profile-img">
                  <img src="./images/protrait-one.jpg" alt="" />
                </div>
                <div>
                  <Icon
                    icon="mdi:dots-vertical"
                    className="fs-3 pointer-cursor"
                  />
                </div>
              </div>
            </div>
            <div className="ms-2 mt-auto">
              <div className="d-block">
                <h5 className="fw-bold">{student_details.student_details[0].name}</h5>
                <div className="d-flex flex-row my-1 gainsboro-color">
                  <span>{student_details.student_details[0].specialty.specialty_name}</span>
                </div>
                <div className="d-flex flex-row gap-2 mt-2 align-items-center">
                  <span className="font-size-sm fw-medium">
                    @Gilbert.Bernhard57
                  </span>
                  <div className="divider-pill"></div>
                  <span className="font-size-sm fw-medium">
                    {student_details.student_details[0].level.name}
                  </span>
                  <div className="divider-pill"></div>
                  <span className="font-size-sm gainsboro-color">
                  {timeSince(student_details.student_details[0].last_login_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 mt-2">
        <p className="fs-6 my-2">Fee Status</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].fee_status}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Fee Payment Status
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 mt-2">
        <p className="fs-6 my-2">Personal Details</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].DOB}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Date of Birth (DOB)
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="ph:phone" />
          </button>
          <div className="border-bottom py-2 d-block" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].religion}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Religion
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="ph:phone" />
          </button>
          <div className="border-bottom py-2 d-block" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].gender}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Gender
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 mt-2">
        <p className="fs-6 my-2">Contact Info</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].email}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Email
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="ph:phone" />
          </button>
          <div className="border-bottom py-2 d-block" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].phone_one}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Contact one
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="ph:phone" />
          </button>
          <div className="border-bottom py-2 d-block" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].phone_two}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Contact two
            </p>
          </div>
        </div>
      </div>

      <div className="academic-details">
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Academic Details</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="icon-park-outline:address-book" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].specialty.specialty_name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Specialty
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="icon-park-outline:address-book" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].department.department_name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Department
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="icon-park-outline:address-book" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].level.name}, {student_details.student_details[0].level.level}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Level
            </p>
          </div>
        </div>
      </div>

      <div className="w-100 my-2">
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="icon-park-outline:address-book" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].student_batch.name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Student Batch
            </p>
          </div>
        </div>
      </div>
       
      <div className="w-100 my-2">
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="icon-park-outline:address-book" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{convertToReadableDate(student_details.student_details[0].student_batch.graduation_date)}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Latest Graduation Date
            </p>
          </div>
        </div>
      </div>
      </div>

      <div className="parent-details">
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Guardian/Parent Details</p>
        <p className="font-size-sm gainsboro-color my-2">Guardian One</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Name of Guardian One
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.email}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Email
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.address}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.phone_one}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.phone_two}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.relationship_to_student}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Relationship To Student
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_one.preferred_contact_method}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Preferred Contact Method
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Guardian/Parent Details</p>
        <p className="font-size-sm gainsboro-color my-2">Guardian Two</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Name of Guardian One
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.email}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Email
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.address}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.phone_one}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.phone_two}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Address Guardian One
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.relationship_to_student}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Relationship To Student
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{student_details.student_details[0].guardian_two.preferred_contact_method}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Preferred Contact Method
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
   )
}

function Assign(){
   return(
    <>
    </>
   )
}

export function DropdownComponent(props) {
  const { id } = props.data; 
  const actions = [
     {
      modalTitle: "Update Student",
      actionTitle: "Update",
      modalContent: Update,
     },
     {
       modalTitle:"Student Details",
       actionTitle:"Details",
       modalContent:Details
     },
     {
      modalTitle: "Delete Student",
      actionTitle: "Delete",
      modalContent: Delete,
     },
     {
      modalTitle: "Student Performance",
      actionTitle: "Peformance",
      modalContent: StudentPerformance,
     },
     {
      modalTitle: "Dismiss Student",
      actionTitle: "Dimiss",
      modalContent: Dismiss,
     },
     {
      modalTitle: "Sanction Student",
      actionTitle: "Sanction",
      modalContent: Sanction,
     },
     {
      modalTitle:"Suspend Student",
      actionTitle:"Suspend",
      modalContent:SuspendStudent,
     },
     {
      modalTitle:"Deactivate Student",
      actionTitle:"Deactivate",
      modalContent:Deactivate
     },
     {
      modalTitle: "Assign",
      actionTitle: "Assign",
      modalContent: Assign,
     }
  ]
  return (
    <>
     <ActionButtonDropdown actions={actions} row_id={id}/>
    </>
  );
}
