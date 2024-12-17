import Greenbutton from "../components/Buttons";
import Navbar from "../components/Navbar";
import { useFetchStudentScoresQuery, useFetchScoreDetailsQuery } from "../Slices/Asynslices/fetchSlice";
import CleanArrayData, { renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Table from "../components/Tables";
import { CSSTransition } from "react-transition-group";
import { Icon } from "@iconify/react";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown from "./actionButton";
import { useState, useEffect } from "react";
function Scores(){
  const navBarOptions = {
    route_data: [
        {
            lable:"Scores",
            icon:"ph:exam-bold",
            route:"/scores"
        },
        {
           lable:"Score Statistics",
           route:"/scores-analytics",
           icon:"material-symbols:query-stats"
        }
    ],
}
const [colDefs, setColDefs] = useState([
  {
    field:"id", hide:true
  },
  { field: "Student Name", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    }
   },
  { field: "Specialty Name", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    }
   },
  { field: "Level", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    }
   },
  { field: "Level Name", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    }
   },
  { field: "School Year", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    }
   },
   { field: "Exam Name", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    }
   },
   { field: "Course Title", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    }
   },
   { field: "Score", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    }
   },
   { field: "Grade", filter: true, floatingFilter: true,
    cellRenderer:DataComponent,
    cellStyle: {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      height: "100%",
      zIndex: "-1",
    }
   },
  { field: "Action", cellRenderer: DropdownComponent }
]);

const { data: scores, error, isLoading } = useFetchStudentScoresQuery();
const filter_array_keys = [
  "id",
  "student.name",
  "specialty.specialty_name",
  "level.name",
  "level.level",
  "school_year",
  "exams.examtype.exam_name",
  "course.course_title",
  "score",
  "grade"
];
const renameMapping = {
  "id":"id",
  "student.name": "Student Name",
  "specialty.specialty_name": "Specialty Name",
  "level.name": "Level Name",
  "level.level": "Level",
  "school_year": "School Year",
  "exams.examtype.exam_name": "Exam Name",
  "course.course_title": "Course Title",
  "score": "Score",
  "grade": "Grade"
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
                  <p className="font-size-xs my-0">Total Number of Entries</p>
                  <h1 className="fw-bold my-0">{scores.scores.length}</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Create Scores"
                    bg="green-bg"
                    route="/create-scores"
                  />
                </div>
              </div>
              <Table
          colDefs={colDefs}
          rowData={renameKeys(
            CleanArrayData(scores.scores, filter_array_keys),
            renameMapping
          )} />
        </div>
        </>
    )
}
export default Scores;

function Details({ row_id }){
  const { data:score_details, isLoading, error } = useFetchScoreDetailsQuery({
    mark_id:row_id
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
      <p className="fs-6 my-2">Exam scores Details</p>
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
          <p className="my-0">{score_details.score_details[0].score}/{score_details.score_details[0].exams.weighted_mark}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
           Student Score
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
          <p className="my-0">{score_details.score_details[0].grade}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
           Letter Grade
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
          <p className="my-0">{score_details.score_details[0].course.course_title}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
           Course Title
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
          <p className="my-0">{score_details.score_details[0].student.name}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
           Student Name
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
          <p className="my-0">{score_details.score_details[0].specialty.specialty_name}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
           Specialty Name
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
          <p className="my-0">{score_details.score_details[0].level.level}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
           Level Name
          </p>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

function Update({ row_id }){
   return(
    <>
    </>
   )
}

function Delete({ row_id }){
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

