import {
  actionsColumn,
  dateColumn,
  textColumn
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import { AvatarRenderer } from "../../../../components/Renderer/AvatarRenderer";

export function alumniColDefs({ ActionComponent }) {
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
      field: "s_full_names",
      headerName: "Full Names",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "s_first_name",
      headerName: "First Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "s_last_name",
      headerName: "Last Name",
      hide: true,
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
      headerName: "Level Count",
      hide: true,
      cellRenderer: TextComponent,
    }),
    dateColumn({
      field: "graduation_date",
      headerName: "Graduation Date",
      format: "dd/MM/yyyy",
      hide: false,
    }),
    textColumn({
      field: "graduation_batch",
      headerName: "Graduation Batch",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "academic_year",
      headerName: "Academic Year",
      hide: false,
      cellRenderer: TextComponent,
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

export default alumniColDefs;
