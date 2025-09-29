import Table from "../../components/Tables/Tables";
import { useGetFeeSchedule } from "../../hooks/feeSchedule/useGetFeeSchedule";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { tuitionFeeScheduleTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeleteFeeScheduleSlot from "../../ModalContent/FeeSchedule/DeleteFeeSchedule";
import UpdateFeeScheduleSlot from "../../ModalContent/FeeSchedule/UpdateFeeSchedule";
import AutoGenerateFeeSchedule from "../../ModalContent/FeeSchedule/AutoGenerateFeeSchedule";
import FeeScheduleSlots from "../../ModalContent/FeeSchedule/FeeScheduleSlots";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { CreateIcon, DeleteIcon, DetailsIcon, GenerateIcon, UpdateIcon } from "../../icons/ActionIcons";
function FeeSchedule() {
  const { data: feeSchedule, isLoading, error } = useGetFeeSchedule();
  return (
    <>
      <div className="d-flex flex-column gap-2 h-100">
        <div style={{ height: "5%" }}>
          <span className="fw-semibold">Tuition Fees Schedule</span>
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
                colDefs={tuitionFeeScheduleTableConfig({ DropdownComponent })}
                rowData={feeSchedule.data}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
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
          onClick={() => handleShowModal(AutoGenerateFeeSchedule, "lg")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Auto Generate Schedule</span>
              <GenerateIcon />
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
              <UpdateIcon />
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
              <span>View Schedule</span>
              <DetailsIcon />
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
