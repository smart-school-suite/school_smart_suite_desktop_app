import { Icon } from "@iconify/react";
import { useGetStudentResits } from "../../hooks/studentResit/useGetStudentResits";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import Table from "../../components/Tables/Tables";
import { StudentResitTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { DeleteIcon, DetailsIcon } from "../../icons/ActionIcons";
import DeleteStudentResit from "../../ModalContent/StudentResit/DeleteResit";
import ResitDetails from "../../ModalContent/StudentResit/ResitDetails";
function StudentResit() {
  const { data: studentResits, isLoading } = useGetStudentResits();
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div className="my-2">
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex justify-content-center align-items-center primary-background-100 color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.5rem",
            }}
          >
            <Icon
              icon="grommet-icons:user-admin"
              className="font-size-md primary-color"
            />
          </div>
          <span className="my-0 fw-semibold">Student Resit Management</span>
        </div>
      </div>
      <div className="d-flex flex-column my-3">
        <div className="d-block">
          <p className="font-size-xs my-0">Total Number of Resits</p>
          <h1 className="fw-bold my-0">{studentResits.data.length}</h1>
        </div>
      </div>
      <div>
        <Table
          colDefs={StudentResitTableConfig({ DropdownComponent })}
          rowData={studentResits.data}
        />
      </div>
    </>
  );
}
export default StudentResit;

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
          onClick={() => handleShowModal(DeleteStudentResit, 'md')}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(ResitDetails, 'md')}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Details</span>
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
