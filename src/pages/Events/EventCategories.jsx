import Table from "../../components/Tables/Tables";
import ActionButtonDropdown, { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import CreateCategory from "../../ModalContent/EventCategory/CreateCategory";
import { useGetEventCategoryByStatus } from "../../hooks/eventCategory/useGetEventCategories";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { CategoryTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { DeleteIcon, UpdateIcon } from "../../icons/ActionIcons";
function EventCategories() {
  const { data: categories, isFetching } =
    useGetEventCategoryByStatus("active");
  if (isFetching) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="fw-semibold fw-semibold">Event Category</span>
          <ModalButton
            classname={
              "border-none px-3 py-2 bg-dark font-size-sm text-white rounded-3 d-flex flex-row align-items-center"
            }
            action={{ modalContent: CreateCategory }}
          >
            <span>Create Category</span>
          </ModalButton>
        </div>
        <div>
          <Table
            colDefs={CategoryTableConfig({ DropdownComponent })}
            rowData={categories.data}
          />
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
