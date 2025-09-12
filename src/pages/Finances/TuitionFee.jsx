import Table from "../../components/Tables/Tables";
import { useGetTuitionFees } from "../../hooks/feePayment/useGetTuitionFees";
import { tuitionFeeTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import PayStudentTuitionFee from "../../ModalContent/TuitionFee/PayTuitionFee";
import TuitionFeeDetails from "../../ModalContent/TuitionFee/TuitionFeeDetails";
import DeleteTuitionFee from "../../ModalContent/TuitionFee/DeleteTuitionFee";
import React, { useState, useCallback, useRef } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { CreateIcon, DeleteIcon, DetailsIcon } from "../../icons/ActionIcons";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { Icon } from "@iconify/react";
import DataTablePageLoader from "../../components/PageLoaders/DataTablesPageLoader";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
function TuitionFees() {
  const { data: tuitionFees, isLoading } = useGetTuitionFees();
  const tableRef = useRef();
  const [rowCount, setRowCount] = useState(0);
  const [selectedTuitionFee, setSelectedTuitionFee] = useState([]);
  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedTuitionFee([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedTuitionFee(Data);
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
        <div className="mb-2">
          <span className="fw-semibold">Tuition Fees</span>
        </div>
        <div>
          <Table
            colDefs={tuitionFeeTableConfig({ DropdownComponent })}
            rowData={tuitionFees.data}
            ref={tableRef}
            handleRowCountFromChild={handleRowCountFromChild}
            handleRowDataFromChild={handleRowDataFromChild}
          />
          <BulkActionsToast
            rowCount={rowCount}
            label={`${
              rowCount >= 1
                ? "Tuition Fee Selected"
                : rowCount >= 2
                ? "Tuition Fees Selected"
                : null
            }`}
            resetAll={handleReset}
            dropDownItems={
              <DropdownItems
                selectedTuitionFee={selectedTuitionFee}
                resetAll={handleReset}
              />
            }
            actionButton={
              <ActionButtons
                selectedTuitionFee={selectedTuitionFee}
                resetAll={handleReset}
              />
            }
          />
        </div>
      </div>
    </>
  );
}
export default TuitionFees;

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
          onClick={() => handleShowModal(PayStudentTuitionFee, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Pay Tuition Fee</span>
              <CreateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        {/*  <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(TuitionFeeDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Tuition Fee Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>*/}
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteTuitionFee, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Tuition Fee</span>
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
function ActionButtons({ selectedTuitionFee, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        //action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedTuitionFee}
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
function DropdownItems({ selectedTuitionFee, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent: BulkDeleteCourse }}
        bulkData={selectedTuitionFee}
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
        bulkData={selectedTuitionFee}
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
        bulkData={selectedTuitionFee}
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
