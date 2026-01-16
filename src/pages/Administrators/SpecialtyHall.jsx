import Table from "../../components/Tables/Tables";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import React, { useMemo, useState, useRef } from "react";
import { DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import CustomModal from "../../components/Modals/Modal";
import { DeleteIcon, ChoiceIcon } from "../../icons/ActionIcons";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { specialtyHallTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import ManageSpecialtyHall from "../../ModalContent/SpecialtyHall/ManageSpecialtyHall";
import RemoveAllAssignedHalls from "../../ModalContent/SpecialtyHall/RemoveAssignHall";
function SpecialtyHall() {
  const { data: specialties, isLoading, error } = useGetSpecialties();
  const tableRef = useRef();
  const memoizedColDefs = useMemo(() => {
    return specialtyHallTableConfig({
      DropdownComponent,
    });
  }, []);
  const memoizedRowData = useMemo(() => {
    return specialties?.data ?? [];
  }, [specialties]);

  return (
    <>
      <main className="main-container gap-2 h-100">
        <div style={{ height: "5%" }}>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="fw-semibold">Specialty Hall</span>
          </div>
        </div>
        <div style={{ height: "95%" }}>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="100%" />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <>
              <Table
                colDefs={memoizedColDefs}
                rowData={memoizedRowData}
                rowHeight={55}
                ref={tableRef}
              />
            </>
          )}
        </div>
      </main>
    </>
  );
}
export default SpecialtyHall;

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
          onClick={() => handleShowModal(ManageSpecialtyHall, "lg")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Manage Specialty Hall</span>
              <ChoiceIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table p-0 rounded-2 pointer-cursor"
          }
         onClick={() => handleShowModal(RemoveAllAssignedHalls, "md")}
        >
          <div>
            <div className="px-2 d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete All Hall Assignment</span>
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
