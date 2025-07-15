import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useActivateSpecialty } from "../../hooks/specialty/useActivateSpecialty";
function ActivateSpecialty({ handleClose, rowData }) {
  const specialtyId = rowData.id;
  const { mutate: activateSpecialty, isPending } = useActivateSpecialty();
  const handleActivateSpecialty = () => {
    activateSpecialty(specialtyId);
  };
  return (
    <>
      <div className="w-100">
        <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          This action cannot be undone. This will Permanently delete This
          account and remove this account data from our servers
        </p>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              onClick={() => {
                handleActivateSpecialty();
              }}
            >
              {isPending ? <SingleSpinner /> : <>Yes, Activate</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ActivateSpecialty;
