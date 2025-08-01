import Table from "../../components/Tables/Tables";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { SchoolExpensesTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CreateExpense from "../../ModalContent/SchoolExpenses/CreateExpense";
import DeleteExpense from "../../ModalContent/SchoolExpenses/DeleteExpense";
import ExpenseDetails from "../../ModalContent/SchoolExpenses/ExpenseDetails";
import UpdateExpense from "../../ModalContent/SchoolExpenses/UpdateExpense";
import { useGetExpenses } from "../../hooks/schoolExpenses/useGetSchoolExpenses";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
function SchoolExpenses() {
  const { data: schoolExpenses, isLoading } = useGetExpenses();
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
        <div className="my-2">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="font-size-sm fw-semibold">School Expenses</span>
            <ModalButton
              action={{ modalContent: CreateExpense }}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <span className="font-size-sm">Create Expenses</span>
            </ModalButton>
          </div>
        </div>
        <Table
          colDefs={SchoolExpensesTableConfig({ DropdownComponent })}
          rowData={schoolExpenses.data}
        />
      </div>
    </>
  );
}
export default SchoolExpenses;

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
          onClick={() => handleShowModal(UpdateExpense, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Expense</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteExpense, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Expense</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(ExpenseDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Expense Details</span>
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
