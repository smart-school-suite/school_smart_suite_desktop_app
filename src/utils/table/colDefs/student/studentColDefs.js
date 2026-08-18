import { TeacherAvatarComponent } from "../../../../components/DataTableComponents/TeacherTableAvatar";
import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";

export function studentColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "profile_picture",
      headerName: "Avatar",
      cellRenderer: TeacherAvatarComponent,
    }),
    textColumn({
      field: "name",
      headerName: "Full Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "first_name",
      headerName: "First Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "last_name",
      headerName: "Last Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    dateColumn({
      field: "dob",
      headerName: "DOB",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    textColumn({
      field: "gender",
      headerName: "Gender",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "phone",
      headerName: "Phone",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "email",
      headerName: "Email",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "guardian_name",
      headerName: "Guardian",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "relationship",
      headerName: "Relationship",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "specialty_name",
      headerName: "Specialty",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "department",
      headerName: "Department",
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
      headerName: "Level Number",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "batch_title",
      headerName: "Batch",
      hide: true,
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
