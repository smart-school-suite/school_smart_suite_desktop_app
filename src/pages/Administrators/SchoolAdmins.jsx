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
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import AccountStatus from "../../ModalContent/SchoolAdmin/AccountStatus";
import AppointHod from "../../ModalContent/SchoolAdmin/AppointHod";
import AppointHos from "../../ModalContent/SchoolAdmin/AppointHos";
function SchoolAdmins() {
  const { data: data, error, isLoading } = useFetchSchoolAdminsQuery();
  const filter_array_keys = [
    "id",
    "name",
    "email",
    "role",
    "salary",
    'profile_picture',
    "created_at",
  ];
  const renameMapping = {
    id: "id",
    name: "Full Names",
    role: "Role",
    salary: "Salary",
    created_at: "Created At",
    email: "Email",
    profile_picture:"profile_picture"
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
          <ModalButton
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 gap-2 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
              
            >
              <Icon icon="icons8:plus"  className="font-size-md"/>
              <span className="font-size-sm">Create Admin</span>
            </ModalButton>
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
      actionTitle: "Update",
      icon:"mynaui:edit-solid",
      modalContent: UpdateSchoolAdmin,
    },
    {
      actionTitle: "Delete",
      icon:"fluent:delete-16-filled",
      modalContent: DeleteSchoolAdmin,
    },
    {
      actionTitle: "Details",
      icon:"bxs:detail",
      modalContent: SchoolAdminDetails,
    },
    {
      actionTitle: "Suspend",
      icon:"lsicon:suspend-filled",
      modalContent: SuspendSchoolAdmin,
    },
    {
      actionTitle: "Permissions",
      icon:"icon-park-outline:permissions",
      modalContent: SchoolAdminPermissions,
    },
    {
      actionTitle: "View Permissions",
      icon:"icon-park-outline:permissions",
      modalContent: PermissionsBySchoolAdmin,
    },
    {
      actionTitle: "Assign Role",
      icon:"eos-icons:role-binding",
      modalContent: SchoolAdminRoles,
    },
    {
      actionTitle: "Revoke Permission",
      icon:"lets-icons:remove-fill",
      modalContent: RevokeSchoolAdminPermissions,
    },
    {
      actionTitle:"Account Status",
      icon:"heroicons-outline:status-online",
      modalContent:AccountStatus
    },
    {
      actionTitle:"Appoint HOD",
      icon:"subway:admin-1",
      modalContent:AppointHod
    },
    {
      actionTitle:"Appoint HOS",
      icon:"solar:user-plus-bold",
      modalContent:AppointHos
    }
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id}
       style={'tableActionButton primary-background text-white font-size-sm px-2'}
      >
         <span>Edit Actions</span>
      </ActionButtonDropdown>
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
