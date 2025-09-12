import ActionButtonDropdown from "../../../components/DataTableComponents/ActionComponent";
import { tuitionFeesTransactionTableConfig } from "../../../ComponentConfig/AgGridTableConfig";
import Table from "../../../components/Tables/Tables";
import TransactionDetails from "../../../ModalContent/TuitionFeeTransaction/TransactionDetails";
import ReverseTransaction from "../../../ModalContent/TuitionFeeTransaction/ReverseTransaction";
import DeleteTransaction from "../../../ModalContent/TuitionFeeTransaction/DeleteTransaction";
import { useGetTuitionFeeTransactions } from "../../../hooks/feePayment/useGetTuitionFeeTransactions";
import DataTableNavLoader from "../../../components/PageLoaders/DataTableNavLoader";
import React, { useState, useCallback, useRef } from "react";
import CustomModal from "../../../components/Modals/Modal";
import { DropDownMenuItem } from "../../../components/DataTableComponents/ActionComponent";
import { DeleteIcon, DetailsIcon } from "../../../icons/ActionIcons";
import BulkActionsToast from "../../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../../components/Tooltips/Tooltip";
import { Icon } from "@iconify/react";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
function TuitionFeeTransactions() {
  const { data: tuitionFees, isLoading } = useGetTuitionFeeTransactions();
  const tableRef = useRef();
  const [rowCount, setRowCount] = useState(0);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedTransactions([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedTransactions(Data);
  }, []);
  const handleRowCountFromChild = useCallback((count) => {
    setRowCount(count);
  }, []);
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center mb-2 w-100">
          <div>
            <span className="fw-semibold">
              Tuition Fee Transactions
            </span>
          </div>
        </div>
        <div>
          <Table
            colDefs={tuitionFeesTransactionTableConfig({
              DropdownComponent,
            })}
            rowData={tuitionFees.data}
            ref={tableRef}
            handleRowCountFromChild={handleRowCountFromChild}
            handleRowDataFromChild={handleRowDataFromChild}
          />
          <BulkActionsToast
            rowCount={rowCount}
            label={`${
              rowCount >= 1
                ? "Transaction Selected"
                : rowCount >= 2
                ? "Transactions Selected"
                : null
            }`}
            resetAll={handleReset}
            dropDownItems={
              <DropdownItems
                selectedTransactions={selectedTransactions}
                resetAll={handleReset}
              />
            }
            actionButton={
              <ActionButtons
                selectedTransactions={selectedTransactions}
                resetAll={handleReset}
              />
            }
          />
        </div>
      </div>
    </>
  );
}
export default TuitionFeeTransactions;

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
          onClick={() => handleShowModal(ReverseTransaction, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Reverse Transaction</span>
            </div>
          </div>
        </DropDownMenuItem>
        {/* 
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteTransaction, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Transaction</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        */}
        {/* 
          <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(TransactionDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Transaction Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
          */}
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
function ActionButtons({ selectedTransactions, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        //action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedTransactions}
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
function DropdownItems({ selectedTransactions, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent: BulkDeleteCourse }}
        bulkData={selectedTransactions}
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
        bulkData={selectedTransactions}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Deactivate All</span>
        </div>
      </ModalButton>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        // action={{ modalContent: BulkActivateCourse }}
        bulkData={selectedTransactions}
        resetAll={resetAll}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Activate All</span>
        </div>
      </ModalButton>
    </>
  );
}
