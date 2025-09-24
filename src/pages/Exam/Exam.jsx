import Table from "../../components/Tables/Tables";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { ExamsTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CreateExam from "../../ModalContent/Exams/CreateExam";
import DeleteExam from "../../ModalContent/Exams/DeleteExam";
import ExamDetails from "../../ModalContent/Exams/ExamDetails";
import UpdateExam from "../../ModalContent/Exams/UpdateExam";
import AddExamGrading from "../../ModalContent/Exams/AddExamGrading";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { Icon } from "@iconify/react";
import React, { useState, useCallback, useRef, useEffect } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import {
  CreateIcon,
  DeleteIcon,
  DetailsIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import { useGetExams } from "../../hooks/exam/useGetExams";
import { ExamIcon, GradeIcon } from "../../icons/Icons";
import { useSelector } from "react-redux";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import BulkDeleteExam from "../../ModalContent/Exams/BulkDeleteExam";
import BulkUpdateExam from "../../ModalContent/Exams/BulkUpdateExam";
import BulkAddExamGrading from "../../ModalContent/Exams/BulkAddExamGrading";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
function Exam() {
  const { data: data, isLoading, error } = useGetExams();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const tableRef = useRef();
  const [rowCount, setRowCount] = useState(0);
  const [selectedExams, setSelectedExams] = useState([]);
  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedExams([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedExams(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);

  return (
    <>
      <main className="main-container gap-2">
        <div style={{ height: "15%" }} className="d-flex flex-column gap-2">
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
              <ExamIcon iconStyle={{ fontSize: "2rem" }} />
            </div>
            <span className="my-0 fw-semibold">Manage Exam</span>
          </div>
          <div className="d-flex flex-row align-items-center  w-100">
            <div>
              <p className="font-size-xs my-0">Total Number of Exams</p>
              <h1 className="fw-bold my-0">{data?.data?.length || 0}</h1>
            </div>
            <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
              <ModalButton
                classname={
                  "border-none green-bg font-size-sm rounded-3 px-3 gap-2 py-2 d-flex flex-row align-items-center d-flex text-white"
                }
                action={{ modalContent: CreateExam }}
                size={"lg"}
              >
                <Icon icon="icons8:plus" className="font-size-md" />
                <span className="font-size-sm">Create Exam</span>
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
          ) : data?.data?.length > 0 ? (
            <>
              <Table
                colDefs={ExamsTableConfig({ DropdownComponent })}
                rowData={data.data}
                ref={tableRef}
                handleRowCountFromChild={handleRowCountFromChild}
                handleRowDataFromChild={handleRowDataFromChild}
              />
              {rowCount > 0 && (
                <BulkActionsToast
                  rowCount={rowCount}
                  label={`${
                    rowCount === 1
                      ? "Exam Selected"
                      : rowCount > 1
                      ? "Exams Selected"
                      : ""
                  }`}
                  resetAll={handleReset}
                  dropDownItems={
                    <DropdownItems
                      selectedExams={selectedExams}
                      resetAll={handleReset}
                    />
                  }
                  actionButton={
                    <ActionButtons
                      selectedExams={selectedExams}
                      resetAll={handleReset}
                    />
                  }
                />
              )}
            </>
          ) : (
            <div className="alert alert-warning mt-3">No Exams Found</div>
          )}
        </div>
      </main>
    </>
  );
}
export default Exam;

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
          onClick={() => handleShowModal(UpdateExam, "lg")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Exam</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteExam, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Exam</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(ExamDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Exam Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(AddExamGrading, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Add Exam Grading</span>
              <GradeIcon />
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

function ActionButtons({ selectedExams, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        action={{ modalContent: BulkDeleteExam }}
        bulkData={selectedExams}
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

function DropdownItems({ selectedExams, resetAll, onModalStateChange }) {
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
        bulkData: selectedExams,
      })
    );
    setModalSize(size);
    setShowModal(true);
  };
  return (
    <>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkAddExamGrading, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Add Grade Config</span>
          <CreateIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeleteExam, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkUpdateExam, "lg")}
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
