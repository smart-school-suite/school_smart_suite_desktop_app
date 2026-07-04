import Table from "../../components/Tables/Tables";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { teacherTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeactivateTeacher from "../../ModalContent/Teacher/DeactivateTeacher";
import DeleteTeacher from "../../ModalContent/Teacher/DeleteTeacher";
import TeacherDetails from "../../ModalContent/Teacher/TeacherDetails";
import UpdateTeacher from "../../ModalContent/Teacher/UpdateTeacher";
import CreateTeacher from "../../ModalContent/Teacher/CreateTeacher";
import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { Icon } from "@iconify/react";
import { useGetTeachers } from "../../hooks/teacher/useGetTeachers";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import ActivateTeacher from "../../ModalContent/Teacher/ActivateTeacher";
import {
  DeleteIcon,
  DetailsIcon,
  UpdateIcon,
  SuspendIcon,
  ActivateIcon,
} from "../../icons/ActionIcons";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import BulkDeleteTeacher from "../../ModalContent/Teacher/BulkDeleteTeacher";
import BulkDeactivateTeacher from "../../ModalContent/Teacher/BulkDeactivateTeacher";
import BulkActivateTeacher from "../../ModalContent/Teacher/BulkActivateTeacher";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import ExportTeacher from "../../ModalContent/Teacher/ExportTeacher";
import TeacherTableSetting from "../../ModalContent/Teacher/TeacherTableSetting";
function Teachers() {
  const { data: teachers, isLoading, error } = useGetTeachers();
  const tableRef = useRef(null);
  const [rowCount, setRowCount] = useState(0);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedTeachers([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedTeachers(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  const memoizedColDefs = useMemo(() => {
    return teacherTableConfig({
      DropdownComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return teachers?.data ?? [];
  }, [teachers]);

  const handleSearch = (e) => {
    if (tableRef.current && tableRef.current.setGridOption) {
      tableRef.current.setGridOption("quickFilterText", e.target.value);
    }
  };

  return (
    <>
      <main className="main-container gap-2 h-100">
        <div className="h-100">
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <>
              <div className="d-flex flex-column gap-2 h-100">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="d-flex flex-row align-items-center gap-2">
                    <button
                      className="border-none border rounded-3 font-size-sm px-2 py-1 d-flex flex-row align-items-center gap-1 white-bg"
                      style={{ fontSize: "0.7rem" }}
                    >
                      <span style={{ lineHeight: "16px" }}>Full Name</span>
                      <span>
                        <Icon
                          icon="majesticons:chevron-down"
                          width={16}
                          height={16}
                        />
                      </span>
                    </button>
                    <button
                      className="border-none border rounded-3 font-size-sm px-2 py-1 d-flex flex-row align-items-center gap-1 white-bg"
                      style={{ fontSize: "0.7rem" }}
                    >
                      <span style={{ lineHeight: "16px" }}>Username</span>
                      <span>
                        <Icon
                          icon="majesticons:chevron-down"
                          width={16}
                          height={16}
                        />
                      </span>
                    </button>
                    <button
                      className="border-none border rounded-3 font-size-sm px-2 py-1 d-flex flex-row align-items-center gap-1 white-bg"
                      style={{ fontSize: "0.7rem" }}
                    >
                      <span style={{ lineHeight: "16px" }}>Email</span>
                      <span>
                        <Icon
                          icon="majesticons:chevron-down"
                          width={16}
                          height={16}
                        />
                      </span>
                    </button>
                    <button
                      className="border-none border rounded-3 font-size-sm px-2 py-1 d-flex flex-row align-items-center gap-1 white-bg"
                      style={{ fontSize: "0.7rem" }}
                    >
                      <span style={{ lineHeight: "16px" }}>Specialties</span>
                      <span>
                        <Icon
                          icon="majesticons:chevron-down"
                          width={16}
                          height={16}
                        />
                      </span>
                    </button>
                    <button className="border-none border rounded-3 font-size-sm px-2 py-1  d-flex flex-row align-items-center white-bg">
                      <span>
                        <Icon icon="ic:round-plus" width={14} height={14} />
                      </span>
                    </button>
                    <button
                      className="border-none border rounded-3 font-size-sm px-2 py-1 d-flex flex-row align-items-center gap-1 white-bg"
                      style={{ fontSize: "0.7rem" }}
                    >
                      <span>
                        <Icon icon="mynaui:filter" width={16} height={16} />
                      </span>
                      <span style={{ lineHeight: "16px" }}>Filter</span>
                    </button>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <button className="border-none border rounded-3 font-size-sm p-2  d-flex flex-row align-items-center white-bg">
                      <span>
                        <Icon icon="grommet-icons:revert" width={16} height={16} />
                      </span>
                    </button>
                    <button className="border-none border rounded-3 font-size-sm p-2  d-flex flex-row align-items-center white-bg">
                      <span>
                        <Icon icon="mage:copy" width={16} height={16} />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center">
                  <input
                    type="search"
                    placeholder="Search Teacher"
                    onChange={handleSearch}
                    className="font-size-sm form-control w-25"
                  />
                  <div className="d-flex flex-row align-items-center gap-2">
                    <ModalButton
                     action={{ modalContent: ExportTeacher }}
                     size={"xl"}
                     rowData={{ teachers, tableRef }}
                    >
                      <button 
                        className="border-none border rounded-3 font-size-sm px-2 py-1 d-flex flex-row align-items-center gap-1 white-bg">
                        <span style={{ lineHeight: "16px" }}>Export</span>
                        <span>
                          <Icon icon="tabler:arrow-up" width={14} height={14} />
                        </span>
                      </button>
                    </ModalButton>
                   <ModalButton 
                     action={{ modalContent: TeacherTableSetting }}
                     size={"lg"}
                   >
                     <button className="border-none border rounded-3 font-size-sm px-2 py-1 d-flex flex-row align-items-center gap-1 white-bg">
                      <span>
                        <Icon
                          icon="lsicon:setting-outline"
                          width={20}
                          height={20}
                        />
                      </span>
                    </button>
                   </ModalButton>
                  </div>
                </div>
                <div style={{ height: "100%" }}>
                  <Table
                    colDefs={memoizedColDefs}
                    rowData={memoizedRowData}
                    rowHeight={45}
                    ref={tableRef}
                    handleRowCountFromChild={handleRowCountFromChild}
                    handleRowDataFromChild={handleRowDataFromChild}
                  />
                  {rowCount > 0 && (
                    <BulkActionsToast
                      rowCount={rowCount}
                      label={`${
                        rowCount > 1 ? "Teacher Selected" : "Teachers Selected"
                      }`}
                      resetAll={handleReset}
                      dropDownItems={
                        <DropdownItems
                          selectedTeachers={selectedTeachers}
                          resetAll={handleReset}
                        />
                      }
                      actionButton={
                        <ActionButtons
                          selectedTeachers={selectedTeachers}
                          resetAll={handleReset}
                        />
                      }
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default Teachers;

export function DropdownComponent(props) {
  const rowData = props.data;
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("lg");

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleShowModal = (ContentComponent, size = "lg") => {
    setModalContent(
      React.createElement(ContentComponent, {
        rowData,
        handleClose: handleCloseModal,
      }),
    );
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
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-3 pointer-cursor"
          }
          onClick={() => handleShowModal(UpdateTeacher, "lg")}
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
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-3 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteTeacher, "md")}
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
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-3 pointer-cursor"
          }
          onClick={() => handleShowModal(TeacherDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        {rowData.status == "active" ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-3 pointer-cursor"
            }
            onClick={() => handleShowModal(DeactivateTeacher, "md")}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Deactivate</span>
                <SuspendIcon />
              </div>
            </div>
          </DropDownMenuItem>
        ) : (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-3 pointer-cursor"
            }
            onClick={() => handleShowModal(ActivateTeacher, "md")}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Activate</span>
                <ActivateIcon />
              </div>
            </div>
          </DropDownMenuItem>
        )}
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

function ActionButtons({ selectedTeachers, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedTeachers}
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
function DropdownItems({ selectedTeachers, resetAll, onModalStateChange }) {
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
        bulkData: selectedTeachers,
      }),
    );
    setModalSize(size);
    setShowModal(true);
  };

  return (
    <>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeleteTeacher, "md")}
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeactivateTeacher, "md")}
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Deactivate All</span>
          <SuspendIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkActivateTeacher, "md")}
      >
        <div className="py-2 px-1 rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
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
