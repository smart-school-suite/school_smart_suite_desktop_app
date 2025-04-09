import { useFetchSchoolAdminsQuery } from "../../Slices/Asynslices/fetchSlice";
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
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import AccountStatus from "../../ModalContent/SchoolAdmin/AccountStatus";
import AppointHod from "../../ModalContent/SchoolAdmin/AppointHod";
import AppointHos from "../../ModalContent/SchoolAdmin/AppointHos";
import BulkDelete from "../../ModalContent/SchoolAdmin/BulkDelete";
import { useMemo, useCallback, useState } from "react";
import CustomTooltip from "../../components/Tooltip";

function SchoolAdmins() {
  const { data: schoolAdmins, isLoading } = useFetchSchoolAdminsQuery();
  const [rowCount, setRowCount] = useState(0);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return SchoolAdminTableConfig({
      ActionButtonGroup,
      ImageComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return schoolAdmins?.data ?? [];
  }, [schoolAdmins]);

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
                borderRadius: "0.5rem",
                background: "#fff",
              }}
            >
              <Icon
                icon="grommet-icons:user-admin"
                className="fs-5 primary-color"
              />
            </div>
            <h5 className="my-0">School Administrator</h5>
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-flex flex-row align-items-end gap-2">
            <div className="d-block">
              <p className="font-size-xs my-0">
                Total Number administrators {rowCount}
              </p>
              <h1 className="fw-bold my-0">{memoizedRowData.length}</h1>
            </div>
          </div>

          <div className="end-block d-flex flex-row ms-auto justify-content-end gap-3">
            <ModalButton
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 gap-2 py-2 d-flex flex-row align-items-center text-white"
              }
            >
              <Icon icon="icons8:plus" className="font-size-md" />
              <span className="font-size-sm">Create Admin</span>
            </ModalButton>
          </div>
        </div>
        <div className="position-relative">
          <div className="pt-3 position-relative z-1">
            <Table
              colDefs={memoizedColDefs}
              rowData={memoizedRowData}
              handleRowCountFromChild={handleRowCountFromChild}
              rowHeight={55}
            />
          </div>
          <div className="z-3 w-100 d-flex flex-row align-items-center justify-content-center table-toast-container">
            <div className="w-50 p-2 bg-white rounded-3 d-flex flex-row justify-content-between align-item-center table-toast shadow-sm border">
              <div className="d-flex flex-row align-items-center gap-3">
                <input type="checkbox" className="form-check-input m-0"  checked/>
                <span className="font-size-sm fw-medium">
                  2 Admins Selected
                </span>
              </div>
              <div className="d-flex flex-row gap-3">
                 <ModalButton
                  classname={"border-none transparent-bg"}
                  action={{ modalContent:BulkDelete }}
                 >
                <CustomTooltip tooltipText={"Delete All"}>
                 <span className="pointer-cursor">
                    <Icon icon="iconamoon:trash-thin" width="24" height="24" />
                  </span>
                </CustomTooltip>
                 </ModalButton>
                <CustomTooltip tooltipText={"Update All"}>
                  <span className="pointer-cursor">
                    <Icon icon="iconamoon:edit-thin" width="24" height="24" />
                  </span>
                </CustomTooltip>
                <CustomTooltip tooltipText={"Menu Actions"}>
                  <span className="pointer-cursor">
                    <Icon icon="circum:menu-kebab" width="24" height="24" />
                  </span>
                </CustomTooltip>
                <CustomTooltip tooltipText={"Cancel"}>
                  <span className="pointer-cursor">
                    <Icon
                      icon="material-symbols-light:cancel-outline"
                      width="24"
                      height="24"
                    />
                  </span>
                </CustomTooltip>
              </div>
            </div>
          </div>
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
      icon: "mynaui:edit-solid",
      modalContent: UpdateSchoolAdmin,
    },
    {
      actionTitle: "Delete",
      icon: "fluent:delete-16-filled",
      modalContent: DeleteSchoolAdmin,
    },
    {
      actionTitle: "Details",
      icon: "bxs:detail",
      modalContent: SchoolAdminDetails,
    },
    {
      actionTitle: "Suspend",
      icon: "lsicon:suspend-filled",
      modalContent: SuspendSchoolAdmin,
    },
    {
      actionTitle: "Permissions",
      icon: "icon-park-outline:permissions",
      modalContent: SchoolAdminPermissions,
    },
    {
      actionTitle: "View Permissions",
      icon: "icon-park-outline:permissions",
      modalContent: PermissionsBySchoolAdmin,
    },
    {
      actionTitle: "Assign Role",
      icon: "eos-icons:role-binding",
      modalContent: SchoolAdminRoles,
    },
    {
      actionTitle: "Revoke Permission",
      icon: "lets-icons:remove-fill",
      modalContent: RevokeSchoolAdminPermissions,
    },
    {
      actionTitle: "Account Status",
      icon: "heroicons-outline:status-online",
      modalContent: AccountStatus,
    },
    {
      actionTitle: "Appoint HOD",
      icon: "subway:admin-1",
      modalContent: AppointHod,
    },
    {
      actionTitle: "Appoint HOS",
      icon: "solar:user-plus-bold",
      modalContent: AppointHos,
    },
  ];
  const memoizedActions = useMemo(() => actions, []);
  return (
    <ActionButtonDropdown
      actions={memoizedActions}
      row_id={id}
      style={
        "tableActionButton primary-background text-white font-size-sm px-2"
      }
    >
      <span>Edit Actions</span>
    </ActionButtonDropdown>
  );
}
