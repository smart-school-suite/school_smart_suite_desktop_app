import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import SlotConfigStatusRenderer from "../../../../components/Renderer/JointCourse/SlotConfigStatusRenderer";
import JointCourseStatusRenderer from "../../../../components/Renderer/JointCourse/JointCourseStatusRenderer";
export function semesterJointCourseColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "course_title",
      headerName: "Course Title",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "course_code",
      headerName: "Course Code",
      hide: true,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "course_credit",
      headerName: "Course Credit",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "course_description",
      headerName: "Course Description",
      hide: true,
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
    numberColumn({
      field: "affected_specialties",
      headerName: "Affected Specialties",
      hide: false,
    }),
    textColumn({
      field: "semester_status",
      headerName: "Status",
      hide: false,
      cellRenderer: JointCourseStatusRenderer,
    }),
    textColumn({
      field: "academic_year_start",
      headerName: "Academic Year Start",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "academic_year_end",
      headerName: "Academic Year End",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "slot_count",
      headerName: "Slot Count",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "slot_config_status",
      headerName: "Slot Config Status",
      hide: false,
      cellRenderer: SlotConfigStatusRenderer,
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
