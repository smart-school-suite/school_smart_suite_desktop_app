import Table from "../../components/Tables/Tables";
import { electionTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { useGetElections } from "../../hooks/election/useGetElections";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import React, { useState } from "react";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import { DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import ElectionDetails from "../../ModalContent/Elections/ElectionDetails";
import DeleteElection from "../../ModalContent/Elections/DeleteElection";
import UpdateElection from "../../ModalContent/Elections/UpdateElection";
import LiveElection from "./LiveElection";
import { LiveIcon } from "../../icons/Icons";
function Elections() {
  const [liveElection, setLiveElection] = useState({
    election_id: null,
  });
  return (
    <>
      {
        liveElection.election_id ? (
           <LiveElection 
             setLiveElection={setLiveElection}
             liveElection={liveElection}
           />
        ) : (
           <ElectionTable 
        liveElection={liveElection}
        setLiveElection={setLiveElection}
      />
        )
      }
    </>
  );
}

function ElectionTable({ liveElection, setLiveElection }) {
  const { data: elections, isLoading, error } = useGetElections();
  return (
    <>
      <div className="d-flex flex-column gap-2 h-100">
        <div
          className="d-flex flex-row align-items-center justify-content-between"
          style={{ height: "5%" }}
        >
          <div className="d-flex flex-row align-items-center">
            <span className="fw-semibold">Manage Elections {liveElection.election_id}</span>
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
              colDefs={electionTableConfig({
                DropdownComponent,
                setLiveElection
              })}
              rowData={elections?.data}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default Elections;
export function DropdownComponent(props) {
  const rowData = props.data;
  const setLiveElection = props.setLiveElection;
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
          onClick={() => {
              setLiveElection((prev) => ({...prev, ['election_id']:rowData.id}))
          }}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Follow Life Election</span>
              <LiveIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(UpdateElection, "lg")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteElection, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete</span>
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
