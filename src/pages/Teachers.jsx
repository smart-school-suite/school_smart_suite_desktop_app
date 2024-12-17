import Navbar from "../components/Navbar";
import { useFetchTeacherDetailsQuery, useFetchTeachersQuery } from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import CleanArrayData, { renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Greenbutton from "../components/Buttons";
import Table from "../components/Tables";
import { Icon } from "@iconify/react";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown from "./actionButton";
function Teachers() {
  const navBarOptions = {
    route_data: [
      {
        lable: "Teachers",
        icon: "hugeicons:teacher",
        route: "/teachers",
      },
      {
        lable: "Academic Analysis",
        icon: "akar-icons:statistic-up",
        route: "/academic-analysis",
      },
      {
        lable: "Financial Analysis",
        route: "/financial-analysis",
        icon: "fluent-mdl2:financial",
      },
    ],
  };
  const cellStyle = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: "100%",
    zIndex: "-1",
  };
  const [colDefs, setColDefs] = useState([
    {
      field:"id",
      hide:true
    },
    {
      field: "Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Employment Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Highest qualification",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Field of study",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Religion",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Years experience",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Salary",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    { field: "Action", cellRenderer: DropdownComponent },
  ]);
  const { data: teacher_data, error, isLoading } = useFetchTeachersQuery();
  const filter_array_keys = [
    "id",
    "name",
    "email",
    "employment_status",
    "hire_date",
    "highest_qualification",
    "field_of_study",
    "religion",
    "years_experience",
    "salary",
  ];
  const renameMapping = {
    id: "id",
    name: "Name",
    employment_status: "Employment Status",
    hire_date: "Hire Date",
    highest_qualification: "Highest qualification",
    field_of_study: "Field of study",
    religion: "Religion",
    years_experience: "Years experience",
    salary: "Salary",
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={navBarOptions}></Navbar>
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number Teachers</p>
            <h1 className="fw-bold my-0">{teacher_data.teacher_data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <Greenbutton
              lable="Add Teacher"
              bg="green-bg"
              route="/create-teacher"
            />
          </div>
        </div>
        <div>
          {teacher_data?.teacher_data?.length > 0 ? ( 
            <Table
              colDefs={colDefs}
              rowData={renameKeys(
                CleanArrayData(teacher_data.teacher_data, filter_array_keys),
                renameMapping
              )}
            />
          ) : (
            <div className="alert alert-warning">
              Oops, looks like you don't have any teachers.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Teachers;

function Update() {
  return (
    <>
      <div className="card w-100 border-none">
        <div className="my-2">
          <p className="my-0">Hire Date</p>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span className="my-0">Employment Status</span>
          <input type="text" className="form-control" placeholder="Part Time" />
        </div>
        <div className="my-2">
          <span className="my-0">Highest qualification</span>
          <input
            type="date"
            className="form-control"
            placeholder="Bachelors Degree"
          />
        </div>
        <div className="my-2">
          <span className="my-0">Field of study</span>
          <input
            type="text"
            className="form-control"
            placeholder="Software Engineering"
          />
        </div>
        <div className="my-2">
          <span className="my-0">Years experience</span>
          <input type="number" className="form-control" placeholder="5 years" />
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
  );
}

function Details({ row_id }) {
  const { data:teacher_details, isLoading, error } = useFetchTeacherDetailsQuery({
     teacher_id:row_id
  });

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100">
        <div>
          <div className="card border-none pb-4 shadow-sm rounded-3 profile-section white-bg d-flex flex-column">
            <div className="top-section rounded-top-4 px-4">
              <div className="d-flex flex-row profile-picture-group z-5 justify-content-between align-items-center">
                <div className="profile-img">
                  <img src="./images/portrait-six.jpg" alt="" />
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
                <h5 className="fw-bold">{teacher_details.teacher_details[0].name}</h5>
                <div className="d-flex flex-row my-1 gainsboro-color">
                  <span>Yaounde, Cameroon</span>
                </div>
                <div className="d-flex flex-row gap-2 mt-2 align-items-center">
                  <span className="font-size-sm fw-medium">
                    @Gilbert.Bernhard57
                  </span>
                  <div className="divider-pill"></div>
                  <span className="font-size-sm fw-medium">
                   { teacher_details.teacher_details[0].field_of_study }
                  </span>
                  <div className="divider-pill"></div>
                  <span className="font-size-sm gainsboro-color">
                    {teacher_details.teacher_details[0].employment_status}
                  </span>
                </div>
              </div>
            </div>
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
            <p className="my-0">{teacher_details.teacher_details[0].email}</p>
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
            <p className="my-0">{teacher_details.teacher_details[0].phone_one}</p>
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
            <p className="my-0">{teacher_details.teacher_details[0].phone_two}</p>
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
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Address</p>
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
            <p className="my-0">{teacher_details.teacher_details[0].address}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Home Address
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Qualifacations</p>
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
            <p className="my-0">{teacher_details.teacher_details[0].highest_qualification}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Highest School Certificate
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
            <Icon icon="fluent-mdl2:calendar-year" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{teacher_details.teacher_details[0].field_of_study}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Field Of Study
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
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
            <Icon icon="tabler:gender-male" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{teacher_details.teacher_details[0].cultural_background}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Cultural Background
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
            <Icon icon="solar:calendar-date-linear" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{teacher_details.teacher_details[0].religion}</p>
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
            <Icon icon="solar:calendar-date-linear" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{teacher_details.teacher_details[0].date_of_birth}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Date of Birth
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Work Details</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="tabler:gender-male" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{teacher_details.teacher_details[0].employment_status}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Employment Status
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
            <Icon icon="solar:calendar-date-linear" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{teacher_details.teacher_details[0].hire_date}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Hire Date
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
            <Icon icon="solar:calendar-date-linear" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{Number(teacher_details.teacher_details[0].salary)} $</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Salary
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
            <Icon icon="solar:calendar-date-linear" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{teacher_details.teacher_details[0].highest_qualification}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Qualification
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
            <Icon icon="solar:calendar-date-linear" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{Number(teacher_details.teacher_details[0].years_experience)}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Years of Experience
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Emergency Contact Details</p>
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
            <p className="my-0">{teacher_details.teacher_details[0].emergency_contact_name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Emergency Contact Name
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
            <Icon icon="fluent-mdl2:calendar-year" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">{teacher_details.teacher_details[0].emergency_contact_phone}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
             Emergency Contact Phone
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function Delete() {
  return (
    <>
      <div className="w-100">
        <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          This action cannot be undone. This will Permanently delete This
          account and remove this account data from our servers
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
  );
}

function Promote() {
  return (
    <>
      <div>
        <p className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim natus
          unde, libero
        </p>
        <div className="my-2">
          <div className="d-flex w-100 flex-row  gap-2 align-items-center">
            <div className="w-50">
              <span>Current Position</span>
              <input
                type="text"
                className="form-control"
                placeholder="school buser"
              />
            </div>
            <div className="w-50">
              <span>New Position</span>
              <input
                type="text"
                className="form-control"
                placeholder="school buser"
              />
            </div>
          </div>
          <div className="my-2">
            <div className="w-100">
              <span>New Salary</span>
              <input
                type="number"
                className="form-control"
                placeholder="Enter new salary"
              />
            </div>
          </div>
          <div className="my-2">
            <div className="w-100">
              <span>Select New Role</span>
              <input
                type="text"
                className="form-control"
                placeholder="Manager"
              />
            </div>
          </div>
          <div className="my-2">
            <div className="w-100">
              <span>
                Congratulatory Message
                <span className="font-size-sm gainsboro-color">Optional</span>
              </span>
              <div className="w-100">
                <textarea
                  placeholder="Enter congratulatory message"
                  className="form-control"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 border-top position-relative mt-4 py-2">
        <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
          <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
            Promote
          </button>
        </div>
      </div>
    </>
  );
}

function Suspend() {
  return (
    <>
      <div className="w-100">
        <p className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim natus
          unde, libero natus unde, libero
        </p>
        <div className="my-2">
          <span>Start Date</span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>End Date</span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>Reason</span>
          <textarea
            placeholder="Enter the reason"
            className="form-control"
          ></textarea>
        </div>
        <div className="my-2">
          <div className="w-100 border-top position-relative mt-4 py-2">
            <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
              <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
                Suspend Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Deactivate() {
  return (
    <>
      <div className="w-100">
        <p className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim natus
          unde, libero natus unde, libero
        </p>
        <div className="my-2">
          <span>Start Date</span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>End Date</span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>Reason</span>
          <textarea
            placeholder="Enter the reason"
            className="form-control"
          ></textarea>
        </div>
        <div className="my-2">
          <div className="w-100 border-top position-relative mt-4 py-2">
            <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
              <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function HolidayGrant() {
  return (
    <>
      <div className="w-100">
        <p className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim natus
          unde, libero natus unde, libero
        </p>
        <div className="my-2">
          <span>Start Date</span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>
            End Date
            <span className="gainsboro-color font-size-sm">
              
              Expected Return Date
            </span>
          </span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>Notes</span>
          <textarea
            placeholder="Enter the reason"
            className="form-control"
          ></textarea>
        </div>
        <div className="my-2">
          <div className="w-100 border-top position-relative mt-4 py-2">
            <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
              <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
                Grant Holiday
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Lift() {
  return (
    <>
      <div className="w-100">
        <p className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim natus
          unde, libero natus unde, libero
        </p>
        <div className="my-2">
          <span>Start Date</span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>
            End Date
            <span className="gainsboro-color">Expected Return Date</span>
          </span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>Reason</span>
          <textarea
            placeholder="Enter the reason"
            className="form-control"
          ></textarea>
        </div>
        <div className="my-2">
          <div className="w-100 border-top position-relative mt-4 py-2">
            <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
              <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
                Grant Lift
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export function DropdownComponent(props) {
  const { id } = props.data; 
  const actions = [
    {
      modalTitle: "Update Teacher",
      actionTitle: "Update",
      modalContent: Update,
    },
    {
      modalTitle: "Teacher Details",
      actionTitle: "Details",
      modalContent: Details,
    },
    {
      modalTitle: "Delete Teacher",
      actionTitle: "Delete",
      modalContent: Delete,
    },
    {
      modalTitle: "Promote Teacher",
      actionTitle: "Promote",
      modalContent: Promote,
    },
    {
      modalTitle: "Suspend Teacher",
      actionTitle: "suspend",
      modalContent: Suspend,
    },
    {
      modalTitle: "Deactivate Teacher Account",
      actionTitle: "Deactivate",
      modalContent: Deactivate,
    },
    {
      modalTitle: "Grant Teacher Holiday",
      actionTitle: "Grant Holiday",
      modalContent: HolidayGrant,
    },
    {
      modalTitle: "Grant Teacher Lift",
      actionTitle: "Grant Lift",
      modalContent: Lift,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id}/>
    </>
  );
}
