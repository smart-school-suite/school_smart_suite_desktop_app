import Table from "../../components/Tables/Tables";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import ReinistateStudent from "../../ModalContent/StudentDropout/ReinstateStudent";
import { useGetDropdoutStudents } from "../../hooks/student/useGetDropoutStudent";
import React, { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import StudentDetails from "../../ModalContent/Student/StudentDetails";
import DeleteStudent from "../../ModalContent/Student/DeleteStudent";
import { StudentTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { Icon } from "@iconify/react";
function StudentDropOuts() {
  const { data:dropoutStudents, isFetching } = useGetDropdoutStudents();
  if (isFetching) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <main className="pt-2">
        <div className="my-2">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex justify-content-center align-items-center primary-background-100"
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
            <span className="my-0 fw-semibold">Manage Student Dropout</span>
          </div>
        </div>
        <div className="d-block">
          <p className="font-size-xs my-0">Total Dropouts</p>
          <h1 className="fw-bold my-0">{dropoutStudents.data.length}</h1>
        </div>
        <div className="mt-2">
          <Table
            colDefs={StudentTableConfig({ DropdownComponent })}
            rowData={dropoutStudents.data}
            rowHeight={55}
          />
        </div>
      </main>
    </>
  );
}
export default StudentDropOuts;

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
          onClick={() => handleShowModal(ReinistateStudent)}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Reinstate Student</span>
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteStudent)}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Student</span>
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(StudentDetails)}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Student Details</span>
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
