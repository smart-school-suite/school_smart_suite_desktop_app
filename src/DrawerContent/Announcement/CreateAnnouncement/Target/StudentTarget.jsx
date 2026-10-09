import { Dot, Users } from "lucide-react";
import { formatNumber } from "../../../../utils/functions";
import { useGetStudentAudience } from "../../../../hooks/Audience/useGetStudentAudience";
import { useGetStudentAudienceByDepartment } from "../../../../hooks/Audience/useGetStudentAudienceByDepartment";
import { useGetStudentAudienceByLevel } from "../../../../hooks/Audience/useGetStudentAudienceByLevel";
import { useGetStudentAudienceBySpecialty } from "../../../../hooks/Audience/useGetStudentAudienceBySpecialty";
import { MultiSelectAccordion } from "../../../../components/Accordion/MultiSelectAccordion";
import { useSelector, useDispatch } from "react-redux";
import {
  setTargetIndividuals,
  setTargetSelection,
} from "../../../../Slices/announcement/announcementSlice";
function StudentTarget() {
  const dispatch = useDispatch();
  const moduleState = useSelector(
    (state) =>
      state.announcement.createAnnouncement.audience.targeting.students,
  );
  const { data: studentAudience, isLoading: isStudentAudienceLoading } =
    useGetStudentAudience();
  const { data: sDepartmentAudience, isLoading: isSDepartmentLoading } =
    useGetStudentAudienceByDepartment();
  const { data: sLevelAudience, isLoading: isSLevelAudienceLoading } =
    useGetStudentAudienceByLevel();
  const { data: sSpecialtyAudience, isLoading: isSpecialtyAudienceLoading } =
    useGetStudentAudienceBySpecialty();
  return (
    <>
      <div className="d-flex flex-column gap-3 font-size-sm px-2 pt-2">
        <MultiSelectAccordion
          intialState={true}
          label="Department"
          placeholder="Select Student By Department"
          searchPlaceholder="Search Department"
          items={sDepartmentAudience?.data || []}
          selectedIds={moduleState.criteria.departmentIds.map(
            (items) => items.id,
          )}
          onChange={(selectedIds) => {
            dispatch(
              setTargetSelection({
                targetGroup: "students",
                targetKey: "departmentIds",
                selectedIds: sDepartmentAudience?.data.filter((t) =>
                  selectedIds.some((id) => id == t.id),
                ),
              }),
            );
          }}
          isLoading={isSDepartmentLoading}
          searchableKeys={["department_name"]}
          renderItem={(department) => (
            <div className="d-flex flex-column text-truncate">
              <span className="fw-medium text-truncate">
                {department.department_name}
              </span>
              <div className="d-flex flex-row align-items-center gap-1 text-iron-400 ">
                <Users size={14} strokeWidth={2} />
                <span style={{ fontSize: 12 }}>
                  {formatNumber(department?.student_count || 0)}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                  }}
                >
                  Students
                </span>
              </div>
            </div>
          )}
        />
        <MultiSelectAccordion
          label="Level"
          placeholder="Select Student By Level"
          searchPlaceholder="Search Level"
          items={sLevelAudience?.data || []}
          selectedIds={moduleState.criteria.levelIds.map((items) => items.id)}
          onChange={(selectedIds) => {
            dispatch(
              setTargetSelection({
                targetGroup: "students",
                targetKey: "levelIds",
                selectedIds: sLevelAudience?.data.filter((t) =>
                  selectedIds.some((id) => id == t.id),
                ),
              }),
            );
          }}
          isLoading={isSLevelAudienceLoading}
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
                  {formatNumber(level.student_count || 0)}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                  }}
                >
                  Students
                </span>
              </div>
            </div>
          )}
        />

        <MultiSelectAccordion
          label="Specialty"
          placeholder="Select Student By Specialty"
          searchPlaceholder="Search Specialty"
          items={sSpecialtyAudience?.data || []}
          selectedIds={moduleState.criteria.specialtyIds.map((items) => items.id)}
          onChange={(selectedIds) => {
            dispatch(
              setTargetSelection({
                targetGroup: "students",
                targetKey: "specialtyIds",
                selectedIds: sSpecialtyAudience?.data.filter((t) =>
                  selectedIds.some((id) => id == t.id),
                ),
              }),
            );
          }}
          isLoading={isSpecialtyAudienceLoading}
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
                  {formatNumber(specialty?.student_count || 0)}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                  }}
                >
                  Students
                </span>
              </div>
            </div>
          )}
        />

        <MultiSelectAccordion
          label="Student"
          placeholder="Select Individual Students"
          searchPlaceholder="Search Student"
          items={studentAudience?.data || []}
          selectedIds={moduleState.individualIds}
          onChange={(selectedIds) => {
            dispatch(
              setTargetIndividuals({
                targetGroup: "students",
                selectedIds,
              }),
            );
          }}
          isLoading={isStudentAudienceLoading}
          searchableKeys={[
            "first_name",
            "last_name",
            "specialty",
            "level_name",
            "level",
            "username",
            "name",
          ]}
          renderItem={(student) => {
            return (
              <div className="d-flex flex-row align-items-center gap-2">
                <div
                  style={{ width: "2.4rem", height: "2.4rem", flexShrink: 0 }}
                  className="rounded-circle primary-background-100 color-primary 
                d-flex align-items-center justify-content-center fw-semibold
                 overflow-hidden"
                >
                  {student.profile_picture ? (
                    <img
                      src={student.profile_picture}
                      alt={student?.username}
                      className="w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    <span>
                      {getInitials(student?.first_name, student?.last_name)}
                    </span>
                  )}
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-medium">{student?.name}</span>
                  <div className="d-flex flex-row align-items-center gap-2 text-iron-400">
                    <span>{student?.specialty}</span>
                    <Dot size={12} />
                    <span>{student?.level_name}</span>
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
export default StudentTarget;

function getInitials(firstName, lastName) {
  if (!firstName || !lastName) {
    return "";
  }

  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}
