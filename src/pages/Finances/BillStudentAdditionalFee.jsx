import Table from "../../components/Tables/Tables";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import ActionButtonDropdown, {DropDownMenuItem} from "../../components/DataTableComponents/ActionComponent";
import StudentDetails from "../../ModalContent/Student/StudentDetails";
import { useGetStudents } from "../../hooks/student/useGetStudent";
import { StudentTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CreateStudentAdditionalFee from "../../ModalContent/AdditionalFees/CreateStudentAdditionalFee";
function BillStudentAdditionalFee(){
  const { data:students, isFetching } = useGetStudents();
  if(isFetching){
    return <DataTableNavLoader />
  }
    return(
        <>
      <div>
        <div className="d-flex flex-row align-items-center mb-2 w-100">
          <span className="font-size-sm fw-semibold">Addition Fee Billing</span>
        </div>
        <div>
          <Table
            colDefs={StudentTableConfig({ DropdownComponent })}
            rowData={students.data}
            rowHeight={55}
          />
        </div>
      </div>
        </>
    )
}
export default BillStudentAdditionalFee;

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
          onClick={() => handleShowModal(CreateStudentAdditionalFee, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Bill Student</span>
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(StudentDetails, "md")}
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