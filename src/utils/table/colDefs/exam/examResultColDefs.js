import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";

export const examResultColDefs = [
  {
    field: 'id',
    headerName: 'ID',
    // flex: 1,
    // sortable: true,
    // filter: true,
    // resizable: true,
  },
  {
    field: 'name',
    headerName: 'Name',
    // flex: 2,
    // sortable: true,
    // filter: true,
  },
  // TODO: add more columns
];

export default examResultColDefs;