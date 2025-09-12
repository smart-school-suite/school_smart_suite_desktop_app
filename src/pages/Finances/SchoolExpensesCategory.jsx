import { ExpensesCategoryTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import Table from "../../components/Tables/Tables";
import { useGetExpensesCategories } from "../../hooks/expenseCategory/useGetExpensesCategories";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import React, { useState, useCallback, useRef } from "react";
import CustomModal from "../../components/Modals/Modal";
import CreateCategory from "../../ModalContent/ExpenseCategory/CreateCategory";
import { DeleteIcon, UpdateIcon } from "../../icons/ActionIcons";
import UpdateCategory from "../../ModalContent/ExpenseCategory/UpdateCategory";
import DeleteCategory from "../../ModalContent/ExpenseCategory/DeleteCategory";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import { Icon } from "@iconify/react";
function SchoolExpensesCategory() {
  const { data: expenseCategories, isLoading } = useGetExpensesCategories();
  const tableRef = useRef();
  const [rowCount, setRowCount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleReset = () => {
    if (tableRef.current) {
      tableRef.current.deselectAll();
      setRowCount(0);
      setSelectedCategories([]);
    }
  };
  const handleRowDataFromChild = useCallback((Data) => {
    setSelectedCategories(Data);
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
            <span className="fw-semibold">Expense Categories</span>
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
          ref={tableRef}
          handleRowCountFromChild={handleRowCountFromChild}
          handleRowDataFromChild={handleRowDataFromChild}
        />
        <BulkActionsToast
            rowCount={rowCount}
            label={`${rowCount >= 1 ? 'Category Selected' : rowCount >= 2 ?  'Categories Selected' : null }`}
            resetAll={handleReset}
            dropDownItems={
              <DropdownItems
                selectedCategories={selectedCategories}
                resetAll={handleReset}
              />
            }
            actionButton={
              <ActionButtons
                selectedCategories={selectedCategories}
                resetAll={handleReset}
              />
            }
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
function ActionButtons({ selectedCategories, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0 dark-mode-text"}
        //action={{ modalContent: BulkDeleteTeacher }}
        bulkData={selectedCategories}
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
function DropdownItems({ selectedCategories, resetAll }) {
  return (
    <>
      <ModalButton
        classname={"border-none transparent-bg w-100 p-0"}
        //action={{ modalContent: BulkDeleteCourse }}
        bulkData={selectedCategories}
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
        bulkData={selectedCategories}
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
        bulkData={selectedCategories}
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