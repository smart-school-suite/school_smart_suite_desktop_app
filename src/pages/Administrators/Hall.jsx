import Table from "../../components/Tables/Tables";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import React, { useMemo, useState, useRef } from "react";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import {
  DeleteIcon,
  DetailsIcon,
  UpdateIcon,
  SuspendIcon,
  ActivateIcon,
} from "../../icons/ActionIcons";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { hallTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { useGetHalls } from "../../hooks/hall/useGetHalls";
import CreateHall from "../../ModalContent/Hall/CreateHall";
import { Icon } from "@iconify/react";
import UpdateHall from "../../ModalContent/Hall/UpdateHall";
import HallDetails from "../../ModalContent/Hall/HallDetails";
import DeactivateHall from "../../ModalContent/Hall/DeactivateHall";
import ActivateHall from "../../ModalContent/Hall/ActivateHall";
import DeleteHall from "../../ModalContent/Hall/DeleteHall";
function Hall() {
  const { data: halls, isLoading, error } = useGetHalls();
  const tableRef = useRef();
  const memoizedColDefs = useMemo(() => {
    return hallTableConfig({
      DropdownComponent,
    });
  }, []);
  const memoizedRowData = useMemo(() => {
    return halls?.data ?? [];
  }, [halls]);
  return (
    <>
      <main className="main-container gap-2 h-100">
        <div style={{ height: "5%" }}>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="fw-semibold">Hall</span>
            <ModalButton
              action={{ modalContent: CreateHall }}
              size={"lg"}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 gap-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <Icon icon="icons8:plus" className="font-size-md" />
              <span>Create Hall</span>
            </ModalButton>
          </div>
        </div>
        <div style={{ height: "95%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <>
              <Table
                colDefs={memoizedColDefs}
                rowData={memoizedRowData}
                rowHeight={55}
                ref={tableRef}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default Hall;

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
          onClick={() => handleShowModal(UpdateHall, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Hall</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
                <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(HallDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Hall Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>

        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeactivateHall, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Deactivate Hall</span>
              <SuspendIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
           onClick={() => handleShowModal(ActivateHall, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Activate Hall</span>
              <ActivateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
           onClick={() => handleShowModal(DeleteHall, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Hall</span>
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
