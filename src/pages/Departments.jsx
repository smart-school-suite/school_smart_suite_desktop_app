import Navbar from "../components/Navbar";
import {
  useFetchDepartmentDetailsQuery,
  useFetchDepartmentsQuery,
} from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import CleanArrayData, {
  renameKeys,
  convertToReadableDate,
} from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Table from "../components/Tables";
import { Icon } from "@iconify/react";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown, { ModialButton } from "./actionButton";
import { DepartmentNameInput } from "../components/formComponents";
import { useAddDepartmentMutation } from "../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
function Departments() {
  const navBarOptions = {
    route_data: [
      {
        lable: "Department",
        icon: "mingcute:department-fill",
        route: "/departments",
      },
      {
        lable: "Academic Analysis",
        icon: "icon-park-outline:market-analysis",
        route: "/academic-analysis",
      },
      {
        lable: "Financial Analysis",
        route: "/financial-analysis",
        icon: "hugeicons:analysis-text-link",
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
      field: "id",
    },
    {
      field: "Department Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Head of Department",
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
  const { data: department, error, isLoading } = useFetchDepartmentsQuery();
  const filter_array_keys = ["id", "department_name", "HOD", "created_at"];
  const renameMapping = {
    id: "id",
    department_name: "Department Name",
    HOD: "Head of Department",
    created_at: "Date of creation",
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={navBarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Departments</p>
            <h1 className="fw-bold my-0">{department.department.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModialButton 
             action={{ modalContent:CreateDepartment }}
             classname={"border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"}
            >
              <span className="font-size-sm">Create Department</span>
            </ModialButton>
          </div>
        </div>
        <div>
          <Table
            colDefs={colDefs}
            rowData={renameKeys(
              CleanArrayData(department.department, filter_array_keys),
              renameMapping
            )}
          />
        </div>
      </div>
    </>
  );
}
export default Departments;

function CreateDepartment({ handleClose }){
  const [isValid, setIsValid] = useState(false); 
  const [formData, setFormData] = useState({ department_name: "", date: "" }); 
  const [addDepartment, { isLoading }] = useAddDepartmentMutation();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidation = (isInputValid) => {
    setIsValid(isInputValid);
  };

  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      await addDepartment(formData).unwrap(); 
      toast.success("Department created successfully!");
      handleClose(); 
    } catch (error) {
      toast.error("Failed to create department. Try again.");
    }
  };
  return(
    <div>
     <div className="d-flex flex-row align-items-center">
        <div className="block">
          <h5>Create Department</h5>
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum nesciunt sunt
          </span>
        </div>
      </div>
      <div className="my-1">
        <DepartmentNameInput 
         onValidationChange={handleValidation}
         value={formData.department_name}
         onChange={(value) => handleInputChange("department_name", value)}
        />
      </div>
      <div className="my-1">
        <span>Date of Creation</span>
        <input 
        type="date" 
        className="form-control"
         
        />
      </div>
      <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
             onClick={handleClose}
             
            >
              Cancel
            </button>
            <button 
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
            disabled={!isValid}
            onClick={() => {
              handleSubmit();
            }}
            >
              Continue
            </button>
          </div>
        </div>
    </div>
  )
}

function Update() {
  return (
    <>
      <div className="card w-100 border-none">
        <div className="my-1">
          <p className="my-0">Department Name</p>
          <input type="text" className="form-control" placeholder="Jhone Doe" />
        </div>
        <div className="my-1">
          <span className="my-0">Max Number of Students</span>
          <input type="number" className="form-control" placeholder="500" />
        </div>
        <div className="my-1">
          <span className="my-0">Date of Establishment</span>
          <input type="date" className="form-control" />
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

function Details({ row_id, handleClose }) {
  const {
    data: department_details,
    isLoading,
    error,
  } = useFetchDepartmentDetailsQuery({
    department_id: row_id,
  });
  useEffect(() => {
    if (department_details) {
      console.table(department_details.department_details);
    }
    if (error) {
      console.error("Error fetching parents:", error);
    }
  }, [department_details, error]);

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100">
        <div className="w-100 mb-4 pe-2 d-flex flex-row justify-content-between align-items-center">
          <span className="fw-semibold fs-5">Update Department</span>
          <span>IC</span>
        </div>
        <div className="my-2">
          <p className="font-size-sm gainsboro-color">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
            molestias repellendus facere voluptate?
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
          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">
              {department_details.department_details[0].department_name}
            </span>
            <span className="my-0 font-size-sm gainsboro-color">
              Department Name
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

          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">500</span>
            <span className="my-0 font-size-sm gainsboro-color">
              Number of Students
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

          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">
              {department_details.department_details[0].HOD}
            </span>
            <span className="my-0 font-size-sm gainsboro-color">
              Head of Department (HOD)
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

          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">
              {convertToReadableDate(
                department_details.department_details[0].created_at
              )}
            </span>
            <span className="my-0 font-size-sm gainsboro-color">
              Date of Creation
            </span>
          </div>
        </div>

        <div className="my-2 position-relative">
          <div className="postion-absolute d-flex flex-row justify-content-end">
            <button
              className="px-3 w-25 py-2 font-size-sm text-white border-none rounded-3 primary-background"
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </button>
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

function Deactivate() {
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
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Assign() {
  return (
    <>
      <div className="w-100">
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          This action cannot be undone. This will Permanently delete This
          account and remove this account data from our servers
        </p>
        <div className="my-2">
          <span>Assign HOD </span>
          <input
            type="text"
            className="form-control"
            placeholder="Select HOD Head of department"
          />
        </div>
        <div className="my-2">
          <span>Assign HOD </span>
          <input
            type="text"
            className="form-control"
            placeholder="Select HOD Head of department"
          />
        </div>
        <div className="my-2">
          <span>Assign HOD </span>
          <input
            type="text"
            className="form-control"
            placeholder="Select HOD Head of department"
          />
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
  );
}
export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Department",
      actionTitle: "Update",
      modalContent: Update,
    },
    {
      modalTitle: "Department Details",
      actionTitle: "Details",
      modalContent: Details,
    },
    {
      modalTitle: "Delete Department",
      actionTitle: "Delete",
      modalContent: Delete,
    },
    {
      modalTitle: "Deactivate Department",
      actionTitle: "Deactivate",
      modalContent: Deactivate,
    },
    {
      modalTitle: "Assign Deparment",
      actionTitle: "Assign",
      modalContent: Assign,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}
