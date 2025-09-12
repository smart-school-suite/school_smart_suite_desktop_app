import Table from "../../components/Tables/Tables";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { GradeIcon } from "../../icons/Icons";
import { useGetExamResults } from "../../hooks/examResults/useGetExamResults";
import { ExamResultsTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import  React, { useState, useRef, useCallback } from "react";
import CustomModal from "../../components/Modals/Modal";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { CreateIcon, DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import ExamResultDetails from "../../ModalContent/ExamResults/ResultDetails";
import { useSelector } from "react-redux";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
function ExamResults(){
 const { data:examResults, isLoading } = useGetExamResults();
 const darkMode = useSelector((state) => state.theme.darkMode);
   const tableRef = useRef();
   const [rowCount, setRowCount] = useState(0);
   const [selectedExamResults, setSelectedExamResults] = useState([]);
   const handleReset = () => {
     if (tableRef.current) {
       tableRef.current.deselectAll();
       setRowCount(0);
       setSelectedExamResults([]);
     }
   };
   const handleRowDataFromChild = useCallback((Data) => {
     setSelectedExamResults(Data);
   }, []);
   const handleRowCountFromChild = useCallback((count) => {
     setRowCount(count);
   }, []);
 if(isLoading){
    return(
        <DataTableNavLoader />
    )
 }
    return(
        <>
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
            <GradeIcon />
          </div>
          <span className="my-0 fw-semibold">Exam Results</span>
        </div>
      </div>
      <div className="d-flex flex-column my-3">
        <div className="d-block">
          <p className="font-size-xs my-0">Total Number of Results</p>
          <h1 className="fw-bold my-0">{examResults?.data?.length}</h1>
        </div>
      </div>
      <div>
        {examResults?.data?.length > 0 ? (
          <>
          <Table
            colDefs={ExamResultsTableConfig({ DropdownComponent })}
            rowData={examResults?.data}
              ref={tableRef}
              handleRowCountFromChild={handleRowCountFromChild}
              handleRowDataFromChild={handleRowDataFromChild}
          />
          <BulkActionsToast
              rowCount={rowCount}
              label={`${
                rowCount >= 1
                  ? "Exam Result Selected"
                  : rowCount >= 2
                  ? "Exam Results Selected"
                  : null
              }`}
              resetAll={handleReset}
              dropDownItems={
                <DropdownItems
                  selectedExamResults={selectedExamResults}
                  resetAll={handleReset}
                />
              }
              actionButton={
                <ActionButtons
                  selectedExamResults={selectedExamResults}
                  resetAll={handleReset}
                />
              }
            />
            </>
        ) : (
          <div className="alert alert-warning">No Exam Results Added</div>
        )}
      </div>
        </>
    )
}
export default ExamResults;

export function DropdownComponent(props) {
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
          onClick={() => handleShowModal(ExamResultDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Result Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
         // onClick={() => handleShowModal(DeleteExamCandidate, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Result</span>
              <DeleteIcon />
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

function ActionButtons({ selectedExamResults, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        //action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedExamResults}
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
function DropdownItems({ selectedExamResults, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent: BulkDeleteCourse }}
        bulkData={selectedExamResults}
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
        bulkData={selectedExamResults}
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
        bulkData={selectedExamResults}
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