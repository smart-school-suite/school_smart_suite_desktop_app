import Navbar from "../../components/Navbar";
import {
  useFetchSchoolGradesConfigQuery,
} from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { GradesConfigurationNavbarOptions } from "../../ComponentConfig/navBarConfig";
import Table from "../../components/Tables";
import { Icon } from "@iconify/react";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import UpdateGradeConfig from "../../ModalContent/GradesConfig/UpdateGrades";
import DeleteGradesConfig from "../../ModalContent/GradesConfig/DeleteGrades";
import ViewGradesConfig from "../../ModalContent/GradesConfig/ViewConfigurations";
import ConfigureGrades from "../../ModalContent/GradesConfig/ConfigureGrades";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { ExamGradingCongfig } from "../../ComponentConfig/AgGridTableConfig";
import ConfigureByOtherGrades from "../../ModalContent/GradesConfig/ConfigureByOtherGrades";
function Gradesconfiguration() {
  const { data: gradesConfig, isLoading: isGradesConfigLoading } =
    useFetchSchoolGradesConfigQuery();
  if (isGradesConfigLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={GradesConfigurationNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Grades Config</p>
            <h1 className="fw-bold my-0">{gradesConfig.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent: ConfigureGrades }}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 gap-2 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <Icon icon="icons8:plus" className="font-size-md" />
              <span className="font-size-sm">Add Configurations</span>
            </ModalButton>
          </div>
        </div>
        {gradesConfig?.data?.length > 0 ? (
          <Table
            colDefs={ExamGradingCongfig({ DropdownComponent })}
            rowData={gradesConfig.data}
          />
        ) : (
          <div className="alert alert-warning">
            Oops, looks like you don't have any teachers.
          </div>
        )}
      </div>
    </>
  );
}
export default Gradesconfiguration;

function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Delete Configured Grades",
      modalContent: DeleteGradesConfig,
    },
    {
      actionTitle: "Configure Grades",
      modalContent: ConfigureGrades,
    },
    {
      actionTitle: "View Configured Grades",
      modalContent: ViewGradesConfig,
    },
    {
      actionTitle: "Update Grades Configuration",
      modalContent: UpdateGradeConfig,
    },
    {
      actionTitle:"Configure using other grades",
      modalContent:ConfigureByOtherGrades
    }
  ];
  return (
    <>
      <ActionButtonDropdown
        actions={actions}
        row_id={id}
        style={
          "tableActionButton primary-background text-white font-size-sm px-2"
        }
      >
        <span>Edit Actions</span>
      </ActionButtonDropdown>
    </>
  );
}
