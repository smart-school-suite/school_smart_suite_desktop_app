import { useGetAdditionalFeeCategory } from "../../hooks/additionalFee/useGetAdditionalFeeCategories";
import Table from "../../components/Tables/Tables";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import CreateCategory from "../../ModalContent/AdditionalFees/CreateCategory";
import UpdateCategory from "../../ModalContent/AdditionalFees/UpdateCategory";
import DeleteCategory from "../../ModalContent/AdditionalFees/DeleteCategory";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import ActionButtonDropdown, {
  DropDownMenuItem,
} from "../../components/DataTableComponents/ActionComponent";
import { AdditionalFeeCategoryTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { Icon } from "@iconify/react";
function AdditionalFeeCategory() {
  const { data: categories, isLoading } = useGetAdditionalFeeCategory();
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-2 w-100">
          <span className="font-size-sm fw-semibold">Addition Fee Category</span>
          <ModalButton
            classname={
              "border-none green-bg font-size-sm rounded-3 px-3 gap-2 py-2 d-flex flex-row align-items-center d-flex text-white"
            }
            action={{ modalContent: CreateCategory }}
          >
            <Icon icon="icons8:plus" className="font-size-md" />
            <span className="font-size-sm">Create Category</span>
          </ModalButton>
        </div>
        <div>
          <Table
            colDefs={AdditionalFeeCategoryTableConfig({ DropdownComponent })}
            rowData={categories.data}
          />
        </div>
      </div>
    </>
  );
}
export default AdditionalFeeCategory;

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
