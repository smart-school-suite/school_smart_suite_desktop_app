import { useState } from "react"
import { useBulkDeleteSchoolAdminMutation } from "../../Slices/Asynslices/deleteSlice"
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import { SingleSpinner } from "../../components/Spinners";
function BulkDelete({ handleClose, data, resetAll }){
    const [isDeleting, setIsDeleting] = useState(false);
    const [bulkDeleteSchoolAdmin] = useBulkDeleteSchoolAdminMutation();
    const handleBulkDelete = async () => {
         const schoolAdminIds = data.map(items => items.id);
         setIsDeleting(true);
         try{
            await bulkDeleteSchoolAdmin(schoolAdminIds).unwrap();
            setIsDeleting(false);
            resetAll();
            handleClose();
            toast.custom(
                <ToastSuccess 
                   title={"Delete Succesfull"}
                   description={"School Admin Deleted Successfully"}
                />
            )
         }
         catch(e){
            setIsDeleting(false);
            toast.custom(
                <ToastDanger 
                  title={"Delete Failed"}
                  description={"Failed To Delete School Admin"}
                />
            )
         }
    }
    return(
        <>
          <div className="w-100">
                 <h4 className="fw-semibold">Are you absolutely sure about deleting {data.length} admins?</h4>
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
                     onClick={handleBulkDelete}
                   >
                     {
                       isDeleting ? <SingleSpinner /> : "Yes, Delete All"
                     }
                   </button>
                 </div>
               </div>
        </>
    )
}
export default BulkDelete