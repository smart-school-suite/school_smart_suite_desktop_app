import Table from "../../../components/Tables/Tables";
import { registrationFeeTransactionTableConfig } from "../../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../../components/DataTableComponents/ActionComponent";
import DataTableNavLoader from "../../../components/PageLoaders/DataTableNavLoader";
import { useGetRegistrationFeeTransations } from "../../../hooks/feePayment/useGetRegistrationFeeTransations";
import ReverseTransaction from "../../../ModalContent/RegistrationFees/ReverseTransaction";
import React, { useState, useCallback, useRef, useEffect } from "react";
import CustomModal from "../../../components/Modals/Modal";
import { DropDownMenuItem } from "../../../components/DataTableComponents/ActionComponent";
import DeleteTransaction from "../../../ModalContent/RegistrationFees/DeleteTransaction";
import TransactionDetails from "../../../ModalContent/RegistrationFees/TransactionDetails";
import BulkActionsToast from "../../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../../components/Tooltips/Tooltip";
import { Icon } from "@iconify/react";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import BulkDeleteRegistrationFeeTransaction from "../../../ModalContent/RegistrationFees/BulkDeleteRegistrationFeeTransaction";
import { DeleteIcon, DetailsIcon, ReverseIcon } from "../../../icons/ActionIcons";
import BulkReverseRegistrationFeeTransaction from "../../../ModalContent/RegistrationFees/BulkReverseRegistrationFeeTransaction";
function RegistrationFeeTransactions() {
  const { data:transactions, isLoading } = useGetRegistrationFeeTransations();
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
        <div className="d-flex flex-row align-items-center mb-1 w-100">
          <span className="fw-semibold">Registration Fee Transactions</span>
        </div>
        <div>
          <Table
            colDefs={registrationFeeTransactionTableConfig({
              DropdownComponent,
            })}
            rowData={transactions.data}
            ref={tableRef}
            handleRowCountFromChild={handleRowCountFromChild}
            handleRowDataFromChild={handleRowDataFromChild}
            tableHeight={89}
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
export default RegistrationFeeTransactions;
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
              <ReverseIcon />
            </div>
          </div>
        </DropDownMenuItem>
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
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(TransactionDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span> Transaction Details</span>
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

  function ActionButtons({ selectedTransactions, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        action={{ modalContent:BulkDeleteRegistrationFeeTransaction }}
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
function DropdownItems({ selectedTransactions, resetAll, onModalStateChange }) {
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
          bulkData: selectedTransactions,
        })
      );
      setModalSize(size);
      setShowModal(true);
    };
  return (
    <>
      <DropDownMenuItem
         className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkReverseRegistrationFeeTransaction, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Reverse All</span>
          <ReverseIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
         className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeleteRegistrationFeeTransaction, "md")}
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