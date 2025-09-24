import { useGetAllResitExams } from "../../hooks/resitExam/useGetResitExams";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import Table from "../../components/Tables/Tables";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { GenerateIcon, UpdateIcon } from "../../icons/ActionIcons";
import { ResitTimetableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CreateTimetable from "../../ModalContent/ExamResitTimetable/CreateTimetable";
import { TimetableIcon } from "../../icons/Icons";
import AutoGenResitExamTimetable from "../../ModalContent/ExamResitTimetable/AutoGenResitExamTimetable";
import { useSelector } from "react-redux";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
function ResitTimetable() {
  const { data: resitExams, isLoading, error } = useGetAllResitExams();
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <main className="main-container gap-2">
        <div className="d-flex flex-column gap-3" style={{ height: "15%" }}>
          <div className="d-flex align-items-center gap-2">
            <div
              className={`${
                darkMode ? "dark-mode-active" : "light-mode-active"
              } d-flex justify-content-center align-items-center`}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
              }}
            >
              <TimetableIcon />
            </div>
            <span className="my-0 fw-semibold">
              Resit Exam Timetable Management
            </span>
          </div>
          <div className="d-flex flex-row align-items-center w-100">
            <div className="d-block">
              <p className="font-size-xs my-0">Total Number of Exams</p>
              <h1 className="fw-bold my-0">{resitExams?.data?.length || 0}</h1>
            </div>
          </div>
        </div>
         <div style={{ height: "85%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          ) : error ? (
            <NotFoundError
              title={error.response.data.errors.title}
              description={error.response.data.errors.description}
            ></NotFoundError>
          ) : (
            <Table
              colDefs={ResitTimetableConfig({ DropdownComponent })}
              rowData={resitExams.data}
            />
          )}
        </div>
      </main>
    </>
  );
}
export default ResitTimetable;

function DropdownComponent(props) {
  const rowData = props.data;

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("md");
  const [fullscreen, setFullscreen] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleShowModal = (
    ContentComponent,
    size = "md",
    fullscreen = false
  ) => {
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
          onClick={() => handleShowModal(AutoGenResitExamTimetable, "xl")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Auto Generate Timetable</span>
              <GenerateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(CreateTimetable, "xl")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Create Timetable</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        {/*
                 <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Timetable</span>
              <UpdateIcon />
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
              <span>Delete Timetable</span>
              <DeleteIcon />
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
              <span>View Timetable</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        */}
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
