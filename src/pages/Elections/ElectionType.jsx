import { useGetElectionTypes } from "../../hooks/electionType/useGetElectionTypes";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import React, { useState } from "react";
import Table from "../../components/Tables/Tables";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import CreateElectionType from "../../ModalContent/ElectionType/CreateElectionType";
import { electionTypeTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { ActivateIcon, DeleteIcon, SuspendIcon, UpdateIcon } from "../../icons/ActionIcons";
import UpdateElectionType from "../../ModalContent/ElectionType/UpdateElectionType";
import DeleteElectionType from "../../ModalContent/ElectionType/DeleteElectionType";
import DeactivateElectionType from "../../ModalContent/ElectionType/DeactivateElectionType";
import ActivateElectionType from "../../ModalContent/ElectionType/ActivateElectionType";
function ElectionType() {
  const { data: electionTypes, isLoading, error } = useGetElectionTypes();
  return (
    <>
      <div className="d-flex flex-column h-100 gap-2">
        <div
          className="d-flex flex-row align-items-center justify-content-between"
          style={{ height: "5%" }}
        >
          <div className="d-flex flex-row align-items-center">
            <span className="fw-semibold">Election Types</span>
          </div>
          <ModalButton
            action={{ modalContent: CreateElectionType }}
            classname={
              "border-none rounded-3 px-2 d-flex align-items-center gap-2 py-2 font-size-sm primary-background-200 color-primary"
            }
          >
            <Icon icon="icons8:plus" className="font-size-md" />
            <span>Create Election Type</span>
          </ModalButton>
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
            <>
              <Table
                colDefs={electionTypeTableConfig({ DropdownComponent })}
                rowData={electionTypes.data}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default ElectionType;

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
           onClick={() => handleShowModal(UpdateElectionType, "md")}
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
           onClick={() => handleShowModal(DeactivateElectionType, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Deactivate Election Type</span>
              <SuspendIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
           onClick={() => handleShowModal(ActivateElectionType, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Activate Election Type</span>
              <ActivateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteElectionType, "md")}
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
