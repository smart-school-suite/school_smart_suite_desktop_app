import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useBulkActivateSchoolAdmins } from "../../hooks/schoolAdmin/useBulkActivateSchoolAdmin";
function BulkActivateSchoolAdmin({ handleClose, bulkData,  resetAll }) {
     const {mutate:activate, isPending} = useBulkActivateSchoolAdmins(handleClose, resetAll);
     const handleActivate = async () => {
       const formattedData = bulkData.map((items) => ({
          school_admin_id:items.id
       }));
       activate({ schoolAdminIds:formattedData })
     };
     return(
        <>
            <div className="w-100">
                <h4 className="fw-semibold">
                  Are you absolutely sure about Activating admins?
                </h4>
                <p className="my-3" style={{ fontSize: "0.85rem" }}>
                  This action cannot be undone. This will permanently delete this
                  account and remove this account data from our servers.
                </p>
                <div className="mt-4 d-flex justify-content-end gap-2">
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
                    onClick={handleActivate}
                  >
                    {isPending ? <SingleSpinner /> : "Yes, Activate All"}
                  </button>
                </div>
              </div>
        </>
     )
}
export default BulkActivateSchoolAdmin;