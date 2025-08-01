import Table from "../../components/Tables/Tables";
import { useGetTuitionFees } from "../../hooks/feePayment/useGetTuitionFees";
import { tuitionFeeTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import PayStudentTuitionFee from "../../ModalContent/TuitionFee/PayTuitionFee";
import TuitionFeeDetails from "../../ModalContent/TuitionFee/TuitionFeeDetails";
import DeleteTuitionFee from "../../ModalContent/TuitionFee/DeleteTuitionFee";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { DeleteIcon, DetailsIcon } from "../../icons/ActionIcons";
function TuitionFees() {
  const { data: tuitionFees, isLoading } = useGetTuitionFees();
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
        <div className="mb-2">
          <span className="font-size-sm">Tuition Fees</span>
        </div>
        <div>
          <Table
            colDefs={tuitionFeeTableConfig({ DropdownComponent })}
            rowData={tuitionFees.data}
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
            </div>
          </div>
        </DropDownMenuItem>
         <DropDownMenuItem
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
        </DropDownMenuItem>
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
