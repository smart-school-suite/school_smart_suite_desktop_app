import Table from "../../components/Tables/Tables";
import { SpecialtyTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CreateSpecialty from "../../ModalContent/Specialty/CreateSpecialty";
import UpdateSpecialty from "../../ModalContent/Specialty/UpdateSpecialty";
import SpecialtyDetails from "../../ModalContent/Specialty/SpecialtyDetails";
import DeleteSpecialty from "../../ModalContent/Specialty/DeleteSpecialty";
import DeactivateSpecialty from "../../ModalContent/Specialty/DeactivateSpecialty";
import ActionButtonDropdown, {
  DropDownMenuItem,
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { ActivateIcon, DeleteIcon, DetailsIcon, SuspendIcon, UpdateIcon } from "../../icons/ActionIcons";
import React from "react";
import { useState } from "react";
import CustomModal from "../../components/Modals/Modal";
import ActivateSpecialty from "../../ModalContent/Specialty/ActivateSpecialty";
import { SpecialtyIcon } from "../../icons/Icons";
import { useSelector } from "react-redux";
function Specialties() {
  const { data: specialty, isLoading } = useGetSpecialties();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const memoizedColDefs = useMemo(() => {
    return SpecialtyTableConfig({
      DropdownComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return specialty?.data ?? [];
  }, [specialty]);
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
              <SpecialtyIcon />
            </div>
            <span className="my-0 fw-semibold">Manage Specialties</span>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number specialties</p>
            <h1 className="fw-bold my-0">{memoizedRowData.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent: CreateSpecialty }}
              size={"lg"}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 gap-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <Icon icon="icons8:plus" className="font-size-md" />
              <span>Create Specialty</span>
            </ModalButton>
          </div>
        </div>
        <Table colDefs={memoizedColDefs} rowData={memoizedRowData} />
      </div>
    </>
  );
}
export default Specialties;

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
          onClick={() => handleShowModal(UpdateSpecialty, "lg")}
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
          onClick={() => handleShowModal(DeleteSpecialty, "md")}
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
          onClick={() => handleShowModal(SpecialtyDetails, "md")}
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
            onClick={() => handleShowModal(DeactivateSpecialty, "md")}
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
            onClick={() => handleShowModal(ActivateSpecialty, "md")}
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
