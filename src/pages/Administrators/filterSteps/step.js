import ColumnFilterMatch from "./ColumnFilterMatch";
import ColumnSelect from "./ColumnSelect";
import ColumnValueInput from "./ColumnValueInput";
import PreviewFilter from "./PreviewFilter";

export const GEN_FILTER_FLOW = [
    {
        program_name:"SELECT_COLUMN",
        component:ColumnSelect
    },
    {
        program_name:"FILTER_MATCH",
        component:ColumnFilterMatch
    },
    {
        program_name:"VALUE_INPUT",
        component:ColumnValueInput
    },
    {
        program_name:"PREVIEW",
        component: PreviewFilter
    }
]