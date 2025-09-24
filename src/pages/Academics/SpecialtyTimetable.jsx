import Table from "../../components/Tables/Tables";
import { SpecialtyTimetableTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import ViewTimetable from "../../ModalContent/SpecialtyTimetable/ViewTimetable";
import DeleteTimetable from "../../ModalContent/SpecialtyTimetable/DeleteTimetable";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { useGetActiveSchoolSemesters } from "../../hooks/schoolSemester/useGetSchoolSemesters";
import React, { useState, useCallback, useRef } from "react";
import CustomModal from "../../components/Modals/Modal";
import { TimetableIcon } from "../../icons/Icons";
import { CreateIcon, DeleteIcon, UpdateIcon } from "../../icons/ActionIcons";
import AutomaticCreateTimetable from "../../ModalContent/SpecialtyTimetable/AutomaticCreateTimetable";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { useSelector } from "react-redux";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useNavigate } from "react-router-dom";
function SpecialtyTimetable() {
  const navigate = useNavigate();
  const {
    data: schoolSemesters,
    isLoading,
    error,
  } = useGetActiveSchoolSemesters();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const tableRef = useRef();
  const [rowCount, setRowCount] = useState(0);
  const [selectedTimetable, setSelectedTimetable] = useState([]);
  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedTimetable([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedTimetable(Data);
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
              <TimetableIcon />
            </div>
            <span className="my-0 fw-semibold">Manage Specialty Timetable</span>
          </div>
          <div className="d-flex flex-column">
            <p className="font-size-xs my-0">Number of semesters</p>
            <h1 className="fw-bold my-0">
              {schoolSemesters?.data?.length || 0}
            </h1>
          </div>
        </div>
        <div style={{ height: "85%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          ) : error ? (
            <NotFoundError
              title="No Semesters Found"
              description="We couldn’t find any semesters for this branch. Please create a semester before setting up a timetable."
            >
              <button 
               className="border-none rounded-2 p-2 font-size-sm primary-background-100"
               onClick={() => {
                 navigate("/semesters")
               }}
              >
                Go To Semesters
              </button>
            </NotFoundError>
          ) : schoolSemesters.data.length > 0 ? (
            <>
              <Table
                colDefs={SpecialtyTimetableTableConfig({
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
                      ? "Timetable Selected"
                      : rowCount >= 2
                      ? "Timetables Selected"
                      : null
                  }`}
                  resetAll={handleReset}
                  dropDownItems={
                    <DropdownItems
                      selectedTimetable={selectedTimetable}
                      resetAll={handleReset}
                    />
                  }
                  actionButton={
                    <ActionButtons
                      selectedTimetable={selectedTimetable}
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
export default SpecialtyTimetable;

function ActionButtonGroup(props) {
  const rowData = props.data;

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("md");
  const [fullscreen, setFullscreen] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleShowModal = (
    ContentComponent,
    size = "md",
    fullscreen = false
  ) => {
    setModalContent(
      React.createElement(ContentComponent, {
        rowData,
        handleClose: handleCloseModal,
      })
    );
    setModalSize(size);
    setShowModal(true);
    setFullscreen(fullscreen);
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
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(AutomaticCreateTimetable, "xl")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Create Timetable</span>
              <CreateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        {/* <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(UpdateTimetable, "xl", false)}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Timetable</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>*/}
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteTimetable, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Timetable</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(ViewTimetable, "xl")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>View Timetable</span>
              <TimetableIcon />
            </div>
          </div>
        </DropDownMenuItem>
      </ActionButtonDropdown>

      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalSize}
        fullscreen={fullscreen}
        centered
      >
        {modalContent}
      </CustomModal>
    </>
  );
}

function ActionButtons({ selectedTimetable, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        //action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedTimetable}
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
function DropdownItems({ selectedTimetable, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent: BulkDeleteCourse }}
        bulkData={selectedTimetable}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
        </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent:BulkDeactivateCourse }}
        bulkData={selectedTimetable}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Deactivate All</span>
          <SuspendIcon />
        </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        // action={{ modalContent: BulkActivateCourse }}
        bulkData={selectedTimetable}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Activate All</span>
          <ActivateIcon />
        </div>
      </ModalButton>
    </>
  );
}
