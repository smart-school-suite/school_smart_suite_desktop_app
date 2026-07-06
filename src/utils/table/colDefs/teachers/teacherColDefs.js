import TeacherTableBadge from "../../../../components/Badges/TeacherTableBadge";
import { TeacherAvatarComponent } from "../../../../components/DataTableComponents/TeacherTableAvatar";
import { textColumn, actionsColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
export function teacherColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "profile_picture",
      headerName: "Avatar",
      cellRenderer: TeacherAvatarComponent,
    }),
    textColumn({
      field: "name",
      headerName: "Full Names",
      cellRenderer: TextComponent
    }),
    textColumn({
      headerName: "Email",
      field: "email",
      cellRenderer: TextComponent
    }),
    textColumn({
      headerName: "Phone",
      field: "phone",
      cellRenderer: TextComponent
    }),
    textColumn({
      headerName: "Gender",
      field: "gender",
      cellRenderer: TextComponent
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      cellRenderer: TeacherTableBadge
    }),
    actionsColumn({
      cellRenderer: ActionComponent
    }),
  ];
}
