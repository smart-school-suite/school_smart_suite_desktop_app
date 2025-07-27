import { Icon } from "@iconify/react";
import { useGetResitCandidates } from "../../hooks/resitCandidate/useGetResitCandidates";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import Table from "../../components/Tables/Tables";
import { ExamCandidateTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import SummitScores from "../../ModalContent/ResitCandidate/SubmitScores";
function ResitCandidates() {
  const { data: resitCandidates, isFetching } = useGetResitCandidates();
  if (isFetching) {
    return <DataTableNavLoader />;
  }
  return (
    <>
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
          <span className="my-0 fw-semibold">Resit Candidate Management</span>
        </div>
      </div>
      <div className="d-flex flex-column my-3">
        <div className="d-block">
          <p className="font-size-xs my-0">Total Number of Candidates</p>
          <h1 className="fw-bold my-0">{resitCandidates.data.length}</h1>
        </div>
      </div>
      <div>
        {resitCandidates?.data?.length > 0 ? (
          <Table
            colDefs={ExamCandidateTableConfig({ DropdownComponent })}
            rowData={resitCandidates.data}
          />
        ) : (
          <div className="alert alert-warning">No Canidates Added Found</div>
        )}
      </div>
    </>
  );
}
export default ResitCandidates;

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
          onClick={() => handleShowModal(SummitScores, 'xl')}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Add Resit Scores</span>
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
              <span>Update Resit Scores</span>
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
              <span>Delete Candidate</span>
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