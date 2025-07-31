import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { StudentTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeactivateStudent from "../../ModalContent/Student/DeactivateStudent";
import DeleteStudent from "../../ModalContent/Student/DeleteStudent";
import StudentDetails from "../../ModalContent/Student/StudentDetails";
import UpdateStudent from "../../ModalContent/Student/UpdateStudent";
import CreateStudent from "../../ModalContent/Student/CreateStudent";
import MarkAsDropout from "../../ModalContent/Student/MarkAsDropout";
import { useGetStudents } from "../../hooks/student/useGetStudent";
import Table from "../../components/Tables/Tables";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { Icon } from "@iconify/react";
import React, {useState} from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import ActivateStudent from "../../ModalContent/Student/ActivateStudent";
import { DetailsIcon, UpdateIcon, DeleteIcon, SuspendIcon, ActivateIcon } from "../../icons/ActionIcons";
function Students() {
  const { data: students, isFetching } = useGetStudents();
  if (isFetching) {
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
              <Icon
                icon="grommet-icons:user-admin"
                className="font-size-md primary-color"
              />
            </div>
            <span className="my-0 fw-semibold">Manage Students</span>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Students</p>
            <h1 className="fw-bold my-0">{students.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent: CreateStudent }}
              classname="border-none rounded-3 green-bg font-size-sm text-white px-3 py-2"
            >
              <span className="font-size-sm">Create Student</span>
            </ModalButton>
          </div>
        </div>
      </div>
      <Table
        colDefs={StudentTableConfig({ DropdownComponent })}
        rowData={students.data}
        rowHeight={55}
      />
    </>
  );
}
export default Students;
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
           className={"remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"}
          onClick={() => handleShowModal(UpdateStudent)}
       >
            <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Update Student</span>
            <UpdateIcon />
          </div>
        </div>
       </DropDownMenuItem>
       <DropDownMenuItem
           className={"remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"}
          onClick={() => handleShowModal(DeleteStudent)}
       >
            <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Delete Student</span>
            <DeleteIcon />
          </div>
        </div>
       </DropDownMenuItem>
       <DropDownMenuItem
           className={"remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"}
          onClick={() => handleShowModal(StudentDetails)}
       >
            <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Student Details</span>
            <DetailsIcon />
          </div>
        </div>
       </DropDownMenuItem>
       <DropDownMenuItem
           className={"remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"}
          onClick={() => handleShowModal(MarkAsDropout)}
       >
            <div>
          <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
            <span>Mark Student As Drop-out</span>
            <UpdateIcon />
          </div>
        </div>
       </DropDownMenuItem>
                {rowData.status == "active" ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            onClick={() => handleShowModal(DeactivateStudent, "md")}
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
            onClick={() => handleShowModal(ActivateStudent, "md")}
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
