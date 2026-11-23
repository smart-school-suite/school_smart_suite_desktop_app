import {
  Building2,
  CalendarDays,
  Dot,
  GitBranch,
  ImageUp,
  Landmark,
  MapPin,
  Plus,
  Quote,
  Trash2,
} from "lucide-react";
import { format, isValid, parseISO } from "date-fns";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { Badge, BADGE_VARIANT } from "@/components/Renderer/badges";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { NotFoundError } from "../../components/errors/Error";
import ProfileAvatar from "../../components/Profile/ProfileAvatar";
import ProfilePhotoMenu from "../../components/Profile/ProfilePhotoMenu";
import { useSchoolLogo } from "../../components/Profile/useProfilePhoto";
import { SettingsRow, SettingsSection, useSettingsTone } from "../../components/Settings/SettingsSection";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import Table from "../../components/Tables/Tables";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useGetSchoolDetails } from "../../hooks/school/useGetSchoolDetails";
import { useGetAuthSchoolAdmin } from "../../hooks/schoolAdmin/useGetAuthSchoolAdmin";
import UpdateEstablishedDate from "../../ModalContent/School/UpdateEstablishedDate";
import UpdateSchoolMotor from "../../ModalContent/School/UpdateSchoolMotor";
import UpdateSchoolName from "../../ModalContent/School/UpdateSchoolName";
import { assetUrl } from "../../utils/assets";
import { schoolBranchColDefs } from "../../utils/table/colDefs/schoolBranch/schoolBranchColDefs";

const schoolInitials = (name) =>
  String(name ?? "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("") || "SL";

const formatEstablished = (value, pattern) => {
  if (!value) return null;
  const date = parseISO(String(value));
  return isValid(date) ? format(date, pattern) : String(value);
};

const SCHOOL_TYPE_LABEL = { private: "Private school", government: "Government school" };

function EditableRow({ modal, ...row }) {
  return (
    <ModalButton classname="w-100" action={{ modalContent: modal }}>
      <SettingsRow {...row} />
    </ModalButton>
  );
}

function SchoolSkeleton() {
  return (
    <div className="d-flex flex-column gap-3">
      <RectangleSkeleton width="100%" height="14rem" />
      <RectangleSkeleton width="100%" height="10rem" />
      <RectangleSkeleton width="100%" height="18rem" />
    </div>
  );
}

function School() {
  const tone = useSettingsTone();
  const { data: schoolDetails, isLoading, error } = useGetSchoolDetails();
  const { data: authData } = useGetAuthSchoolAdmin();
  const school = schoolDetails?.data;
  const country = authData?.data?.schoolDetails?.school?.country?.country;
  const currentBranchId = authData?.data?.authSchoolAdmin?.school_branch_id;
  const logoSources = [assetUrl(school?.current_logo?.object_key)].filter(Boolean);
  const initials = schoolInitials(school?.name);
  const logo = useSchoolLogo({ logoSources, name: school?.name });

  const branches = useMemo(
    () =>
      (school?.schoolbranches ?? []).map((branch) => ({
        ...branch,
        isCurrentBranch: branch.id === currentBranchId,
      })),
    [school?.schoolbranches, currentBranchId],
  );
  const colDefs = useMemo(() => schoolBranchColDefs(), []);

  const createBranch = () =>
    toast.custom(
      <ToastWarning
        title="Creating branches is coming soon"
        description="You'll be able to add a new branch to this school from here."
      />,
    );

  if (isLoading) return <SchoolSkeleton />;
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
          <div className="profile-header__avatar">
            <ProfilePhotoMenu
              photo={logo}
              src={logoSources}
              initials={initials}
              name={school?.name}
              size="7rem"
              shape="rounded"
              fit="contain"
              ringClassName={tone.darkMode ? "profile-avatar-ring--dark" : "profile-avatar-ring"}
              portal
            />
          </div>
          <div className="d-flex flex-column gap-1">
            <div className="d-flex flex-row flex-wrap align-items-center gap-2">
              <span className="font-size-md fw-semibold">{school?.name}</span>
              {school?.type && (
                <Badge variant={BADGE_VARIANT.PRIMARY} label={SCHOOL_TYPE_LABEL[school.type] ?? school.type} showIcon={false} />
              )}
            </div>
            {school?.motor && <span className="text-iron-600 fst-italic">“{school.motor}”</span>}
            <div className="d-flex flex-row flex-wrap align-items-center text-iron-500">
              {school?.established_year && <span>Established {formatEstablished(school.established_year, "yyyy")}</span>}
              {school?.established_year && <Dot size={14} />}
              <span>
                {branches.length} {branches.length === 1 ? "branch" : "branches"}
              </span>
              {country && <Dot size={14} />}
              {country && (
                <span className="d-inline-flex align-items-center gap-1">
                  <MapPin size={13} strokeWidth={1.75} />
                  {country}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <SettingsSection title="School logo">
        <div className="profile-row d-flex align-items-center gap-3 px-3">
          <button
            type="button"
            className="p-0 border-0 bg-transparent flex-shrink-0 profile-avatar--rounded"
            onClick={logo.hasPhoto ? logo.openViewer : logo.openPicker}
            aria-label={logo.hasPhoto ? "View school logo" : "Upload school logo"}
          >
            <ProfileAvatar src={logoSources} initials={initials} size="2.5rem" shape="rounded" fit="contain" />
          </button>
          <span className="d-flex flex-column flex-grow-1 overflow-hidden gap-1">
            <span className="fw-medium lh-none">{logo.hasPhoto ? "Your school logo" : "No school logo yet"}</span>
            <span className="text-iron-500 font-size-xs text-truncate">
              JPEG, PNG or WebP. You can crop it first, and transparent backgrounds are kept.
            </span>
          </span>
          <button
            type="button"
            className="btn btn-light border font-size-sm d-inline-flex align-items-center gap-2 flex-shrink-0"
            onClick={logo.openPicker}
          >
            <ImageUp size={15} strokeWidth={1.75} />
            {logo.hasPhoto ? "Change" : "Upload"}
          </button>
          {logo.hasPhoto && (
            <button
              type="button"
              className="profile-icon-btn d-grid place-items-center border-0 rounded-circle text-red-600 hover-bg-red-50 flex-shrink-0"
              onClick={logo.requestRemove}
              aria-label="Remove school logo"
              title="Remove school logo"
            >
              <Trash2 size={16} strokeWidth={1.75} />
            </button>
          )}
        </div>
      </SettingsSection>

      <SettingsSection title="School details">
        <EditableRow modal={UpdateSchoolName} icon={Building2} label="School name" value={school?.name} emptyText="Add the school name" />
        <EditableRow
          modal={UpdateEstablishedDate}
          icon={CalendarDays}
          label="Established"
          value={formatEstablished(school?.established_year, "d MMM yyyy")}
          emptyText="Add the year the school was established"
          plain
        />
        <EditableRow modal={UpdateSchoolMotor} icon={Quote} label="Motto" value={school?.motor} emptyText="Add the school motto" plain />
        <SettingsRow
          icon={Landmark}
          label="School type"
          value={SCHOOL_TYPE_LABEL[school?.type] ?? school?.type}
          emptyText="Not set"
          readOnly
        />
        <SettingsRow icon={MapPin} label="Country" value={country} emptyText="Not set" readOnly />
      </SettingsSection>

      <SettingsSection
        title={`School branches · ${branches.length}`}
        action={
          <button
            type="button"
            className="border-0 rounded-3 primary-background text-white font-size-sm px-3 py-1-5 d-inline-flex align-items-center gap-2"
            onClick={createBranch}
          >
            <Plus size={15} strokeWidth={2} />
            Create branch
          </button>
        }
        padded
      >
        {branches.length ? (
          <div className="school-branches-table">
            <Table colDefs={colDefs} rowData={branches} />
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center text-center gap-2 py-4 text-iron-500">
            <GitBranch size={22} strokeWidth={1.5} />
            <span>No branches are registered under this school yet.</span>
          </div>
        )}
      </SettingsSection>

      <SettingsSection title="Danger zone" tone="danger">
        <div className="profile-row d-flex align-items-center justify-content-between gap-3 px-3">
          <span className="d-flex flex-column gap-1">
            <span className="fw-medium lh-none">Suspend school</span>
            <span className="text-iron-500 font-size-xs">Temporarily blocks access for every branch of {school?.name}.</span>
          </span>
          <button type="button" className="btn btn-outline-danger font-size-sm flex-shrink-0">
            Suspend school
          </button>
        </div>
        <div className="profile-row d-flex align-items-center justify-content-between gap-3 px-3">
          <span className="d-flex flex-column gap-1">
            <span className="fw-medium lh-none">Delete school</span>
            <span className="text-iron-500 font-size-xs">Permanently removes {school?.name} and all of its branches.</span>
          </span>
          <button type="button" className="btn bg-red-600 text-white font-size-sm flex-shrink-0">
            Delete school
          </button>
        </div>
      </SettingsSection>

      {logo.elements}
    </div>
  );
}

export default School;
