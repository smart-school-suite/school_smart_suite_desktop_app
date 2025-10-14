import { useGetPastElections } from "../../hooks/election/useGetPastElections";
import Table from "../../components/Tables/Tables";
import { pastElectionTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import React, { useState } from "react";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import { DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import ElectionDetails from "../../ModalContent/Elections/ElectionDetails";
import { StatsIcon } from "../../icons/Icons";
import PastElectionResults from "../../ModalContent/ElectionHistory/PastElectionResults";
function ElectionHistory(){
  const { data:pastElections, isLoading, error } = useGetPastElections();
     return(
        <>
         <div className="d-flex flex-column gap-2 h-100">
        <div
          className="d-flex flex-row align-items-center justify-content-between"
          style={{ height: "5%" }}
        >
          <div className="d-flex flex-row align-items-center">
            <span className="fw-semibold">Past Elections</span>
          </div>
        </div>
        <div style={{ height: "95%" }}>
          {isLoading ? (
            <RectangleSkeleton height="100%" width="100%" speed={0.5} />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <Table
              colDefs={pastElectionTableConfig({
                DropdownComponent
              })}
              rowData={pastElections?.data}
            />
          )}
        </div>
      </div>
        </>
     )
}
export default ElectionHistory;

export function DropdownComponent(props) {
  const rowData = props.data;
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("lg");

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleShowModal = (ContentComponent, size = "lg") => {
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
          onClick={() => handleShowModal(ElectionDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Election Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(PastElectionResults, "xl")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Election Results</span>
              <StatsIcon />
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
