import { useBulkActivateSchoolAdminMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { SingleSpinner } from "../../components/Spinners";
import { useState } from "react";
function BulkActivateSchoolAdmin({ handleClose, data }) {
     const [isActivating, setIsActivating] = useState(false);
     const [bulkActivateSchoolAdmin] = useBulkActivateSchoolAdminMutation();
     const handleActivate = async () => {
       const schoolAdminIds = data.map(items => items.id);
       setIsActivating(true);
       try {
         await bulkActivateSchoolAdmin(schoolAdminIds).unwrap();
         setIsActivating(false);
         handleClose();
         toast.custom(
           <ToastSuccess
             title={"Deactivation Succesfull"}
             d
             description={"School Admin Activated Successfully"}
           />
         );
       } catch (e) {
         setIsActivating(false);
         toast.custom(
           <ToastDanger
             title={"Failed to Activate"}
             description={"Failed to Activate School Admin Due to An Error"}
           />
         );
       }
     };
     return(
        <>
            <div className="w-100">
                <h4 className="fw-semibold">
                  Are you absolutely sure about Activating {data.length} admins?
                </h4>
                <p className="my-3" style={{ fontSize: "0.85rem" }}>
                  This action cannot be undone. This will permanently delete this
                  account and remove this account data from our servers.
                </p>
                <div className="mt-4 d-flex justify-content-end gap-2">
                  <button
                    className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
                    onClick={handleActivate}
                  >
                    {isActivating ? <SingleSpinner /> : "Yes, Activate All"}
                  </button>
                </div>
              </div>
        </>
     )
}
export default BulkActivateSchoolAdmin;