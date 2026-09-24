import { formatDate, formatNumber } from "../../utils/functions";
import { useGetExpenseDetails } from "../../hooks/schoolExpenses/useGetSchoolExpenseDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function SchoolExpenseDetails({ handleClose, drawerData }) {
  const { id: expenseId } = drawerData;
  const {
    data: expenseDetails,
    isLoading,
    error,
  } = useGetExpenseDetails(expenseId);
  return (
    <>
      <div className="drawer-content px-2 pt-3">
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-4">
              {[...Array(10)].map((_, index) => (
                <div className="d-flex gap-1 flex-column" key={index}>
                  <RectangleSkeleton height="1dvh" width="15%" />
                  <RectangleSkeleton height="1dvh" width="100%" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <div className="font-size-sm">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <span className="text-iron-400">Expense Title</span>
                    <span className="fw-medium">
                      {expenseDetails.data.schoolexpensescategory.name}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <span className="text-iron-400">Reason</span>
                    <span className="fw-medium">
                      {expenseDetails.data.description}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <span className="text-iron-400">Amount</span>
                    <span className="fw-medium">
                      {formatNumber(expenseDetails.data.amount)}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <span className="text-iron-400">Date of Expenditure</span>
                    <span className="fw-medium">
                      {formatDate(expenseDetails.data.date)}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-iron-400">System Info</span>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <span className="text-iron-400">Created At</span>
                    <span className="fw-medium">
                      {formatDate(expenseDetails.data.created_at)}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex flex-column gap-2">
                    <span className="text-iron-400">Updated At</span>
                    <span className="fw-medium">
                      {formatDate(expenseDetails.data.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
            <button
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default SchoolExpenseDetails;
