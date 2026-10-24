import { Dot, PenLine } from "lucide-react";
import { useSelector } from "react-redux";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetAuthSchoolAdmin } from "../../hooks/schoolAdmin/useGetAuthSchoolAdmin";
import UpdateAddress from "../../ModalContent/Profile/UpdateAddress";
import UpdateContactOne from "../../ModalContent/Profile/UpdateContactOne";
import UpdateDOB from "../../ModalContent/Profile/UpdateDOB";
import UpdateEmail from "../../ModalContent/Profile/UpdateEmail";
import UpdateFullNames from "../../ModalContent/Profile/UpdateFullNames";
import UpdateLastName from "../../ModalContent/Profile/UpdateLastName";
import { formatDate } from "../../utils/functions";
function Profile() {
  const { data: schoolAdmin, isLoading, error } = useGetAuthSchoolAdmin();
  const userData = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      {isLoading ? (
        <div className="d-flex flex-column gap-2">
          <RectangleSkeleton width="100%" height="20dvh" />
          <RectangleSkeleton width="100%" height="40dvh" />
        </div>
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <div
          className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column pe-1 gap-2"
          style={{ maxHeight: "84dvh", paddingBottom: "10rem" }}
        >
          <div className="card border-none pb-2 rounded-4 profile-section d-flex flex-column border font-size-sm">
            <div className="top-section rounded-top-4 px-4">
              <div className="d-flex flex-row profile-picture-group z-5 justify-content-between align-items-center">
                {schoolAdmin.data.authSchoolAdmin.profile_picture !== null ? (
                  <div className="profile-img">
                    <img
                      src={`http://127.0.0.1:8000/storage/SchoolAdminAvatars/${schoolAdmin.data.authSchoolAdmin.profile_picture}`}
                      alt=""
                    />
                  </div>
                ) : (
                  <div
                    className="profile-img primary-background-100 
                  text-primary-500 d-flex align-items-center 
                  justify-content-center font-size-xl fw-bolder"
                  >
                    {getInitials(
                      schoolAdmin.data.authSchoolAdmin.first_name,
                      schoolAdmin.data.authSchoolAdmin.last_name,
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-auto px-3">
              <div className="d-flex flex-column">
                <span className="font-size-md fw-semibold">{schoolAdmin.data.authSchoolAdmin.name}</span>
                <div className="d-flex flex-row ">
                  <span>
                    {schoolAdmin.data.schoolDetails.school.country.country}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-center gap-2 text-iron-500">
                  <span>@{schoolAdmin.data.authSchoolAdmin.username}</span>
                  <Dot size={12}/>
                  <span>School Admin</span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="font-size-sm my-1">Personal Details</span>
            <div className="card border-none d-flex flex-column gap-2 p-3 rounded-4 border">
              <ModalButton
                classname="d-flex flex-row align-items-center justify-content-between font-size-sm w-100 remove-button-style"
                action={{ modalContent: UpdateFullNames }}
              >
                <div className="d-flex flex-column text-start">
                  <span className="fw-semibold">Full Names</span>
                  <span className="fw-light">
                    {schoolAdmin.data.authSchoolAdmin.name === null
                      ? "Add Full Names"
                      : schoolAdmin.data.authSchoolAdmin.name}
                  </span>
                </div>
                <div>
                  <PenLine size={16} strokeWidth={1.5} />
                </div>
              </ModalButton>
              <hr />
              <ModalButton classname="d-flex flex-row align-items-center justify-content-between font-size-sm w-100 remove-button-style">
                <div className="d-flex flex-column text-start">
                  <span className="fw-semibold">First Name</span>
                  <span className=" fw-light">
                    {schoolAdmin.data.authSchoolAdmin.first_name === null
                      ? "Add First Name"
                      : schoolAdmin.data.authSchoolAdmin.first_name}
                  </span>
                </div>
                <div>
                  <PenLine size={16} strokeWidth={1.5} />
                </div>
              </ModalButton>
              <hr />
              <ModalButton
                classname="d-flex flex-row align-items-center justify-content-between font-size-sm w-100 remove-button-style"
                action={{ modalContent: UpdateLastName }}
              >
                <div className="d-flex flex-column text-start">
                  <span className="fw-semibold">Last Name</span>
                  <span className=" fw-light">
                    {schoolAdmin.data.authSchoolAdmin.last_name === null
                      ? "Add Last Name"
                      : schoolAdmin.data.authSchoolAdmin.last_name}
                  </span>
                </div>
                <div>
                  <PenLine size={16} strokeWidth={1.5} />
                </div>
              </ModalButton>
              <hr />
              <ModalButton
                classname="d-flex flex-row align-items-center justify-content-between font-size-sm w-100 remove-button-style"
                action={{ modalContent: UpdateDOB }}
              >
                <div className="d-flex flex-column text-start">
                  <span className="fw-semibold">Date of birth</span>
                  <span className=" fw-light">
                    {schoolAdmin.data.authSchoolAdmin.date_of_birth === null
                      ? "Add Date Of Birth"
                      : formatDate(
                          schoolAdmin.data.authSchoolAdmin.date_of_birth,
                        )}
                  </span>
                </div>
                <div>
                  <PenLine size={16} strokeWidth={1.5} />
                </div>
              </ModalButton>
            </div>
          </div>
          <div>
            <span className="font-size-sm my-1">Contact Details</span>
            <div className="card border-none rounded-4 border p-3 d-flex flex-column gap-2">
              <ModalButton
                classname="d-flex flex-row align-items-center justify-content-between font-size-sm w-100 remove-button-style"
                action={{ modalContent: UpdateEmail }}
              >
                <div className="d-flex flex-column text-start">
                  <span className="fw-semibold">Email</span>
                  <span className=" fw-light">
                    {schoolAdmin.data.authSchoolAdmin.email === null
                      ? "Add Email"
                      : schoolAdmin.data.authSchoolAdmin.email}
                  </span>
                </div>
                <div>
                  <PenLine size={16} strokeWidth={1.5} />
                </div>
              </ModalButton>
              <hr />
              <ModalButton
                action={{ modalContent: UpdateContactOne }}
                classname="d-flex flex-row align-items-center justify-content-between font-size-sm w-100 remove-button-style"
              >
                <div className="d-flex flex-column text-start">
                  <span className="fw-semibold">Contact One</span>
                  <span className=" fw-light">
                    {schoolAdmin.data.authSchoolAdmin.phone
                      ? schoolAdmin.data.authSchoolAdmin.phone
                      : "Add Contact"}
                  </span>
                </div>
                <div>
                  <PenLine size={16} strokeWidth={1.5} />
                </div>
              </ModalButton>
            </div>
          </div>
          <div>
            <span className="font-size-sm my-1">Location Details</span>
            <div className="card border-none rounded-4 p-3 border">
              <ModalButton
                classname="d-flex flex-row align-items-center justify-content-between font-size-sm w-100 remove-button-style"
                action={{ modalContent: UpdateAddress }}
              >
                <div className="d-flex flex-column text-start">
                  <span className="fw-semibold">Address</span>
                  <span className=" fw-light">
                    {schoolAdmin.data.authSchoolAdmin.address === null
                      ? "Add Contact Two"
                      : schoolAdmin.data.authSchoolAdmin.address}
                  </span>
                </div>
                <div>
                  <PenLine size={16} strokeWidth={1.5} />
                </div>
              </ModalButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Profile;
function getInitials(firstName, lastName) {
  if (!firstName || !lastName) {
    return "";
  }

  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}
