import Table from "../../../components/Tables/Tables";
import { registrationFeeTransactionTableConfig } from "../../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../../components/DataTableComponents/ActionComponent";
import DataTableNavLoader from "../../../components/PageLoaders/DataTableNavLoader";
import { useGetRegistrationFeeTransations } from "../../../hooks/feePayment/useGetRegistrationFeeTransations";
import ReverseTransaction from "../../../ModalContent/RegistrationFees/ReverseTransaction";
import React from "react";
import { useState } from "react";
import CustomModal from "../../../components/Modals/Modal";
import { DropDownMenuItem } from "../../../components/DataTableComponents/ActionComponent";
import DeleteTransaction from "../../../ModalContent/RegistrationFees/DeleteTransaction";
import TransactionDetails from "../../../ModalContent/RegistrationFees/TransactionDetails";
function RegistrationFeeTransactions() {
  const { data:transactions, isLoading } = useGetRegistrationFeeTransations();
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center mb-2 w-100">
          <span className="font-size-sm fw-semibold">Registration Fee Transactions</span>
        </div>
        <div>
          <Table
            colDefs={registrationFeeTransactionTableConfig({
              DropdownComponent,
            })}
            rowData={transactions.data}
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
