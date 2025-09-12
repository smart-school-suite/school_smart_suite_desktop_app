import { useGetStudentResits } from "../../hooks/studentResit/useGetStudentResits";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { ResitFeeTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import Table from "../../components/Tables/Tables";
import PayStudentResitFee from "../../ModalContent/ResitFee/PayResitFee";
import { CreateIcon, DetailsIcon } from "../../icons/ActionIcons";
import ResitFeeDetails from "../../ModalContent/ResitFee/ResitFeeDetails";
function ResitFee() {
  const { data: studentResit, isLoading } = useGetStudentResits();
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
        <div className="mb-2">
          <span className="fw-semibold">Resit Fees Payment</span>
        </div>
        <div>
          <Table
            colDefs={ResitFeeTableConfig({ DropdownComponent })}
            rowData={studentResit.data}
          />
        </div>
      </div>
    </>
  );
}
export default ResitFee;

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
          onClick={() => handleShowModal(PayStudentResitFee, 'md')}
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
          onClick={() => handleShowModal(ResitFeeDetails, 'md')}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Fee Details</span>
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
