import TeacherTableBadge from "../../../../components/Badges/TeacherTableBadge";
import { TeacherAvatarComponent } from "../../../../components/DataTableComponents/TeacherTableAvatar";
import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";

export function teacherImportColDefs() {
  return [
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
  ];
}
