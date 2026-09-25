import {
  textColumn,
  actionsColumn,
  dateColumn
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import { TeacherAvatarComponent } from "../../../../components/DataTableComponents/TeacherTableAvatar";
import TeacherAction from "../../../../components/Badges/ActivationCode/TeacherAction";
export function teacherActivationCodeColDefs() {
  return [
    textColumn({
      field: "profile_picture",
      headerName: "Avatar",
      cellRenderer: TeacherAvatarComponent,
    }),
    textColumn({
      field: "teacher_name",
      headerName: "Teacher Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "first_name",
      headerName: "First Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "last_name",
      headerName: "Last Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "sub_status",
      headerName: "Subscription Status",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "activation_code",
      headerName: "Activation Code",
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
      cellRenderer: TeacherAction,
    }),
  ];
}
