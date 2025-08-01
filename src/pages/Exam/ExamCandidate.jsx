import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { useGetExamCandidates } from "../../hooks/examCandidate/useGetExamCandidates";
import Table from "../../components/Tables/Tables";
import { ExamCandidateTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { Icon } from "@iconify/react";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { CreateIcon, DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import DeleteExamCandidate from "../../ModalContent/ExamCandidate/DeleteCandidate";
import AddCaScores from "../../ModalContent/ExamCandidate/AddCaScores";
import AddExamScores from "../../ModalContent/ExamCandidate/AddExamScores";
import { ExamCandidateIcon } from "../../icons/Icons";
function ExamCandidates() {
  const { data: examCandidates, isLoading } = useGetExamCandidates();
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
            <ExamCandidateIcon />
          </div>
          <span className="my-0 fw-semibold">Manage Exam Candidates</span>
        </div>
      </div>
      <div className="d-flex flex-column my-3">
        <div className="d-block">
          <p className="font-size-xs my-0">Total Number of Candidates</p>
          <h1 className="fw-bold my-0">{examCandidates?.data?.length}</h1>
        </div>
      </div>
      <div>
        {examCandidates?.data?.length > 0 ? (
          <Table
            colDefs={ExamCandidateTableConfig({ DropdownComponent })}
            rowData={examCandidates.data}
          />
        ) : (
          <div className="alert alert-warning">No Canidates Added Found</div>
        )}
      </div>
    </>
  );
}
export default ExamCandidates;

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
          onClick={() => handleShowModal(DeleteExamCandidate, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Candidate</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        {rowData.exam_type === "ca" ? (
          <>
            <DropDownMenuItem
              className={
                "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
              }
              onClick={() => handleShowModal(AddCaScores, "xl")}
            >
              <div>
                <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                  <span>Add CA Scores</span>
                  <CreateIcon />
                </div>
              </div>
            </DropDownMenuItem>
            {/* <DropDownMenuItem
              className={
                "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
              }
              
            >
              <div>
                <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                  <span>Update CA Scores</span>
                  <UpdateIcon />
                </div>
              </div>
            </DropDownMenuItem>*/}
          </>
        ) : (
          <>
            <DropDownMenuItem
              className={
                "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
              }
              onClick={() => handleShowModal(AddExamScores, "xl")}
            >
              <div>
                <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                  <span>Add Exam Scores</span>
                  <CreateIcon />
                </div>
              </div>
            </DropDownMenuItem>
            {/* <DropDownMenuItem
              className={
                "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
              }
              
            >
              <div>
                <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                  <span>Update Exam Scores</span>
                  <UpdateIcon />
                </div>
              </div>
            </DropDownMenuItem>*/}
          </>
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
