import { useFetchParentsQuery, useFetchParentDetailsQuery } from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import CleanArrayData, { renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Greenbutton from "../components/Buttons";
import Table from "../components/Tables";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown from "./actionButton";
import { Icon } from "@iconify/react";
function Parents(){
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
    { field: "Name", filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "Address", filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "Language Preference", filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "Occupation", filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "Relationship To Student", filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "Contact Method", filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "Marital Status", filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "Cultural Background", filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
    { field: "Religion", filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle:cellStyle
     },
     { field: "Action", filter: true, floatingFilter: true,
      cellRenderer:DropdownComponent,
      cellStyle:cellStyle
     }
  ]);
  const { data: parents, error, isLoading } = useFetchParentsQuery();
  const filter_array_keys = [
    "id",
    "name",
    "address",
    "language_preference",
    "occupation",
    "relationship_to_student",
    "preferred_contact_method",
    "marital_status",
    "cultural_background",
    "religion",
  ];
  const renameMapping = {
    "id":"id",
    "name": "Name",
    "address": "Address",
    "language_preference": "Language Preference",
    "occupation": "Occupation",
    "relationship_to_student": "Relationship To Student",
    "preferred_contact_method": "Contact Method",
    "marital_status": "Marital Status",
    "cultural_background": "Cultural Background",
    "religion": "Religion",
  };


  if (isLoading) {
    return <Pageloaderspinner />;
  }
    return(
        <>
        <div>
        <div className="my-2">
          <div className="d-flex align-items-center gap-2">
          <div className="d-flex justify-content-center align-items-center" style={{ width:"3rem", height:"3rem", borderRadius:"3rem", background:"#fff" }}>
          <Icon icon="ri:parent-line" className="fs-5 text-primary"/>
            </div>
            <h4 className="fw-bold my-0">Parents/Guardians</h4>
          </div>
          </div>
        <div className="d-flex flex-row align-items-center mb-1 w-100">
                <div className="d-block">
                  <p className="font-size-xs my-0">Total Number of Parents</p>
                  <h1 className="fw-bold my-0">{parents.parents.length}</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Add Parent"
                    bg="green-bg"
                    route="/create-parent"
                  />
                </div>
              </div>
        </div>
        <div className="pt-4">
        <Table
          colDefs={colDefs}
          rowData={renameKeys(
            CleanArrayData(parents.parents, filter_array_keys),
            renameMapping
          )}
          />
        </div>
        </>
    )
}
export default Parents;

function Update(){
  return(
    <></>
  )
}
function Delete({ row_id, handleClose }){
  return(
    <>
     
    </>
  )
}

function Details({ row_id }){
  const { data: parent_details, error, isLoading } = useFetchParentDetailsQuery({
    parent_id:row_id
})
useEffect(() => {
  if (parent_details) {
    console.table(
      parent_details.parent_details
    );
  }
  if (error) {
    console.error("Error fetching parents:", error);
  }
}, [parent_details, error]); 

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
              <h5 className="fw-bold">{parent_details.parent_details[0].name}</h5>
              <div className="d-flex flex-row my-1 gainsboro-color">
                <span>{parent_details.parent_details[0].occupation}</span>
              </div>
            </div>
          </div>
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
          <p className="my-0">{parent_details.parent_details[0].address}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            House Address
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
          <p className="my-0">{parent_details.parent_details[0].marital_status}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Relationship Status
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
          <p className="my-0">asdas</p>
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
          <p className="my-0">{parent_details.parent_details[0].occupation}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Occupation
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
          <p className="my-0">{parent_details.parent_details[0].religion}</p>
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
          <Icon icon="clarity:email-line" />
        </button>
        <div className="border-bottom py-2" style={{ width: "87%" }}>
          <p className="my-0">{parent_details.parent_details[0].cultural_background}</p>
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
          <p className="my-0">{parent_details.parent_details[0].email}</p>
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
          <Icon icon="clarity:email-line" />
        </button>
        <div className="border-bottom py-2" style={{ width: "87%" }}>
          <p className="my-0">{parent_details.parent_details[0].phone_one}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Contact One
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
          <p className="my-0">{parent_details.parent_details[0].phone_two}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Contact Two
          </p>
        </div>
      </div>
      </div>

    <div className="w-100 mt-2">
      <p className="fs-6 my-2">Children Details</p>
       <div className="d-flex flex-row gap-1 align-items-center">
       <span className="gainsboro-color font-size-sm">Number of students :</span>
       <span>{parent_details.parent_details[0].student.length}</span>
       </div>
      {
         parent_details.parent_details[0].student.map((items, index) => (
           <>
           <div className="d-flex flex-column">
           <span className="gainsboro-color">Student {index + 1}</span>
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
            <p className="my-0">{items.name}</p>
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
            <p className="my-0">{items.specialty.specialty_name}</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Specailty Name
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
            <p className="my-0">{items.level.name}</p>
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
           </>
         ))
      }
    </div>

    <div className="w-100 mt-2">
      <p className="fs-6 my-2">Others</p>
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
          <p className="my-0">{parent_details.parent_details[0].preferred_language_of_communication}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Preferred Language
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
          <p className="my-0">{parent_details.parent_details[0].referral_source}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Referral Source
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
          <p className="my-0">{parent_details.parent_details[0].referral_source}</p>
          <p
            className="my-0 font-size-sm gainsboro-color"
            onClick={() => {
              handleShow();
            }}
          >
            Referral Source
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
          <p className="my-0">{parent_details.parent_details[0].preferred_contact_method}</p>
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

