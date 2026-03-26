import { Icon } from "@iconify/react";
import CustomTooltip from "../../Tooltips/Tooltip";
import { ModalButton } from "../../DataTableComponents/ActionComponent";
import StudentActivationDetail from "../../../ModalContent/ActivationCode/StudentActivationDetail";
import ActivateStudentAccount from "../../../ModalContent/ActivationCode/ActivateStudentAccount";
function StudentAction(props) {
  return (
    <>
      <div className="d-flex flex-row gap-2 align-items-center justify-content-center h-100">
        <CustomTooltip tooltipText="Activate Student" placement="bottom">
          <ModalButton
            action={{ modalContent: ActivateStudentAccount }}
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
            action={{ modalContent: StudentActivationDetail }}
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
export default StudentAction;
