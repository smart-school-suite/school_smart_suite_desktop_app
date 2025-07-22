import { Icon } from "@iconify/react";
import { formatDate } from "../../utils/functions";
import { useSelector } from "react-redux";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { useGetAuthSchoolAdmin } from "../../hooks/schoolAdmin/useGetAuthSchoolAdmin";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import UpdateFullNames from "../../ModalContent/Profile/UpdateFullNames";
import UpdateLastName from "../../ModalContent/Profile/UpdateLastName";
import UpdateDOB from "../../ModalContent/Profile/UpdateDOB";
import UpdateCulturalBackground from "../../ModalContent/Profile/UpdateCulturalBackground";
import UpdateEmail from "../../ModalContent/Profile/UpdateEmail";
import UpdateContactOne from "../../ModalContent/Profile/UpdateContactOne";
import UpdateContactTwo from "../../ModalContent/Profile/UpdateContactTwo";
import UpdateAddress from "../../ModalContent/Profile/UpdateAddress";
function Profile() {
  const { data:schoolAdmin, isFetching } = useGetAuthSchoolAdmin();
  const userData = useSelector((state) => state.auth.user);
  if(isFetching){
     return <Pageloaderspinner />
  }
  return (
    <>
      <div>
        <div className="card border-none pb-4  rounded-4 profile-section white-bg d-flex flex-column">
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
                <div className="profile-img primary-background d-flex align-items-center justify-content-center font-size-xl fw-bolder text-white">
                  PF
                </div>
              )}
            </div>
          </div>
          <div className="ms-4 mt-auto">
            <div className="d-block">
              <h5 className="fw-bold">
                {schoolAdmin.data.authSchoolAdmin.name}
              </h5>
              <div className="d-flex flex-row my-1 gainsboro-color">
                <span>
                  {schoolAdmin.data.schoolDetails.city},{" "}
                  {schoolAdmin.data.schoolDetails.school.country.country}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="font-size-sm my-1">Personal Details</span>
          <div className="card border-none p-2">
              <ModalButton 
                classname={"d-flex flex-row align-items-center justify-content-between font-size-sm w-100"}
                action={{ modalContent:UpdateFullNames }}
              >
                <div className="d-flex flex-column text-start">
                <span className="fw-semibold">Full Names</span>
                <span className="gainsboro-color fw-light">
                  {
                     schoolAdmin.data.authSchoolAdmin.name === null ? "Add Full Names" :
                     schoolAdmin.data.authSchoolAdmin.name
                  }
                </span>
              </div>
              <div>
                <Icon icon="iconamoon:edit-thin" width="24" height="24" />
              </div>
              </ModalButton>
            <hr />
              <ModalButton
               classname={"d-flex flex-row align-items-center justify-content-between font-size-sm w-100"}
              >
                <div className="d-flex flex-column text-start">
                <span className="fw-semibold">First Name</span>
                <span className="gainsboro-color fw-light">
                  {
                    schoolAdmin.data.authSchoolAdmin.first_name === null ? "Add First Name" :
                    schoolAdmin.data.authSchoolAdmin.first_name
                  }
                </span>
              </div>
              <div>
                <Icon icon="iconamoon:edit-thin" width="24" height="24" />
              </div>
              </ModalButton>
            <hr />
              <ModalButton
               classname={"d-flex flex-row align-items-center justify-content-between font-size-sm w-100"}
               action={{ modalContent:UpdateLastName }}
              >
                <div className="d-flex flex-column text-start">
                <span className="fw-semibold">Last Name</span>
                <span className="gainsboro-color fw-light">
                  {
                     schoolAdmin.data.authSchoolAdmin.last_name === null ? "Add Last Name" : 
                     schoolAdmin.data.authSchoolAdmin.last_name
                  }
                </span>
              </div>
              <div>
                <Icon icon="iconamoon:edit-thin" width="24" height="24" />
              </div>
              </ModalButton>
             <hr />
             <ModalButton
              classname={"d-flex flex-row align-items-center justify-content-between font-size-sm w-100"}
              action={{ modalContent:UpdateDOB }}
             >
              <div className="d-flex flex-column text-start">
                <span className="fw-semibold">Date of birth</span>
                <span className="gainsboro-color fw-light">
                  {
                     schoolAdmin.data.authSchoolAdmin.date_of_birth === null ? "Add Date Of Birth" : 
                     formatDate(schoolAdmin.data.authSchoolAdmin.date_of_birth)
                  }
                </span>
              </div>
              <div>
                <Icon icon="iconamoon:edit-thin" width="24" height="24" />
              </div>
             </ModalButton>
            <hr />
              <ModalButton
                classname={"d-flex flex-row align-items-center justify-content-between font-size-sm w-100"}
                action={{ modalContent:UpdateCulturalBackground }}
              >
                <div className="d-flex flex-column text-start">
                <span className="fw-semibold">Cultural Background</span>
                <span className="gainsboro-color fw-light">
                  {
                     schoolAdmin.data.authSchoolAdmin.cultural_background === null ? "Add Cultural Background" : 
                     schoolAdmin.data.authSchoolAdmin.cultural_background
                  }
                </span>
              </div>
              <div>
                <Icon icon="iconamoon:edit-thin" width="24" height="24" />
              </div>
              </ModalButton>
          </div>
        </div>
        <div>
          <span className="font-size-sm my-1">Contact Details</span>
          <div className="card border-none p-2">
            <ModalButton
                classname={"d-flex flex-row align-items-center justify-content-between font-size-sm w-100"}
                action={{ modalContent:UpdateEmail }}
              >
                 <div className="d-flex flex-column text-start">
                <span className="fw-semibold">Email</span>
                <span className="gainsboro-color fw-light">
                  {
                     schoolAdmin.data.authSchoolAdmin.email === null ? "Add Email" : 
                     schoolAdmin.data.authSchoolAdmin.email
                  }
                </span>
              </div>
              <div>
                <Icon icon="iconamoon:edit-thin" width="24" height="24" />
              </div>
            </ModalButton>
            <hr />
            <ModalButton
                action={{ modalContent:UpdateContactOne }}
                classname={"d-flex flex-row align-items-center justify-content-between font-size-sm w-100"}
              >
                <div className="d-flex flex-column text-start">
                <span className="fw-semibold">Contact One</span>
                <span className="gainsboro-color fw-light">
                  {
                    schoolAdmin.data.authSchoolAdmin.phone_one === null ? "Add Contact One" : 
                     schoolAdmin.data.authSchoolAdmin.phone_one
                  }
                </span>
              </div>
              <div>
                <Icon icon="iconamoon:edit-thin" width="24" height="24" />
              </div>
              </ModalButton>
            <hr />
            <ModalButton
              classname={"d-flex flex-row align-items-center justify-content-between font-size-sm w-100"}
              action={{ modalContent:UpdateContactTwo }}
            >
              <div className="d-flex flex-column text-start">
                <span className="fw-semibold">Contact Two</span>
                <span className="gainsboro-color fw-light">
                  {
                    schoolAdmin.data.authSchoolAdmin.phone_two === null ? "Add Contact Two" : 
                     schoolAdmin.data.authSchoolAdmin.phone_two
                  }
                </span>
              </div>
              <div>
                <Icon icon="iconamoon:edit-thin" width="24" height="24" />
              </div>
            </ModalButton>
          </div>
        </div>
        <div>
          <span className="font-size-sm my-1">Location Details</span>
          <div className="card border-none p-2">
              <ModalButton
                classname={"d-flex flex-row align-items-center justify-content-between font-size-sm w-100"}
                action={{ modalContent:UpdateAddress }}
              >
                 <div className="d-flex flex-column text-start">
                <span className="fw-semibold">Address</span>
                <span className="gainsboro-color fw-light">
                   {
                    schoolAdmin.data.authSchoolAdmin.address === null ? "Add Contact Two" : 
                     schoolAdmin.data.authSchoolAdmin.address
                  }
                </span>
              </div>
              <div>
                <Icon icon="iconamoon:edit-thin" width="24" height="24" />
              </div>
              </ModalButton>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;

