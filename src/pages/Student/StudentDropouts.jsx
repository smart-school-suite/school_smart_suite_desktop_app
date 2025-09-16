import Table from "../../components/Tables/Tables";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import ReinistateStudent from "../../ModalContent/StudentDropout/ReinstateStudent";
import { useGetDropdoutStudents } from "../../hooks/student/useGetDropoutStudent";
import React, { useState, useCallback, useRef, useEffect } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import StudentDetails from "../../ModalContent/Student/StudentDetails";
import DeleteStudent from "../../ModalContent/Student/DeleteStudent";
import { StudentTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { Icon } from "@iconify/react";
import { StudentIcon } from "../../icons/Icons";
import { useSelector } from "react-redux";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import BulkReinstateDropoutStudent from "../../ModalContent/Student/BulkReinstateDropoutStudent";
import BulkDeleteStudent from "../../ModalContent/Student/BulkDeleteStudent";
import { DeleteIcon, DetailsIcon, ReinstateIcon } from "../../icons/ActionIcons";
function StudentDropOuts() {
  const { data: dropoutStudents, isLoading } = useGetDropdoutStudents();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const tableRef = useRef();
  const [rowCount, setRowCount] = useState(0);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedStudents([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedStudents(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <main className="pt-2">
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
              <StudentIcon />
            </div>
            <span className="my-0 fw-semibold">Manage Student Dropout</span>
          </div>
        </div>
        <div className="d-block">
          <p className="font-size-xs my-0">Total Dropouts</p>
          <h1 className="fw-bold my-0">{dropoutStudents.data.length}</h1>
        </div>
        <div className="mt-2">
          <Table
            colDefs={StudentTableConfig({ DropdownComponent })}
            rowData={dropoutStudents.data}
            rowHeight={55}
            ref={tableRef}
            handleRowCountFromChild={handleRowCountFromChild}
            handleRowDataFromChild={handleRowDataFromChild}
          />
          <BulkActionsToast
            rowCount={rowCount}
            label={`${
              rowCount >= 1
                ? "Student Selected"
                : rowCount >= 2
                ? "Students Selected"
                : null
            }`}
            resetAll={handleReset}
            dropDownItems={
              <DropdownItems
                selectedStudents={selectedStudents}
                resetAll={handleReset}
              />
            }
            actionButton={
              <ActionButtons
                selectedStudents={selectedStudents}
                resetAll={handleReset}
              />
            }
          />
        </div>
      </main>
    </>
  );
}
export default StudentDropOuts;

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
          onClick={() => handleShowModal(ReinistateStudent)}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Reinstate Student</span>
              <ReinstateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteStudent)}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Student</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(StudentDetails)}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Student Details</span>
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
function ActionButtons({ selectedStudents, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        action={{ modalContent:BulkDeleteStudent }}
        bulkData={selectedStudents}
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
function DropdownItems({ selectedStudents, resetAll, onModalStateChange }) {
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
            bulkData: selectedStudents,
          })
        );
        setModalSize(size);
        setShowModal(true);
      };
  return (
    <>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkReinstateDropoutStudent, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Reinstate All</span>
          <ReinstateIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
         className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeleteStudent, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Delete All</span>
          <DeleteIcon />
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
