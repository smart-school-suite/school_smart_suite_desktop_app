import { Icon } from "@iconify/react";
import CustomTooltip from "../../Tooltips/Tooltip";
import { ModalButton } from "../../DataTableComponents/ActionComponent";
import ActivateStudentAccount from "../../../ModalContent/ActivationCode/ActivateStudentAccount";
function StudentAction(props) {
  return (
    <>
      <div className="d-flex flex-row gap-2 align-items-center justify-content-center h-100">
        <ModalButton
          action={{ modalContent: ActivateStudentAccount }}
          size={"md"}
          rowData={props.data}
          classname={"border-none bg-transparent p-0 m-0"}
        >
          <CustomTooltip tooltipText="Activate Student Account" placement="bottom">
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
export default StudentAction;
