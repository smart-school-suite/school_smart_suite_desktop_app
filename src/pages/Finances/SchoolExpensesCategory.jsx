import { ExpensesCategoryTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import Table from "../../components/Tables/Tables";
import { useGetExpensesCategories } from "../../hooks/expenseCategory/useGetExpensesCategories";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import ActionButtonDropdown,{ ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import CreateCategory from "../../ModalContent/ExpenseCategory/CreateCategory";
import { DeleteIcon, UpdateIcon } from "../../icons/ActionIcons";
import UpdateCategory from "../../ModalContent/ExpenseCategory/UpdateCategory";
import DeleteCategory from "../../ModalContent/ExpenseCategory/DeleteCategory";
function SchoolExpensesCategory() {
  const { data:expenseCategories, isFetching } = useGetExpensesCategories();
  if(isFetching){
    return <DataTableNavLoader />
  }
  return (
    <>
      <div>
        <div className="my-2">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="font-size-sm fw-semibold">Expense Categories</span>
            <ModalButton
              action={{ modalContent: CreateCategory }}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <span className="font-size-sm">Create Category</span>
            </ModalButton>
          </div>
        </div>
        <Table
          colDefs={ExpensesCategoryTableConfig({ DropdownComponent })}
          rowData={expenseCategories.data}
        />
      </div>
    </>
  );
}
export default SchoolExpensesCategory;

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

