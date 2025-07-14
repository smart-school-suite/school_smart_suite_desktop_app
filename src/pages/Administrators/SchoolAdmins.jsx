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
import ManagePermission from "../../ModalContent/SchoolAdmin/ManagePermission";
import ManageRoles from "../../ModalContent/SchoolAdmin/ManageRole";
import CreateSchoolAdmin from "../../ModalContent/SchoolAdmin/CreateSchoolAdmin";
import { useMemo, useCallback, useState, useRef } from "react";
import DataTablePageLoader from "../../components/PageLoaders/DataTablesPageLoader";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import BulkActivateSchoolAdmin from "../../ModalContent/SchoolAdmin/BulkActivate";
import BulkDeactivateSchoolAdmin from "../../ModalContent/SchoolAdmin/BulkDeactivate";
import BulkUpdate from "../../ModalContent/SchoolAdmin/BulkUpdate";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import Table from "../../components/Tables/Tables";
import { useGetSchoolAdmins } from "../../hooks/schoolAdmin/useGetSchoolAdmins";
import { DeleteIcon, DetailsIcon, HodIcon, HosIcon, PermissionIcon, RoleIcon, SuspendIcon, UpdateIcon } from "../../icons/ActionIcons";
function SchoolAdmins() {
  const tableRef = useRef();
  const { data: schoolAdmins, isFetching } = useGetSchoolAdmins();
  const [rowCount, setRowCount] = useState(0);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const handleReset = () => {
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

  if (isFetching) {
    return <DataTablePageLoader />;
  }

  return (
    <>
      <div>
        <div className="my-2">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex justify-content-center align-items-center primary-background-100"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
              }}
            >
              <Icon
                icon="grommet-icons:user-admin"
                className="font-size-md primary-color"
              />
            </div>
            <span className="my-0">School Administrator</span>
          </div>
        </div>

        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-flex flex-row align-items-end gap-2">
            <div className="d-block">
              <p className="font-size-xs my-0">Total Number administrators</p>
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
            dropDownItems={
              <DropdownItems
                selectedAdmins={selectedAdmins}
                resetAll={handleReset}
              />
            }
            actionButton={
              <ActionButtons
                selectedAdmins={selectedAdmins}
                resetAll={handleReset}
              />
            }
          />
        </div>
      </div>
    </>
  );
}
export default SchoolAdmins;

function ActionButtons({ selectedAdmins, resetAll }) {
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

function DropdownItems({ selectedAdmins, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent: BulkUpdate }}
        data={selectedAdmins}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item">
          <span className="font-size-sm">Update All</span>
        </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent: BulkDelete }}
        data={selectedAdmins}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item">
          <span className="font-size-sm">Delete All</span>
        </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent: BulkDeactivateSchoolAdmin }}
        data={selectedAdmins}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item">
          <span className="font-size-sm">Deactivate All</span>
        </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        action={{ modalContent: BulkActivateSchoolAdmin }}
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
  const rowData = props.data;
  return (
    <ActionButtonDropdown
      buttonContent={"Edit Actions"}
      style={
        "tableActionButton primary-background text-white font-size-sm px-2"
      }
    >
      <ModalButton
        classname={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
        }
        rowData={rowData}
        action={{ modalContent:ManagePermission }}
        size={"lg"}
      >
        <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Manage Permission</span>
            <PermissionIcon />
          </div>
        </div>
      </ModalButton>
      <ModalButton
        classname={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
        }
        rowData={rowData}
        action={{ modalContent:ManageRoles }}
        size={"lg"}
      >
        <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Manage Role</span>
            <RoleIcon />
          </div>
        </div>
      </ModalButton>
      <ModalButton
        classname={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
        }
        action={{ modalContent:AppointHod }}
        rowData={rowData}
        size={"lg"}
      >
        <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Appoint HOD</span>
            <HodIcon />
          </div>
        </div>
      </ModalButton>
      <ModalButton
        classname={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
        }
      >
        <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Appoint HOS</span>
            <HosIcon />
          </div>
        </div>
      </ModalButton>
      <ModalButton
        classname={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor "
        }
        
      >
        <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between ">
            <span>Suspend</span>
            <SuspendIcon />
          </div>
        </div>
      </ModalButton>
      <ModalButton
        classname={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
        }
        size={"lg"}
      >
        <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Delete</span>
            <DeleteIcon />
          </div>
        </div>
      </ModalButton>
      <ModalButton
       classname={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
        }
      >
        <div>
        <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
          <span>Update</span>
          <UpdateIcon />
        </div>
      </div>
      </ModalButton>
      <ModalButton
        classname={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
        }
      >
        <div>
        <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
          <span>Details</span>
          <DetailsIcon />
        </div>
      </div>
      </ModalButton>
    </ActionButtonDropdown>
  );
}
