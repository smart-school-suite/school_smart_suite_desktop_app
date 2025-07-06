import { Icon } from "@iconify/react";
import { Navbarsettings } from "../../components/Navbar";
import { formatNumber, replaceDashesWithSpaces } from "../../utils/functions";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { useRef } from "react";
import axios from "../../axios/axios";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { useFetchPermissionsBySchoolAdminQuery } from "../../Slices/Asynslices/fetchSlice";
function Profile() {
  const userData = useSelector((state) => state.auth.user);
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => {
    setIsToggled((prevalue) => !prevalue);
  };
  return (
    <>
      <Navbarsettings />
      <div>
        <div className="card border-none pb-4 shadow-sm rounded-3 profile-section white-bg d-flex flex-column">
          <div className="top-section rounded-top-4 px-4">
            <div className="d-flex flex-row profile-picture-group z-5 justify-content-between align-items-center">
              {userData.profile_picture !== null ? (
                <div className="profile-img">
                  <img
                    src={`http://127.0.0.1:8000/storage/SchoolAdminAvatars/${userData.authSchoolAdmin.profile_picture}`}
                    alt=""
                  />
                </div>
              ) : (
                <div className="profile-img primary-background d-flex align-items-center justify-content-center font-size-xl fw-bolder text-white">
                  PF
                </div>
              )}
              <div>
                <div className="position-relative">
                  <div
                    onClick={() => {
                      handleToggle();
                    }}
                  >
                    <Icon
                      icon="mdi:dots-vertical"
                      className="fs-3 pointer-cursor"
                    />
                  </div>
                  {isToggled && (
                    <div
                      className="position-absolute z-3 p-1 border rounded-3"
                      style={{ right: "0rem", width: "15rem" }}
                    >
                      <ModalButton
                        classname="border-none bg-transparent w-100 p-0"
                        action={{ modalContent: LogoutUser }}
                      >
                        <div className="align-items-center justify-content-between d-flex px-2 py-2 profile-actions  font-size-sm">
                          <span>Logout</span>
                          <span>
                            <Icon
                              icon="mynaui:logout"
                              className="font-size-md"
                            />
                          </span>
                        </div>
                      </ModalButton>
                      <div className="align-items-center justify-content-between red-color d-flex px-2 py-2 profile-actions  font-size-sm">
                        <span>Delete Account</span>
                        <span>
                          <Icon
                            icon="fluent:delete-12-regular"
                            className="font-size-md"
                          />
                        </span>
                      </div>
                      <ModalButton
                        classname="border-none bg-transparent w-100 p-0"
                        action={{ modalContent: ChangeProfilePicture }}
                      >
                        <div className="align-items-center justify-content-between d-flex px-2 py-2 profile-actions  font-size-sm">
                          <span>Update Profile Picture</span>
                          <span>
                            <Icon
                              icon="ic:round-update"
                              className="font-size-md"
                            />
                          </span>
                        </div>
                      </ModalButton>
                      <div className="align-items-center justify-content-between red-color d-flex px-2 py-2 profile-actions  font-size-sm">
                        <span>Update Account</span>
                        <span>
                          <Icon
                            icon="fluent:delete-12-regular"
                            className="font-size-md"
                          />
                        </span>
                      </div>
                      <ModalButton
                        classname="border-none bg-transparent w-100 p-0"
                        action={{ modalContent: MyPermissions }}
                      >
                        <div className="align-items-center justify-content-between red-color d-flex px-2 py-2 profile-actions  font-size-sm">
                          <span>View Permissions</span>
                          <span>
                            <Icon
                              icon="icon-park-outline:permissions"
                              className="font-size-md"
                            />
                          </span>
                        </div>
                      </ModalButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="ms-4 mt-auto">
            <div className="d-block">
              <h5 className="fw-bold">
                {userData.authSchoolAdmin.name}{" "}
                <span>
                  <Icon
                    icon="lets-icons:check-fill"
                    className="color-primary fs-5"
                  />
                </span>{" "}
              </h5>
              <div className="d-flex flex-row my-1 gainsboro-color">
                <span>
                  {" "}
                  <span>
                    <Icon icon="twemoji:flag-cameroon" className="fs-5" />
                  </span>{" "}
                  {userData.schoolDetails.city}, {userData.schoolDetails.school.country.country}
                </span>
              </div>
              <div className="d-flex flex-row gap-2 mt-2 align-items-center">
                <span className="font-size-sm fw-medium">
                  @Gilbert.Bernhard57
                </span>
                <div className="divider-pill"></div>
                <span className="font-size-sm fw-medium">{userData.authSchoolAdmin.role}</span>
                <div className="divider-pill"></div>
                <span className="font-size-sm gainsboro-color">
                  {userData.authSchoolAdmin.employment_status}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row gap-3 w-100">
          <div className="card mt-2 px-2 pt-3  border-none shadow-sm rounded-3 white-bg width-40">
            <h5 className="fs-6 fw-bold">Contact Info</h5>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex flex-row align-items-center gap-2">
                <div className="d-block">
                  <p className="gainsboro-color font-size-sm my-0">E-mail</p>
                  <p className="fs-6">{userData.authSchoolAdmin.email}</p>
                </div>
                <div>
                  <Icon icon="clarity:email-line" />
                </div>
              </div>
              <div className="d-block">
                <p className="gainsboro-color font-size-sm my-0">Phone</p>
                <p className="fs-6">832-832-999</p>
              </div>
              <div className="d-block">
                <p className="gainsboro-color font-size-sm my-0">Gender</p>
                <p className="fs-6">Female</p>
              </div>
            </div>
          </div>
          <div className="card mt-2 px-2 pt-3 border-none shadow-sm rounded-3 white-bg width-40">
            <h5 className="fs-6 fw-bold">Qualifications</h5>
            <div className="d-flex flex-column gap-2">
              <div className="d-block">
                <p className="gainsboro-color font-size-sm my-0">
                  Qualification
                </p>
                <p className="fs-6">{userData.authSchoolAdmin.highest_qualification}</p>
              </div>
              <div className="d-block">
                <p className="gainsboro-color font-size-sm my-0">Religion</p>
                <p className="fs-6">{userData.authSchoolAdmin.religion}</p>
              </div>
              <div className="d-block">
                <p className="gainsboro-color font-size-sm my-0">Address</p>
                <p className="fs-6">{userData.authSchoolAdmin.address}</p>
              </div>
            </div>
          </div>
          <div className="card mt-2 px-2 pt-3 border-none shadow-sm rounded-3 white-bg width-40">
            <h5 className="fs-6 fw-bold">Work Info</h5>
            <div className="d-flex flex-column gap-2 width-35">
              <div className="d-block">
                <p className="gainsboro-color font-size-sm my-0">Salary</p>
                <p className="fs-6">{formatNumber(Number(userData.authSchoolAdmin.salary))} {userData.schoolDetails.school.country.currency}</p>
              </div>
              <div className="d-block">
                <p className="gainsboro-color font-size-sm my-0">
                  State Of Origin
                </p>
                <p className="fs-6">Northwest</p>
              </div>
              <div className="d-block">
                <p className="gainsboro-color font-size-sm my-0">Tribe</p>
                <p className="fs-6">{userData.authSchoolAdmin.cultural_background}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;

function ChangeProfilePicture({ handleClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const authToken = useSelector((state) => state.auth.token);
  const apiKey = useSelector((state) => state.auth.apiKey);
  const fileInputRef = useRef(null);
  const { getAuthenticatedUser } = useAuth();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first."); // Handle validation for file selection
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    try {
      const response = await axios.post(
        "school-admin/uploadProfilePic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
            "API-KEY": apiKey,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      getAuthenticatedUser(authToken);
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the profile picture.");
    }
  };
  return (
    <>
      <div>
        <h5>Change Profile Picture</h5>
        <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</span>
        <div className="d-flex flex-row justify-content-center my-2">
          <img src={previewUrl} alt="" className="picture-preview" />
        </div>
        <div className="my-1">
          <span>Upload Profile Picture</span>
          <div
            className="imageBox"
            onClick={() => fileInputRef.current.click()}
          >
            <div className="mt-auto text-center">
              <Icon icon="mage:image-plus" style={{ fontSize: "4rem" }} />
              <div className="my-1">
                <span className="text-primary">
                  Click Here To Upload Profile Picture
                </span>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ opacity: "0" }} // Hide default input
            />
            <div className="mt-auto text-center">
              <span className="font-size-sm gainsboro-color">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam pariatur ipsa
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center w-100 gap-3 mt-3">
          {previewUrl && (
            <>
              <div>
                <span>
                  <Icon
                    icon="ant-design:file-image-outlined"
                    width="24"
                    height="24"
                  />
                </span>
              </div>
              <div className="d-block width-90">
                <span className="font-size-sm fw-semibold">
                  {selectedFile.name}
                </span>
                <div className="progress">
                  <div
                    className="progressFiller"
                    style={{
                      width: `${uploadProgress}%`,
                      transition: "all 0.2s",
                    }}
                  ></div>
                </div>
                <span className="gainsboro-color font-size-sm fw-light">
                  <span>{Math.round(selectedFile.size / 1024)} KB </span> |{" "}
                  <span>{uploadProgress}%</span>
                </span>
              </div>
              <div>
                <span>
                  <Icon
                    icon="material-symbols-light:cancel-outline"
                    width="24"
                    height="24"
                  />
                </span>
              </div>
            </>
          )}
        </div>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              onClick={handleUpload}
            >
              Upload Profile Picture
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function LogoutUser({ handleClose }) {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { handleAdminLogout } = useAuth();
  const handleLogout = async () => {
    await handleAdminLogout(navigate, token);
  };
  return (
    <>
      <div>
        <h5>Are You sure you want to log out</h5>
        <span className="font-size-sm gainsboro-color">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore amet
          pariatur ad at voluptatibus praesentium illum explicabo officia
          facilis! Molestias enim similique, nam atque omnis quisquam labore eum
          obcaecati odit?
        </span>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function MyPermissions({ handleClose }) {
  const schoolAdminId = useSelector((state) => state.auth.user.id);
  const {
    data: data,
    isLoading,
    error,
  } = useFetchPermissionsBySchoolAdminQuery({ schoolAdminId: schoolAdminId });
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="my-1">
        <h5>My Permissions</h5>
      </div>
      <div
        style={{
          maxHeight: "50dvh",
          height: "auto",
          overflowY: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        {data.data.map((permission, index) => (
          <div className="d-flex flex-row align-items-center gap-4" key={index}>
            <div className="w-100 border-bottom">
              <div className="d-block">
                <p className="my-0">{replaceDashesWithSpaces(permission)}</p>
                <span className="font-size-sm gainsboro-color">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Aperiam, iure facilis. Officiis placea
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 d-flex justify-content-end gap-2 w-100">
        <button
          className="border-none px-3 py-2 text-primary w-100 rounded-3 font-size-sm"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </>
  );
}
