import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
export function gradeScaleImportColDefs() {
  return [
    textColumn({
      field: "grade_title",
      headerName: "Grade Title",
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "exam_type",
      headerName: "Exam Type",
      cellRenderer: TextComponent,
    }),
     textColumn({
      field: "grade_max_score",
      headerName: "Grade Max Score",
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "max_score",
      headerName: "Max Score",
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "min_score",
      headerName: "Min Score",
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "grade",
      headerName: "Grade",
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "resit_result",
      headerName: "Resit Result",
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "result",
      headerName: "Result",
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "performance",
      headerName: "Performance",
      cellRenderer: TextComponent,
    }),
  ];
}
