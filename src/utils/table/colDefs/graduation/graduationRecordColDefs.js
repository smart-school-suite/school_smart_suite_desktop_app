import { actionsColumn, dateColumn, textColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import { AvatarRenderer } from "../../../../components/Renderer/AvatarRenderer";
import GraduationRecordClearanceStatusRenderer from "../../../../components/Renderer/Graduation/GraduationClearanceStatusRenderer";
import GraduationRecordEligibilityStatusRenderer from "../../../../components/Renderer/Graduation/GraduationEligibilityStatusRenderer";
import GraduationRecordStatusRenderer from "../../../../components/Renderer/Graduation/GraduationRecordStatusRenderer";
export function graduationRecordColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "student_avatar",
      headerName: "Student Avatar",
      hide: false,
      cellRenderer: AvatarRenderer,
      cellRendererParams: {
        firstNameField: "s_first_name",
        lastNameField: "s_last_name",
        usernameField: "s_username",
        avatarField: "s_profile_picture",
      },
    }),
    textColumn({
      field: "s_first_name",
      headerName: "Student First Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "s_last_name",
      headerName: "Student Last Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "s_full_name",
      headerName: "Student Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "specialty",
      headerName: "Specialty",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "level_name",
      headerName: "Level Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "level_number",
      headerName: "Level Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: GraduationRecordStatusRenderer,
    }),
    textColumn({
      field: "eligibility_status",
      headerName: "Eligibility Status",
      hide: true,
      cellRenderer: GraduationRecordEligibilityStatusRenderer,
    }),
    textColumn({
      field: "clearance_status",
      headerName: "Clearance Status",
      hide: false,
      cellRenderer: GraduationRecordClearanceStatusRenderer,
    }),
    textColumn({
      field: "batch",
      headerName: "Batch",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "admin_note",
      headerName: "Admin Note",
      hide: true,
      cellRenderer: TextComponent,
    }),
    dateColumn({
      field: "reviewed_at",
      headerName: "Reviewed At",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    dateColumn({
      field: "created_at",
      headerName: "Created At",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    dateColumn({
      field: "updated_at",
      headerName: "Updated At",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}

export default graduationRecordColDefs;
