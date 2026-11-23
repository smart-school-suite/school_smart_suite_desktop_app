import {
  AtSign,
  Dot,
  ImageUp,
  Mail,
  MapPin,
  PenLine,
  Phone,
  Trash2,
  UserRound,
  UserRoundPen,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Drawer } from "../../components/drawer/Drawer";
import { NotFoundError } from "../../components/errors/Error";
import ProfileAvatar, { getAvatarUrl, getInitials } from "../../components/Profile/ProfileAvatar";
import ProfilePhotoMenu from "../../components/Profile/ProfilePhotoMenu";
import { useProfilePhoto } from "../../components/Profile/useProfilePhoto";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import EditProfile from "../../DrawerContent/Profile/EditProfile";
import { useGetAuthSchoolAdmin } from "../../hooks/schoolAdmin/useGetAuthSchoolAdmin";

const SECTIONS = [
  {
    title: "Personal details",
    rows: [
      { field: "name", label: "Full name", icon: UserRound, empty: "Add your full name" },
      { field: "first_name", label: "First name", icon: UserRound, empty: "Add your first name" },
      { field: "last_name", label: "Last name", icon: UserRound, empty: "Add your last name" },
      { field: "username", label: "Username", icon: AtSign, empty: "Choose a username", format: (value) => `@${value}` },
    ],
  },
  {
    title: "Contact details",
    rows: [
      { field: "email", label: "Email", icon: Mail, empty: "Add your email", plain: true },
      { field: "phone", label: "Phone number", icon: Phone, empty: "Add a phone number" },
    ],
  },
  {
    title: "Location",
    rows: [{ field: "address", label: "Address", icon: MapPin, empty: "Add your address" }],
  },
];

function useTone() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return {
    darkMode,
    card: darkMode ? "dark-bg profile-card--dark" : "white-bg",
    row: darkMode ? "hover-bg-iron-900" : "hover-bg-iron-50",
    iconWrap: darkMode ? "bg-iron-900 text-iron-300" : "bg-iron-100 text-iron-600",
  };
}

function ProfileRow({ icon: Icon, label, value, emptyText, plain, onClick }) {
  const tone = useTone();
  return (
    <button
      type="button"
      onClick={onClick}
      className={`profile-row d-flex align-items-center gap-3 w-100 px-3 border-0 bg-transparent text-start rounded-3 ${tone.row}`}
    >
      <span className={`profile-row__icon d-grid place-items-center rounded-circle flex-shrink-0 ${tone.iconWrap}`}>
        <Icon size={16} strokeWidth={1.75} />
      </span>
      <span className="d-flex flex-column flex-grow-1 overflow-hidden gap-1">
        <span className="text-iron-500 font-size-xs lh-none">{label}</span>
        <span
          className={`text-truncate lh-tight ${value ? `fw-medium ${plain ? "" : "text-capitalize"}` : "text-primary-600"}`}
        >
          {value || emptyText}
        </span>
      </span>
      <PenLine size={15} strokeWidth={1.75} className="text-iron-400 flex-shrink-0" aria-hidden="true" />
      <span className="visually-hidden">Edit {label.toLowerCase()}</span>
    </button>
  );
}

function SectionCard({ title, children }) {
  const tone = useTone();
  return (
    <section className="d-flex flex-column gap-2">
      <span className="text-iron-500 font-size-xs fw-semibold text-uppercase tracking-wider px-1">{title}</span>
      <div className={`profile-card border rounded-4 p-1 d-flex flex-column ${tone.card}`}>{children}</div>
    </section>
  );
}

function ProfileSkeleton() {
  return (
    <div className="d-flex flex-column gap-3">
      <RectangleSkeleton width="100%" height="14rem" />
      <RectangleSkeleton width="100%" height="10rem" />
      <RectangleSkeleton width="100%" height="8rem" />
    </div>
  );
}

function Profile() {
  const { data, isLoading, error } = useGetAuthSchoolAdmin();
  const tone = useTone();
  const [drawer, setDrawer] = useState({ open: false, focusField: null });
  const schoolAdmin = data?.data?.authSchoolAdmin;
  const school = data?.data?.schoolDetails?.school;
  const photoUrl = getAvatarUrl(schoolAdmin);
  const initials = getInitials(schoolAdmin?.first_name, schoolAdmin?.last_name, schoolAdmin?.name);
  const photo = useProfilePhoto({ photoUrl, name: schoolAdmin?.name });

  const openEditor = (focusField = null) => setDrawer({ open: true, focusField });
  const closeEditor = () => setDrawer((current) => ({ ...current, open: false }));

  if (isLoading) return <ProfileSkeleton />;
  if (error) {
    return (
      <NotFoundError
        title={error?.response?.data?.errors?.title}
        description={error?.response?.data?.errors?.description}
      />
    );
  }

  return (
    <div className="position-relative h-100 overflow-y-auto scrollbar-xs d-flex flex-column gap-3 pe-1 pb-3 font-size-sm">
      <div className={`profile-card border rounded-4 overflow-hidden flex-shrink-0 ${tone.card}`}>
        <div className="profile-cover" aria-hidden="true" />
        <div className="px-4 pb-3 d-flex flex-column gap-3">
          <div className="d-flex align-items-end justify-content-between gap-3">
            <div className="profile-header__avatar">
              <ProfilePhotoMenu
                photo={photo}
                src={photoUrl}
                initials={initials}
                name={schoolAdmin?.name}
                size="7rem"
                ringClassName={tone.darkMode ? "profile-avatar-ring--dark" : "profile-avatar-ring"}
                portal
              />
            </div>
            <button
              type="button"
              className="btn btn-light border font-size-sm d-inline-flex align-items-center gap-2"
              onClick={() => openEditor()}
            >
              <UserRoundPen size={15} strokeWidth={1.75} />
              Edit profile
            </button>
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="font-size-md fw-semibold text-capitalize">{schoolAdmin?.name}</span>
            <div className="d-flex flex-row flex-wrap align-items-center text-iron-500">
              {schoolAdmin?.username && <span>@{schoolAdmin.username}</span>}
              {schoolAdmin?.username && <Dot size={14} />}
              <span>School Admin</span>
              {school?.name && <Dot size={14} />}
              {school?.name && <span>{school.name}</span>}
            </div>
            {school?.country?.country && (
              <span className="d-inline-flex align-items-center gap-1 text-iron-500">
                <MapPin size={13} strokeWidth={1.75} />
                {school.country.country}
              </span>
            )}
          </div>
        </div>
      </div>

      <SectionCard title="Profile photo">
        <div className="profile-row d-flex align-items-center gap-3 px-3">
          <button
            type="button"
            className="p-0 border-0 bg-transparent rounded-circle flex-shrink-0"
            onClick={photo.hasPhoto ? photo.openViewer : photo.openPicker}
            aria-label={photo.hasPhoto ? "View profile photo" : "Upload profile photo"}
          >
            <ProfileAvatar src={photoUrl} initials={initials} size="2.5rem" />
          </button>
          <span className="d-flex flex-column flex-grow-1 overflow-hidden gap-1">
            <span className="fw-medium lh-none">{photo.hasPhoto ? "Your profile photo" : "No profile photo yet"}</span>
            <span className="text-iron-500 font-size-xs text-truncate">
              JPEG, PNG or WebP. You can crop it before it's saved.
            </span>
          </span>
          <button
            type="button"
            className="btn btn-light border font-size-sm d-inline-flex align-items-center gap-2 flex-shrink-0"
            onClick={photo.openPicker}
          >
            <ImageUp size={15} strokeWidth={1.75} />
            {photo.hasPhoto ? "Change" : "Upload"}
          </button>
          {photo.hasPhoto && (
            <button
              type="button"
              className="profile-icon-btn d-grid place-items-center border-0 rounded-circle text-red-600 hover-bg-red-50 flex-shrink-0"
              onClick={photo.requestRemove}
              aria-label="Remove profile photo"
              title="Remove profile photo"
            >
              <Trash2 size={16} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </SectionCard>

      {SECTIONS.map((section) => (
        <SectionCard key={section.title} title={section.title}>
          {section.rows.map((row) => {
            const raw = schoolAdmin?.[row.field];
            return (
              <ProfileRow
                key={row.field}
                icon={row.icon}
                label={row.label}
                value={raw ? (row.format ? row.format(raw) : raw) : null}
                emptyText={row.empty}
                plain={row.plain || Boolean(row.format)}
                onClick={() => openEditor(row.field)}
              />
            );
          })}
        </SectionCard>
      ))}

      {photo.elements}

      <Drawer isOpen={drawer.open} onClose={closeEditor} title="Edit profile" size="md" className="profile-drawer">
        <EditProfile handleClose={closeEditor} drawerData={{ schoolAdmin, focusField: drawer.focusField }} />
      </Drawer>
    </div>
  );
}

export default Profile;
