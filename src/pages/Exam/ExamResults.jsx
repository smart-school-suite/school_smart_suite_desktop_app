import Table from "../../components/Tables/Tables";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { GradeIcon } from "../../icons/Icons";
import { useGetExamResults } from "../../hooks/examResults/useGetExamResults";
import { ExamResultsTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import  React, { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { CreateIcon, DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import ExamResultDetails from "../../ModalContent/ExamResults/ResultDetails";
import { useSelector } from "react-redux";
function ExamResults(){
 const { data:examResults, isLoading } = useGetExamResults();
 const darkMode = useSelector((state) => state.theme.darkMode);
 if(isLoading){
    return(
        <DataTableNavLoader />
    )
 }
    return(
        <>
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
            <GradeIcon />
          </div>
          <span className="my-0 fw-semibold">Exam Results</span>
        </div>
      </div>
      <div className="d-flex flex-column my-3">
        <div className="d-block">
          <p className="font-size-xs my-0">Total Number of Results</p>
          <h1 className="fw-bold my-0">{examResults?.data?.length}</h1>
        </div>
      </div>
      <div>
        {examResults?.data?.length > 0 ? (
          <Table
            colDefs={ExamResultsTableConfig({ DropdownComponent })}
            rowData={examResults?.data}
          />
        ) : (
          <div className="alert alert-warning">No Exam Results Added</div>
        )}
      </div>
        </>
    )
}
export default ExamResults;

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
          onClick={() => handleShowModal(ExamResultDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Result Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
         // onClick={() => handleShowModal(DeleteExamCandidate, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Result</span>
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
