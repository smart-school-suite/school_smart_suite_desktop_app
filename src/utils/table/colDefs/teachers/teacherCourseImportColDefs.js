import TeacherTableBadge from "../../../../components/Badges/TeacherTableBadge";
import { TeacherAvatarComponent } from "../../../../components/DataTableComponents/TeacherTableAvatar";
import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import RepeatableGroupRenderer from "../../../../components/DataTableComponents/RepeatableGroupRenderer";

export function teacherCourseImportColDefs() {
  return [
    textColumn({
      field: "course",
      headerName: "Course",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "teacher",
      headerName: "Teacher",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "level",
      headerName: "Level",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "specialty",
      headerName: "Specialty",
      hide: false,
      cellRenderer: TextComponent,
    }),
  ];
}
