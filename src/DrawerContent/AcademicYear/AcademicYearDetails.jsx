import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetSchoolAcademicYearDetails } from "../../hooks/academicYear/useGetSchoolAcademicYearDetails";
import { formatDate } from "../../utils/functions";
function AcademicYearDetails({ handleClose, drawerData }) {
  const { id: academicYearId } = drawerData;
  const {
    data: academicYear,
    isLoading,
    error,
  } = useGetSchoolAcademicYearDetails(academicYearId);
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
            <div className="drawer-content ps-2 font-size-sm">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Academic Year</span>
                    <span className="fw-medium">
                      {academicYear?.data?.system_academic_year?.name}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">
                      Academic Year Start Date
                    </span>
                    <span className="fw-medium">
                      {academicYear?.data?.start_date}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">
                      Academic Year End Date
                    </span>
                    <span className="fw-medium">
                      {academicYear?.data?.end_date}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Specialty</span>
                    <span className="fw-medium">
                      {academicYear?.data?.specialty?.specialty_name}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Level Name</span>
                    <span className="fw-medium">
                      {academicYear?.data?.specialty?.level?.name}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">Level Number</span>
                    <span className="fw-medium">
                      {academicYear?.data?.specialty?.level?.level}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">created at</span>
                    <span className="fw-medium">
                      {formatDate(academicYear?.data?.created_at)}
                    </span>
                  </div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="d-flex flex-column">
                    <span className="text-iron-500">updated at</span>
                    <span className="fw-medium">
                      {formatDate(academicYear?.data?.updated_at)}
                    </span>
                  </div>
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
