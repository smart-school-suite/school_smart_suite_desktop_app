import { Icon } from "@iconify/react";
import Table from "../../components/Tables/Tables";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { semesterTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import UpdateSemester from "../../ModalContent/Semesters/UpdateSemester";
import DeleteSemester from "../../ModalContent/Semesters/DeleteSemester";
import SemeseterDetails from "../../ModalContent/Semesters/SemesterDetails";
import CreateSemester from "../../ModalContent/Semesters/CreateSemester";
import { useGetActiveSchoolSemesters } from "../../hooks/schoolSemester/useGetSchoolSemesters";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { DetailsIcon, UpdateIcon, DeleteIcon } from "../../icons/ActionIcons";
import { SemesterIcon } from "../../icons/Icons";
import { useSelector } from "react-redux";
function Semester() {
  const { data: schoolSemesters, isLoading } = useGetActiveSchoolSemesters();
  const darkMode = useSelector((state) => state.theme.darkMode);
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
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
          <SemesterIcon />
          </div>
          <span className="my-0 fw-semibold">Semester Management</span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center mt-4 w-100">
        <div className="d-flex flex-row align-items-end gap-2">
          <div className="d-block">
            <p className="font-size-xs my-0">Created Semesters</p>
            <h1 className="fw-bold my-0">{schoolSemesters.data.length}</h1>
          </div>
        </div>
        <div className="end-block d-flex flex-row ms-auto justify-content-end gap-3">
          <ModalButton
            classname={
              "border-none green-bg font-size-sm rounded-3 px-3 gap-2 py-2 d-flex flex-row align-items-center d-flex text-white"
            }
            action={{ modalContent: CreateSemester }}
            size={"lg"}
          >
            <Icon icon="icons8:plus" className="font-size-md" />
            <span className="font-size-sm">Create Semester</span>
          </ModalButton>
        </div>
      </div>
      <div>
        <Table
          colDefs={semesterTableConfig({
            ActionButtonGroup,
          })}
          rowData={schoolSemesters.data}
          rowHeight={55}
        />
      </div>
    </>
  );
}
export default Semester;
function ActionButtonGroup(props) {
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
  //delete. update. details
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
          onClick={() => handleShowModal(UpdateSemester, "lg")}
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
          onClick={() => handleShowModal(DeleteSemester, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(SemeseterDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Details</span>
              <DetailsIcon />
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
