import Table from "../../components/Tables/Tables";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { CategoryTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import {
  ActivateIcon,
  DeleteIcon,
  DetailsIcon,
  SuspendIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import { useGetEventCategories } from "../../hooks/eventCategory/useGetEventCategories";
import { Icon } from "@iconify/react";
import CreateCategory from "../../ModalContent/EventCategory/CreateCategory";
import UpdateCategory from "../../ModalContent/EventCategory/UpdateCategory";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import DeactivateEventCategory from "../../ModalContent/EventCategory/DeactivateEventCategory";
import ActivateEventCategory from "../../ModalContent/EventCategory/ActivateEventCategory";
import DeleteCategory from "../../ModalContent/EventCategory/DeleteCategory";
import EventCategoryDetails from "../../ModalContent/EventCategory/EventCategoryDetails";
function EventCategories() {
  const { data: eventCategories, isLoading, error } = useGetEventCategories();
  return (
    <>
      <div className="d-flex flex-column h-100 gap-2">
        <div
          className="d-flex flex-row align-items-center justify-content-between"
          style={{ height: "5%" }}
        >
          <span className="fw-semibold fw-semibold">Event Category</span>
          <ModalButton action={{ modalContent: CreateCategory }} size={"md"}>
            <button
              className="border-none rounded-3 justify-content-between w-100 font-size-sm d-flex flex-row gap-3 align-items-center"
              style={{
                background: "#a572da",
                padding: "0.7rem",
                color: "#eadcf8",
              }}
            >
              <span>Create Category</span>
              <span>
                <Icon icon="icons8:plus" className="font-size-md" />
              </span>
            </button>
          </ModalButton>
        </div>
        <div style={{ height: "95%" }}>
          {isLoading ? (
            <RectangleSkeleton height="100%" width="100%" speed={0.5} />
          ) : error ? (
           <div className="d-flex flex-row align-items-center justify-content-center w-100">
             <div className="d-flex flex-column align-items-center justify-content-center w-50">
              <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
            <ModalButton action={{ modalContent: CreateCategory }} size={"md"}>
            <button
              className="border-none rounded-3 justify-content-between font-size-sm p-2 d-flex flex-row gap-3 align-items-center"
              style={{
                background: "#a572da",
                color: "#eadcf8",
              }}
            >
              <span>Create Category</span>
            </button>
          </ModalButton>
            </div>
           </div>
          ) : (
            <>
              <Table
                colDefs={CategoryTableConfig({ DropdownComponent })}
                rowData={eventCategories.data}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default EventCategories;

export function DropdownComponent(props) {
  const rowData = props.data;

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("lg");

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleShowModal = (ContentComponent, size = "lg") => {
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
           onClick={() => handleShowModal(UpdateCategory, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Category</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
           onClick={() => handleShowModal(DeactivateEventCategory, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Deactivate Category</span>
              <SuspendIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
           onClick={() => handleShowModal(ActivateEventCategory, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Activate Category</span>
              <ActivateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(EventCategoryDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Category Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteCategory, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Category</span>
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
