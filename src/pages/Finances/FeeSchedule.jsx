import Table from "../../components/Tables/Tables";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { useGetFeeSchedule } from "../../hooks/feeSchedule/useGetFeeSchedule";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { tuitionFeeScheduleTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeleteFeeScheduleSlot from "../../ModalContent/FeeSchedule/DeleteFeeSchedule";
import UpdateFeeScheduleSlot from "../../ModalContent/FeeSchedule/UpdateFeeSchedule";
import CreateFeeScheduleSlots from "../../ModalContent/FeeSchedule/CreateFeeSchedule";
import FeeScheduleSlots from "../../ModalContent/FeeSchedule/FeeScheduleSlots";
function FeeSchedule(){
    const  { data:feeSchedule, isLoading } = useGetFeeSchedule();
    if(isLoading){
        return <DataTableNavLoader />
    }
    return(
        <>
         <div>
        <div className="mb-2">
          <span className="font-size-sm">Tuition Fees Schedule</span>
        </div>
        <div>
          <Table
            colDefs={tuitionFeeScheduleTableConfig({ DropdownComponent })}
            rowData={feeSchedule.data}
          />
        </div>
      </div>
        </>
    )
}
export default FeeSchedule;

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
          onClick={() => handleShowModal(CreateFeeScheduleSlots, "lg")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Create Schedule</span>
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(UpdateFeeScheduleSlot, "lg")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Schedule</span>
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(FeeScheduleSlots, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Schedule</span>
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteFeeScheduleSlot, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Schedule</span>
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
