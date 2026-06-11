import { useGetSchoolAcademicYears } from "../../hooks/academicYear/useGetSchoolAcademicYears";
import { useSelector } from "react-redux";
import Table from "../../components/Tables/Tables";
import React, { useMemo, useState, useRef } from "react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { academicYearTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import {
  ActivateIcon,
  DeleteIcon,
  DetailsIcon,
  SuspendIcon,
  UpdateIcon,
} from "../../icons/ActionIcons";
import { AcademicYearIcon } from "../../icons/Icons";
import AcademicYearDetails from "../../ModalContent/AcademicYear/AcademicYearDetails";
import CreateAcademicYear from "../../ModalContent/AcademicYear/CreateAcademicYear";
import DeleteAcademicYear from "../../ModalContent/AcademicYear/DeleteAcademicYear";
import UpdateAcademicYear from "../../ModalContent/AcademicYear/UpdateAcademicYear";
import { Icon } from "@iconify/react";
function AcademicYear() {
  const {
    data: schoolAcademicYears,
    isLoading,
    error,
  } = useGetSchoolAcademicYears();
  const tableRef = useRef();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const memoizedRowData = useMemo(() => {
    return schoolAcademicYears?.data ?? [];
  }, [schoolAcademicYears]);
  return (
    <>
      <main className="main-container gap-2">
        <div style={{ height: "15%" }} className="d-flex flex-column gap-3">
          <div className="d-flex align-items-center gap-3">
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
              <AcademicYearIcon />
            </div>
            <span className="my-0 fw-semibold">
              School Academic Year Management
            </span>
          </div>
          <div className="d-flex flex-row align-items-center w-100">
            <div className="d-block">
              <p className="font-size-xs my-0">Total Academic Year</p>
              <h1 className="fw-bold my-0">
                {schoolAcademicYears?.data?.length || 0}
              </h1>
            </div>
            <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
              <ModalButton
                action={{ modalContent: CreateAcademicYear }}
                classname={
                  "border-none green-bg font-size-sm rounded-3  gap-2 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"
                }
                size={"lg"}
              >
                <Icon icon="icons8:plus" className="font-size-md" />
                <span className="font-size-sm">Create Academic Year</span>
              </ModalButton>
            </div>
          </div>
        </div>
        <div style={{ height: "85%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" speed={1} />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : schoolAcademicYears?.data?.length > 0 ? (
            <>
              <Table
                colDefs={academicYearTableConfig({ DropdownComponent })}
                rowData={memoizedRowData}
                ref={tableRef}
                rowHeight={55}
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
export default AcademicYear;

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
          onClick={() => handleShowModal(UpdateAcademicYear, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Academic Year</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(AcademicYearDetails, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Academic Year Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteAcademicYear, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Acadenuc Year</span>
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
