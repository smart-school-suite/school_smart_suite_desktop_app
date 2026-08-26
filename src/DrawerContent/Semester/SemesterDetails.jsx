import { Icon } from "@iconify/react";
import { formatDate } from "../../utils/functions";
import { useGetSchoolSemesterDetails } from "../../hooks/schoolSemester/useGetSchoolSemesterDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function SemesterDetails({ handleClose, drawerData }) {
  const { id: semesterId } = drawerData;
  const {
    data: schoolSemesterDetails,
    isLoading,
    error,
  } = useGetSchoolSemesterDetails(semesterId);
  return (
    <>
      <div
        className="font-size-sm d-flex flex-column gap-4 pt-2"
        style={{ flex: 1, minHeight: 0 }}
      >
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-4">
              {[...Array(8)].map((_, index) => (
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
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm">Start Date</span>
                  <span>
                    {formatDate(schoolSemesterDetails?.data?.start_date)}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm">End Date</span>
                  <span>
                    {formatDate(schoolSemesterDetails?.data?.end_date)}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm">Semester</span>
                  <span>
                    {schoolSemesterDetails?.data?.semester?.name}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm">Specialty Name</span>
                  <span>
                    {schoolSemesterDetails?.data?.school_year?.specialty?.specialty_name}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm">Level Name</span>
                  <span>
                    {schoolSemesterDetails?.data?.school_year?.specialty?.level?.name}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm">Level Number</span>
                  <span>
                    {schoolSemesterDetails?.data?.school_year?.specialty?.level?.level}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm">Created At</span>
                  <span>
                    {schoolSemesterDetails?.data?.created_at}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm">Updated At</span>
                  <span>
                    {schoolSemesterDetails?.data?.updated_at}
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
export default SemesterDetails;
