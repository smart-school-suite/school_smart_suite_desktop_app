import { Trash2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import FormErrorBanner from "../errors/FormErrorBanner";
import CustomModal from "../Modals/Modal";
import { SingleSpinner } from "../Spinners/Spinners";
import ToastDanger from "../Toast/ToastDanger";
import { useFormError } from "../../hooks/form/useFormError";
import { useRemoveSchoolAdminAvatar } from "../../hooks/schoolAdmin/useRemoveSchoolAdminAvatar";
import { useUploadSchoolAdminAvatar } from "../../hooks/schoolAdmin/useUploadSchoolAdminAvatar";
import PhotoCropper from "./PhotoCropper";

export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const PHOTO_MAX_BYTES = 10 * 1024 * 1024;

function CropDialog({ source, onCancel, onSaved }) {
  const cropperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Couldn't upload your photo");
  const { mutate: upload, isPending } = useUploadSchoolAdminAvatar(onSaved);

  const save = async () => {
    clearFormError();
    const picture = await cropperRef.current?.exportImage();
    if (!picture) {
      setClientError("Couldn't prepare your photo", "Try choosing the photo again.");
      return;
    }
    setProgress(0);
    upload(
      {
        picture,
        onUploadProgress: (event) => {
          if (event.total) setProgress(Math.round((event.loaded * 100) / event.total));
        },
      },
      { onError: handleServerError },
    );
  };

  return (
    <div className="d-flex flex-column gap-3 p-3 font-size-sm">
      <div className="d-flex align-items-start justify-content-between gap-2">
        <div className="d-flex flex-column">
          <span className="fw-semibold font-size-md">Adjust your photo</span>
          <span className="text-iron-500">Drag to reposition, then zoom to fit the circle.</span>
        </div>
        <button
          type="button"
          className="profile-icon-btn d-grid place-items-center border-0 rounded-circle text-iron-500 hover-bg-iron-100"
          onClick={onCancel}
          disabled={isPending}
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
      <PhotoCropper ref={cropperRef} src={source} />
      {isPending && (
        <div className="d-flex flex-column gap-1" aria-live="polite">
          <div className="progress" style={{ height: "0.25rem" }}>
            <div className="progress-bar bg-primary-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-iron-500 font-size-xs">Uploading… {progress}%</span>
        </div>
      )}
      <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} />
      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-light font-size-sm px-3"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          type="button"
          className={`profile-primary-btn border-0 rounded-3 primary-background text-white font-size-sm px-3 d-inline-flex align-items-center gap-2 ${isPending ? "opacity-50" : ""}`}
          onClick={save}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Save photo"}
        </button>
      </div>
    </div>
  );
}

function RemoveDialog({ onCancel, onRemoved }) {
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Couldn't remove your photo");
  const { mutate: remove, isPending } = useRemoveSchoolAdminAvatar(onRemoved);

  return (
    <div className="d-flex flex-column align-items-center text-center gap-3 p-4 font-size-sm">
      <span className="d-grid place-items-center rounded-circle bg-red-50 text-red-600 profile-remove-icon">
        <Trash2 size={20} strokeWidth={1.75} />
      </span>
      <div className="d-flex flex-column gap-1">
        <span className="fw-semibold font-size-md">Remove profile photo?</span>
        <span className="text-iron-500">Your initials will show instead. You can add a new photo at any time.</span>
      </div>
      <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="w-100" />
      <div className="d-flex gap-2 w-100">
        <button type="button" className="btn btn-light font-size-sm flex-grow-1" onClick={onCancel} disabled={isPending}>
          Cancel
        </button>
        <button
          type="button"
          className="btn bg-red-600 text-white font-size-sm flex-grow-1 d-inline-flex justify-content-center"
          onClick={() => {
            clearFormError();
            remove(undefined, { onError: handleServerError });
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Remove"}
        </button>
      </div>
    </div>
  );
}

function ViewDialog({ src, name, onClose }) {
  return (
    <div className="position-relative bg-iron-950 rounded-3 overflow-hidden">
      <button
        type="button"
        className="profile-icon-btn profile-viewer__close position-absolute d-grid place-items-center border-0 rounded-circle text-white"
        onClick={onClose}
        aria-label="Close photo"
      >
        <X size={18} />
      </button>
      <img src={src} alt={name ? `${name}'s profile photo` : "Profile photo"} className="d-block w-100 profile-viewer__image" />
    </div>
  );
}

function PhotoLayer({ show, onClose, dismissible = true, wide = false, children }) {
  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        if (dismissible) onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [show, dismissible, onClose]);

  if (!show) return null;
  return (
    <div className="profile-photo-layer position-absolute top-0 start-0 w-100 h-100 d-grid place-items-center p-3">
      <div
        className="profile-photo-layer__backdrop position-absolute top-0 start-0 w-100 h-100"
        onClick={dismissible ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`profile-photo-layer__card position-relative rounded-4 white-bg w-100 ${wide ? "" : "profile-photo-layer__card--narrow"}`}
      >
        {children}
      </div>
    </div>
  );
}

export function useProfilePhoto({ photoUrl, name, inline = false }) {
  const inputRef = useRef(null);
  const [cropSource, setCropSource] = useState(null);
  const [dialog, setDialog] = useState(null);

  useEffect(() => () => cropSource && URL.revokeObjectURL(cropSource), [cropSource]);

  const close = useCallback(() => {
    setDialog(null);
    setCropSource(null);
  }, []);

  const openPicker = useCallback(() => inputRef.current?.click(), []);
  const openViewer = useCallback(() => photoUrl && setDialog("view"), [photoUrl]);
  const requestRemove = useCallback(() => photoUrl && setDialog("remove"), [photoUrl]);

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const problem = !PHOTO_TYPES.includes(file.type)
      ? "Choose a JPEG, PNG or WebP image."
      : file.size > PHOTO_MAX_BYTES
        ? "Choose an image smaller than 10 MB."
        : null;
    if (problem) {
      toast.custom(<ToastDanger title="Can't use this file" description={problem} />);
      return;
    }
    setCropSource(URL.createObjectURL(file));
    setDialog("crop");
  };

  const elements = (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={PHOTO_TYPES.join(",")}
        className="d-none"
        onChange={handleFile}
        tabIndex={-1}
        aria-hidden="true"
      />
      {inline ? (
        <>
          <PhotoLayer show={dialog === "crop"} onClose={close} dismissible={false}>
            {cropSource && <CropDialog source={cropSource} onCancel={close} onSaved={close} />}
          </PhotoLayer>
          <PhotoLayer show={dialog === "remove"} onClose={close}>
            <RemoveDialog onCancel={close} onRemoved={close} />
          </PhotoLayer>
          <PhotoLayer show={dialog === "view"} onClose={close} wide>
            {photoUrl && <ViewDialog src={photoUrl} name={name} onClose={close} />}
          </PhotoLayer>
        </>
      ) : (
        <>
          <CustomModal show={dialog === "crop"} handleClose={close} closeOnOutsideClick={false} centered>
            {cropSource && <CropDialog source={cropSource} onCancel={close} onSaved={close} />}
          </CustomModal>
          <CustomModal show={dialog === "remove"} handleClose={close} size="sm" centered>
            <RemoveDialog onCancel={close} onRemoved={close} />
          </CustomModal>
          <CustomModal show={dialog === "view"} handleClose={close} size="lg" centered contentClassName="bg-transparent border-0">
            {photoUrl && <ViewDialog src={photoUrl} name={name} onClose={close} />}
          </CustomModal>
        </>
      )}
    </>
  );

  return { hasPhoto: Boolean(photoUrl), openPicker, openViewer, requestRemove, elements };
}
