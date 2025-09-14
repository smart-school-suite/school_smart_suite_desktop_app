import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { useGetExamCandidates } from "../../hooks/examCandidate/useGetExamCandidates";
import Table from "../../components/Tables/Tables";
import { ExamCandidateTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import React, { useState, useCallback, useRef } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import {
  CreateIcon,
  DeleteIcon,
  DetailsIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import DeleteExamCandidate from "../../ModalContent/ExamCandidate/DeleteCandidate";
import AddCaScores from "../../ModalContent/ExamCandidate/AddCaScores";
import AddExamScores from "../../ModalContent/ExamCandidate/AddExamScores";
import { ExamCandidateIcon } from "../../icons/Icons";
import { useSelector } from "react-redux";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
import UpdateCaScores from "../../ModalContent/ExamCandidate/UpdateCaScores";
function ExamCandidates() {
  const { data: examCandidates, isLoading } = useGetExamCandidates();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const tableRef = useRef();
  const [rowCount, setRowCount] = useState(0);
  const [selectedExamCandidates, setSelectedExamCandidates] = useState([]);
  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedExamCandidates([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedExamCandidates(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div className="my-2">
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
            <ExamCandidateIcon />
          </div>
          <span className="my-0 fw-semibold">Manage Exam Candidates</span>
        </div>
      </div>
      <div className="d-flex flex-column my-3">
        <div className="d-block">
          <p className="font-size-xs my-0">Total Number of Candidates</p>
          <h1 className="fw-bold my-0">{examCandidates?.data?.length}</h1>
        </div>
      </div>
      <div>
        {examCandidates?.data?.length > 0 ? (
          <>
            <Table
              colDefs={ExamCandidateTableConfig({ DropdownComponent })}
              rowData={examCandidates.data}
              ref={tableRef}
              handleRowCountFromChild={handleRowCountFromChild}
              handleRowDataFromChild={handleRowDataFromChild}
            />
            <BulkActionsToast
              rowCount={rowCount}
              label={`${
                rowCount >= 1
                  ? "Exam Candidate Selected"
                  : rowCount >= 2
                  ? "Exam Candidates Selected"
                  : null
              }`}
              resetAll={handleReset}
              dropDownItems={
                <DropdownItems
                  selectedExamCandidates={selectedExamCandidates}
                  resetAll={handleReset}
                />
              }
              actionButton={
                <ActionButtons
                  selectedExamCandidates={selectedExamCandidates}
                  resetAll={handleReset}
                />
              }
            />
          </>
        ) : (
          <div className="alert alert-warning">No Canidates Added Found</div>
        )}
      </div>
    </>
  );
}
export default ExamCandidates;

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
          onClick={() => handleShowModal(DeleteExamCandidate, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Candidate</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        {rowData.exam_type === "ca" ? (
          <>
            <DropDownMenuItem
              className={
                "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
              }
              onClick={() => handleShowModal(AddCaScores, "xl")}
            >
              <div>
                <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                  <span>Add CA Scores</span>
                  <CreateIcon />
                </div>
              </div>
            </DropDownMenuItem>
             <DropDownMenuItem
              className={
                "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
              }
              onClick={() => handleShowModal(UpdateCaScores, 'xl')}
            >
              <div>
                <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                  <span>Update CA Scores</span>
                  <UpdateIcon />
                </div>
              </div>
            </DropDownMenuItem>
          </>
        ) : (
          <>
            <DropDownMenuItem
              className={
                "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
              }
              onClick={() => handleShowModal(AddExamScores, "xl")}
            >
              <div>
                <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                  <span>Add Exam Scores</span>
                  <CreateIcon />
                </div>
              </div>
            </DropDownMenuItem>
            <DropDownMenuItem
              className={
                "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
              }
              
            >
              <div>
                <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                  <span>Update Exam Scores</span>
                  <UpdateIcon />
                </div>
              </div>
            </DropDownMenuItem>
          </>
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
function ActionButtons({ selectedExamCandidates, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        //action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedExamCandidates}
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
function DropdownItems({ selectedExamCandidates, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent: BulkDeleteCourse }}
        bulkData={selectedExamCandidates}
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
        bulkData={selectedExamCandidates}
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
        bulkData={selectedExamCandidates}
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
