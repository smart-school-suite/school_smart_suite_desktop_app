import Table from "../../components/Tables/Tables";
import React, { useState, useCallback, useRef, useEffect } from "react";
import CustomModal from "../../components/Modals/Modal";
import ActionButtonDropdown, {
  DropDownMenuItem,
} from "../../components/DataTableComponents/ActionComponent";
import StudentDetails from "../../ModalContent/Student/StudentDetails";
import { useGetStudents } from "../../hooks/student/useGetStudent";
import { StudentTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CreateStudentAdditionalFee from "../../ModalContent/AdditionalFees/CreateStudentAdditionalFee";
import { Icon } from "@iconify/react";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import DataTablePageLoader from "../../components/PageLoaders/DataTablesPageLoader";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { CreateIcon, DeleteIcon, UpdateIcon } from "../../icons/ActionIcons";
import BulkBillStudent from "../../ModalContent/AdditionalFees/BulkBillStudent";
function BillStudentAdditionalFee() {
  const { data: students, isLoading } = useGetStudents();
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
    return <DataTablePageLoader />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center mb-2 w-100">
          <span className="fw-semibold">Addition Fee Billing</span>
        </div>
        <div>
          <Table
            colDefs={StudentTableConfig({ DropdownComponent })}
            rowData={students.data}
            rowHeight={55}
            ref={tableRef}
            handleRowCountFromChild={handleRowCountFromChild}
            handleRowDataFromChild={handleRowDataFromChild}
            tableHeight={89}
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
      </div>
    </>
  );
}
export default BillStudentAdditionalFee;

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
          onClick={() => handleShowModal(CreateStudentAdditionalFee, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Bill Student</span>
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(StudentDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Student Details</span>
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
        action={{ modalContent: BulkBillStudent }}
        bulkData={selectedStudents}
        resetAll={resetAll}
      >
        <CustomTooltip tooltipText={"Bill All Selected Student"}>
          <span className="pointer-cursor">
            <CreateIcon />
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
        onClick={() => handleShowModal(BulkBillStudent, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Bill All</span>
          <CreateIcon />
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
