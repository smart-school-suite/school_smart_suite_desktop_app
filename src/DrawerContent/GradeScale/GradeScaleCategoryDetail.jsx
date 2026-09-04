import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { useGetGradeScaleDetails } from "../../hooks/gradeScale/useGetGradeScaleCategoryDetails";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { formatDate } from "../../utils/functions";
function GradeScaleCategoryDetail({ handleClose, drawerData }) {
  const {
    data: details,
    isLoading,
    error,
  } = useGetGradeScaleDetails(drawerData.id);
  return (
    <>
      <div
        className="font-size-sm d-flex flex-column gap-4 pt-2"
        style={{ flex: 1, minHeight: 0 }}
      >
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-4">
              {[...Array(4)].map((_, index) => (
                <div className="d-flex gap-1 flex-column" key={index}>
                  <RectangleSkeleton height="1dvh" width="40%" />
                  <RectangleSkeleton height="1dvh" width="15%" />
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
          <>
            <div className="drawer-content px-2">
              <div className="d-flex align-items-center justify-content-between my-2 w-100">
                <div className=" py-2 d-flex flex-column fw-medium">
                  <span className="my-0 font-size-sm">Grade Scale Title</span>
                  <span className="my-0 font-size-sm">
                    {details.data.system_grade_category.title}
                  </span>
                </div>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.5}
              />
              <div className="d-flex align-items-center justify-content-between my-2 w-100">
                <div className=" py-2 d-flex flex-column fw-medium">
                  <span className="my-0 font-size-sm">Exam Type</span>
                  <span className="my-0 font-size-sm">
                    {details.data.system_grade_category.exam_type}
                  </span>
                </div>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.4}
              />
              <div className="d-flex align-items-center justify-content-between my-2 w-100">
                <div className=" py-2 d-flex flex-column fw-medium">
                  <span className="my-0 font-size-sm">Exam Type</span>
                  <span className="my-0 font-size-sm">
                    {details.data.max_score ?? "N/A"}
                  </span>
                </div>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.4}
              />
              <div className="d-flex align-items-center justify-content-between my-2 w-100">
                <div className=" py-2 d-flex flex-column fw-medium">
                  <span className="my-0 font-size-sm">Configuration Status</span>
                  <span className="my-0 font-size-sm">
                    {details.data.max_score ?? "N/A"}
                  </span>
                </div>
              </div>
                <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.4}
              />
              <div className="d-flex align-items-center justify-content-between my-2 w-100">
                <div className=" py-2 d-flex flex-column fw-medium">
                  <span className="my-0 font-size-sm">Status</span>
                  <span className="my-0 font-size-sm">
                    {details.data.status ?? "N/A"}
                  </span>
                </div>
              </div>
               <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.4}
              />
              <div className="d-flex align-items-center justify-content-between my-2 w-100">
                <div className=" py-2 d-flex flex-column fw-medium">
                  <span className="my-0 font-size-sm">Created At</span>
                  <span className="my-0 font-size-sm">
                    {formatDate(details.data.created_at)}
                  </span>
                </div>
              </div>
               <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.4}
              />
              <div className="d-flex align-items-center justify-content-between my-2 w-100">
                <div className=" py-2 d-flex flex-column fw-medium">
                  <span className="my-0 font-size-sm">Updated At</span>
                  <span className="my-0 font-size-sm">
                    {formatDate(details.data.updated_at)}
                  </span>
                </div>
              </div>
            </div>
            <div className="drawer-footer font-size-sm">
              <div className="d-flex flex-column w-100">
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.4}
                />
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
        )}
      </div>
    </>
  );
}
export default GradeScaleCategoryDetail;
