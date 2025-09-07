import Table from "../../components/Tables/Tables";
import { Icon } from "@iconify/react";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { StudentBatchesTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CreateStudentBatch from "../../ModalContent/StudentBatches/CreateStudentBatch";
import UpdateStudentBatch from "../../ModalContent/StudentBatches/UpdateStudentBatch";
import ActivateBatch from "../../ModalContent/StudentBatches/ActivateBatch";
import DeactivateBatch from "../../ModalContent/StudentBatches/DeactivateBatch";
import DeleteStudentBatch from "../../ModalContent/StudentBatches/DeleteStudentBatch";
import StudentBatchDetails from "../../ModalContent/StudentBatches/StudentBatchDetails";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import React, {useState} from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { ActivateIcon, DeleteIcon, SuspendIcon, UpdateIcon } from "../../icons/ActionIcons";
import { BatchIcon } from "../../icons/Icons";
import { useSelector } from "react-redux";
function StudentBatches() {
  const { data: studentBatches, isLoading } = useGetBatches();
  const darkMode = useSelector((state) => state.theme.darkMode);
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
        <div className="my-2">
          <div className="d-flex align-items-center gap-2">
            <div
              className={`${darkMode ? 'dark-mode-active' : 'light-mode-active'} d-flex justify-content-center align-items-center`}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
              }}
            >
             <BatchIcon />
            </div>
            <span className="my-0 fw-semibold">Student Batch Management</span>
          </div>
        </div>
      </div>
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of batches</p>
            <h1 className="fw-bold my-0">{studentBatches.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent: CreateStudentBatch }}
              classname="border-none rounded-3 green-bg font-size-sm text-white px-3 py-2"
            >
              <span className="font-size-sm">Create Batch</span>
            </ModalButton>
          </div>
        </div>
        <Table
          colDefs={StudentBatchesTableConfig({ DropdownComponent })}
          rowData={studentBatches.data}
        />
      </div>
    </>
  );
}
export default StudentBatches;

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
           className={"remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"}
          onClick={() => handleShowModal(UpdateStudentBatch)}
       >
            <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Update</span>
            <UpdateIcon />
          </div>
        </div>
       </DropDownMenuItem>
        <DropDownMenuItem
           className={"remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"}
          onClick={() => handleShowModal(UpdateStudentBatch)}
       >
            <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Delete</span>
            <DeleteIcon />
          </div>
        </div>
       </DropDownMenuItem>
                {rowData.status == "active" ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() => handleShowModal(DeactivateBatch, "md")}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Deactivate</span>
                <SuspendIcon />
              </div>
            </div>
          </DropDownMenuItem>
        ) : (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() => handleShowModal(ActivateBatch, "md")}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Activate</span>
                <ActivateIcon />
              </div>
            </div>
          </DropDownMenuItem>
        )}
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
