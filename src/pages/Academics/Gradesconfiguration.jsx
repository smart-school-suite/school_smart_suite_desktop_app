import Table from "../../components/Tables/Tables";
import { Icon } from "@iconify/react";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import UpdateGradeConfig from "../../ModalContent/GradesConfig/UpdateGrades";
import DeleteGradesConfig from "../../ModalContent/GradesConfig/DeleteGrades";
import ViewGradesConfig from "../../ModalContent/GradesConfig/ViewConfigurations";
import ConfigureGrades from "../../ModalContent/GradesConfig/ConfigureGrades";
import { ExamGradingCongfig } from "../../ComponentConfig/AgGridTableConfig";
import ConfigureByOtherGrades from "../../ModalContent/GradesConfig/ConfigureByOtherGrades";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import React, { useState } from "react";
import { CreateIcon, DeleteIcon,  GenerateIcon, ReuseIcon, UpdateIcon } from "../../icons/ActionIcons";
import { useGetSchoolGradeCategories } from "../../hooks/schoolGradeCategory/useGetSchoolGradeCategory";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { GradeIcon } from "../../icons/Icons";
import AutoConfigureGrades from "../../ModalContent/GradesConfig/AutoConfigGrades";
import { useSelector } from "react-redux";
function Gradesconfiguration() {
  const { data:gradeCategory, isLoading } = useGetSchoolGradeCategories();
  const darkMode = useSelector((state) => state.theme.darkMode);
  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
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
            <span className="my-0 fw-semibold">Manage Exam Grading</span>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Grades Config</p>
            <h1 className="fw-bold my-0">{gradeCategory.data.length}</h1>
          </div>
        </div>
        {gradeCategory?.data?.length > 0 ? (
          <Table
            colDefs={ExamGradingCongfig({ DropdownComponent })}
            rowData={gradeCategory.data}
          />
        ) : (
          <div className="alert alert-warning">
            No Grades Found
          </div>
        )}
      </div>
    </>
  );
}
export default Gradesconfiguration;

function DropdownComponent(props) {
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

  //deleteGradesCongig configureGrades, viewGrades, updateGrades, configureByOtherGrades
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
          onClick={() => handleShowModal(AutoConfigureGrades, 'md')}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Auto Generate Grades</span>
              <GenerateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(ConfigureGrades, 'xl')}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Configure Grade</span>
              <CreateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(UpdateGradeConfig, 'xl')}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Grades Config</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(ViewGradesConfig, 'md')}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>View Grades</span>
              <GradeIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(ConfigureByOtherGrades)}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Configure By Other Grades</span>
              <ReuseIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteGradesConfig, 'md')}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Grades Config</span>
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
