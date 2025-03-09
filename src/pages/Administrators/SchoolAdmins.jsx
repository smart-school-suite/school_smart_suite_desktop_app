import Greenbutton from "../../components/Buttons";
import { useFetchSchoolAdminsQuery } from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import Table from "../../components/Tables";
import { Icon } from "@iconify/react";
import Pageloaderspinner from "../../components/Spinners";
import { SchoolAdminTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeleteSchoolAdmin from "../../ModalContent/SchoolAdmin/DeleteSchoolAdmin";
import PermissionsBySchoolAdmin from "../../ModalContent/SchoolAdmin/PermissionsBySchoolAdmin";
import SchoolAdminPermissions from "../../ModalContent/SchoolAdmin/SchoolAdminPermissions";
import UpdateSchoolAdmin from "../../ModalContent/SchoolAdmin/UpdateSchoolAdmin";
import SchoolAdminDetails from "../../ModalContent/SchoolAdmin/SchoolAdminDetails";
import SchoolAdminRoles from "../../ModalContent/SchoolAdmin/SchoolAdminRoles";
import RevokeSchoolAdminPermissions from "../../ModalContent/SchoolAdmin/RevokeSchoolAdminPermissions";
import SuspendSchoolAdmin from "../../ModalContent/SchoolAdmin/SuspendSchoolAdmin";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { ImageComponent } from "../../components/DataTableComponents/ImageComponent";
import CurrencyComponent from "../../components/DataTableComponents/CurrencyComponent";
function SchoolAdmins() {
  const { data: data, error, isLoading } = useFetchSchoolAdminsQuery();
  const filter_array_keys = [
    "id",
    "name",
    "email",
    "role",
    "salary",
    "created_at",
  ];
  const renameMapping = {
    id: "id",
    name: "Full Names",
    role: "Role",
    salary: "Salary",
    created_at: "Created At",
    email: "Email",
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }

  return (
    <>
      <div>
        <div className="my-2">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
                background: "#fff",
              }}
            >
              <Icon
                icon="grommet-icons:user-admin"
                className="fs-5 text-primary"
              />
            </div>
            <h4 className="fw-bold my-0">School Administrator</h4>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-flex flex-row align-items-end gap-2">
            <div className="d-block">
              <p className="font-size-xs my-0">Total Number adminstrators</p>
              <h1 className="fw-bold my-0">{data.data.length}</h1>
            </div>
          </div>
          <div className="end-block d-flex flex-row ms-auto justify-content-end gap-3">
            <Greenbutton
              lable="Create Admin"
              bg="green-bg"
              route="/create-school-admin"
            />
          </div>
        </div>
        <div className="pt-3 position-relative z-0">
          <Table
            colDefs={SchoolAdminTableConfig({
              ActionButtonGroup,
              ImageComponent,
              StatusComponent,
              CurrencyComponent
            })}
            rowData={renameKeys(
              CleanArrayData(data.data, filter_array_keys),
              renameMapping
            )}
            rowHeight={55}
          />
        </div>
      </div>
    </>
  );
}
export default SchoolAdmins;

function ActionButtonGroup(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Admin",
      actionTitle: "Update",
      modalContent: UpdateSchoolAdmin,
    },
    {
      modalTitle: "Delete Admin",
      actionTitle: "Delete",
      modalContent: DeleteSchoolAdmin,
    },
    {
      modalTitle: "Admin Details",
      actionTitle: "Details",
      modalContent: SchoolAdminDetails,
    },
    {
      modalTitle: "Suspend School Admin",
      actionTitle: "Suspend",
      modalContent: SuspendSchoolAdmin,
    },
    {
      modalTitle: "School Admin Permissions",
      actionTitle: "Permissions",
      modalContent: SchoolAdminPermissions,
    },
    {
      modalTitle: "View Permissions",
      actionTitle: "View Permissions",
      modalContent: PermissionsBySchoolAdmin,
    },
    {
      modalTitle: "School Admin Roles",
      actionTitle: "Assign Role",
      modalContent: SchoolAdminRoles,
    },
    {
      modalTitle: "Revoke Permissions",
      actionTitle: "Revoke Permission",
      modalContent: RevokeSchoolAdminPermissions,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}

export const StatusComponent = () => {
  return (
    <>
      <div className="position-relative z-0">
        <button
          className="border-none  rounded-1 primary-background d-flex flex-row gap-4 align-items-center font-size-sm"
          style={{ background: "#c8eac8", color: "#224523", height: "1.2rem" }}
        >
          <span>online</span>
        </button>
      </div>
    </>
  );
};
