import Table from "../../components/Tables/Tables";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { teacherTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeactivateTeacher from "../../ModalContent/Teacher/DeactivateTeacher";
import DeleteTeacher from "../../ModalContent/Teacher/DeleteTeacher";
import TeacherDetails from "../../ModalContent/Teacher/TeacherDetails";
import UpdateTeacher from "../../ModalContent/Teacher/UpdateTeacher";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import CreateTeacher from "../../ModalContent/Teacher/CreateTeacher";
import { useMemo, useState } from "react";
import React from "react";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { Icon } from "@iconify/react";
import { useGetTeachers } from "../../hooks/teacher/useGetTeachers";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import ActivateTeacher from "../../ModalContent/Teacher/ActivateTeacher";
import Specialtypreference from "../../ModalContent/Teacher/SpecialtyPreference";
import { DeleteIcon, DetailsIcon, UpdateIcon, ChoiceIcon, SuspendIcon, ActivateIcon } from "../../icons/ActionIcons";
import { TeacherIcon } from "../../icons/Icons";
function Teachers() {
  const { data: teachers, isLoading } = useGetTeachers();
  const memoizedColDefs = useMemo(() => {
    return teacherTableConfig({
      DropdownComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return teachers?.data ?? [];
  }, [teachers]);

  if (isLoading) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
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
              <TeacherIcon />
            </div>
            <span className="my-0 fw-semibold">Teacher Management</span>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number Teachers</p>
            <h1 className="fw-bold my-0">{memoizedRowData.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 gap-2 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
              action={{ modalContent:CreateTeacher }}
            >
              <Icon icon="icons8:plus" className="font-size-md" />
              <span>Create Teacher</span>
            </ModalButton>
          </div>
        </div>
        <div>
         <Table colDefs={memoizedColDefs} rowData={memoizedRowData}  rowHeight={55}/>
        </div>
      </div>
    </>
  );
}
export default Teachers;

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
           className={"remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"}
          onClick={() => handleShowModal(UpdateTeacher, 'md')}
       >
            <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Update</span>
            <UpdateIcon />
          </div>
        </div>
       </DropDownMenuItem>
        <DropDownMenuItem
           className={"remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"}
          onClick={() => handleShowModal(DeleteTeacher, "md")}
       >
            <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Delete</span>
            <DeleteIcon />
          </div>
        </div>
       </DropDownMenuItem>
       <DropDownMenuItem
           className={"remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"}
          onClick={() => handleShowModal(Specialtypreference, "lg")}
       >
            <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Specialty Preference</span>
            <ChoiceIcon />
          </div>
        </div>
       </DropDownMenuItem>
       <DropDownMenuItem
           className={"remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"}
          onClick={() => handleShowModal(TeacherDetails, "md")}
       >
            <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Details</span>
            <DetailsIcon />
          </div>
        </div>
       </DropDownMenuItem>
           {rowData.status == "active" ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() => handleShowModal(DeactivateTeacher, "md")}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Deactivate</span>
                <SuspendIcon />
              </div>
            </div>
          </DropDownMenuItem>
        ) : (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() => handleShowModal(ActivateTeacher, "md")}
          >
            <div>
              <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
                <span>Activate</span>
                <ActivateIcon />
              </div>
            </div>
          </DropDownMenuItem>
        )}
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
