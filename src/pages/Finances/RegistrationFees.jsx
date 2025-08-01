import { registrationFeeTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import Table from "../../components/Tables/Tables";
import RegistrationFeeDetail from "../../ModalContent/RegistrationFees/RegistrationFeeDetails";
import DeleteRegistrationFee from "../../ModalContent/RegistrationFees/DeleteRegistrationFees";
import PayRegistrationFees from "../../ModalContent/RegistrationFees/PayRegistrationFees";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { useGetRegistrationFees } from "../../hooks/feePayment/useGetRegistrationFees";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { CreateIcon, DeleteIcon, DetailsIcon } from "../../icons/ActionIcons";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
function RegistrationFees() {
  const { data: registrationFees, isLoading } = useGetRegistrationFees();
  if (isLoading) {
    return <DataTableNavLoader />;
  }

  return (
    <>
      <div>
        <div>
          <span className="font-size-sm">Registration Fees</span>
        </div>
        <div>
          <Table
            colDefs={registrationFeeTableConfig({ DropdownComponent })}
            rowData={registrationFees.data}
          />
        </div>
      </div>
    </>
  );
}
export default RegistrationFees;

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
          onClick={() => handleShowModal(PayRegistrationFees, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Pay Fees</span>
              <CreateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(RegistrationFeeDetail, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span> Fee Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteRegistrationFee, "md")}
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
