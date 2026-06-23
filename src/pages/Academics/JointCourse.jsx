import Table from "../../components/Tables/Tables";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import CourseDetails from "../../ModalContent/Course/CourseDetails";
import CreateCourse from "../../ModalContent/Course/CreateCourse";
import DeactivateCourse from "../../ModalContent/Course/DeactivateCourse";
import UpdateCourse from "../../ModalContent/Course/UpdateCourse";
import { jointCoursesTable } from "../../ComponentConfig/AgGridTableConfig";
import { useGetCourses } from "../../hooks/course/useGetCourses";
import React, { useState, useCallback, useRef, useEffect } from "react";
import CustomModal from "../../components/Modals/Modal";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import {
  ActivateIcon,
  DeleteIcon,
  DetailsIcon,
  SuspendIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import ActivateCourse from "../../ModalContent/Course/ActivateCourse";
import DeleteCourse from "../../ModalContent/Course/DeleteCourse";
import { CourseIcon } from "../../icons/Icons";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import BulkActionsToast from "../../components/Toast/BulkActionsToast";
import CustomTooltip from "../../components/Tooltips/Tooltip";
import BulkDeleteCourse from "../../ModalContent/Course/BulkDeleteCourse";
import BulkDeactivateCourse from "../../ModalContent/Course/BulkDeactivateCourse";
import BulkActivateCourse from "../../ModalContent/Course/BulkActivateCourse";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetJointCourses } from "../../hooks/jointCourse/useGetJointCourse";
import CreateJointCourse from "../../ModalContent/JointCourse/CreateJointCourse";
function JointCourse() {
  const { data: jointCourses, isLoading, error } = useGetJointCourses();
  const tableRef = useRef();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [rowCount, setRowCount] = useState(0);
  return (
    <>
      <main className="main-container gap-2 h-100">
        <div style={{ height: "10%" }} className="d-flex flex-column gap-3">
          <div className="d-flex flex-row align-items-center w-100">
            <div className="d-block">
              <p className="font-size-xs my-0">Total Joint Courses</p>
              <h1 className="fw-bold my-0">
                {jointCourses?.data?.length || 0}
              </h1>
            </div>
            <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
              <ModalButton
                action={{ modalContent: CreateJointCourse }}
                classname={
                  "border-none green-bg font-size-sm rounded-3  gap-2 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"
                }
                size={"lg"}
              >
                <Icon icon="icons8:plus" className="font-size-md" />
                <span className="font-size-sm">Create Joint Course</span>
              </ModalButton>
            </div>
          </div>
        </div>
        <div style={{ height: "90%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" speed={1} />
          ) : error ? (
            <NotFoundError
              title={error.response.data.errors.title}
              description={error.response.data.errors.description}
            ></NotFoundError>
          ) : jointCourses?.data?.length > 0 ? (
            <>
              <Table
                colDefs={jointCoursesTable({ DropdownComponent })}
                rowData={jointCourses.data}
                ref={tableRef}
              />
            </>
          ) : (
            <div className="alert alert-danger">
              Something is wrong with our servers dont worry our engineers are
              working on it
            </div>
          )}
        </div>
      </main>
    </>
  );
}
export default JointCourse;

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
      }),
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
        //  onClick={() => handleShowModal(UpdateCourse, "lg")}
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
         // onClick={() => handleShowModal(CourseDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          //onClick={() => handleShowModal(DeleteCourse, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
        {rowData.status == "active" ? (
          <DropDownMenuItem
            className={
              "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
            }
            //onClick={() => handleShowModal(DeactivateCourse, "md")}
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
            //onClick={() => handleShowModal(ActivateCourse, "md")}
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
