import { Icon } from "@iconify/react";
import CustomTooltip from "../../Tooltips/Tooltip";
import { ModalButton } from "../../DataTableComponents/ActionComponent";
import ActivateTeacherAccount from "../../../ModalContent/ActivationCode/ActivateTeacherAccount";
function TeacherAction(props) {
  return (
    <>
      <div className="d-flex flex-row gap-2 align-items-center justify-content-center h-100">
        <ModalButton
          action={{ modalContent: ActivateTeacherAccount }}
          size={"md"}
          rowData={props.data}
          classname={"border-none bg-transparent p-0 m-0"}
        >
          <CustomTooltip tooltipText="Activate Teacher Account" placement="bottom">
            <span style={{ lineHeight: 0, cursor: "pointer" }}>
              <Icon
                icon="material-symbols-light:rocket-outline-rounded"
                width="24"
                height="24"
              />
            </span>
          </CustomTooltip>
        </ModalButton>
      </div>
    </>
  );
}
export default TeacherAction;
