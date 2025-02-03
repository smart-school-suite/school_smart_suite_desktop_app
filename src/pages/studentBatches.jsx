import Navbar from "../components/Navbar";
import { useFetchStudentBatchQuery } from "../Slices/Asynslices/fetchSlice";
import { useState } from "react";
import CleanArrayData, { renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Table from "../components/Tables";
import { StudentBatchesNavBarOptions } from "../componentConfigurations/navBarConfig";
import DataComponent from "../components/dataComponent";
import { ModialButton } from "./actionButton";
import { useNavigate } from "react-router-dom";
import ActionButtonDropdown from "./actionButton";
import { useAddStudentBatchMutation } from "../Slices/Asynslices/postSlice";
import { formatDate } from "../utils/functions";
import toast from "react-hot-toast";
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
      field: "id",
      floatingFilter: true,
      cellRenderer: DataComponent,
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
      cellRenderer: DateComponent,
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
        {row_id}This action cannot be undone. This will Permanently delete This
        account and remove this account data from our servers
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
  const [formData, setFormData] = useState({
    name: "",
    graduation_date: "",
  });

  const [addStudentBatch] = useAddStudentBatchMutation();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    try {
      await addStudentBatch(formData).unwrap();
      toast.success("Student Batch  created successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to create Student Batch. Try again.");
    }
  };
  return (
    <div className="w-100">
      <div className="d-flex flex-row">
        <div>
          <h5>Create Student Batch</h5>
          <span className="font-size-sm gainsboro-color">
            Lorem reprehenderit eligendi iure animi ea odit quis voluptatum fuga{" "}
          </span>
        </div>
      </div>
      <div className="my-1">
        <span>Batch Title</span>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Great Archievement, Humility"
        />
      </div>
      <div className="my-1">
        <span>Graduation Date</span>
        <input
          type="date"
          className="form-control"
          name="graduation_date"
          value={formData.graduation_date}
          onChange={(e) => handleInputChange("graduation_date", e.target.value)}
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
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
            onClick={() => {
              handleSubmit();
            }}
          >
            Create Batch
          </button>
        </div>
      </div>
    </div>
  );
}

function Details() {
  return <></>;
}
function DateComponent(props) {
  return (
    <>
      <span className="text-overflow-elipse overflow-hidden my-0 text-start">
        {formatDate(props.value)}
      </span>
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
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}
