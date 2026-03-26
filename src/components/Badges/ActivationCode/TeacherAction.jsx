import { Icon } from "@iconify/react";
import CustomTooltip from "../../Tooltips/Tooltip";
import { ModalButton } from "../../DataTableComponents/ActionComponent";
import ActivateTeacherAccount from "../../../ModalContent/ActivationCode/ActivateTeacherAccount";
import TeacherActivationDetail from "../../../ModalContent/ActivationCode/TeacherActivationDetail";
function TeacherAction(props) {
  return (
    <>
      <div className="d-flex flex-row gap-2 align-items-center justify-content-center h-100">
        <CustomTooltip tooltipText="Activate Student" placement="bottom">
          <ModalButton
            action={{ modalContent: ActivateTeacherAccount }}
            size={"md"}
            rowData={props.data}
            classname={
              "border-none bg-transparent p-0 m-0"
            }
          >
            <span style={{ lineHeight: 0, cursor: "pointer" }}>
            <Icon
              icon="material-symbols-light:rocket-outline-rounded"
              width="24"
              height="24"
            />
          </span>
          </ModalButton>
        </CustomTooltip>
        <CustomTooltip tooltipText="Details" placement="bottom">
          <ModalButton
             action={{ modalContent: TeacherActivationDetail }}
            size={"md"}
            rowData={props.data}
            classname={
              "border-none bg-transparent p-0 m-0"
            }
          >
            <span style={{ lineHeight: 0, cursor: "pointer" }}>
              <Icon
                icon="fluent:apps-list-detail-32-regular"
                width="24"
                height="24"
              />
            </span>
          </ModalButton>
        </CustomTooltip>
      </div>
    </>
  );
}
export default TeacherAction;
