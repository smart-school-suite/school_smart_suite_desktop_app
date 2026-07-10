import TeacherTableBadge from "../../../../components/Badges/TeacherTableBadge";
import { TeacherAvatarComponent } from "../../../../components/DataTableComponents/TeacherTableAvatar";
import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
export function teacherColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "profile_picture",
      headerName: "Avatar",
      cellRenderer: TeacherAvatarComponent,
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
    textColumn({
      field: "name",
      headerName: "Full Names",
      cellRenderer: TextComponent,
    }),
    textColumn({
      headerName: "Email",
      field: "email",
      cellRenderer: TextComponent,
    }),
    textColumn({
      headerName: "Phone",
      field: "phone",
      cellRenderer: TextComponent,
    }),
    textColumn({
      headerName: "Gender",
      field: "gender",
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      cellRenderer: TeacherTableBadge,
    }),
    numberColumn({
      field: "num_assigned_specialties",
      headerName: "Specialties",
      hide: true
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
