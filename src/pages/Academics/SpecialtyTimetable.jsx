import Table from "../../components/Tables/Tables";
import { SpecialtyTimetableTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import ViewTimetable from "../../ModalContent/SpecialtyTimetable/ViewTimetable";
import DeleteTimetable from "../../ModalContent/SpecialtyTimetable/DeleteTimetable";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { useGetActiveSchoolSemesters } from "../../hooks/schoolSemester/useGetSchoolSemesters";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { TimetableIcon } from "../../icons/Icons";
import { CreateIcon, DeleteIcon, UpdateIcon } from "../../icons/ActionIcons";
import AutomaticCreateTimetable from "../../ModalContent/SpecialtyTimetable/AutomaticCreateTimetable";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
function SpecialtyTimetable() {
  const { data:schoolSemesters, isLoading } = useGetActiveSchoolSemesters();
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
               <TimetableIcon />
              </div>
              <span className="my-0 fw-semibold">Manage Specialty Timetable</span>
            </div>
          </div>
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Number of semesters</p>
            <h1 className="fw-bold my-0">{schoolSemesters.data.length}</h1>
          </div>
        </div>
        <Table
          colDefs={SpecialtyTimetableTableConfig({
            ActionButtonGroup
          })}
          rowData={schoolSemesters.data}
          rowHeight={55}
        />
      </div>
    </>
  );
}
export default SpecialtyTimetable;


function ActionButtonGroup(props) {
   const rowData = props.data;
 
   const [showModal, setShowModal] = useState(false);
   const [modalContent, setModalContent] = useState(null);
   const [modalSize, setModalSize] = useState("md");
   const [fullscreen, setFullscreen] = useState(false);
   const handleCloseModal = () => {
     setShowModal(false);
     setModalContent(null);
   };
 
   const handleShowModal = (ContentComponent, size = "md", fullscreen = false) => {
     setModalContent(
       React.createElement(ContentComponent, {
         rowData,
         handleClose: handleCloseModal,
       })
     );
     setModalSize(size);
     setShowModal(true);
     setFullscreen(fullscreen);
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
          onClick={() => handleShowModal(AutomaticCreateTimetable, "xl")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Create Timetable</span>
              <CreateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        {/* <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(UpdateTimetable, "xl", false)}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Timetable</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>*/}
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteTimetable, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Timetable</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(ViewTimetable, "xl")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>View Timetable</span>
              <TimetableIcon />
            </div>
          </div>
        </DropDownMenuItem>
      </ActionButtonDropdown>

      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalSize}
        fullscreen={fullscreen}
        centered
      >
        {modalContent}
      </CustomModal>
    </>
  );
}
