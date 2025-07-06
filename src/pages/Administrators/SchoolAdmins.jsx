import { useFetchSchoolAdminsQuery } from "../../Slices/Asynslices/fetchSlice";
import Table from "../../components/Tables";
import { Icon } from "@iconify/react";
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
import CreateSchoolAdmin from "../../ModalContent/SchoolAdmin/CreateSchoolAdmin";
import { useMemo, useCallback, useState, useRef  } from "react";
import DataTablePageLoader from "../../components/PageLoaders/DataTablesPageLoader";
import CustomTooltip from "../../components/Tooltip";
import BulkActivateSchoolAdmin from "../../ModalContent/SchoolAdmin/BulkActivate";
import BulkDeactivateSchoolAdmin from "../../ModalContent/SchoolAdmin/BulkDeactivate";
import BulkUpdate from "../../ModalContent/SchoolAdmin/BulkUpdate";
import BulkActionsToast from "../../components/BulkActionsToast";
function SchoolAdmins() {
  const tableRef = useRef();
  const { data: schoolAdmins, isLoading } = useFetchSchoolAdminsQuery();
  const [rowCount, setRowCount] = useState(0);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const handleReset = () => {
    console.log("Reset triggered, deselecting rows...");
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedAdmins([]);
    }
  };
  const handleRowDataFromChild = useCallback((data) => {
    setSelectedAdmins(data);
  }, []);
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
    return <DataTablePageLoader />;
  }

  return (
    <>
      <div>
        <div className="my-2">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex justify-content-center align-items-center primary-background text-white"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
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
              action={{ modalContent: CreateSchoolAdmin }}
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
              ref={tableRef} 
              colDefs={memoizedColDefs}
              rowData={memoizedRowData}
              handleRowCountFromChild={handleRowCountFromChild}
              handleRowDataFromChild={handleRowDataFromChild}
              rowHeight={55}
            />
          </div>
          <BulkActionsToast
            rowCount={rowCount}
            label={"Selected Admins"}
            resetAll={handleReset}
            dropDownItems={<DropdownItems selectedAdmins={selectedAdmins} resetAll={handleReset}/>}
            actionButton={<ActionButtons selectedAdmins={selectedAdmins} resetAll={handleReset}/>}
          />
        </div>
      </div>
    </>
  );
}
export default SchoolAdmins;

function ActionButtons({selectedAdmins, resetAll}) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent: BulkDelete }}
        data={selectedAdmins}
        resetAll={resetAll}
      >
        <CustomTooltip tooltipText={"Delete All"}>
          <span className="pointer-cursor">
            <Icon icon="iconamoon:trash-thin" width="24" height="24" />
          </span>
        </CustomTooltip>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent: BulkUpdate }}
        data={selectedAdmins}
        resetAll={resetAll}
      >
        <CustomTooltip tooltipText={"Update All"}>
          <span className="pointer-cursor">
            <Icon icon="iconamoon:edit-thin" width="24" height="24" />
          </span>
        </CustomTooltip>
      </ModalButton>
    </>
  );
}

function DropdownItems({selectedAdmins, resetAll}) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent:BulkUpdate }}
        data={selectedAdmins}
        resetAll={resetAll}
      >
      <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item">
        <span className="font-size-sm">Update All</span>
      </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent:BulkDelete }}
        data={selectedAdmins}
        resetAll={resetAll}
      >
      <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item">
        <span className="font-size-sm">Delete All</span>
      </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent:BulkDeactivateSchoolAdmin }}
        data={selectedAdmins}
        resetAll={resetAll}
      >
      <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item">
        <span className="font-size-sm">Deactivate All</span>
      </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent:BulkActivateSchoolAdmin }}
        data={selectedAdmins}
        resetAll={resetAll}
      >
      <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item">
        <span className="font-size-sm">Activate All</span>
      </div>
      </ModalButton>
    </>
  );
}

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
