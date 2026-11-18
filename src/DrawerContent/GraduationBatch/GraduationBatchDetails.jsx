import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import StatusPill from "../../components/Election/StatusPill";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetGraduationBatchDetails } from "../../hooks/graduationBatch/useGetGraduationBatchDetails";
import { formatDate } from "../../utils/functions";
import RichTextContent from "../../components/TextComponents/RichTextContent";
function GraduationBatchDetails({ drawerData, handleClose }) {
  const { data, isLoading, error } = useGetGraduationBatchDetails(drawerData?.id);
  const batch = data?.data;

  return (
    <>
      <div className="drawer-content ps-2 pt-3 font-size-sm">
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
            {[...Array(5)].map((_, index) => (
              <Fragment key={index}>
                <div className="d-flex flex-column gap-2">
                  <RectangleSkeleton width="25%" height="1dvh" />
                  <RectangleSkeleton width="100%" height="1dvh" />
                </div>
              </Fragment>
            ))}
          </div>
        ) : error ? (
          <NotFoundError
            title={
              error?.response?.data?.errors?.title ||
              "Graduation Batch Not Found"
            }
            description={
              error?.response?.data?.errors?.description ||
              "Unable to load graduation batch details. Please try again."
            }
          />
        ) : (
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">Title</span>
              <span className="fw-medium">{details?.data?.name}</span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">Description</span>
              <RichTextContent content={details?.data?.description} className="fw-medium" />
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">
                Graduation Start Date
              </span>
              <span className="fw-medium">
                {formatDate(details?.data?.graduation_start_date)}
              </span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">
                Graduation End Date
              </span>
              <span className="fw-medium">
                {formatDate(details?.data?.graduation_end_date)}
              </span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">Location</span>
              <span className="fw-medium">{details?.data?.location}</span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">Academic Year</span>
              <span className="fw-medium">
                {details?.data?.academic_year?.name}
              </span>
            </div>
          ))}
        </div>
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title ?? "Graduation Batch Not Found"}
          description={error?.response?.data?.errors?.description ?? "Unable to load graduation batch details. Please try again."}
        />
      ) : (
        batch && (
          <>
            <div className="drawer-content px-2">
              {detailRows(batch).map((row, index) => (
                <Row key={row.label} label={row.label} value={row.value} first={index === 0} />
              ))}
              {batch.specialties?.length > 0 && (
                <>
                  <hr />
                  <div className="py-2 d-flex flex-column gap-2">
                    <span className="text-iron-500">Graduates By Specialty</span>
                    {batch.specialties.map((specialty) => (
                      <div key={specialty.specialty_id} className="d-flex flex-row align-items-center justify-content-between gap-2">
                        <span className="text-truncate">
                          {specialty.specialty_name ?? "Unknown specialty"}
                          {specialty.level_name && <span className="text-iron-400"> · {specialty.level_name}</span>}
                        </span>
                        <span className="fw-semibold flex-shrink-0">{count(specialty.graduates)}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="drawer-footer font-size-sm">
              <div className="d-flex flex-column w-100">
                <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
                <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
                  <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
export default GraduationBatchDetails;
