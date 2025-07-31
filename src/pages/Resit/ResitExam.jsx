import { useGetAllResitExams } from "../../hooks/resitExam/useGetResitExams";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import Table from "../../components/Tables/Tables";
import { Icon } from "@iconify/react";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { ExamsTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import UpdateResitExam from "../../ModalContent/ResitExam/UpdateResitExam";
import ResitExamGrading from "../../ModalContent/ResitExam/AddResitExamGrading";
import { ExamIcon, GradeIcon } from "../../icons/Icons";
function ResitExam() {
  const { data: resitExams, isLoading } = useGetAllResitExams();
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
            <ExamIcon />
          </div>
          <span className="my-0 fw-semibold">Resit Exam Management</span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center mt-4 w-100">
        <div className="d-block">
          <p className="font-size-xs my-0">Total Number of Exams</p>
          <h1 className="fw-bold my-0">{resitExams.data.length}</h1>
        </div>
      </div>
      <div>
        {resitExams.data.length > 0 ? (
          <Table
            colDefs={ExamsTableConfig({ DropdownComponent })}
            rowData={resitExams.data}
          />
        ) : (
          <div className="alert alert-warning">No Exams Found</div>
        )}
      </div>
    </>
  );
}
export default ResitExam;

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
          onClick={() => handleShowModal(UpdateResitExam, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Exam</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Exam Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(ResitExamGrading, 'md')}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Add Exam Grading</span>
              <GradeIcon />
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

