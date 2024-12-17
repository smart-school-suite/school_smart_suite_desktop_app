import Navbar from "../components/Navbar";
import { useFetchStudentBatchQuery } from "../Slices/Asynslices/fetchSlice";
import { useState } from "react";
import CleanArrayData, { renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Table from "../components/Tables";
import { StudentBatchesNavBarOptions } from "../componentConfigurations/navBarConfig";
import DataComponent from "../components/dataComponent";
import { ModialButton } from "./actionButton";
import DatePicker from "../components/datePicker";
import ActionButtonDropdown from "./actionButton";
function StudentBatches() {
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
      floatingFilter: true,
      cellRenderer:DataComponent
    },
    {
      field: "Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Graduation Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Date of creation",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    { field: "Action", cellStyle: cellStyle, cellRenderer: DropdownComponent },
  ]);
  const {
    data: student_batches,
    error,
    isLoading,
  } = useFetchStudentBatchQuery();
  const filter_array_keys = ["id", "name", "graduation_date", "created_at"];
  const renameMapping = {
    name: "Name",
    graduation_date: "Graduation Date",
    created_at: "Date of creation",
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <Navbar options={StudentBatchesNavBarOptions} />
      </div>
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of batches</p>
            <h1 className="fw-bold my-0">
              {student_batches.student_batches.length}
            </h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModialButton
              action={{ modalContent: Create }}
              classname="border-none rounded-3 green-bg text-white px-3 py-2"
            >
              <span className="font-size-sm">Create Student Batch</span>
            </ModialButton>
          </div>
        </div>
        <Table
          colDefs={colDefs}
          rowData={renameKeys(
            CleanArrayData(student_batches.student_batches, filter_array_keys),
            renameMapping
          )}
        />
      </div>
    </>
  );
}
export default StudentBatches;

function Update() {
  return <></>;
}

function Delete({ row_id, handleClose }) {
  return (
    <div className="w-100">
      <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
      <p className="my-3" style={{ fontSize: "0.85rem" }}>
        {row_id}This action cannot be undone. This will Permanently delete This account
        and remove this account data from our servers
      </p>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
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
  );
}

function Create({ handleClose }) {
  return(
     <div className="w-100">
      <div className="d-flex flex-row">
        <div>
          <h5>Create Student Batch</h5>
          <span className="font-size-sm gainsboro-color">Lorem reprehenderit eligendi iure animi ea odit quis voluptatum fuga </span>
        </div>
      </div>
      
       <div className="my-1">
        <DatePicker 
         lable={"Graduation Date"}
        />
       </div>
       <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50">
            Create Student
          </button>
        </div>
      </div>
     </div>
  );
}

function Details() {
  return <></>;
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
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}
