import { useGetEventCategoryDetails } from "../../hooks/eventCategory/useGetEventCategoryDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { formatISODate } from "../../utils/functions";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function CategoryDetails({ handleClose, drawerData }) {
  const { id: categoryId } = drawerData;
  const {
    data: eventCategoryDetails,
    isLoading,
    error,
  } = useGetEventCategoryDetails(categoryId);
  return (
    <>
      <div className="drawer-content font-size-sm px-2 pt-3">
        {isLoading ? (
          <div className="d-flex flex-column gap-1">
            {[...Array(3)].map((index) => (
              <RectangleSkeleton
                width="100%"
                height="10dvh"
                speed={0.5}
                key={index}
              />
            ))}
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <div>
            <div>
              <div className="d-flex flex-column gap-1">
                <span>Title</span>
                <span>{eventCategoryDetails.data.name}</span>
              </div>
            </div>
            <hr />
            <div>
              <div className="d-flex flex-column gap-1">
                <span>Description</span>
                <span>{eventCategoryDetails.data.description}</span>
              </div>
            </div>
            <hr />
            <div>
              <div className="d-flex flex-column gap-1">
                <span>Created At</span>
                <span>
                  {formatISODate(eventCategoryDetails.data.created_at)}
                </span>
              </div>
            </div>
            <hr />
            <div>
              <div className="d-flex flex-column gap-1">
                <span>Updated At</span>
                <span>
                  {formatISODate(eventCategoryDetails.data.updated_at)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.4} />
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
export default CategoryDetails;
