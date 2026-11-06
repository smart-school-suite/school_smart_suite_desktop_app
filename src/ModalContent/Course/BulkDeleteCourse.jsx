import { useBulkDeleteCourse } from "../../hooks/course/useBulkDeleteCourse";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function BulkDeleteCourse({ handleClose, bulkData, resetAll }){
    const { mutate:bulkDeleteCourse, isPending } = useBulkDeleteCourse(handleClose, resetAll);
    const { formError, errorBannerRef, handleServerError, clearFormError } =
      useFormError("Failed To Bulk Delete Course");
    const formattedData = bulkData.map((items) => ({ course_id:items.id }));
    const handleBulkDeleteCourse = () => {
        clearFormError();
        bulkDeleteCourse({ courseIds:formattedData }, { onError: handleServerError });
    }
    return(
        <>
              <div className="w-100">
                <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
                <p className="my-3" style={{ fontSize: "0.85rem" }}>
                  This action cannot be undone. This will Permanently delete This
                  account and remove this account data from our servers
                </p>
                <FormErrorBanner
                  ref={errorBannerRef}
                  error={formError}
                  onDismiss={clearFormError}
                  className="mb-2"
                />
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
                        handleBulkDeleteCourse();
                      }}
                    >
                      {isPending ? <SingleSpinner /> : <>Yes, Delete All</>}
                    </button>
                  </div>
                </div>
              </div>
        </>
    )
}

export default BulkDeleteCourse;