import { Crop, Eye, FileImage, Trash2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ConfirmDialog, { DialogHeader } from "../Modals/ConfirmDialog";
import CustomModal from "../Modals/Modal";
import ToastDanger from "../Toast/ToastDanger";
import { useFormError } from "../../hooks/form/useFormError";
import PhotoCropper from "./PhotoCropper";
import { PHOTO_KIND } from "./photoKinds";

export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const PHOTO_MAX_BYTES = 10 * 1024 * 1024;

const formatFileSize = (bytes) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

function CropDialog({ kind, source, file, onCancel, onSaved }) {
  const cropperRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError(`Couldn't upload your ${kind.noun}`);
  const { mutate: upload, isPending } = kind.useUpload(onSaved);

  const save = async () => {
    clearFormError();
    const picture = await cropperRef.current?.exportImage();
    if (!picture) {
      setClientError(`Couldn't prepare your ${kind.noun}`, `Try choosing the ${kind.noun} again.`);
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
    <ConfirmDialog
      icon={Crop}
      title={kind.cropTitle}
      description={kind.cropHint}
      confirmLabel={`Save ${kind.noun}`}
      onConfirm={save}
      onCancel={onCancel}
      isPending={isPending}
      cancelDisabled={isPending}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      <PhotoCropper ref={cropperRef} src={source} shape={kind.shape} fit={kind.fit} output={kind.output} />
      {file && (
        <div className="d-flex align-items-center gap-3 border rounded-4 p-2" aria-live="polite">
          <span className="d-grid place-items-center rounded-3 bg-primary-50 text-primary-500 profile-file-icon flex-shrink-0">
            <FileImage size={18} strokeWidth={1.75} />
          </span>
          <div className="flex-grow-1 overflow-hidden">
            <div className="fw-semibold text-truncate" title={file.name}>
              {file.name}
            </div>
            {isPending ? (
              <>
                <div
                  className="progress my-1"
                  role="progressbar"
                  aria-label="Upload progress"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ height: 6 }}
                >
                  <div className="progress-bar primary-background" style={{ width: `${progress}%`, transition: "width 0.2s" }} />
                </div>
                <span className="text-iron-500 fw-light">Uploading… {progress}%</span>
              </>
            ) : (
              <span className="text-iron-500 fw-light">
                {formatFileSize(file.size)} · {kind.savedAs}
              </span>
            )}
          </div>
        </div>
      )}
    </ConfirmDialog>
  );
}

function RemoveDialog({ kind, onCancel, onRemoved }) {
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError(`Couldn't remove your ${kind.noun}`);
  const { mutate: remove, isPending } = kind.useRemove(onRemoved);

  return (
    <ConfirmDialog
      icon={Trash2}
      tone="danger"
      title={kind.removeTitle}
      description={kind.removeDescription}
      confirmLabel={`Remove ${kind.noun}`}
      onConfirm={() => {
        clearFormError();
        remove(undefined, { onError: handleServerError });
      }}
      onCancel={onCancel}
      isPending={isPending}
      cancelDisabled={isPending}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    />
  );
}

function ViewDialog({ kind, sources, name, onClose }) {
  const [attempt, setAttempt] = useState(0);
  const src = sources[attempt];
  const title = kind.viewTitle(name);
  return (
    <div className="w-100 d-flex flex-column">
      <DialogHeader icon={Eye} title={title} onClose={onClose} />
      <div className="p-3 d-grid place-items-center">
        {src ? (
          <img
            key={src}
            src={src}
            alt={title}
            className={`d-block rounded-4 profile-viewer__image ${kind.shape === "rounded" ? "profile-viewer__image--logo" : ""}`}
            onError={() => setAttempt((current) => current + 1)}
          />
        ) : (
          <span className="text-iron-500 font-size-sm py-4">This {kind.noun} couldn't be loaded.</span>
        )}
      </div>
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

export function usePhotoManager({ kind, sources = [], name, inline = false }) {
  const photoSources = sources;
  const photoUrl = photoSources[0] ?? null;
  const inputRef = useRef(null);
  const [cropSource, setCropSource] = useState(null);
  const [cropFile, setCropFile] = useState(null);
  const [dialog, setDialog] = useState(null);

  useEffect(() => () => cropSource && URL.revokeObjectURL(cropSource), [cropSource]);

  const close = useCallback(() => {
    setDialog(null);
    setCropSource(null);
    setCropFile(null);
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
      toast.custom(<ToastDanger title={`Can't use this file as your ${kind.noun}`} description={problem} />);
      return;
    }
    setCropFile(file);
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
            {cropSource && <CropDialog kind={kind} source={cropSource} file={cropFile} onCancel={close} onSaved={close} />}
          </PhotoLayer>
          <PhotoLayer show={dialog === "remove"} onClose={close}>
            <RemoveDialog kind={kind} onCancel={close} onRemoved={close} />
          </PhotoLayer>
          <PhotoLayer show={dialog === "view"} onClose={close} wide>
            {photoUrl && <ViewDialog kind={kind} sources={photoSources} name={name} onClose={close} />}
          </PhotoLayer>
        </>
      ) : (
        <>
          <CustomModal show={dialog === "crop"} handleClose={close} closeOnOutsideClick={false} centered>
            {cropSource && <CropDialog kind={kind} source={cropSource} file={cropFile} onCancel={close} onSaved={close} />}
          </CustomModal>
          <CustomModal show={dialog === "remove"} handleClose={close} centered>
            <RemoveDialog kind={kind} onCancel={close} onRemoved={close} />
          </CustomModal>
          <CustomModal show={dialog === "view"} handleClose={close} size="lg" centered>
            {photoUrl && <ViewDialog kind={kind} sources={photoSources} name={name} onClose={close} />}
          </CustomModal>
        </>
      )}
    </>
  );

  return { hasPhoto: Boolean(photoUrl), noun: kind.noun, openPicker, openViewer, requestRemove, elements };
}

export function useProfilePhoto({ photoSources = [], name, inline = false }) {
  return usePhotoManager({ kind: PHOTO_KIND.profilePhoto, sources: photoSources, name, inline });
}

export function useSchoolLogo({ logoSources = [], name, inline = false }) {
  return usePhotoManager({ kind: PHOTO_KIND.schoolLogo, sources: logoSources, name, inline });
}
