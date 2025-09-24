import { Icon } from "@iconify/react";
import Table from "../../components/Tables/Tables";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { semesterTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import UpdateSemester from "../../ModalContent/Semesters/UpdateSemester";
import DeleteSemester from "../../ModalContent/Semesters/DeleteSemester";
import SemeseterDetails from "../../ModalContent/Semesters/SemesterDetails";
import CreateSemester from "../../ModalContent/Semesters/CreateSemester";
import { useGetActiveSchoolSemesters } from "../../hooks/schoolSemester/useGetSchoolSemesters";
import React, { useState, useCallback, useRef, useEffect } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { DetailsIcon, UpdateIcon, DeleteIcon } from "../../icons/ActionIcons";
import { SemesterIcon } from "../../icons/Icons";
import { useSelector } from "react-redux";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import BulkDeleteSemester from "../../ModalContent/Semesters/BulkDeleteSemester";
import BulkUpdateSemester from "../../ModalContent/Semesters/BulkUpdateSemester";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function Semester() {
  const {
    data: schoolSemesters,
    isLoading,
    error,
  } = useGetActiveSchoolSemesters();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const tableRef = useRef();
  const [rowCount, setRowCount] = useState(0);
  const [selectedSemesters, setSelectedSemesters] = useState([]);
  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedSemesters([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedSemesters(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  return (
    <>
      <main className="main-container gap-2">
        <div className="d-flex flex-column gap-3" style={{ height: "15%" }}>
          <div className="d-flex align-items-center gap-2">
            <div
              className={`${
                darkMode ? "dark-mode-active" : "light-mode-active"
              } d-flex justify-content-center align-items-center`}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
              }}
            >
              <SemesterIcon />
            </div>
            <span className="my-0 fw-semibold">Semester Management</span>
          </div>
          <div className="d-flex flex-row align-items-center w-100">
            <div className="d-flex flex-row align-items-end gap-2">
              <div className="d-block">
                <p className="font-size-xs my-0">Created Semesters</p>
                <h1 className="fw-bold my-0">
                  {schoolSemesters?.data?.length || 0}
                </h1>
              </div>
            </div>
            <div className="end-block d-flex flex-row ms-auto justify-content-end gap-3">
              <ModalButton
                classname={
                  "border-none green-bg font-size-sm rounded-3 px-3 gap-2 py-2 d-flex flex-row align-items-center d-flex text-white"
                }
                action={{ modalContent: CreateSemester }}
                size={"lg"}
              >
                <Icon icon="icons8:plus" className="font-size-md" />
                <span className="font-size-sm">Create Semester</span>
              </ModalButton>
            </div>
          </div>
        </div>
        <div style={{ height: "85%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          ) : error ? (
            <NotFoundError
              title={error.response.data.errors.title}
              description={error.response.data.errors.description}
            ></NotFoundError>
          ) : schoolSemesters?.data?.length > 0 ? (
            <>
              <Table
                colDefs={semesterTableConfig({
                  ActionButtonGroup,
                })}
                rowData={schoolSemesters.data}
                rowHeight={55}
                ref={tableRef}
                handleRowCountFromChild={handleRowCountFromChild}
                handleRowDataFromChild={handleRowDataFromChild}
              />
              {rowCount > 0 && (
                <BulkActionsToast
                  rowCount={rowCount}
                  label={`${
                    rowCount >= 1
                      ? "Semester Selected"
                      : rowCount >= 2
                      ? "Semesters Selected"
                      : null
                  }`}
                  resetAll={handleReset}
                  dropDownItems={
                    <DropdownItems
                      selectedSemesters={selectedSemesters}
                      resetAll={handleReset}
                    />
                  }
                  actionButton={
                    <ActionButtons
                      selectedSemesters={selectedSemesters}
                      resetAll={handleReset}
                    />
                  }
                />
              )}
            </>
          ) : (
            <div className="alert alert-warning">No Semester Added Found</div>
          )}
        </div>
      </main>
    </>
  );
}
export default Semester;
function ActionButtonGroup(props) {
  const rowData = props.data;

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("md");

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleShowModal = (ContentComponent, size = "md") => {
    setModalContent(
      React.createElement(ContentComponent, {
        rowData,
        handleClose: handleCloseModal,
      })
    );
    setModalSize(size);
    setShowModal(true);
  };
  //delete. update. details
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
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(UpdateSemester, "lg")}
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
          onClick={() => handleShowModal(DeleteSemester, "md")}
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
          onClick={() => handleShowModal(SemeseterDetails, "md")}
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
function ActionButtons({ selectedSemesters, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        action={{ modalContent: BulkDeleteSemester }}
        bulkData={selectedSemesters}
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
function DropdownItems({ selectedSemesters, resetAll, onModalStateChange }) {
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
        bulkData: selectedSemesters,
      })
    );
    setModalSize(size);
    setShowModal(true);
  };
  return (
    <>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeleteSemester, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkUpdateSemester, "lg")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Update All</span>
          <UpdateIcon />
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
