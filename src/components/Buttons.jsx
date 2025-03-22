import { ModalButton } from "./DataTableComponents/ActionComponent";
function Greenbutton({ style, ModalContent }) {
  return (
    <>
      <ModalButton
       classname={
        "border-none green-bg font-size-sm rounded-3 px-3 py-2 gap-2 d-flex flex-row align-items-center d-flex text-white"
      }
      action={{ modalContent: CreateExam }}
      >
      
      </ModalButton>
    </>
  );
}
export default Greenbutton;
