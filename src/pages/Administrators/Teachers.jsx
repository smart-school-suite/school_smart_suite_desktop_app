import { useFetchTeachersQuery } from "../../Slices/Asynslices/fetchSlice";
import Table from "../../components/Tables/Tables";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { teacherTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeactivateTeacher from "../../ModalContent/Teacher/DeactivateTeacher";
import DeleteTeacher from "../../ModalContent/Teacher/DeleteTeacher";
import TeacherDetails from "../../ModalContent/Teacher/TeacherDetails";
import UpdateTeacher from "../../ModalContent/Teacher/UpdateTeacher";
import CurrencyComponent from "../../components/DataTableComponents/CurrencyComponent";
import AddSpecialtyPreference from "../../ModalContent/Teacher/AddSpecialtyPreference";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import AppointHod from "../../ModalContent/Teacher/AppointHod";
import AppointHos from "../../ModalContent/Teacher/AppointHos";
import CreateTeacher from "../../ModalContent/Teacher/CreateTeacher";
import { useMemo } from "react";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { Icon } from "@iconify/react";
import { useGetTeachers } from "../../hooks/teacher/useGetTeachers";
function Teachers() {
  const { data: teachers, isFetching } = useGetTeachers();
  const memoizedColDefs = useMemo(() => {
    return teacherTableConfig({
      DropdownComponent,
      CurrencyComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return teachers?.data ?? [];
  }, [teachers]);

  if (isFetching) {
    return <DataTableNavLoader />;
  }
  return (
    <>
      <div>
        <div className="my-2">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex justify-content-center align-items-center primary-background-100"
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
            <span className="my-0 fw-semibold">Teachers</span>
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
          {memoizedRowData?.length > 0 ? (
            <Table colDefs={memoizedColDefs} rowData={memoizedRowData} />
          ) : (
            <div className="alert alert-warning">
              Oops, looks like you don't have any teachers.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Teachers;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update",
      icon: "mynaui:edit-solid",
      modalContent: UpdateTeacher,
    },
    {
      actionTitle: "Details",
      icon: "bxs:detail",
      modalContent: TeacherDetails,
    },
    {
      actionTitle: "Delete",
      icon: "fluent:delete-16-filled",
      modalContent: DeleteTeacher,
    },
    {
      actionTitle: "Add Specialty Preference",
      modalContent: AddSpecialtyPreference,
      icon: "material-symbols:star-rounded",
    },
    {
      actionTitle: "Account Status",
      modalContent: DeactivateTeacher,
      icon: "heroicons-outline:status-online",
    },
    {
      actionTitle: "Appoint HOD",
      icon: "subway:admin-1",
      modalContent: AppointHod,
    },
    {
      actionTitle: "Appoint HOS",
      icon: "solar:user-plus-bold",
      modalContent: AppointHos,
    },
  ];
  const memoizedActions = useMemo(() => actions, []);
  return (
    <>
      <ActionButtonDropdown
        actions={memoizedActions}
        row_id={id}
        style={
          "tableActionButton primary-background text-white font-size-sm px-2"
        }
      >
        <span>Edit Action</span>
      </ActionButtonDropdown>
    </>
  );
}
