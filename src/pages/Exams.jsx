import Greenbutton from "../components/Buttons";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import CleanArrayData, { renameKeys , convertToReadableDate} from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Table from "../components/Tables";
import { useFetchExamDetailsQuery, useFetchExamsQuery } from "../Slices/Asynslices/fetchSlice";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown from "./actionButton";
import { Icon } from "@iconify/react";
import { GradesConfigurationNavbarOptions } from "../componentConfigurations/navBarConfig";
import { ModialButton } from "./actionButton";
import DatePicker from "../components/datePicker";
import { WeigtedMarkInput } from "../components/formComponents";
import { SchoolYearSelector } from "../components/yearPicker";
function Exams(){
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
  { field: "Exam Name", filter: true, floatingFilter: true,
    cellStyle:cellStyle,
    cellRenderer:DataComponent,
   },
  { field: "Semeseter", filter: true, floatingFilter: true,
    cellStyle:cellStyle,
    cellRenderer:DataComponent,
   },
  { field: "Specialty", filter: true, floatingFilter: true,
    cellStyle:cellStyle,
    cellRenderer:DataComponent,
   },
  { field: "Level", filter: true, floatingFilter: true,
    cellStyle:cellStyle,
    cellRenderer:DataComponent,
   },
  { field: "Start Date", filter: true, floatingFilter: true,
    cellStyle:cellStyle,
    cellRenderer:DataComponent,
   },
  { field: "End Date", filter: true, floatingFilter: true,
    cellStyle:cellStyle,
    cellRenderer:DataComponent,
   },
  { field: "School Year", filter: true, floatingFilter: true,
    cellStyle:cellStyle,
    cellRenderer:DataComponent,
   },
   { field: "Weighted Mark", filter: true, floatingFilter: true,
    cellStyle:cellStyle,
    cellRenderer:DataComponent,
   },
  { field: "Action",
    cellRenderer:DropdownComponent,
   },
]);
const { data: exam_data, error, isLoading } = useFetchExamsQuery();
const filter_array_keys = [
  "id",
  "examtype.exam_name",
  "semester.name",
  "specialty.specialty_name",
  "specialty.level.name",
  "start_date",
  "end_date",
  "school_year",
  "weighted_mark"
];
const renameMapping = {
  "id":"id",
  "examtype.exam_name": "Exam Name",
  "semester.name": "Semeseter",
  "specialty.specialty_name": "Specialty",
  "specialty.level.name": "Level",
  "start_date": "Start Date",
  "end_date": "End Date",
  "school_year": "School Year",
  "weighted_mark": "Weighted Mark",
};
if (isLoading) {
  return <Pageloaderspinner />;
}
    return(
        <>
        <Navbar 
             options={GradesConfigurationNavbarOptions}
         />
        <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
                <div className="d-block">
                  <p className="font-size-xs my-0">Total Number of Exams</p>
                  <h1 className="fw-bold my-0">{exam_data.exam_data.length}</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <ModialButton 
                    classname={"border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"}
                    action={{ modalContent:CreateExam}}
                  >
                    <span className="font-size-sm">Create Exam</span>
                  </ModialButton>
                </div>
          </div>
          {
          exam_data?.exam_data?.length > 0 ? ( 
            <Table 
              colDefs={colDefs}
              rowData={renameKeys(
                CleanArrayData(exam_data.exam_data, filter_array_keys),
                renameMapping
              )}
            />               
          ) : (
            <div className="alert alert-warning">
              Oops, looks like you don't have any teachers.
            </div>
          )
        }
        </div>
        </>
    )
}
export default Exams;

function CreateExam({ handleClose }){
  return(
    <>
    <div className="d-flex flex-row align-items-center">
        <div className="block">
          <h5>Create Exam</h5>
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum nesciunt sunt
          </span>
        </div>
      </div>
      <div className="my-1">
        <DatePicker 
          lable={"Start Date"}
        />
      </div>
      <div className="my-1">
        <DatePicker
          lable={"End Date"}
        />
      </div>
      <div className="my-1">
        <WeigtedMarkInput />
      </div>
      <div className="my-1">
         <span>School Year</span>
        <SchoolYearSelector />
      </div>
      <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
             onClick={handleClose}
            >
              Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50">
              Continue
            </button>
          </div>
        </div>
    </>
  )
}

function Details({ row_id }){
  const { data:exam_details, isLoading, error } = useFetchExamDetailsQuery({
     exam_id:row_id
  })  
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return(
    <>
    <div className="w-100">
       <span className="font-size-sm gainsboro-color">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
         Voluptates, neque soluta? Ea culpa reiciendis mi</span>
         <div className="w-100 mt-2">
      <p className="fs-6 my-2">Exam  Details</p>
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
          <p className="my-0">{exam_details.exam_details[0].examtype.exam_name}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Exam Title
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
          <p className="my-0">{exam_details.exam_details[0].semester.name}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Semester
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
          <p className="my-0">{exam_details.exam_details[0].specialty.specialty_name}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
           Specailty
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
          <p className="my-0">{exam_details.exam_details[0].level.level}</p>
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
          <p className="my-0">{exam_details.exam_details[0].school_year}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
          School Year
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
          <p className="my-0">{convertToReadableDate(exam_details.exam_details[0].start_date)}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
          Start Date
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
          <p className="my-0">{convertToReadableDate(exam_details.exam_details[0].end_date)}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
          End Date
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
          <p className="my-0">{convertToReadableDate(exam_details.exam_details[0].end_date)}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
          End Date
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
          <p className="my-0">{exam_details.exam_details[0].weighted_mark}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
          Weighted Mark
          </p>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

function Update(){
  return(
    <>
    </>
  )
}

function Delete(){
  return(
    <>
    </>
  )
}

export function DropdownComponent(props) {
  const { id } = props.data; 
  const actions = [
     {
      modalTitle: "Update Parent",
      actionTitle: "Update",
      modalContent: Update,
     },
     {
       modalTitle:"Parent Details",
       actionTitle:"Details",
       modalContent:Details
     },
     {
      modalTitle: "Delete Parent",
      actionTitle: "Delete",
      modalContent: Delete,
     },
  ]
  return (
    <>
    <ActionButtonDropdown actions={actions} row_id={id}/>
    </>
  );
}