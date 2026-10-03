import { useGetTeacherAudience } from "../../../../hooks/Audience/useGetTeacherAudience";
import { Dot, Users } from "lucide-react";
import { formatNumber } from "../../../../utils/functions";
import { MultiSelectAccordion } from "../../../../components/Accordion/MultiSelectAccordion";
import { useGetTeacherAudienceByDepartment } from "../../../../hooks/Audience/useGetTeacherAudienceByDepartment";
import { useGetTeacherAudienceByLevel } from "../../../../hooks/Audience/useGetTeacherAudienceByLevel";
import { useGetTeacherAudienceBySpecialty } from "../../../../hooks/Audience/useGetTeacherAudienceBySpecialty";
import { useDispatch, useSelector } from "react-redux";
import {
  setTargetIndividuals,
  setTargetSelection,
} from "../../../../Slices/announcement/draftAnnouncementSlice";
function TeacherTarget() {
  const dispatch = useDispatch();
  const moduleState = useSelector(
    (state) =>
      state.draftAnnouncement.updateDraftAnnouncement.draft.audience.targeting.students,
  );
  const { data: teacherAudience, isLoading: isTeacherAudienceLoading } =
    useGetTeacherAudience();
  const { data: dTeacherAudience, isLoading: isDteacherAudienceLoading } =
    useGetTeacherAudienceByDepartment();
  const { data: lTeacherAudience, isLoading: isLTeacherAudienceLoading } =
    useGetTeacherAudienceByLevel();
  const { data: sTeacherAudience, isLoading: isSTeacherAudienceLoading } =
    useGetTeacherAudienceBySpecialty();
  return (
    <>
      <div className="d-flex flex-column gap-3 font-size-sm px-2 pt-2">
        <MultiSelectAccordion
          intialState={true}
          label="Department"
          placeholder="Select Teacher By Department"
          searchPlaceholder="Search Department"
          items={dTeacherAudience?.data || []}
          selectedIds={moduleState.criteria.departmentIds.map(
            (items) => items.id,
          )}
          onChange={(selectedIds) => {
            dispatch(
              setTargetSelection({
                targetGroup: "teachers",
                targetKey: "departmentIds",
                selectedIds: dTeacherAudience?.data.filter((t) =>
                  selectedIds.some((id) => id == t.id),
                ),
              }),
            );
          }}
          isLoading={isDteacherAudienceLoading}
          searchableKeys={["department_name"]}
          renderItem={(department) => (
            <div className="d-flex flex-column text-truncate">
              <span className="fw-medium text-truncate">
                {department.department_name}
              </span>
              <div className="d-flex flex-row align-items-center gap-1 text-iron-400 ">
                <Users size={14} strokeWidth={2} />
                <span style={{ fontSize: 12 }}>
                  {formatNumber(department?.teacher_count || 0)}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                  }}
                >
                  Teachers
                </span>
              </div>
            </div>
          )}
        />
        <MultiSelectAccordion
          label="Level"
          placeholder="Select Teacher By Level"
          searchPlaceholder="Search Level"
          items={lTeacherAudience?.data || []}
          selectedIds={moduleState.criteria.levelIds.map(
            (items) => items.id,
          )}
          onChange={(selectedIds) => {
            dispatch(
              setTargetSelection({
                targetGroup: "teachers",
                targetKey: "levelIds",
                selectedIds: lTeacherAudience?.data.filter((t) =>
                  selectedIds.some((id) => id == t.id),
                ),
              }),
            );
          }}
          isLoading={isLTeacherAudienceLoading}
          searchableKeys={["level_name", "level"]}
          renderItem={(level) => (
            <div className="d-flex flex-column text-truncate">
              <div className="d-flex flex-row align-items-center gap-1">
                <span className="fw-medium text-truncate">
                  {level?.level_name}
                </span>
                <Dot size={12} />
                <span>{level?.level}</span>
              </div>
              <div className="d-flex flex-row align-items-center gap-1 text-iron-400 ">
                <Users size={14} strokeWidth={2} />
                <span style={{ fontSize: 12 }}>
                  {formatNumber(level.teacher_count || 0)}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                  }}
                >
                  Teachers
                </span>
              </div>
            </div>
          )
        }
        />
        <MultiSelectAccordion
          label="Specialty"
          placeholder="Select Teacher By Specialty"
          searchPlaceholder="Search Specialty"
          items={sTeacherAudience?.data || []}
          selectedIds={moduleState.criteria.specialtyIds.map((items) => items.id)}
          onChange={(selectedIds) => {
            dispatch(
              setTargetSelection({
                targetGroup: "teachers",
                targetKey: "specialtyIds",
                selectedIds: sTeacherAudience?.data.filter((t) =>
                  selectedIds.some((id) => id == t.id),
                ),
              }),
            );
          }}
          isLoading={isSTeacherAudienceLoading}
          searchableKeys={["level_name", "specialty_name", "level"]}
          renderItem={(specialty) => (
            <div className="d-flex flex-column text-truncate">
              <div className="d-flex flex-row align-items-center gap-1">
                <span className="fw-medium text-truncate">
                  {specialty.specialty_name}
                </span>
                <Dot size={12} />
                <span className="fw-medium text-truncate">
                  {specialty.level_name}
                </span>
              </div>
              <div className="d-flex flex-row align-items-center gap-1 text-iron-400 ">
                <Users size={14} strokeWidth={2} />
                <span style={{ fontSize: 12 }}>
                  {formatNumber(specialty?.teacher_count || 0)}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                  }}
                >
                  Teachers
                </span>
              </div>
            </div>
          
        )}
        />
        <MultiSelectAccordion
          label="Teacher"
          placeholder="Select Individual Teachers"
          searchPlaceholder="Search Teacher"
          items={teacherAudience?.data || []}
          selectedIds={moduleState.individualIds}
          onChange={(selectedIds) => {
            dispatch(
              setTargetIndividuals({
                targetGroup: "teachers",
                selectedIds,
              }),
            );
          }}
          isLoading={isTeacherAudienceLoading}
          searchableKeys={["first_name", "last_name", "username", "name"]}
          renderItem={(teacher) => {
            return (
              <div className="d-flex flex-row align-items-center gap-2">
                <div
                  style={{ width: "2.4rem", height: "2.4rem", flexShrink: 0 }}
                  className="rounded-circle primary-background-100 color-primary 
                         d-flex align-items-center justify-content-center fw-semibold
                          overflow-hidden"
                >
                  {teacher.profile_picture ? (
                    <img
                      src={teacher?.profile_picture}
                      alt={teacher?.username}
                      className="w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    <span>
                      {getInitials(teacher?.first_name, teacher?.last_name)}
                    </span>
                  )}
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-medium">{teacher?.name}</span>
                  <div className="d-flex flex-row align-items-center gap-2 text-iron-400">
                    <span>@{teacher?.username}</span>
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
export default TeacherTarget;

function getInitials(firstName, lastName) {
  if (!firstName || !lastName) {
    return "";
  }

  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}
