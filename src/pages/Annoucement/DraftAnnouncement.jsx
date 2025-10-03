import { useGetAnnouncementByStatus } from "../../hooks/announcement/useGetAnnouncementByStatus";
import Table from "../../components/Tables/Tables";
import { AnnouncementTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { useMemo } from "react";
import AnnouncementDetails from "../../ModalContent/Announcement/AnnouncementDetails";
import DeleteAnnouncement from "../../ModalContent/Announcement/DeleteAnnouncement";
import UpdateAnnouncementContent from "../../ModalContent/Announcement/UpdateAnnouncementContent";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import {
  DeleteIcon,
  DetailsIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import React, {useState} from "react";
import CustomModal from "../../components/Modals/Modal";
import UpdateAnnouncementDraft from "../../ModalContent/Announcement/UpdateAnnouncementDraft";
function DraftAnnouncement() {
  const {
    data: announcement,
    isLoading,
    error,
  } = useGetAnnouncementByStatus("draft");
  const memoizedColDefs = useMemo(() => {
    return AnnouncementTableConfig({
      DropdownComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return announcement?.data ?? [];
  }, [announcement]);

  return (
    <>
      <div className="d-flex flex-column gap-2 h-100">
        <div style={{ height: "5%" }}>
          <span className="fw-semibold">Draft Announcements</span>
        </div>
        <div style={{ height: "95%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <Table colDefs={memoizedColDefs} rowData={memoizedRowData} />
          )}
        </div>
      </div>
    </>
  );
}
export default DraftAnnouncement;

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
          onClick={() => handleShowModal(UpdateAnnouncementDraft, "xl")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Continue Editing</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(UpdateAnnouncementContent, "xl")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Content</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(AnnouncementDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Announcement Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteAnnouncement, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Announcement</span>
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