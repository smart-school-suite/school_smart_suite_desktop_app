import { useGetSchoolAcademicYearDetails } from "../../hooks/academicYear/useGetSchoolAcademicYearDetails";
import { useSelector } from "react-redux";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { Icon } from "@iconify/react";
function AcademicYearDetails({ handleClose, drawerData }) {
  const { id: academicYearId } = drawerData;
  const { data: academicYear, isLoading, error } =
    useGetSchoolAcademicYearDetails(academicYearId);
  return (
    <>
      <div
        className="font-size-sm d-flex flex-column gap-4 pt-2"
        style={{ flex: 1, minHeight: 0 }}
      >
        {isLoading ? (
          <div className="d-flex flex-column gap-2 px-2 w-100">
            <div className="d-flex flex-column gap-4 w-100">
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
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm fw-semibold">
                    Academic Year
                  </span>
                  <span className=" font-size-sm">
                    {academicYear?.data?.system_academic_year?.name}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm fw-semibold">
                    Academic Year Start Date
                  </span>
                  <span className=" font-size-sm">
                    {academicYear?.data?.start_date}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm fw-semibold">
                    Academic Year End Date
                  </span>
                  <span className=" font-size-sm">
                   {academicYear?.data?.end_date}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm fw-semibold">
                    Specialty
                  </span>
                  <span className=" font-size-sm">
                    {academicYear?.data?.specialty?.specialty_name}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm fw-semibold">
                    Level Name
                  </span>
                  <span className=" font-size-sm">
                    {academicYear?.data?.specialty?.level?.name}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm fw-semibold">
                    Level Number
                  </span>
                  <span className=" font-size-sm">
                    {academicYear?.data?.specialty?.level?.level}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm fw-semibold">
                    created at
                  </span>
                  <span className=" font-size-sm">
                    {academicYear?.data?.created_at}
                  </span>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className=" py-2 d-flex flex-column">
                  <span className="my-0 font-size-sm fw-semibold">
                    updated at
                  </span>
                  <span className=" font-size-sm">
                    {academicYear?.data?.updated_at}
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
export default AcademicYearDetails;
