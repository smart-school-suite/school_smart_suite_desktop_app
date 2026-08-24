import TeacherTableBadge from "../../../../components/Badges/TeacherTableBadge";
import { TeacherAvatarComponent } from "../../../../components/DataTableComponents/TeacherTableAvatar";
import AddedStatus from "../../../../components/Badges/AddedStatus";
import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import RepeatableGroupRenderer from "../../../../components/DataTableComponents/RepeatableGroupRenderer";

export function teacherPrefTimeColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "profile_picture",
      headerName: "Avatar",
      cellRenderer: TeacherAvatarComponent,
    }),
    textColumn({
      field: "name",
      headerName: "Full Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "semester",
      headerName: "Semester",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "academic_year",
      headerName: "Academic Year",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: AddedStatus,
    }),
    textColumn({
      field: "specialty_name",
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
      headerName: "Level Number",
      hide: false,
      cellRenderer: TextComponent,
    }),
    dateColumn({
      field: "semester_start_date",
      headerName: "S Start Date",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    dateColumn({
      field: "semester_end_date",
      headerName: "S End Date",
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
