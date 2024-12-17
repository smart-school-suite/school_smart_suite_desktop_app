import Navbar from "../components/Navbar";
import { useFetchSpecialtiesQuery, useFetchSpecialtyDetailsQuery } from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import  CleanArrayData, { renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Table from "../components/Tables";
import { Icon } from "@iconify/react";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown, {ModialButton} from "./actionButton";
import { SpecailtyNavBarOptions } from "../componentConfigurations/navBarConfig";
import { RegistrationFeeInput, SchoolFeeInput, SpecialtyTitleInput } from "../components/formComponents";

function Specialties(){
  const [colDefs, setColDefs] = useState([
    {
       field:"id", 
       hide:true
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
    { field: "Registration Fee", filter: true, floatingFilter: true,
      cellRenderer:DataComponent,
      cellStyle: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        zIndex: "-1",
      }
     },
    { field: "School Fee", filter: true, floatingFilter: true,
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
    { field: "Action", cellRenderer: DropdownComponent }
  ]);
  const { data: specialty, error, isLoading } = useFetchSpecialtiesQuery();
  const filter_array_keys = [
    "id",
    "specialty_name",
    "registration_fee",
    "level.name",
    "level.level",
    "school_fee"
  ];
  const renameMapping = {
    "id":"id",
    "specialty_name": "Specialty Name",
    "registration_fee": "Registration Fee",
    "level.name": "Level Name",
    "level.level": "Level",
    "school_fee": "School Fee"
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
    return(
        <>
        <Navbar 
           options={SpecailtyNavBarOptions}
        />
        <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
                <div className="d-block">
                  <p className="font-size-xs my-0">Total Number specialties</p>
                  <h1 className="fw-bold my-0">{specialty.specialty.length}</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <ModialButton 
                    action={{ modalContent:Create }}
                    classname={'border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white'}
                  >
                    <span>Create Specialty</span>
                  </ModialButton>
                </div>
              </div>
              <Table
          colDefs={colDefs}
          rowData={renameKeys(
            CleanArrayData(specialty.specialty, filter_array_keys),
            renameMapping
          )}
        />
        </div>
        </>
    )
}
export default Specialties;

function Create({ handleClose }){
  return(
    <div className="w-100">
      <div className="d-flex flex-row align-items-center">
        <div className="block">
          <h5>Create Specialty</h5>
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum nesciunt sunt
          </span>
        </div>
      </div>
      <div className="my-1">
        <SpecialtyTitleInput />
      </div>
      <div className="my-1">
        <RegistrationFeeInput />
      </div>
      <div className="my-1">
        <SchoolFeeInput />
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
    </div>
  )
}

function Update({ row_id, handleClose }){
  return(
   <>
     <div className="card w-100 border-none">
     <div className="d-flex flex-row align-items-center">
        <div className="block">
          <h5>Update Specailty</h5>
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum nesciunt sunt
          </span>
        </div>
      </div>
       <div className="my-1">
         <SpecialtyTitleInput />
       </div>
       <div className="my-1">
        <RegistrationFeeInput />
      </div>
      <div className="my-1">
        <SchoolFeeInput />
      </div>
     </div>
     <div className="mt-4">
         <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
             onClick={handleClose}
            >
               Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50">
               Update
            </button>
         </div>
       </div>
   </>
  )
}

function Details({ row_id }){
  const { data:specialty_details, isLoading, error } = useFetchSpecialtyDetailsQuery({
    specialty_id: row_id
  });

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return(
   <>
   <div className="w-100">
     <div className="my-2">
     <p className="font-size-sm gainsboro-color">
       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla molestias repellendus facere voluptate? 
     </p>
     </div>
     <div className="d-flex align-items-center justify-content-between my-3">
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
         <div className="border-bottom py-2 d-flex flex-column" style={{ width: "87%" }}>
           <span className="my-0">{specialty_details.specialty_details[0].specialty_name}</span>
           <span className="my-0 font-size-sm gainsboro-color">
             Specailty Name
           </span>
         </div>

     </div>

     <div className="d-flex align-items-center justify-content-between my-3">
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
         
     <div className="border-bottom py-2 d-flex flex-column" style={{ width: "87%" }}>
           <span className="my-0">{specialty_details.specialty_details[0].registration_fee}</span>
           <span className="my-0 font-size-sm gainsboro-color">
             Registration Fee
           </span>
         </div>

     </div>
    
     <div className="d-flex align-items-center justify-content-between my-3">
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
         
         <div className="border-bottom py-2 d-flex flex-column" style={{ width: "87%" }}>
           <span className="my-0">{specialty_details.specialty_details[0].school_fee}</span>
           <span className="my-0 font-size-sm gainsboro-color">
             Tuition Fee
           </span>
         </div>

     </div>
         
     <div className="d-flex align-items-center justify-content-between my-3">
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
         
         <div className="border-bottom py-2 d-flex flex-column" style={{ width: "87%" }}>
           <span className="my-0">{specialty_details.specialty_details[0].level.name}</span>
           <span className="my-0 font-size-sm gainsboro-color">
             Level Name
           </span>
         </div>

     </div>
      
     <div className="d-flex align-items-center justify-content-between my-3">
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
         
         <div className="border-bottom py-2 d-flex flex-column" style={{ width: "87%" }}>
           <span className="my-0">{specialty_details.specialty_details[0].level.level}</span>
           <span className="my-0 font-size-sm gainsboro-color">
             Level Number
           </span>
         </div>

     </div>
 
     <div className="d-flex align-items-center justify-content-between my-3">
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
         
         <div className="border-bottom py-2 d-flex flex-column" style={{ width: "87%" }}>
           <span className="my-0">{specialty_details.specialty_details[0].department.department_name}</span>
           <span className="my-0 font-size-sm gainsboro-color">
             Deparment Name
           </span>
         </div>

     </div>
         <div className="my-2 position-relative">
           <div className="postion-absolute d-flex flex-row justify-content-end">
             <button className="px-3 w-25 py-2 font-size-sm text-white border-none rounded-3 primary-background">
                Close
             </button>
           </div>
         </div>
   </div>
   </>
  )
}

function Delete({ handleClose }){
  return(
   <>
    <div className="w-100">
       <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
       <p className="my-3" style={{ fontSize:"0.85rem" }}>
         This action cannot be undone. This will Permanently delete This account and remove this account data from our servers
       </p>
       <div className="mt-4">
         <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
              onClick={handleClose}
            >
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
               Deactivate
            </button>
         </div>
       </div>
     </div>
   </>
 )
}

function Assign(){
 return(
   <>
   <div className="w-100">
       <p className="my-3 gainsboro-color" style={{ fontSize:"0.85rem" }}>
         This action cannot be undone. This will Permanently delete This account and remove this account data from our servers
       </p>
       <div className="my-2">
         <span>Assign HOD   </span>
          <input type="text" className="form-control" placeholder="Select HOD Head of department"/>
       </div>
       <div className="my-2">
         <span>Assign HOD   </span>
          <input type="text" className="form-control" placeholder="Select HOD Head of department"/>
       </div>
       <div className="my-2">
         <span>Assign HOD   </span>
          <input type="text" className="form-control" placeholder="Select HOD Head of department"/>
       </div>
       <div className="mt-4">
         <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 rounded-3 w-100 font-size-sm primary-background text-white">
               Deactivate
            </button>
         </div>
       </div>
     </div>
   </>
 )
}
export function DropdownComponent(props) {
  const { id } = props.data
 const actions = [
   {
     modalTitle:"Update Specialty",
     actionTitle:"Update",
     modalContent:Update
   },
   {
      modalTitle:"Specialty Details",
      actionTitle:"Details",
      modalContent:Details,
   },
   {
      modalTitle:"Delete Specialty",
      actionTitle:"Delete",
      modalContent:Delete
   },
   {
      modalTitle:"Deactivate Specialty",
      actionTitle:"Deactivate",
      modalContent:Deactivate,
   },
   {
     modalTitle:"Assign Specialty",
     actionTitle:"Assign",
     modalContent:Assign
   },
 ]
 return (
   <>
     <ActionButtonDropdown  actions={actions} row_id={id}/>
   </>
 );
}