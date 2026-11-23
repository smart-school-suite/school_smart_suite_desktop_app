import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addressSchema,
  emailValidationSchema,
  nameSchema,
  phoneValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { TextInput } from "../../components/FormComponents/InputComponents";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import ProfilePhotoMenu from "../../components/Profile/ProfilePhotoMenu";
import { getAvatarSources, getInitials } from "../../components/Profile/ProfileAvatar";
import UsernameInput from "../../components/Profile/UsernameInput";
import { useProfilePhoto } from "../../components/Profile/useProfilePhoto";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useFormError } from "../../hooks/form/useFormError";
import { useUpdateSchoolAdminProfile } from "../../hooks/schoolAdmin/useUpdateSchoolAdminProfile";
import { normalizeUsername } from "../../utils/profile/usernameRules";

const DRAWER_SLIDE_MS = 380;

export const PROFILE_FIELDS = ["name", "first_name", "last_name", "username", "email", "phone", "address"];

const valueOf = (admin, field) => admin?.[field] ?? "";

const SCHEMAS = {
  name: nameSchema({ min: 3, max: 100, required: false, messages: { min: "Full name must be at least 3 characters." } }),
  first_name: nameSchema({ min: 2, max: 50, required: false }),
  last_name: nameSchema({ min: 2, max: 50, required: false }),
  email: emailValidationSchema({ required: false }),
  phone: phoneValidationSchema({ optional: true }),
  address: addressSchema({ required: false, min: 3, max: 225 }),
};

function Field({ field, label, hint, children }) {
  return (
    <div className="d-flex flex-column gap-1" data-profile-field={field}>
      <label className="font-size-sm fw-medium">{label}</label>
      {hint && <span className="text-iron-500 font-size-xs">{hint}</span>}
      {children}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="d-flex flex-column gap-3">
      <span className="text-iron-500 font-size-xs fw-semibold text-uppercase tracking-wider">{title}</span>
      {children}
    </section>
  );
}

export default function EditProfile({ handleClose, drawerData }) {
  const { schoolAdmin, focusField } = drawerData;
  const contentRef = useRef(null);
  const initial = useMemo(
    () => Object.fromEntries(PROFILE_FIELDS.map((field) => [field, valueOf(schoolAdmin, field)])),
    [schoolAdmin],
  );
  const [formData, setFormData] = useState(initial);
  const [validity, setValidity] = useState({});
  const [usernamePending, setUsernamePending] = useState(false);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Couldn't update your profile");
  const { mutate: update, isPending } = useUpdateSchoolAdminProfile(handleClose);
  const photoSources = getAvatarSources(schoolAdmin);
  const photo = useProfilePhoto({ photoSources, name: schoolAdmin?.name, inline: true });

  useEffect(() => {
    if (!focusField) return;
    const timer = setTimeout(() => {
      const target = contentRef.current?.querySelector(`[data-profile-field="${focusField}"]`);
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
      target?.querySelector("input, textarea")?.focus({ preventScroll: true });
    }, DRAWER_SLIDE_MS);
    return () => clearTimeout(timer);
  }, [focusField]);

  const setField = (field) => (value) => {
    clearFormError();
    setFormData((current) => ({ ...current, [field]: value }));
  };
  const setFieldValidity = (field) => (isValid) =>
    setValidity((current) => (current[field] === isValid ? current : { ...current, [field]: isValid }));
  const handleUsernameValidity = useCallback((isValid, isChecking) => {
    setValidity((current) => (current.username === isValid ? current : { ...current, username: isValid }));
    setUsernamePending(isChecking);
  }, []);

  const changes = useMemo(() => {
    const entries = PROFILE_FIELDS.map((field) => {
      const next = field === "username" ? normalizeUsername(formData[field]) : String(formData[field] ?? "").trim();
      const before = field === "username" ? normalizeUsername(initial[field]) : String(initial[field] ?? "").trim();
      return next !== before ? [field, next] : null;
    }).filter(Boolean);
    return Object.fromEntries(entries);
  }, [formData, initial]);

  const changedFields = Object.keys(changes);
  const invalidField = changedFields.find((field) => validity[field] === false);
  const canSave = changedFields.length > 0 && !invalidField && !usernamePending && !isPending;

  const save = () => {
    if (invalidField) {
      setClientError("Check your details", "Fix the highlighted fields before saving.");
      return;
    }
    clearFormError();
    update({ updateData: changes }, { onError: handleServerError });
  };

  return (
    <div className="profile-drawer-body position-relative d-flex flex-column font-size-sm">
      <div ref={contentRef} className="flex-grow-1 overflow-y-auto scrollbar-xs px-3 py-3 d-flex flex-column gap-4">
        <div className="d-flex align-items-center gap-3">
          <ProfilePhotoMenu
            photo={photo}
            src={photoSources}
            initials={getInitials(schoolAdmin?.first_name, schoolAdmin?.last_name, schoolAdmin?.name)}
            name={schoolAdmin?.name}
            size="4.5rem"
          />
          <div className="d-flex flex-column">
            <span className="fw-semibold">Profile photo</span>
            <span className="text-iron-500 font-size-xs">
              {photo.hasPhoto ? "Click the photo to view, change or remove it." : "Click the camera to add a photo."}
            </span>
          </div>
        </div>

        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} />

        <Section title="Personal details">
          <Field field="name" label="Full name">
            <TextInput
              value={formData.name}
              onChange={setField("name")}
              validationSchema={SCHEMAS.name}
              onValidationChange={setFieldValidity("name")}
              placeholder="Your full name"
            />
          </Field>
          <div className="d-flex flex-row gap-3">
            <div className="flex-grow-1">
              <Field field="first_name" label="First name">
                <TextInput
                  value={formData.first_name}
                  onChange={setField("first_name")}
                  validationSchema={SCHEMAS.first_name}
                  onValidationChange={setFieldValidity("first_name")}
                  placeholder="First name"
                />
              </Field>
            </div>
            <div className="flex-grow-1">
              <Field field="last_name" label="Last name">
                <TextInput
                  value={formData.last_name}
                  onChange={setField("last_name")}
                  validationSchema={SCHEMAS.last_name}
                  onValidationChange={setFieldValidity("last_name")}
                  placeholder="Last name"
                />
              </Field>
            </div>
          </div>
          <Field field="username" label="Username" hint="People in your school can find you by this name.">
            <UsernameInput
              value={formData.username}
              currentUsername={initial.username}
              onChange={setField("username")}
              onValidationChange={handleUsernameValidity}
            />
          </Field>
        </Section>

        <Section title="Contact details">
          <Field field="email" label="Email">
            <TextInput
              type="email"
              value={formData.email}
              onChange={setField("email")}
              validationSchema={SCHEMAS.email}
              onValidationChange={setFieldValidity("email")}
              placeholder="you@school.com"
            />
          </Field>
          <Field field="phone" label="Phone number">
            <TextInput
              type="tel"
              value={formData.phone}
              onChange={setField("phone")}
              validationSchema={SCHEMAS.phone}
              onValidationChange={setFieldValidity("phone")}
              placeholder="6XXXXXXXX"
            />
          </Field>
        </Section>

        <Section title="Location">
          <Field field="address" label="Address">
            <TextInput
              value={formData.address}
              onChange={setField("address")}
              validationSchema={SCHEMAS.address}
              onValidationChange={setFieldValidity("address")}
              placeholder="Street, city"
            />
          </Field>
        </Section>
      </div>

      <div className="drawer-footer border-top px-3 py-2">
        <span className="text-iron-500 font-size-xs me-auto">
          {changedFields.length === 0
            ? "No changes yet"
            : `${changedFields.length} ${changedFields.length === 1 ? "change" : "changes"} to save`}
        </span>
        <button type="button" className="btn btn-light font-size-sm px-3" onClick={handleClose} disabled={isPending}>
          Cancel
        </button>
        <button
          type="button"
          className={`profile-primary-btn border-0 rounded-3 primary-background text-white font-size-sm px-3 d-inline-flex align-items-center gap-2 ${!canSave ? "opacity-50" : ""}`}
          onClick={save}
          disabled={!canSave}
        >
          {isPending ? <SingleSpinner /> : "Save changes"}
        </button>
      </div>
      {photo.elements}
    </div>
  );
}
