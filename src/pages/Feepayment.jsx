import Navbar from "../components/Navbar";
import { useFetchStudentDetailsQuery, useFetchStudentsQuery } from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import CleanArrayData, { formatNumber, renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Table from "../components/Tables";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown from "./actionButton";
import { Icon } from "@iconify/react";
function Feepayment(){
  const navBarOptions = {
    route_data: [
        {
            lable:"Fee Payments",
            icon:"game-icons:cash" ,
            route:"/fee-payments"
        },
        {
           lable:"Transactions",
           icon:"icon-park-outline:transaction",
           route:"/fee-payment/transactions"
        },
        {
          lable:"Financial Analysis",
          route:"/financial-analysis",
          icon:"fluent-mdl2:financial"
       }
    ],
}
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
  { field: "Student Name", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle:cellStyle
   },
  { field: "Level", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle:cellStyle
   },
  { field: "Specialty", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle:cellStyle
   },
  { field: "Parent name", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle:cellStyle
   },
  { field: "First Reachable Number", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle:cellStyle
   },
  { field: "Gender", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle:cellStyle
   },
  { field: "Fee status", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle:cellStyle
   },
  { field: "Fee Debt", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle:cellStyle
   },
   { field: "Actions", filter: true, floatingFilter: true,
    cellRenderer:DropdownComponent
   },
]);
const { data: students, error, isLoading } = useFetchStudentsQuery();
const filter_array_keys = [
  "id",
  "specialty.specialty_name",
  "guardian_one.name",
  "level.name",
  "name",
  "phone_one",
  "phone_two",
  "gender",
  "fee_status",
  "total_fee_debt",
];
const renameMapping = {
  "id":"id",
  "specialty.specialty_name": "Specialty",
  "guardian_one.name": "Parent name",
  "level.name": "Level",
  "name": "Student Name",
  "phone_one": "First Reachable Number",
  "phone_two": "Second Reachable Number",
  "fee_status": "Fee status",
  "total_fee_debt": "Fee Debt",
  "gender": "Gender",
}; 

if (isLoading) {
  return <Pageloaderspinner />;
}
    return(
        <>
        <Navbar
        options={navBarOptions}
      />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Indepted Student</p>
            <h1 className="fw-bold my-0">{students.students.length}</h1>
          </div>
        </div>
      </div>
        <Table
          colDefs={colDefs}
          rowData={renameKeys(
            CleanArrayData(students.students, filter_array_keys),
            renameMapping
          )}
        />
        </>
    )
}
export default Feepayment;

function Update(){
   return(
    <>
    </>
   )
}

function Details({ row_id }){
  const { data:student_details, isLoading, error } = useFetchStudentDetailsQuery({
     student_id:row_id
  })
  
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return(
    <>
    <div className="w-100 mt-2">
      <p className="font-size-sm gainsboro-color my-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Dolorum id excepturi cumque facere, asperiores
      </p>
      <span>Fee Debt</span>
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
          <p className="my-0">{formatNumber(Number(student_details.student_details[0].specialty.school_fee))}
             <span> ₣</span>
          </p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Expected Tuition Fee to be paid
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
          <Icon icon="clarity:email-line" />
        </button>
        <div className="border-bottom py-2" style={{ width: "87%" }}>
          <p className="my-0">{
           formatNumber(
            Number(student_details.student_details[0].specialty.school_fee) + Number(student_details.student_details[0].specialty.registration_fee)
            - Number(student_details.student_details[0].total_fee_debt)
           )
            } ₣ </p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Amount Paid
          </p>
        </div>
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
          <Icon icon="clarity:email-line" />
        </button>
        <div className="border-bottom py-2" style={{ width: "87%" }}>
          <p className="my-0">{formatNumber(Number(student_details.student_details[0].total_fee_debt))}
             <span> ₣</span>
          </p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
          Outstanding Debt
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
          <Icon icon="clarity:email-line" />
        </button>
        <div className="border-bottom py-2" style={{ width: "87%" }}>
          <p className="my-0">{student_details.student_details[0].fee_status}
          </p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
           Fee Debt Status
          </p>
        </div>
      </div>
      <span>Student Details</span>
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
          <p className="my-0">{student_details.student_details[0].name}
          </p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
           Fee Debt Status
          </p>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end my-2 w-100">
        <button className="border-none rounded-3  w-25 p-2 text-white primary-background text-white">
          Close
        </button>
      </div>
    </>
  )
}


export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
     modalTitle: "Update Expenses",
     actionTitle: "Update",
     modalContent: Update,
    },
    {
      modalTitle:"Expenses Details",
      actionTitle:"Details",
      modalContent:Details
    }
 ]
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id}/>
    </>
  );
}

