import DataTablePageLoader from "../../../components/PageLoaders/DataTablesPageLoader";
import { useGetResitTransactions } from "../../../hooks/studentResit/useGetResitTransactions";
import Table from "../../../components/Tables/Tables";
import { resitFeeTransacTableConfig } from "../../../ComponentConfig/AgGridTableConfig";
import React, { useState, useCallback, useRef, useEffect } from "react";
import ActionButtonDropdown from "../../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../../components/Modals/Modal";
import { DropDownMenuItem } from "../../../components/DataTableComponents/ActionComponent";
import {
  DeleteIcon,
  DetailsIcon,
  ReverseIcon,
} from "../../../icons/ActionIcons";
import BulkActionsToast from "../../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../../components/Tooltips/Tooltip";
import { Icon } from "@iconify/react";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import ReverseResitFeeTransaction from "../../../ModalContent/ResitFee/ReverseResitFeeTransaction";
import DeleteResitFeeTransaction from "../../../ModalContent/ResitFee/DeleteResitFeeTransaction";
import ResitFeeTransactionDetails from "../../../ModalContent/ResitFee/ResitFeeTransactionDetails";
import { bulkDeleteStudentResitTransactions } from "../../../services/studentResit";
import BulkReverseResitFeeTransaction from "../../../ModalContent/ResitFee/BulkReverseResitFeeTransaction";
import BulkDeleteResitFeeTransaction from "../../../ModalContent/ResitFee/BulkDeleteResitFeeTransaction";
import { NotFoundError } from "../../../components/errors/Error";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
function ResitFeeTransactions() {
  const { data: transactions, isLoading, error } = useGetResitTransactions();
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
  return (
    <>
      <div className="d-flex flex-column gap-2 h-100">
        <div
          className="d-flex flex-row align-items-center w-100"
          style={{ height: "5%" }}
        >
          <span className="fw-semibold">Resit Fee Transactions</span>
        </div>
        <div style={{ height: "95%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          ) : error ? (
            <NotFoundError
              title={error.response.data.errors.title}
              description={error.response.data.errors.description}
            ></NotFoundError>
          ) : (
            <>
              <Table
                colDefs={resitFeeTransacTableConfig({
                  DropdownComponent,
                })}
                rowData={transactions.data}
                ref={tableRef}
                handleRowCountFromChild={handleRowCountFromChild}
                handleRowDataFromChild={handleRowDataFromChild}
              />
              {rowCount > 0 && (
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
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default ResitFeeTransactions;

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
          onClick={() => handleShowModal(ReverseResitFeeTransaction, "md")}
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
          onClick={() => handleShowModal(DeleteResitFeeTransaction, "md")}
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
          onClick={() => handleShowModal(ResitFeeTransactionDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Transaction Details</span>
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
        action={{ modalContent: bulkDeleteStudentResitTransactions }}
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
        onClick={() => handleShowModal(BulkReverseResitFeeTransaction, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Reverse All</span>
          <ReverseIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeleteResitFeeTransaction, "md")}
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
