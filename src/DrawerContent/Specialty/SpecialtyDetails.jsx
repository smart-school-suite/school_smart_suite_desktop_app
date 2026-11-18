import { useSelector } from "react-redux";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetSpecialtyDetails } from "../../hooks/specialty/useGetSpecialtyDetail";
import { formatDate, formatNumber } from "../../utils/functions";
import RichTextContent from "../../components/TextComponents/RichTextContent";
function SpecialtyDetails({ handleClose, drawerData }) {
  const currency = useSelector((state) => state.auth.user);
  const specialtyId = drawerData.id;
  const {
    data: specialtyDetails,
    isLoading,
    error,
  } = useGetSpecialtyDetails(specialtyId);
  return (
    <>
      <div
        className="font-size-sm d-flex flex-column gap-4 pt-2"
        style={{ flex: 1, minHeight: 0 }}
      >
        {isLoading ? (
          <div className="d-flex flex-column gap-2 ps-2">
            <div className="d-flex flex-column gap-4">
              {[...Array(8)].map((_, index) => (
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
          <>
            <div className="drawer-content px-2">
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="text-iron-500">
                    Specialty Name
                  </span>
                  <span>
                    {specialtyDetails?.data?.specialty_name}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="text-iron-500">
                    Registration Fee
                  </span>
                  <span>
                    {formatNumber(
                      parseFloat(specialtyDetails?.data?.registration_fee),
                    )}{" "}
                    {currency.schoolDetails.school.country.currency}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="text-iron-500">
                    Tuition Fee
                  </span>
                  <span>
                    {formatNumber(
                      parseFloat(specialtyDetails?.data?.school_fee),
                    )}{" "}
                    {currency.schoolDetails.school.country.currency}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="text-iron-500">
                    Department Name
                  </span>
                  <span>
                    {specialtyDetails?.data?.department.department_name}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="text-iron-500">
                    Level Name
                  </span>
                  <span>
                    {specialtyDetails?.data?.level.name}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="text-iron-500">
                    Level Number
                  </span>
                  <span>
                    {specialtyDetails?.data?.level.level}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="text-iron-500">
                    Description
                  </span>
                  <RichTextContent content={specialtyDetails?.data?.description} />
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="text-iron-500">
                    Updated At
                  </span>
                  <span>
                    {formatDate(specialtyDetails?.data?.updated_at)}
                  </span>
                </div>
              </div>
              <hr />
               <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="text-iron-500">
                    Created At
                  </span>
                  <span>
                    {formatDate(specialtyDetails?.data?.created_at)}
                  </span>
                </div>
              </div>
            </div>
            <div className="drawer-footer font-size-sm">
              <div className="d-flex flex-column w-100">
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.5}
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
export default SpecialtyDetails;
