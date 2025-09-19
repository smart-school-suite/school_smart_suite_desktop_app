import Table from "../../components/Tables/Tables";
import { additionalFeesTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import DeleteAdditionalFees from "../../ModalContent/AdditionalFees/DeleteAdditionalFees";
import PayAdditionalFees from "../../ModalContent/AdditionalFees/PayAdditionalFees";
import UpdateAdditionalFees from "../../ModalContent/AdditionalFees/UpdateAdditionalFees";
import AdditionalFeeDetail from "../../ModalContent/AdditionalFees/AdditionalFeesDetails";
import { useGetAdditionalFees } from "../../hooks/additionalFee/useGetAdditionalFees";
import React, { useState, useCallback, useRef, useEffect } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import {
  CreateIcon,
  DeleteIcon,
  DetailsIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { Icon } from "@iconify/react";
import DataTablePageLoader from "../../components/PageLoaders/DataTablesPageLoader";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import BulkPayAdditionalFee from "../../ModalContent/AdditionalFees/BulkPayAdditionalFee";
import BulkDeleteAdditionalFee from "../../ModalContent/AdditionalFees/BulkDeleteAdditionalFee";
import BulkUpdateAdditionalFee from "../../ModalContent/AdditionalFees/BulkUpdateAdditionalFee";
function AdditionalFees() {
  const { data: additionalFee, isLoading } = useGetAdditionalFees();
  const tableRef = useRef();
  const [rowCount, setRowCount] = useState(0);
  const [selectedAdditionalFee, setSelectedAdditionalFee] = useState([]);
  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedAdditionalFee([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedAdditionalFee(Data);
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
        <div className="d-flex flex-row align-items-center mb-1 w-100">
          <span className="fw-semibold">Addition Fee Payments</span>
        </div>
        <div>
          <Table
            colDefs={additionalFeesTableConfig({ DropdownComponent })}
            rowData={additionalFee.data}
            ref={tableRef}
            handleRowCountFromChild={handleRowCountFromChild}
            handleRowDataFromChild={handleRowDataFromChild}
            tableHeight={89}
          />
          <BulkActionsToast
            rowCount={rowCount}
            label={`${
              rowCount >= 1
                ? "Additional Fee Selected"
                : rowCount >= 2
                ? "Additional Fees Selected"
                : null
            }`}
            resetAll={handleReset}
            dropDownItems={
              <DropdownItems
                selectedAdditionalFee={selectedAdditionalFee}
                resetAll={handleReset}
              />
            }
            actionButton={
              <ActionButtons
                selectedAdditionalFee={selectedAdditionalFee}
                resetAll={handleReset}
              />
            }
          />
        </div>
      </div>
    </>
  );
}
export default AdditionalFees;

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
          onClick={() => handleShowModal(PayAdditionalFees, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Pay Fee</span>
              <CreateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(AdditionalFeeDetail, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Fee Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(UpdateAdditionalFees, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Fee</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteAdditionalFees, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Fee</span>
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

function ActionButtons({ selectedAdditionalFee, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        action={{ modalContent: BulkPayAdditionalFee }}
        bulkData={selectedAdditionalFee}
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
function DropdownItems({
  selectedAdditionalFee,
  resetAll,
  onModalStateChange,
}) {
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
        bulkData: selectedAdditionalFee,
      })
    );
    setModalSize(size);
    setShowModal(true);
  };
  return (
    <>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkPayAdditionalFee, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Pay All</span>
          <CreateIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkUpdateAdditionalFee, "md")}
      >
        <div className="py-2 px-1  rounded-1 d-flex flex-row justify-content-between dropdown-content-item dark-mode-text">
          <span className="font-size-sm">Update All</span>
          <UpdateIcon />
        </div>
      </DropDownMenuItem>
      <DropDownMenuItem
        className="remove-button-styles w-100 border-none transparent-bg p-0 rounded-2 pointer-cursor"
        onClick={() => handleShowModal(BulkDeleteAdditionalFee, "md")}
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
