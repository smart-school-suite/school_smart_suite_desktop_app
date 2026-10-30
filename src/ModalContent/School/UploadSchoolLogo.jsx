import { TOKEN_KEY } from "@/constants";
import { Icon } from "@iconify/react";
import { CircleX, ImagePlus, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../axios/axios";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
import { secureTokenStorage } from "../../services/secureStore/secureTokenStorage";
import { cleanAssetPath } from "../../utils/functions";

const CDN_BASE_URL = "https://cdn.smartschoolsuite.com";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg"];

const formatFileSize = (bytes) =>
  bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

const getInitials = (name) =>
  name
    ?.split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("") || "SL";

const validateFile = (file) => {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Invalid file type. Please select a PNG, JPG or JPEG image.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File is too large (${formatFileSize(file.size)}). Maximum size is 5MB.`;
  }
  return null;
};

function LogoPreview({
  src,
  alt,
  label,
  fallback,
  size = "lg",
  badge,
  onLoad,
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  return (
    <figure
      className={`d-flex flex-column align-items-center gap-1 m-0 ${
        size === "lg" ? "w-100" : ""
      }`}
    >
      <div className={`logo-frame logo-frame--${size}`}>
        {badge && (
          <span className="badge primary-background logo-frame__badge">
            {badge}
          </span>
        )}
        {src && !failed ? (
          <img
            src={src}
            alt={alt}
            className="logo-frame__img"
            onLoad={onLoad}
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="logo-frame__fallback primary-background-50 color-primary">
            {fallback}
          </span>
        )}
      </div>
      {label && (
        <figcaption className="text-iron-500 fw-light">{label}</figcaption>
      )}
    </figure>
  );
}

function UploadSchoolLogo({ handleClose, rowData }) {
  const currentLogoUrl = rowData?.schoolLogo
    ? `${CDN_BASE_URL}/${cleanAssetPath(rowData.schoolLogo)}`
    : null;
  const initials = getInitials(rowData?.schoolName);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const selectFile = (file) => {
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDimensions(null);
    setUploadProgress(0);
  };

  const handleFileChange = (event) => {
    selectFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const openFilePicker = () => {
    if (!isUploading) fileInputRef.current?.click();
  };

  const handleDropzoneKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!isUploading) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    if (!isUploading) selectFile(event.dataTransfer.files?.[0]);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setDimensions(null);
    setUploadProgress(0);
    setError(null);
  };

  const handlePreviewLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setDimensions({ width: naturalWidth, height: naturalHeight });
  };

  const handleCancel = () => {
    if (isUploading) {
      abortRef.current?.abort();
      return;
    }
    handleClose();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a logo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("school_logo", selectedFile);

    const controller = new AbortController();
    abortRef.current = controller;
    setIsUploading(true);
    setError(null);

    try {
      const token = await secureTokenStorage.get(TOKEN_KEY.AUTH_TOKEN);
      await axios.post("school-asset/school-logo/upload", formData, {
        signal: controller.signal,
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: ({ loaded, total }) => {
          setUploadProgress(Math.round((loaded * 100) / (total || 1)));
        },
      });

      toast.custom(
        <ToastSuccess
          title="School Logo Updated"
          description="School Logo Updated Successfully"
        />,
      );
      handleClose();
    } catch (err) {
      if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") {
        setUploadProgress(0);
        toast.custom(
          <ToastWarning
            title="Upload Cancelled"
            description="The logo upload was cancelled."
          />,
        );
        return;
      }

      toast.custom(
        <ToastDanger
          title="Update Failed"
          description={
            err?.response?.data?.message ||
            "Failed to upload School Logo due to an error, please try again."
          }
        />,
      );
      console.error(err);
    } finally {
      abortRef.current = null;
      setIsUploading(false);
    }
  };

  const isSquare =
    !dimensions ||
    Math.abs(dimensions.width - dimensions.height) /
      Math.max(dimensions.width, dimensions.height) <
      0.1;

  return (
    <div className="font-size-sm">
      {/* Header */}
      <div
        className="border-bottom rounded-top-4 px-2 py-2 d-flex align-items-center justify-content-between"
        style={{ background: "#f9f9f9" }}
      >
        <div className="d-flex flex-column">
          <span className="fw-semibold">Upload School Logo</span>
          <span className="text-iron-500 fw-light">
            Upload and update your official institutional branding logo.
          </span>
        </div>
        <button
          type="button"
          onClick={handleClose}
          disabled={isUploading}
          aria-label="Close"
          className="border rounded-circle bg-transparent p-0 d-grid"
          style={{ width: "2rem", height: "2rem", placeItems: "center" }}
        >
          <CircleX size={16} />
        </button>
      </div>

      <div className="p-3">
        {error && (
          <div className="alert alert-danger py-2 px-2 mb-3" role="alert">
            {error}
          </div>
        )}

        <div className="row g-3 align-items-stretch">
          <div className="col-12 col-md-5 d-flex flex-column align-items-center gap-2">
            <LogoPreview
              src={previewUrl || currentLogoUrl}
              alt={
                previewUrl ? "New school logo preview" : "Current school logo"
              }
              fallback={initials}
              badge={previewUrl ? "New" : null}
              label={
                previewUrl
                  ? null
                  : currentLogoUrl
                    ? "Current logo"
                    : "No logo yet"
              }
              onLoad={previewUrl ? handlePreviewLoad : undefined}
            />

            {previewUrl && currentLogoUrl && (
              <div className="d-flex flex-column gap-2">
                <LogoPreview
                  size="lg"
                  src={currentLogoUrl}
                  alt="Current school logo"
                  fallback={initials}
                />
                <div className="d-flex flex-column">
                  <span className="fw-semibold">Current logo</span>
                  <span className="text-iron-500 fw-light">
                    Will be replaced
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right: upload controls */}
          <div className="col-12 col-md-7 d-flex flex-column gap-3">
            <div
              role="button"
              tabIndex={isUploading ? -1 : 0}
              aria-disabled={isUploading}
              aria-label="Upload school logo"
              className={`logo-dropzone flex-grow-1 ${isDragging ? "is-dragging" : ""} ${
                isUploading ? "is-disabled" : ""
              }`}
              onClick={openFilePicker}
              onKeyDown={handleDropzoneKeyDown}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <ImagePlus size={36} strokeWidth={1.5} />
              <div className="my-1 fw-medium">
                {isDragging
                  ? "Drop your logo here"
                  : selectedFile
                    ? "Click or drag to replace the logo"
                    : "Click or drag an image here to upload"}
              </div>
              <span className="gainsboro-color">
                PNG, JPG or JPEG · Max 5MB · Square images look best
              </span>
              <input
                type="file"
                accept={ACCEPTED_TYPES.join(",")}
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={isUploading}
                hidden
              />
            </div>

            {selectedFile && (
              <div className="d-flex flex-column gap-1">
                <div className="d-flex align-items-center gap-3 border rounded-4 p-2">
                  <Icon
                    icon="ant-design:file-image-outlined"
                    width="24"
                    height="24"
                  />
                  <div className="flex-grow-1 min-w-0">
                    <div
                      className="fw-semibold text-truncate"
                      title={selectedFile.name}
                    >
                      {selectedFile.name}
                    </div>
                    <div
                      className="progress my-1"
                      role="progressbar"
                      aria-label="Upload progress"
                      aria-valuenow={uploadProgress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ height: 6 }}
                    >
                      <div
                        className="progress-bar primary-background"
                        style={{
                          width: `${uploadProgress}%`,
                          transition: "width 0.2s",
                        }}
                      />
                    </div>
                    <span className="gainsboro-color fw-light">
                      {formatFileSize(selectedFile.size)}
                      {dimensions &&
                        ` · ${dimensions.width} × ${dimensions.height}px`}
                      {` · ${uploadProgress}%`}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    disabled={isUploading}
                    aria-label="Remove selected file"
                    className="bg-transparent border-0 p-0"
                    style={{ cursor: isUploading ? "not-allowed" : "pointer" }}
                  >
                    <Icon
                      icon="material-symbols-light:cancel-outline"
                      width="24"
                      height="24"
                    />
                  </button>
                </div>
                {!isSquare && (
                  <div className="d-flex flex-row align-items-center gap-1">
                    <Info size={16} strokeWidth={1.5}/>
                    <div className="text-old-lace-600 fw-light">
                      This image isn't square. It may look cropped or small in
                      some places.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <HorizontalDashedLine color="#ccc" dashed={false} thickness={0.2} />
      <div className="d-flex align-items-center gap-2 p-2">
        <button
          type="button"
          className="px-3 py-2 rounded-3 font-size-sm w-50 bg-transparent border"
          onClick={handleCancel}
        >
          {isUploading ? "Cancel upload" : "Cancel"}
        </button>
        <button
          type="button"
          className="border-0 px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
          onClick={handleUpload}
          disabled={isUploading || !selectedFile}
          style={{ opacity: isUploading || !selectedFile ? 0.7 : 1 }}
        >
          {isUploading ? <SingleSpinner /> : "Upload School Logo"}
        </button>
      </div>
    </div>
  );
}

export default UploadSchoolLogo;
