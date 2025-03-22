import Navbar from "../../components/Navbar";
import { useFetchDepartmentsQuery } from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import DeleteDepartment from "../../ModalContent/Department/DeleteDepartment";
import DepartmentDetails from "../../ModalContent/Department/DepartmentDetails";
import CreateDepartment from "../../ModalContent/Department/CreateDepartment";
import UpdateDepartment from "../../ModalContent/Department/UpdateDepartment";
import DeactivateDepartment from "../../ModalContent/Department/DeactivateDepartment";
import { DepartmentNavBarConfig } from "../../ComponentConfig/navBarConfig";
import { DepartmentTableConfig } from "../../ComponentConfig/AgGridTableConfig";
function Departments() {
  const { data: data, error, isLoading } = useFetchDepartmentsQuery();
  const filter_array_keys = [
    "id",
    "department_name",
    "hod_name",
    "description",
    "status",
    "created_at",
  ];
  const renameMapping = {
    id: "id",
    department_name: "Department Name",
    hod_name: "hod_name",
    description: "description",
    status: "status",
    created_at: "Date of creation",
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={DepartmentNavBarConfig} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Departments</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent: CreateDepartment }}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <span className="font-size-sm">Create Department</span>
            </ModalButton>
          </div>
        </div>
        <div>
          <Table
            colDefs={DepartmentTableConfig({ DropdownComponent })}
            rowData={renameKeys(
              CleanArrayData(data.data, filter_array_keys),
              renameMapping
            )}
          />
        </div>
      </div>
    </>
  );
}
export default Departments;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update",
      modalContent: UpdateDepartment,
      icon:"mynaui:edit-solid",
    },
    {
      actionTitle: "Details",
      icon:"bxs:detail",
      modalContent: DepartmentDetails,
    },
    {
      actionTitle: "Delete",
      icon:"fluent:delete-16-filled",
      modalContent: DeleteDepartment,
    },
    {
      actionTitle: "Department Status",
      icon:"heroicons-outline:status-online",
      modalContent: DeactivateDepartment,
    },
  ];
  return (
    <>
      <ActionButtonDropdown
        actions={actions}
        row_id={id}
        style={
          "tableActionButton primary-background text-white font-size-sm px-2"
        }
      >
        <span>Edit Actions</span>
      </ActionButtonDropdown>
    </>
  );
}
