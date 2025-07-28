import { AnnouncementCategoryTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import DeleteAnnouncementCategory from "../../ModalContent/AnnouncementCategory/DeleteAnnouncementCategory";
import UpdateAnnouncementCategory from "../../ModalContent/AnnouncementCategory/UpdateAnnouncementCategory";
import CreateAnnouncementCategory from "../../ModalContent/AnnouncementCategory/CreateAnnouncementCategory";
import Table from "../../components/Tables/Tables";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import { useGetAnnouncementCategories } from "../../hooks/announcement/useGetAnnouncementCategories";
import { DeleteIcon, UpdateIcon } from "../../icons/ActionIcons";
function AnnouncementCategory() {
  const { data: category, isLoading } = useGetAnnouncementCategories();
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div className="pt-3">
        <div className="d-flex flex-row align-items-center w-100 justify-content-between">
          <span className="font-size-sm">Announcement Category</span>
          <ModalButton
            action={{ modalContent: CreateAnnouncementCategory }}
            classname={"border-none rounded-3 px-2 d-flex align-items-center gap-2 py-2 font-size-sm primary-background-100"}
          >
            <Icon icon="icons8:plus" className="font-size-md" />
            <span>Create Category</span>
          </ModalButton>
        </div>
        <div className="mt-3">
            <Table 
              colDefs={AnnouncementCategoryTableConfig({ DropdownComponent })}
              rowData={category.data}
            />
        </div>
      </div>
    </>
  );
}
export default AnnouncementCategory;

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
          onClick={() => handleShowModal(UpdateAnnouncementCategory, "md")}
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
          onClick={() => handleShowModal(DeleteAnnouncementCategory, "md")}
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
