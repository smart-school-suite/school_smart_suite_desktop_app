import { Icon } from "@iconify/react";
import { SchoolAdminTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import React from "react";
import { ImageComponent } from "../../components/DataTableComponents/ImageComponent";
import ActionButtonDropdown, { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import BulkDelete from "../../ModalContent/SchoolAdmin/BulkDelete";
import ManagePermission from "../../ModalContent/SchoolAdmin/ManagePermission";
import ManageRoles from "../../ModalContent/SchoolAdmin/ManageRole";
import CreateSchoolAdmin from "../../ModalContent/SchoolAdmin/CreateSchoolAdmin";
import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import BulkActivateSchoolAdmin from "../../ModalContent/SchoolAdmin/BulkActivate";
import BulkDeactivateSchoolAdmin from "../../ModalContent/SchoolAdmin/BulkDeactivate";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import Table from "../../components/Tables/Tables";
import { useGetSchoolAdmins } from "../../hooks/schoolAdmin/useGetSchoolAdmins";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { ActivateIcon, DeleteIcon, DetailsIcon, PermissionIcon, RoleIcon, SuspendIcon, UpdateIcon } from "../../icons/ActionIcons";
import DeleteSchoolAdmin from "../../ModalContent/SchoolAdmin/DeleteSchoolAdmin";
import DeactivateSchoolAdmin from "../../ModalContent/SchoolAdmin/Deactivate";
import ActivateSchoolAdmin from "../../ModalContent/SchoolAdmin/Activate";
import SchoolAdminDetails from "../../ModalContent/SchoolAdmin/SchoolAdminDetails";
import UpdateSchoolAdmin from "../../ModalContent/SchoolAdmin/UpdateSchoolAdmin";
import DataTablePageLoader from "../../components/PageLoaders/DataTablesPageLoader";
import { SchoolAdminIcon } from "../../icons/Icons";
import { useSelector } from "react-redux";
function SchoolAdmins() {
  const tableRef = useRef();
  const { data: schoolAdmins, isLoading } = useGetSchoolAdmins();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [rowCount, setRowCount] = useState(0);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedAdmins([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedAdmins(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return SchoolAdminTableConfig({
      ImageComponent,
      ActionButtonGroup,
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
              className={`${darkMode ? 'dark-mode-active' : 'light-mode-active'} d-flex justify-content-center align-items-center`}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
              }}
            >
              <SchoolAdminIcon />
            </div>
            <span className="my-0 fw-semibold">School Administrator</span>
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
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        action={{ modalContent: BulkDelete }}
        bulkData={selectedAdmins}
        resetAll={resetAll}
      >
        <CustomTooltip tooltipText={"Delete All"}>
          <span className="pointer-cursor">
            <Icon icon="iconamoon:trash-thin" width="24" height="24" />
          </span>
        </CustomTooltip>
      </ModalButton>
    </>
  );
}
function DropdownItems({ selectedAdmins, resetAll, onModalStateChange }) {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalSize, setModalSize] = useState("lg");
    const modalRef = useRef(null);
    useEffect(() => {
      onModalStateChange(showModal, modalRef);
    }, [showModal, onModalStateChange]);
  
    const handleCloseModal = () => {
      setShowModal(false);
      setModalContent(null);
    };
  
    const handleShowModal = (ContentComponent, size = "lg") => {
      setModalContent(
        React.createElement(ContentComponent, {
          handleClose: handleCloseModal,
          resetAll,
          bulkData: selectedAdmins,
        })
      );
      setModalSize(size);
      setShowModal(true);
    };
  
  return (
    <>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDelete, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeactivateSchoolAdmin, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Deactivate All</span>
          <SuspendIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkActivateSchoolAdmin, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Activate All</span>
          <ActivateIcon />
        </div>
      </DropDownMenuItem>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalSize}
        centered
        ref={modalRef}
      >
        {modalContent}
      </CustomModal>
    </>
  );
}
function ActionButtonGroup(props) {
   const rowData = props.data;

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("lg");

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null); 
  };

  const handleShowModal = (ContentComponent, size = "lg") => {
    setModalContent(React.createElement(ContentComponent, { rowData, handleClose: handleCloseModal }));
    setModalSize(size);
    setShowModal(true);
  };

  return (
    <>
    <ActionButtonDropdown
      buttonContent={"Edit Actions"}
      style={
        "tableActionButton primary-background text-white font-size-sm px-2"
      }
    >
       <DropDownMenuItem
           className={"remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"}
          onClick={() => handleShowModal(ManagePermission, "lg")}
       >
            <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Manage Permission</span>
            <PermissionIcon />
          </div>
        </div>
       </DropDownMenuItem>
      <DropDownMenuItem
        className={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
        }
        onClick={() => handleShowModal(ManageRoles, "lg")}
      >
        <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Manage Role</span>
            <RoleIcon />
          </div>
        </div>
      </DropDownMenuItem>
      {
         rowData.status == 'active' ? <DropDownMenuItem
        className={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor "
        }
        onClick={() => handleShowModal(DeactivateSchoolAdmin, 'md')}
      >
        <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between ">
            <span>Deactivate</span>
            <SuspendIcon />
          </div>
        </div>
      </DropDownMenuItem> : 
      <DropDownMenuItem
        className={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor "
        }
        onClick={() => handleShowModal(ActivateSchoolAdmin, 'md')}
      >
        <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between ">
            <span>Activate</span>
            <ActivateIcon />
          </div>
        </div>
      </DropDownMenuItem>
      }
      <DropDownMenuItem
        className={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
        }
        size={"lg"}
        onClick={() => handleShowModal(DeleteSchoolAdmin, 'md')}
      >
        <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Delete</span>
            <DeleteIcon />
          </div>
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
       className={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
        }
        onClick={() => handleShowModal(UpdateSchoolAdmin, 'md')}
      >
        <div>
        <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
          <span>Update</span>
          <UpdateIcon />
        </div>
      </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className={
          "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
        }
        onClick={() => handleShowModal(SchoolAdminDetails, 'md')}
      >
        <div>
        <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
          <span>Details</span>
          <DetailsIcon />
        </div>
      </div>
      </DropDownMenuItem>
    </ActionButtonDropdown>
          <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalSize}
        centered
      >
        {modalContent}
      </CustomModal>
    </>
  );
}
