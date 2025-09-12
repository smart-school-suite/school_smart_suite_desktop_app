import { registrationFeeTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import Table from "../../components/Tables/Tables";
import RegistrationFeeDetail from "../../ModalContent/RegistrationFees/RegistrationFeeDetails";
import DeleteRegistrationFee from "../../ModalContent/RegistrationFees/DeleteRegistrationFees";
import PayRegistrationFees from "../../ModalContent/RegistrationFees/PayRegistrationFees";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { useGetRegistrationFees } from "../../hooks/feePayment/useGetRegistrationFees";
import { CreateIcon, DeleteIcon, DetailsIcon } from "../../icons/ActionIcons";
import React, { useState, useCallback, useRef } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { Icon } from "@iconify/react";
import DataTablePageLoader from "../../components/PageLoaders/DataTablesPageLoader";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
function RegistrationFees() {
  const { data: registrationFees, isLoading } = useGetRegistrationFees();
   const tableRef = useRef();
    const [rowCount, setRowCount] = useState(0);
    const [selectedRegistrationFee, setSelectedRegistrationFee] = useState([]);
    const handleReset = () => {
      if (tableRef.current) {
        tableRef.current.deselectAll();
        setRowCount(0);
        setSelectedRegistrationFee([]);
      }
    };
    const handleRowDataFromChild = useCallback((Data) => {
      setSelectedRegistrationFee(Data);
    }, []);
    const handleRowCountFromChild = useCallback((count) => {
      setRowCount(count);
    }, []);
  if (isLoading) {
    return < DataTablePageLoader />;
  }

  return (
    <>
      <div>
        <div>
          <span className="fw-semibold">Registration Fees</span>
        </div>
        <div>
          <Table
            colDefs={registrationFeeTableConfig({ DropdownComponent })}
            rowData={registrationFees.data}
            ref={tableRef}
            handleRowCountFromChild={handleRowCountFromChild}
            handleRowDataFromChild={handleRowDataFromChild}
          />
           <BulkActionsToast
            rowCount={rowCount}
            label={`${
              rowCount >= 1
                ? "Registration Fee Selected"
                : rowCount >= 2
                ? "Registration Fees Selected"
                : null
            }`}
            resetAll={handleReset}
            dropDownItems={
              <DropdownItems
                selectedRegistrationFee={selectedRegistrationFee}
                resetAll={handleReset}
              />
            }
            actionButton={
              <ActionButtons
                selectedRegistrationFee={selectedRegistrationFee}
                resetAll={handleReset}
              />
            }
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

function ActionButtons({ selectedRegistrationFee, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        //action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedRegistrationFee}
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
function DropdownItems({ selectedRegistrationFee, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent: BulkDeleteCourse }}
        bulkData={selectedRegistrationFee}
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
        bulkData={selectedRegistrationFee}
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
        bulkData={selectedRegistrationFee}
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

