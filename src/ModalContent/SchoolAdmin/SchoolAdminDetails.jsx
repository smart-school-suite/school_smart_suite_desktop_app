import Pageloaderspinner, { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { formatNumber, formatDate, formatDateWithAge, formatDateWithSuffix } from "../../utils/functions";
import { useGetSchoolAdminDetails } from "../../hooks/schoolAdmin/useGetSchoolAdminDetails";
const SchoolAdminDetails = ({  rowData, handleClose }) => {
  const { id:schoolAdminId } = rowData;
  const { data:schoolAdminDetails, isFetching} = useGetSchoolAdminDetails(schoolAdminId);
  if(isFetching){
    return <SingleSpinner />
  }
  return (
    <>
       <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span>School Admin Details</span>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
         <div className="d-flex flex-row align-items-center justify-content-center my-4">
              <div>
                <img src="./images/user.png" alt="" style={{ width:"5rem", height:"5rem" }} className="rounded-circle"/>
              </div>
         </div> 
         <div className="d-flex flex-column gap-2">
          <span className="font-size-sm">Account Details</span>
          <div>
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">Full Names</span>
              <span className="fw-light gainsboro-color">{schoolAdminDetails?.data?.name || "N/A"}</span>
            </div>
            <hr />
          </div>
          <div>
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">First Name</span>
              <span className="fw-light gainsboro-color">{schoolAdminDetails?.data?.first_name || "N/A"}</span>
            </div>
            <hr />
          </div>
          <div>
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">Last Name</span>
              <span className="fw-light gainsboro-color">{schoolAdminDetails?.data?.last_name || "N/A"}</span>
            </div>
            <hr />
          </div>
          <div>
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">Email</span>
              <span className="fw-light gainsboro-color">{schoolAdminDetails?.data?.email || "N/A"}</span>
            </div>
            <hr />
          </div>
           <div>
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">Contact One</span>
              <span className="fw-light gainsboro-color">{schoolAdminDetails?.data?.phone_one || "N/A"}</span>
            </div>
            <hr />
          </div>
           <div>
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">Contact Two</span>
              <span className="fw-light gainsboro-color">{schoolAdminDetails?.data?.phone_two || "N/A"}</span>
            </div>
          </div>
         </div>
         <div className="d-flex flex-column gap-2">
           <span className="font-size-sm my-2">Personal Details</span>
           <div>
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">Date Of Birth</span>
              <span className="fw-light gainsboro-color">{formatDate(schoolAdminDetails?.data?.date_of_birth) || "N/A"}</span>
            </div>
            <hr />
          </div>
          <div>
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">Address</span>
              <span className="fw-light gainsboro-color">{schoolAdminDetails?.data?.address || "N/A"}</span>
            </div>
            <hr />
          </div>
          <div>
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">Cultural Background</span>
              <span className="fw-light gainsboro-color">{schoolAdminDetails?.data?.cultural_background || "N/A"}</span>
            </div>
            <hr />
          </div>
          <div>
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">Cultural Background</span>
              <span className="fw-light gainsboro-color">{schoolAdminDetails?.data?.cultural_background || "N/A"}</span>
            </div>
          </div>
         </div>
       </div>
    </>
  );
};
export default SchoolAdminDetails;
