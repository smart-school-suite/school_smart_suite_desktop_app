import { useDispatch, useSelector } from "react-redux";
import { MultiSelectAccordion } from "../../../../components/Accordion/MultiSelectAccordion";
import { useGetSchoolAdminAudience } from "../../../../hooks/Audience/useGetSchoolAdminAudience";
import { setTargetIndividuals as setAnnouncementTargetIndividuals } from "../../../../Slices/announcement/announcementSlice";
// The selector and actions default to the create announcement flow; other
// flows (e.g. school events) pass their own to reuse this picker.
function SchoolAdminTarget({
  selectTargeting = (state) =>
    state.announcement.createAnnouncement.audience.targeting,
  setTargetIndividuals = setAnnouncementTargetIndividuals,
} = {}) {
  const dispatch = useDispatch();
  const moduleState = useSelector(
    (state) => selectTargeting(state).administrators,
  );
  const { data: schoolAdminAudience, isLoading: isSchoolAdminAudienceLoading } =
    useGetSchoolAdminAudience();
  return (
    <>
      <div className="d-flex flex-column gap-3 font-size-sm px-2 pt-2">
        <MultiSelectAccordion
          intialState={true}
          label="School Admin"
          placeholder="Select Individual School Admins"
          searchPlaceholder="Search School Admin"
          items={schoolAdminAudience?.data || []}
          selectedIds={moduleState.individualIds}
          onChange={(selectedIds) => {
            dispatch(
              setTargetIndividuals({
                targetGroup: "administrators",
                selectedIds,
              }),
            );
          }}
          isLoading={isSchoolAdminAudienceLoading}
          searchableKeys={["first_name", "last_name", "username", "name"]}
          renderItem={(admin) => {
            return (
              <div className="d-flex flex-row align-items-center gap-2">
                <div
                  style={{ width: "2.4rem", height: "2.4rem", flexShrink: 0 }}
                  className="rounded-circle primary-background-100 color-primary 
                                  d-flex align-items-center justify-content-center fw-semibold
                                   overflow-hidden"
                >
                  {admin.profile_picture ? (
                    <img
                      src={admin?.profile_picture}
                      alt={admin?.username}
                      className="w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    <span>
                      {getInitials(admin?.first_name, admin?.last_name)}
                    </span>
                  )}
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-medium">{admin?.name}</span>
                  <div className="d-flex flex-row align-items-center gap-2 text-iron-400">
                    <span>@{admin?.username}</span>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    </>
  );
}
export default SchoolAdminTarget;

function getInitials(firstName, lastName) {
  if (!firstName || !lastName) {
    return "";
  }

  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}
