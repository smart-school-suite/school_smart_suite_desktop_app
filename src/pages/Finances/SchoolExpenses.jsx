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
import React, { useState, useCallback, useRef } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { Icon } from "@iconify/react";
function SchoolExpenses() {
  const { data: schoolExpenses, isLoading } = useGetExpenses();
    const tableRef = useRef();
    const [rowCount, setRowCount] = useState(0);
    const [selectedExpenses, setSelectedExpenses] = useState([]);
    const handleReset = () => {
      if (tableRef.current) {
        tableRef.current.deselectAll();
        setRowCount(0);
        setSelectedExpenses([]);
      }
    };
    const handleRowDataFromChild = useCallback((Data) => {
      setSelectedExpenses(Data);
    }, []);
    const handleRowCountFromChild = useCallback((count) => {
      setRowCount(count);
    }, []);
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
        <div className="my-2">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="fw-semibold">School Expenses</span>
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
          ref={tableRef}
          handleRowCountFromChild={handleRowCountFromChild}
          handleRowDataFromChild={handleRowDataFromChild}
        />
         <BulkActionsToast
            rowCount={rowCount}
            label={`${rowCount >= 1 ? 'Expense Selected' : rowCount >= 2 ?  'Expenses Selected' : null }`}
            resetAll={handleReset}
            dropDownItems={
              <DropdownItems
                selectedExpenses={selectedExpenses}
                resetAll={handleReset}
              />
            }
            actionButton={
              <ActionButtons
                selectedExpenses={selectedExpenses}
                resetAll={handleReset}
              />
            }
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
function ActionButtons({ selectedExpenses, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        //action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedExpenses}
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
function DropdownItems({ selectedExpenses, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent: BulkDeleteCourse }}
        bulkData={selectedExpenses}
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
        bulkData={selectedExpenses}
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
        bulkData={selectedExpenses}
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