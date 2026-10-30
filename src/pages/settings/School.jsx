import { PenLine } from "lucide-react";
import { useSelector } from "react-redux";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetSchoolDetails } from "../../hooks/school/useGetSchoolDetails";
import UpdateEstablishedDate from "../../ModalContent/School/UpdateEstablishedDate";
import UpdateSchoolMotor from "../../ModalContent/School/UpdateSchoolMotor";
import UpdateSchoolName from "../../ModalContent/School/UpdateSchoolName";
import UploadSchoolLogo from "../../ModalContent/School/UploadSchoolLogo";
import { cleanAssetPath, formatDate } from "../../utils/functions";
function School() {
  const userData = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { data: schoolDetails, isLoading, error } = useGetSchoolDetails();
  return (
    <>
      <div
        className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column pe-2 gap-2 font-size-sm"
        style={{ maxHeight: "84dvh", paddingBottom: "10rem" }}
      >
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <div className="d-flex flex-column gap-1" key={index}>
              <RectangleSkeleton width="20%" height="1dvh" />
              <RectangleSkeleton width="100%" height="20dvh" />
            </div>
          ))
        ) : error ? (
          <NotFoundError
            title={error.response.data.errors.title}
            description={error.response.data.errors.description}
          ></NotFoundError>
        ) : (
          <div className="d-flex flex-column justify-content-start gap-2 w-100">
            <div className="d-flex flex-column gap-1">
              <span className="fw-medium">School Details</span>
              <div
                className={`card p-3 border-none rounded-4 w-100 d-flex flex-column gap-2 border`}
              >
                <ModalButton
                  classname={`d-flex flex-row align-items-center justify-content-between pointer-cursor w-100 remove-button-style`}
                  action={{ modalContent: UpdateSchoolName }}
                >
                  <div
                    className={`${
                      darkMode ? "gainsboro-color" : null
                    } d-flex flex-column`}
                  >
                    <span className="fw-medium text-start">School Name</span>
                    <span className="fw-normal text-iron-500">
                      {schoolDetails.data.name}
                    </span>
                  </div>
                  <div>
                    <PenLine size={16} strokeWidth={1.5} />
                  </div>
                </ModalButton>
                <HorizontalDashedLine
                  color={"#ccc"}
                  dashed={false}
                  thickness={0.2}
                />
                <ModalButton
                  classname={`d-flex flex-row align-items-center justify-content-between pointer-cursor w-100 remove-button-style`}
                  action={{ modalContent: UpdateEstablishedDate }}
                >
                  <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">Established Year</span>
                    <span className="fw-normal text-iron-500">
                      {schoolDetails.data.established_year === null
                        ? "Add Established Year"
                        : `${formatDate(schoolDetails.data.established_year)}`}
                    </span>
                  </div>
                  <div>
                    <PenLine size={16} strokeWidth={1.5} />
                  </div>
                </ModalButton>
                <HorizontalDashedLine
                  color={"#ccc"}
                  dashed={false}
                  thickness={0.2}
                />
                <div
                  className={`d-flex flex-row align-items-center justify-content-between pointer-cursor remove-button-style`}
                >
                  <div className={`d-flex flex-column`}>
                    <span className="fw-semibold">School Type</span>
                    <span className="fw-normal text-iron-500">
                      {schoolDetails.data.type === null
                        ? "Specify School Type"
                        : schoolDetails.data.type}
                    </span>
                  </div>
                  <div>
                    <PenLine size={16} strokeWidth={1.5} />
                  </div>
                </div>
                <HorizontalDashedLine
                  color={"#ccc"}
                  dashed={false}
                  thickness={0.2}
                />
                <ModalButton
                  classname={`d-flex flex-row align-items-center justify-content-between pointer-cursor w-100 remove-button-style`}
                  action={{ modalContent: UpdateSchoolMotor }}
                >
                  <div className="d-flex flex-column text-start">
                    <span className="fw-semibold">Motor</span>
                    <span className="fw-normal text-iron-500">
                      {schoolDetails.data.motor === null
                        ? "Add School Motor"
                        : schoolDetails.data.motor}
                    </span>
                  </div>
                  <div>
                    <PenLine size={16} strokeWidth={1.5} />
                  </div>
                </ModalButton>
                <HorizontalDashedLine
                  color={"#ccc"}
                  dashed={false}
                  thickness={0.2}
                />
                <ModalButton
                  classname={`d-flex flex-row align-items-center justify-content-between pointer-cursor w-100 remove-button-style`}
                  action={{ modalContent: UploadSchoolLogo }}
                  rowData={{ 
                     schoolLogo: schoolDetails?.data?.current_logo?.object_key
                  }}
                  size={"xl"}
                >
                  <div className="d-flex flex-row align-item-center">
                    <div className="d-flex flex-column text-start">
                      <span className="fw-semibold">School Logo</span>
                      <span className="fw-normal text-iron-500">
                        {schoolDetails.data.school_logo === null
                          ? "Add School Logo"
                          : "Update School Logo"}
                      </span>
                    </div>
                  </div>
                  {schoolDetails?.data?.current_logo?.object_key ? (
                    <img
                      className="school-logo"
                      alt="school-logo"
                      src={`https://cdn.smartschoolsuite.com/${cleanAssetPath(schoolDetails.data.current_logo.object_key)}`}
                    />
                  ) : (
                    <div
                      style={{
                        width: "3.5rem",
                        height: "3.5rem",
                        fontSize: "1rem",
                      }}
                      className="primary-background-50 rounded-1 color-primary d-flex flex-row align-items-center justify-content-center"
                    >
                      SL
                    </div>
                  )}
                </ModalButton>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <span className="fw-medium">
                School Branches Registered Under this school
              </span>
              {schoolDetails.data.schoolbranches.map((items) => (
                <div
                  className={`card p-3 border-none rounded-4 w-100 d-flex flex-column gap-2 border`}
                  key={items.id}
                >
                  <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                    <div
                      className={`${
                        darkMode ? "gainsboro-color" : null
                      } d-flex flex-column`}
                    >
                      <span className="fw-semibold">School Branch Name</span>
                      <span className="gainsboro-color fw-light">
                        {items.name == null ? "N/A" : items.name}
                      </span>
                    </div>
                  </div>
                  <HorizontalDashedLine
                  color={"#ccc"}
                  dashed={false}
                  thickness={0.2}
                />
                  <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                    <div
                      className={`${
                        darkMode ? "gainsboro-color" : null
                      } d-flex flex-column`}
                    >
                      <span className="fw-semibold">Abbrevaition</span>
                      <span className="gainsboro-color fw-light">
                        {items.abbreviation == null
                          ? "N/A"
                          : items.abbreviation}
                      </span>
                    </div>
                  </div>
                 <HorizontalDashedLine
                  color={"#ccc"}
                  dashed={false}
                  thickness={0.2}
                />
                  <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                    <div
                      className={`${
                        darkMode ? "gainsboro-color" : null
                      } d-flex flex-column`}
                    >
                      <span className="fw-semibold">State</span>
                      <span className="gainsboro-color fw-light">
                        {items.state == null ? "N/A" : items.state}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex flex-column gap-1">
              <span className="my-1 text-danger fw-semibold">Danger Zone</span>
              <div
                className={`card p-3 border-none rounded-4 w-100 d-flex flex-column gap-2`}
              >
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-row align-items-center justify-content-between w-100">
                    <div className="d-flex flex-column text-danger">
                      <span className="fw-semibold">Delete School</span>
                      <span className="fw-normal">
                        {schoolDetails.data.name}
                      </span>
                    </div>
                    <div>
                      <button className="border-none rounded-3 bg-danger text-white p-2 font-size-sm">
                        Delete School
                      </button>
                    </div>
                  </div>
                </div>
                <HorizontalDashedLine
                  color={"#ccc"}
                  dashed={false}
                  thickness={0.2}
                />
                <div className="d-flex flex-row align-items-center justify-content-between pointer-cursor">
                  <div className="d-flex flex-row align-items-center w-100 justify-content-between">
                    <div
                      className={`${
                        darkMode ? "gainsboro-color" : null
                      } d-flex flex-column`}
                    >
                      <span className="fw-semibold">Suspend School</span>
                      <span className="fw-normal">
                        {schoolDetails.data.name}
                      </span>
                    </div>
                    <div>
                      <button className="border-none rounded-3 bg-danger text-white p-2 font-size-sm">
                        Suspend School
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default School;
