import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import RepeatableGroupRenderer from "../../../../components/DataTableComponents/RepeatableGroupRenderer";
export  function courseImportColDefs() {
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
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "course_credit",
      headerName: "Course Credit",
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
      field: "specialty",
      headerName: "Specialty",
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
      field: "description",
      headerName: "Description",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "course_types",
      headerName: "Course Types",
      cellRenderer: RepeatableGroupRenderer,
      cellRendererParams: {
        label: "Course Type",
        displayFields: ["type"],
        maxVisible: 2,
      },
    }),
  ];
}
