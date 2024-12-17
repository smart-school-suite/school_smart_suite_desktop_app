import Navbar from "../components/Navbar";
import { useFetchStudentResitDetailsQuery, useFetchStudentResitQuery } from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import CleanArrayData,  { formatNumber, renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Table from "../components/Tables";
import { Icon } from "@iconify/react";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown from "./actionButton";
function ResitPayments(){
    const navBarOptions = {
        route_data: [
            {
                lable:"Resit Payments",
                icon:"game-icons:cash" ,
                route:"/resit-payments"
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
      { field: "Exam Name", filter: true, floatingFilter: true,
        cellRenderer:DataComponent,
        cellStyle:cellStyle
       },
      { field: "Course Title", filter: true, floatingFilter: true,
        cellRenderer:DataComponent,
        cellStyle:cellStyle
       },
      { field: "Resit Fee", filter: true, floatingFilter: true,
        cellRenderer:DataComponent,
        cellStyle:cellStyle
       },
       { field: "Status", filter: true, floatingFilter: true,
        cellRenderer:DataComponent,
        cellStyle:cellStyle
       },
      { field: "Action", 
        cellRenderer:DropdownComponent,
        cellStyle:cellStyle
       },
    ]);
    const { data: resits, error, isLoading } = useFetchStudentResitQuery();
    const filter_array_keys = [
      "id",
      "student.name",
      "level.name",
      "specialty.specialty_name",
      "exam.examtype.exam_name",
      "courses.course_title",
      "paid_status",
      "resit_fee",
    ];
    const renameMapping = {
      "id":"id",
      "student.name": "Student Name",
      "level.name": "Level",
      "specialty.specialty_name": "Specialty",
      "exam.examtype.exam_name": "Exam Name",
      "courses.course_title": "Course Title",
      "paid_status":"Status",
      "resit_fee": "Resit Fee",
    };
    useEffect(() => {
      if (resits) {
        console.table(
          renameKeys(
            CleanArrayData(resits.resits, filter_array_keys),
            renameMapping
          )
        );
      }
      if (error) {
        console.error("Error fetching resits:", error);
      }
    }, [resits, error]); 
    
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
                  <p className="font-size-xs my-0">Total Number of Resits</p>
                  <h1 className="fw-bold my-0">{resits.resits.length}</h1>
                </div>
              </div>
              <div>
              <Table 
                    colDefs={colDefs}
                    rowData={renameKeys(
                      CleanArrayData(resits.resits, filter_array_keys),
                      renameMapping
                    )}
                />
              </div>
        </div>
        </>
     )
}
export default ResitPayments;

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

function Details({ row_id }){
  const { data: resit_details, isLoading, error } = useFetchStudentResitDetailsQuery({
     resit_id:row_id
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
      <span>Financial Detials</span>
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
          <p className="my-0">{formatNumber(Number(resit_details.resit_details[0].resit_fee))} ₣</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Resit Cost
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
          <p className="my-0">{resit_details.resit_details[0].paid_status}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Payment Status
          </p>
        </div>
      </div>
      <span>Course Details</span>
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
          <p className="my-0">{resit_details.resit_details[0].courses.course_title}</p>
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
      <span>Exam Details</span>
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
          <p className="my-0">{resit_details.resit_details[0].exam.examtype.exam_name}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Exam Name
          </p>
        </div>
      </div>
      </div>
    </>
  )
}

export function DropdownComponent(props) {
   const { id } = props.data;
   const actions = [
    {
     modalTitle: "Update Resit Payment",
     actionTitle: "Update",
     modalContent: Update,
    },
    {
      modalTitle:"Resit Payment Details",
      actionTitle:"Details",
      modalContent:Details
    },
    {
     modalTitle: "Delete Resit Payment",
     actionTitle: "Delete",
     modalContent: Delete,
    }
 ]
    return (
      <>
     <ActionButtonDropdown  actions={actions} row_id={id}/>
      </>
    );
  }
