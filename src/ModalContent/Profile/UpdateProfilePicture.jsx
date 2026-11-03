import axios from "../../axios/axios";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function ChangeProfilePicture({ handleClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const authToken = useSelector((state) => state.auth.token);
  const apiKey = useSelector((state) => state.auth.apiKey);
  const fileInputRef = useRef(null);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update Profile Picture");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      clearFormError();
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setClientError("Please Select A File", "Please Select A File To Update Profile Picture");
      return;
    }

    clearFormError();
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    try {
      const response = await axios.post(
        "school-admin/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
            "api-key": apiKey,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Profile Picture Updated"}
          description={"Profile Picture Updated Successfully"}
        />
      );
    } catch (error) {
      handleServerError(error);
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
              style={{ opacity: "0" }} 
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
                  <span>{Math.round(selectedFile.size / 1024)} KB </span> |
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
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
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
export default ChangeProfilePicture;